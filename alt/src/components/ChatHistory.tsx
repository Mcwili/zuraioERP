import { Badge } from "./ui/badge";
import { EmptyState } from "./ui/empty-state";
import { ConfirmationDialog } from "./ui/confirmation-dialog";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Search,
  MessageSquare,
  MoreVertical,
  Trash2,
  Edit2,
  Clock,
  Folder,
  FolderPlus,
  Check,
  X,
  Pin,
  PinOff,
  ChevronLeft,
  Home,
  ArrowUpDown,
  SortAsc,
  CalendarDays,
  Brain,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  GripVertical,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { motion, AnimatePresence } from "motion/react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface ChatMessage {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
  agentType?: string;
  tags?: string[];
  folderId?: string;
  color?: string;
  pinned?: boolean;
  pinnedOrder?: number;
}

interface ChatFolder {
  id: string;
  name: string;
  color?: string;
  folderOrder?: number;
}

interface ChatHistoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChatSelect?: (chatId: string) => void;
  isPinned?: boolean;
  onTogglePin?: () => void;
}

export interface ChatHistoryRef {
  addChatFromWindow: (title: string, windowId: string) => void;
}

// Pastel color palette (20 colors)
const PASTEL_COLORS = [
  "#FFB3BA", // Pastellrosa
  "#FFDFBA", // Pfirsich
  "#FFFFBA", // Pastellgelb
  "#BAFFC9", // Mintgrün
  "#BAE1FF", // Himmelblau
  "#E0BBE4", // Lavendel
  "#FFDFD3", // Apricot
  "#D4F1F4", // Aqua
  "#F7D6E0", // Blassrosa
  "#B4E7CE", // Salbei
  "#C9A9E6", // Flieder
  "#FFE5B4", // Pfirsichcreme
  "#D5AAFF", // Hellviolett
  "#FFD4E5", // Rosa Puff
  "#A7E9F0", // Hellcyan
  "#E6D4C8", // Beige
  "#C2E7DA", // Seafoam
  "#FFDEE2", // Babyrosa
  "#D4E4F7", // Periwinkle
  "#F5E6D3", // Vanille
];

const MAX_PINNED_CHATS = 5;

export const ChatHistory = forwardRef<ChatHistoryRef, ChatHistoryProps>(({ open, onOpenChange, onChatSelect, isPinned = false, onTogglePin }, ref) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [folders, setFolders] = useState<ChatFolder[]>([]);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const [deleteFolderDialogOpen, setDeleteFolderDialogOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null); // null = Root
  const [sortBy, setSortBy] = useState<'date' | 'alphabetical'>('date');
  const [chatSortBy, setChatSortBy] = useState<'date' | 'alphabetical'>('date');
  const [chatSortOrder, setChatSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showTopChats, setShowTopChats] = useState(true);
  const [showSpaces, setShowSpaces] = useState(true);
  const [showChats, setShowChats] = useState(true);

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    addChatFromWindow: (title: string, windowId: string) => {
      // Check if chat already exists to prevent duplicates
      setChats(prev => {
        const existingChat = prev.find(chat => chat.id === windowId);
        if (existingChat) {
          // Update existing chat instead of adding duplicate
          return prev.map(chat => 
            chat.id === windowId 
              ? { ...chat, title, timestamp: new Date() }
              : chat
          );
        } else {
          // Add new chat
          const newChat: ChatMessage = {
            id: windowId,
            title: title,
            preview: "Neue Konversation gestartet",
            timestamp: new Date(),
          };
          toast.success("Chat zur Historie hinzugefügt");
          return [newChat, ...prev];
        }
      });
    }
  }), []);

  // Load chats and folders from localStorage
  useEffect(() => {
    const savedChats = localStorage.getItem("chatHistory");
    const savedFolders = localStorage.getItem("chatFolders");
    
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      setChats(parsedChats.map((chat: any) => ({
        ...chat,
        timestamp: new Date(chat.timestamp)
      })));
    } else {
      // Demo data
      const demoChats: ChatMessage[] = [
        {
          id: "1",
          title: "Email-Zusammenfassung Q1 2024",
          preview: "Zusammenfassung der wichtigsten E-Mails...",
          timestamp: new Date(),
          agentType: "email-agent"
        },
        {
          id: "2",
          title: "Normen-Recherche ISO 9001",
          preview: "Informationen zu ISO 9001 Standards...",
          timestamp: new Date(Date.now() - 86400000),
          agentType: "normen-agent"
        },
        {
          id: "3",
          title: "Internet-Suche zu AI Trends",
          preview: "Aktuelle Entwicklungen im AI Bereich...",
          timestamp: new Date(Date.now() - 172800000),
          agentType: "internet-agent"
        },
        {
          id: "4",
          title: "Produktanfrage Jelmoli",
          preview: "Verfügbarkeit von Produkten...",
          timestamp: new Date(Date.now() - 604800000),
          agentType: "jelmoli-agent"
        },
      ];
      setChats(demoChats);
      localStorage.setItem("chatHistory", JSON.stringify(demoChats));
    }

    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    }
  }, []);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(chats));
    }
  }, [chats]);

  // Save folders to localStorage whenever they change
  useEffect(() => {
    if (folders.length > 0) {
      localStorage.setItem("chatFolders", JSON.stringify(folders));
    }
  }, [folders]);

  // Get pinned chats sorted by pinnedOrder
  const pinnedChats = chats
    .filter(chat => chat.pinned)
    .sort((a, b) => (a.pinnedOrder || 0) - (b.pinnedOrder || 0))
    .slice(0, MAX_PINNED_CHATS);

  // Toggle pin status of a chat
  const togglePinChat = (chatId: string) => {
    setChats(prev => {
      const chat = prev.find(c => c.id === chatId);
      if (!chat) return prev;

      if (chat.pinned) {
        // Unpin chat
        toast.success(t.chat.history.chatUnpinned);
        return prev.map(c =>
          c.id === chatId
            ? { ...c, pinned: false, pinnedOrder: undefined }
            : c
        );
      } else {
        // Check if we can pin more chats
        const currentPinnedCount = prev.filter(c => c.pinned).length;
        if (currentPinnedCount >= MAX_PINNED_CHATS) {
          toast.error(`Maximal ${MAX_PINNED_CHATS} Chats können angepinnt werden`);
          return prev;
        }

        // Pin chat with next order
        const maxOrder = Math.max(0, ...prev.filter(c => c.pinned).map(c => c.pinnedOrder || 0));
        toast.success(t.chat.history.chatPinned);
        return prev.map(c =>
          c.id === chatId
            ? { ...c, pinned: true, pinnedOrder: maxOrder + 1 }
            : c
        );
      }
    });
  };

  // Group chats by date
  const groupChatsByDate = (chats: ChatMessage[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 86400000);
    const lastWeek = new Date(today.getTime() - 7 * 86400000);
    const lastMonth = new Date(today.getTime() - 30 * 86400000);

    const groups: { [key: string]: ChatMessage[] } = {
      today: [],
      yesterday: [],
      lastWeek: [],
      lastMonth: [],
      older: []
    };

    chats.forEach(chat => {
      const chatDate = new Date(chat.timestamp);
      const chatDay = new Date(chatDate.getFullYear(), chatDate.getMonth(), chatDate.getDate());

      if (chatDay.getTime() === today.getTime()) {
        groups.today.push(chat);
      } else if (chatDay.getTime() === yesterday.getTime()) {
        groups.yesterday.push(chat);
      } else if (chatDate >= lastWeek) {
        groups.lastWeek.push(chat);
      } else if (chatDate >= lastMonth) {
        groups.lastMonth.push(chat);
      } else {
        groups.older.push(chat);
      }
    });

    return groups;
  };

  // Filter chats by search query and selected folder
  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.preview.toLowerCase().includes(searchQuery.toLowerCase());
    
    // If no folder is selected (Root), show only chats without folderId
    // If a folder is selected, show only chats in that folder
    const matchesFolder = selectedFolder === null 
      ? !chat.folderId 
      : chat.folderId === selectedFolder;
    
    return matchesSearch && matchesFolder;
  });

  // Sort chats based on selected sort method
  const sortedChats = [...filteredChats].sort((a, b) => {
    if (chatSortBy === 'alphabetical') {
      const comparison = a.title.localeCompare(b.title);
      return chatSortOrder === 'asc' ? comparison : -comparison;
    } else {
      const comparison = b.timestamp.getTime() - a.timestamp.getTime();
      return chatSortOrder === 'asc' ? -comparison : comparison;
    }
  });

  const groupedChats = groupChatsByDate(sortedChats);

  const handleDeleteChat = (chatId: string) => {
    setChatToDelete(chatId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (chatToDelete) {
      setChats(chats.filter(chat => chat.id !== chatToDelete));
      toast.success(t.chat.history.chatDeleted);
      setDeleteDialogOpen(false);
      setChatToDelete(null);
    }
  };

  const handleEditChat = (chatId: string, currentTitle: string) => {
    setEditingChatId(chatId);
    setEditingTitle(currentTitle);
  };

  const saveEditedTitle = () => {
    if (editingChatId) {
      setChats(chats.map(chat =>
        chat.id === editingChatId ? { ...chat, title: editingTitle } : chat
      ));
      setEditingChatId(null);
      setEditingTitle("");
      toast.success(t.chat.history.titleUpdated);
    }
  };

  const cancelEdit = () => {
    setEditingChatId(null);
    setEditingTitle("");
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const maxOrder = Math.max(0, ...folders.map(f => f.folderOrder || 0));
      const newFolder: ChatFolder = {
        id: Date.now().toString(),
        name: newFolderName,
        color: "#5ebc67",
        folderOrder: maxOrder + 1
      };
      setFolders([...folders, newFolder]);
      setNewFolderName("");
      setShowNewFolder(false);
      toast.success(t.chat.history.folderCreated);
    }
  };

  const moveToFolder = (chatId: string, folderId: string) => {
    setChats(chats.map(chat =>
      chat.id === chatId ? { ...chat, folderId } : chat
    ));
    toast.success(t.chat.history.chatMoved);
  };

  const updateFolderColor = (folderId: string, color: string) => {
    setFolders(folders.map(folder =>
      folder.id === folderId ? { ...folder, color } : folder
    ));
    toast.success(t.chat.history.folderColorChanged);
  };

  const updateFolderName = (folderId: string, newName: string) => {
    if (newName.trim()) {
      setFolders(folders.map(folder =>
        folder.id === folderId ? { ...folder, name: newName.trim() } : folder
      ));
      toast.success(t.chat.history.folderRenamed);
    }
  };

  const handleDeleteFolder = (folderId: string) => {
    setFolderToDelete(folderId);
    setDeleteFolderDialogOpen(true);
  };

  const confirmDeleteFolder = () => {
    if (folderToDelete) {
      // Remove folder
      setFolders(folders.filter(folder => folder.id !== folderToDelete));
      
      // Move chats from deleted folder to root
      setChats(chats.map(chat =>
        chat.folderId === folderToDelete ? { ...chat, folderId: undefined } : chat
      ));
      
      // Reset selected folder if it was the deleted one
      if (selectedFolder === folderToDelete) {
        setSelectedFolder(null);
      }
      
      toast.success(t.chat.history.spaceDeleted);
      setDeleteFolderDialogOpen(false);
      setFolderToDelete(null);
    }
  };

  const updateChatColor = (chatId: string, color: string) => {
    setChats(chats.map(chat =>
      chat.id === chatId ? { ...chat, color } : chat
    ));
    toast.success("Chat-Farbe geändert");
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor(diff / 60000);

    if (minutes < 60) {
      return `vor ${minutes}m`;
    } else if (hours < 24) {
      return `vor ${hours}h`;
    } else {
      return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
    }
  };

  // Reorder pinned chats
  const reorderPinnedChats = (dragIndex: number, hoverIndex: number) => {
    setChats(prev => {
      const newChats = [...prev];
      const pinnedChatsList = newChats
        .filter(c => c.pinned)
        .sort((a, b) => (a.pinnedOrder || 0) - (b.pinnedOrder || 0));
      
      // Swap the items
      const [removed] = pinnedChatsList.splice(dragIndex, 1);
      pinnedChatsList.splice(hoverIndex, 0, removed);
      
      // Update pinnedOrder for all pinned chats
      pinnedChatsList.forEach((chat, index) => {
        const chatIndex = newChats.findIndex(c => c.id === chat.id);
        if (chatIndex !== -1) {
          newChats[chatIndex] = { ...newChats[chatIndex], pinnedOrder: index + 1 };
        }
      });
      
      return newChats;
    });
  };

  // Reorder folders
  const reorderFolders = (dragIndex: number, hoverIndex: number) => {
    setFolders(prev => {
      const newFolders = [...prev].sort((a, b) => (a.folderOrder || 0) - (b.folderOrder || 0));
      
      // Swap the items
      const [removed] = newFolders.splice(dragIndex, 1);
      newFolders.splice(hoverIndex, 0, removed);
      
      // Update folderOrder for all folders
      newFolders.forEach((folder, index) => {
        folder.folderOrder = index + 1;
      });
      
      return newFolders;
    });
  };

  // Chat Item Component
  const ChatItem = ({ chat, showPinButton = true, index, isDraggable = false }: { 
    chat: ChatMessage; 
    showPinButton?: boolean;
    index?: number;
    isDraggable?: boolean;
  }) => {
    const ref = useRef<HTMLDivElement>(null);
    
    const [{ isDragging }, drag, preview] = useDrag({
      type: 'PINNED_CHAT',
      item: () => ({ id: chat.id, index }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag: isDraggable,
    });

    const [{ handlerId }, drop] = useDrop({
      accept: 'PINNED_CHAT',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(item: any, monitor) {
        if (!ref.current || !isDraggable || index === undefined) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        reorderPinnedChats(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    if (isDraggable) {
      drag(drop(ref));
    }

    return (
      <div
        ref={ref}
        data-handler-id={handlerId}
        className="group relative rounded-md cursor-pointer transition-colors"
        style={{
          backgroundColor: 'transparent',
          opacity: isDragging ? 0.5 : 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-gray-medium)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <div className="p-1.5">
          {editingChatId === chat.id ? (
            <div className="flex items-center gap-1.5">
              <Input
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEditedTitle();
                  if (e.key === "Escape") cancelEdit();
                }}
                onClick={(e) => e.stopPropagation()}
                className="h-6 text-xs border focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{ 
                  borderColor: 'var(--color-gray-medium)',
                  color: 'var(--color-gray-dark)'
                }}
                autoFocus
              />
              <Button 
                size="sm" 
                onClick={saveEditedTitle} 
                className="h-6 w-6 p-0 border-0"
                style={{
                  backgroundColor: 'var(--color-gray-dark)',
                  color: 'var(--color-card)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B6E71'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gray-dark)'}
              >
                <Check className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="ghost" onClick={cancelEdit} className="h-6 w-6 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => {
                if (onChatSelect) onChatSelect(chat.id);
                if (!isPinned) onOpenChange(false);
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="flex-shrink-0 hover:scale-110 transition-transform"
                      >
                        <MessageSquare 
                          className="h-3.5 w-3.5 fill-current" 
                          style={{ color: chat.color || 'var(--color-gray-dark)', strokeWidth: 1.5, stroke: 'var(--color-foreground)' }} 
                        />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-auto p-2" 
                      side="right" 
                      align="start"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {PASTEL_COLORS.map((color) => (
                          <button
                            key={color}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateChatColor(chat.id, color);
                            }}
                            className="w-6 h-6 rounded-md border-2 border-border hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <h4 
                      className="text-xs font-medium line-clamp-1 cursor-text"
                      onClick={(e) => e.stopPropagation()}
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleEditChat(chat.id, chat.title);
                      }}
                    >
                      {chat.title}
                    </h4>
                    {showPinButton && (
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(chat.timestamp).toLocaleString('de-DE', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit',
                          year: '2-digit'
                        })}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {isDraggable && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 cursor-grab active:cursor-grabbing">
                      <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      >
                        <MoreVertical className="h-2.5 w-2.5" />
                      </Button>
                    </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="text-xs">
                    {(showPinButton || chat.pinned) && (
                      <>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); togglePinChat(chat.id); }}>
                          {chat.isPinned ? (
                            <>
                              <PinOff className="h-3 w-3 mr-2" />
                              {t.sidebar.unpin}
                            </>
                          ) : (
                            <>
                              <Pin className="h-3 w-3 mr-2" />
                              {t.sidebar.pin}
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleEditChat(chat.id, chat.title); }}>
                      <Edit2 className="h-3 w-3 mr-2" />
                      {t.sidebar.rename}
                    </DropdownMenuItem>
                    {folders.length > 0 && (
                      <>
                        <DropdownMenuSeparator />
                        {folders.map(folder => (
                          <DropdownMenuItem
                            key={folder.id}
                            onClick={(e) => { e.stopPropagation(); moveToFolder(chat.id, folder.id); }}
                          >
                            <Folder className="h-3 w-3 mr-2" />
                            {folder.name}
                          </DropdownMenuItem>
                        ))}
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={(e) => { e.stopPropagation(); handleDeleteChat(chat.id); }}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-3 w-3 mr-2" />
                      {t.sidebar.delete}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Folder Component
  const FolderItem = ({ folder, chatCount, isSelected, index }: { 
    folder: ChatFolder; 
    chatCount: number; 
    isSelected: boolean;
    index: number;
  }) => {
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingName, setEditingName] = useState(folder.name);
    const ref = useRef<HTMLDivElement>(null);
    
    const [{ isDragging }, drag, preview] = useDrag({
      type: 'FOLDER',
      item: () => ({ id: folder.id, index }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [{ handlerId }, drop] = useDrop({
      accept: 'FOLDER',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(item: any, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        reorderFolders(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    drag(drop(ref));
    
    const startEditing = () => {
      setIsEditing(true);
      setEditingName(folder.name);
    };

    const saveEdit = () => {
      updateFolderName(folder.id, editingName);
      setIsEditing(false);
    };

    const cancelEditFolder = () => {
      setIsEditing(false);
      setEditingName(folder.name);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.stopPropagation();
        saveEdit();
      } else if (e.key === 'Escape') {
        e.stopPropagation();
        cancelEditFolder();
      }
    };
    
    return (
      <div
        ref={ref}
        data-handler-id={handlerId}
        className="flex items-center gap-2 p-1.5 rounded-md cursor-pointer transition-colors group"
        style={{
          backgroundColor: 'transparent',
          opacity: isDragging ? 0.5 : 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-gray-medium)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <div
          onClick={() => !isEditing && setSelectedFolder(folder.id)}
          className="flex items-center gap-2 flex-1 min-w-0"
        >
          <Popover open={colorPickerOpen} onOpenChange={setColorPickerOpen}>
            <PopoverTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setColorPickerOpen(true);
                }}
                className="flex-shrink-0 hover:scale-110 transition-transform"
              >
                <Folder className="h-3.5 w-3.5 fill-current" style={{ color: folder.color, strokeWidth: 1.5, stroke: 'var(--color-foreground)' }} />
              </button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-auto p-2" 
              side="right" 
              align="start"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {PASTEL_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={(e) => {
                      e.stopPropagation();
                      updateFolderColor(folder.id, color);
                      setColorPickerOpen(false);
                    }}
                    className="w-6 h-6 rounded-md border-2 border-border hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>
          {isEditing ? (
            <Input
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={saveEdit}
              onClick={(e) => e.stopPropagation()}
              className="text-xs h-6 px-2 flex-1 border focus-visible:ring-0 focus-visible:ring-offset-0"
              style={{ 
                borderColor: 'var(--color-gray-medium)',
                color: 'var(--color-gray-dark)'
              }}
              autoFocus
            />
          ) : (
            <span 
              className="text-xs flex-1" 
              onDoubleClick={(e) => {
                e.stopPropagation();
                startEditing();
              }}
            >
              {folder.name}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 cursor-grab active:cursor-grabbing">
            <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  startEditing();
                }}
              >
                <Edit2 className="h-3.5 w-3.5 mr-2" />
                {t.sidebar.renameAction}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFolder(folder.id);
                }}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5 mr-2" />
                {t.sidebar.delete}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Badge variant="secondary" className="text-[10px] h-4 px-1">
            {chatCount}
          </Badge>
        </div>
      </div>
    );
  };

  // Root Folder Component (for chats without folderId)
  const RootFolderItem = ({ chatCount, isSelected }: { chatCount: number; isSelected: boolean }) => {
    return (
      <div
        onClick={() => setSelectedFolder(null)}
        className="flex items-center gap-2 p-1.5 rounded-md cursor-pointer transition-colors"
        style={{
          backgroundColor: 'transparent'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-gray-medium)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Home className="h-3.5 w-3.5" />
        <span className="text-xs flex-1">{t.history.allChats}</span>
        <Badge variant="secondary" className="text-[10px] h-4 px-1">
          {chatCount}
        </Badge>
      </div>
    );
  };

  const renderChatGroup = (title: string, chats: ChatMessage[]) => {
    if (chats.length === 0) return null;

    return (
      <div key={title} className="space-y-1.5">
        {chatSortBy === 'date' && (
          <div className="flex items-center justify-between p-0 m-0">
            <div className="flex items-center gap-2">
              {title === "Heute" && <MessageSquare className="h-4 w-4 text-foreground" />}
              <h3 className="text-sm text-foreground">{title === "Heute" ? "Chats" : title}</h3>
            </div>
            {title === "Heute" && (
              <div className="flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0"
                      title="Sortierung"
                    >
                      {chatSortBy === 'date' ? (
                        <ArrowUpDown className="h-3.5 w-3.5" style={{ color: 'var(--color-gray-dark)', strokeWidth: 1.8 }} />
                      ) : (
                        <SortAsc className="h-3 w-3" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="text-xs">
                    <DropdownMenuItem onClick={() => setChatSortBy('date')}>
                      <div className="flex items-center gap-0.5 bg-card rounded px-0.5 mr-2">
                        <ArrowUp className="h-2.5 w-2.5 text-foreground" style={{ strokeWidth: 2 }} />
                        <ArrowDown className="h-2.5 w-2.5 text-foreground" style={{ strokeWidth: 2 }} />
                      </div>
                      Nach Datum
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setChatSortBy('alphabetical')}>
                      <SortAsc className="h-3 w-3 mr-2" />
                      Alphabetisch
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setChatSortOrder(chatSortOrder === 'asc' ? 'desc' : 'asc')}>
                      <ArrowUpDown className="h-3 w-3 mr-2" />
                      {chatSortOrder === 'asc' ? 'Aufsteigend' : 'Absteigend'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div 
                  onClick={() => setShowChats(!showChats)}
                  className="cursor-pointer p-1 rounded transition-colors"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gray-medium)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {showChats ? (
                    <ChevronUp className="h-3.5 w-3.5 text-foreground" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 text-foreground" />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {showChats && (
          <div className="space-y-1">
            {chats.map(chat => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderChats = () => {
    if (chatSortBy === 'alphabetical') {
      // For alphabetical sorting, show all chats without date grouping
      return (
        <div className="space-y-1.5">
          <div className="flex items-start justify-between px-1">
            <h3 className="text-[10px] font-medium text-muted-foreground py-0.5 uppercase tracking-wide">CHATS</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0"
                  title="Sortierung"
                >
                  {chatSortBy === 'date' ? (
                    <div className="flex items-center gap-0.5 bg-card rounded px-0.5">
                      <ArrowUp className="h-2.5 w-2.5 text-foreground" style={{ strokeWidth: 2 }} />
                      <ArrowDown className="h-2.5 w-2.5 text-foreground" style={{ strokeWidth: 2 }} />
                    </div>
                  ) : (
                    <SortAsc className="h-3 w-3" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="text-xs">
                <DropdownMenuItem onClick={() => setChatSortBy('date')}>
                  <div className="flex items-center gap-0.5 bg-card rounded px-0.5 mr-2">
                    <ArrowUp className="h-2.5 w-2.5 text-foreground" style={{ strokeWidth: 2 }} />
                    <ArrowDown className="h-2.5 w-2.5 text-foreground" style={{ strokeWidth: 2 }} />
                  </div>
                  Nach Datum
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setChatSortBy('alphabetical')}>
                  <SortAsc className="h-3 w-3 mr-2" />
                  Alphabetisch
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setChatSortOrder(chatSortOrder === 'asc' ? 'desc' : 'asc')}>
                  <ArrowUpDown className="h-3 w-3 mr-2" />
                  {chatSortOrder === 'asc' ? 'Aufsteigend' : 'Absteigend'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {showChats && (
            <div className="space-y-1">
              {sortedChats.map(chat => (
                <ChatItem key={chat.id} chat={chat} />
              ))}
            </div>
          )}
        </div>
      );
    } else {
      // For date sorting, show grouped chats
      return (
        <>
          {renderChatGroup("Heute", groupedChats.today)}
          {showChats && renderChatGroup(t.chat.history.yesterday, groupedChats.yesterday)}
          {showChats && renderChatGroup(t.chat.history.lastWeek, groupedChats.lastWeek)}
          {showChats && renderChatGroup(t.chat.history.lastMonth, groupedChats.lastMonth)}
          {showChats && renderChatGroup(t.chat.history.older, groupedChats.older)}
        </>
      );
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute left-0 top-0 bottom-0 w-[320px] bg-white border-r border-border shadow-lg z-20 flex flex-col"
            style={{
              backgroundColor: 'var(--color-card)',
              borderColor: 'var(--color-border)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 pb-3 border-b border-border flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-base">
                  <Brain className="h-4 w-4" />
                  <h2 className="font-medium">Think Tank</h2>
                </div>
                <div className="flex items-center gap-1">
                  {onTogglePin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onTogglePin}
                      className="h-7 w-7 p-0"
                      title={isPinned ? t.sidebar.unpinAction : t.sidebar.pinAction}
                    >
                      {isPinned ? (
                        <PinOff className="h-3.5 w-3.5" />
                      ) : (
                        <Pin className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onOpenChange(false)}
                    className="h-7 w-7 p-0"
                    title={t.sidebar.collapse}
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="px-4 py-3 flex-shrink-0 m-[0px] px-[12px] py-[4px]">
              {showSearchInput ? (
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder={t.tenantAdmin.placeholders.searchDots}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 h-8 text-xs"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowSearchInput(false);
                      setSearchQuery("");
                    }}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-0.5">
                  <div
                    onClick={() => setShowSearchInput(true)}
                    className="flex items-center gap-2 p-1.5 rounded-md cursor-pointer transition-colors text-sm"
                    style={{
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-gray-medium)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Search className="h-3.5 w-3.5" />
                    {t.sidebar.search}
                  </div>
                  <div
                    onClick={() => setShowNewFolder(true)}
                    className="flex items-center gap-2 p-1.5 rounded-md cursor-pointer transition-colors text-sm"
                    style={{
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-gray-medium)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Folder className="h-3.5 w-3.5" />
                    {t.sidebar.newSpace}
                  </div>
                  <div
                    onClick={() => {
                      onOpenChange(false);
                      if (onChatSelect) onChatSelect('new');
                    }}
                    className="flex items-center gap-2 p-1.5 rounded-md cursor-pointer transition-colors text-sm"
                    style={{
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-gray-medium)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    {t.sidebar.newChat}
                  </div>
                </div>
              )}
            </div>

            {/* Separator after action buttons */}
            {!showSearchInput && (
              <div className="px-3 flex-shrink-0 py-3 m-[0px]">
                <Separator />
              </div>
            )}

            {/* Top Chats Section */}
            {!showSearchInput && (
              <div className="px-4 flex-shrink-0">
                <div className="flex items-center gap-2 p-[0px] m-[0px]">
                  <Pin className="h-4 w-4 text-foreground" />
                  <h3 className="text-sm text-foreground">Top Chats</h3>
                  <div 
                    onClick={() => setShowTopChats(!showTopChats)}
                    className="ml-auto cursor-pointer p-1 rounded transition-colors"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gray-medium)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {showTopChats ? (
                      <ChevronUp className="h-3.5 w-3.5 text-foreground" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5 text-foreground" />
                    )}
                  </div>
                </div>
                
                {showTopChats && pinnedChats.length > 0 && (
                  <div className="mt-2 space-y-0.5">
                    {pinnedChats.map((chat, index) => (
                      <ChatItem 
                        key={chat.id} 
                        chat={chat} 
                        showPinButton={false} 
                        index={index}
                        isDraggable={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Separator after Top Chats */}
            {!showSearchInput && (
              <div className="px-3 flex-shrink-0 py-3">
                <Separator />
              </div>
            )}

            {/* Spaces & Chat List */}
            <ScrollArea className="flex-1 min-h-0">
              <div className="px-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-foreground" />
                  <h3 className="text-sm text-foreground">Spaces</h3>
                  <div 
                    onClick={() => setShowSpaces(!showSpaces)}
                    className="ml-auto cursor-pointer p-1 rounded transition-colors"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gray-medium)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {showSpaces ? (
                      <ChevronUp className="h-3.5 w-3.5 text-foreground" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5 text-foreground" />
                    )}
                  </div>
                </div>
                
                {showSpaces && (
                  <div className="mt-2 space-y-2">
                    {/* New Folder Input */}
                    {showNewFolder && (
                      <div className="flex items-center gap-1.5 p-1.5 rounded-md" style={{ backgroundColor: 'var(--color-gray-light)' }}>
                        <Input
                          value={newFolderName}
                          onChange={(e) => setNewFolderName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleCreateFolder();
                            if (e.key === "Escape") {
                              setShowNewFolder(false);
                              setNewFolderName("");
                            }
                          }}
                          placeholder={t.tenantAdmin.placeholders.spaceName}
                          className="h-6 text-xs border focus-visible:ring-0 focus-visible:ring-offset-0"
                          style={{ 
                            borderColor: 'var(--color-gray-medium)',
                            color: 'var(--color-gray-dark)'
                          }}
                          autoFocus
                        />
                        <Button 
                          size="sm" 
                          onClick={handleCreateFolder} 
                          className="h-6 w-6 p-0 border-0"
                          style={{
                            backgroundColor: 'var(--color-gray-dark)',
                            color: 'var(--color-card)'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B6E71'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gray-dark)'}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => {
                            setShowNewFolder(false);
                            setNewFolderName("");
                          }} 
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    
                    <div className="space-y-0.5">
                      {/* Root Folder */}
                      <RootFolderItem 
                        chatCount={chats.filter(chat => !chat.folderId).length}
                        isSelected={selectedFolder === null}
                      />
                      
                      {/* User Created Folders */}
                      {[...folders]
                        .sort((a, b) => (a.folderOrder || 0) - (b.folderOrder || 0))
                        .map((folder, index) => {
                          const folderChats = chats.filter(chat => chat.folderId === folder.id);
                          return (
                            <FolderItem 
                              key={folder.id} 
                              folder={folder} 
                              chatCount={folderChats.length}
                              isSelected={selectedFolder === folder.id}
                              index={index}
                            />
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>

              {/* Separator between Spaces and Chats */}
              <div className="px-4 py-3">
                <Separator />
              </div>

              {/* Chat List */}
              <div className="px-4 flex-shrink-0">
                <div className="space-y-4">
                  {/* Selected Folder Info */}
                  {selectedFolder !== null && (
                    <div className="flex items-center gap-2 py-2 border-b border-border mb-2">
                      <Folder 
                        className="h-3.5 w-3.5 fill-current" 
                        style={{ color: folders.find(f => f.id === selectedFolder)?.color || '#5ebc67' }}
                      />
                      <span className="text-xs font-medium">
                        {folders.find(f => f.id === selectedFolder)?.name || 'Ordner'}
                      </span>
                    </div>
                  )}
                  
                  {filteredChats.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-xs">{t.history.noChatsFound}</p>
                    </div>
                  ) : (
                    renderChats()
                  )}
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Chat Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title={t.sidebar.deleteChatTitle}
        description={t.sidebar.deleteChatMessage + " " + t.sidebar.cannotUndo}
        confirmLabel={t.sidebar.delete}
        cancelLabel={t.sidebar.cancel}
        onConfirm={confirmDelete}
        variant="destructive"
      />

      {/* Delete Folder Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteFolderDialogOpen}
        onOpenChange={setDeleteFolderDialogOpen}
        title={t.sidebar.deleteSpaceTitle}
        description={t.chat.history.deleteSpaceMessage}
        confirmLabel={t.sidebar.delete}
        cancelLabel={t.sidebar.cancel}
        onConfirm={confirmDeleteFolder}
        variant="warning"
      />
    </DndProvider>
  );
});