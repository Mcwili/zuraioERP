import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Plus,
  Search,
  X,
  Pin,
  MessageSquare,
  FolderOpen,
  Lightbulb,
  Archive,
  Trash2,
  CalendarDays,
  SortAsc,
  ArrowUpDown,
  FolderPlus,
  Check,
  GripVertical,
  Clock,
  RefreshCw,
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { useExtendedTranslations } from "../utils/i18n";

// Types
interface Chat {
  id: string;
  title: string;
  preview: string;
  date: Date;
  isPinned: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  deletedAt?: Date;
  icon?: string;
}

interface Space {
  id: string;
  name: string;
  icon: string;
  isPinned: boolean;
  order: number;
}

interface Prompt {
  id: string;
  name: string;
  category: string;
  isPinned: boolean;
}

interface PromptCategory {
  id: string;
  name: string;
}

type SortOrder = "asc" | "desc";
type ChatSortBy = "date" | "alphabetical";

// Mock Data
const mockChats: Chat[] = [
  {
    id: "1",
    title: "Projektplanung Q1 2025",
    preview: "Wir müssen die Roadmap für...",
    date: new Date(),
    isPinned: true,
    isArchived: false,
    isDeleted: false,
  },
  {
    id: "2",
    title: "AI Model Evaluation",
    preview: "Comparing different LLM models...",
    date: new Date(Date.now() - 86400000),
    isPinned: false,
    isArchived: false,
    isDeleted: false,
  },
  {
    id: "3",
    title: "Kundenpräsentation RMB",
    preview: "Vorbereitung der Slides...",
    date: new Date(Date.now() - 172800000),
    isPinned: true,
    isArchived: false,
    isDeleted: false,
  },
  {
    id: "4",
    title: "Code Review Session",
    preview: "Reviewing the new authentication...",
    date: new Date(Date.now() - 604800000),
    isPinned: false,
    isArchived: false,
    isDeleted: false,
  },
  {
    id: "5",
    title: "Archivierter Chat",
    preview: "Dieser Chat ist archiviert",
    date: new Date(Date.now() - 2592000000),
    isPinned: false,
    isArchived: true,
    isDeleted: false,
  },
  {
    id: "6",
    title: "Gelöschter Chat",
    preview: "Wird in 28 Tagen gelöscht",
    date: new Date(Date.now() - 172800000),
    isPinned: false,
    isArchived: false,
    isDeleted: true,
    deletedAt: new Date(),
  },
];

const mockSpaces: Space[] = [
  { id: "1", name: "RMB Projekte", icon: "🏢", isPinned: true, order: 0 },
  { id: "2", name: "AI Research", icon: "🔬", isPinned: false, order: 1 },
  { id: "3", name: "Design System", icon: "🎨", isPinned: true, order: 2 },
  { id: "4", name: "Marketing", icon: "📢", isPinned: false, order: 3 },
];

const mockPrompts: Prompt[] = [
  { id: "1", name: "Code Reviewer", category: "Development", isPinned: true },
  { id: "2", name: "Email Writer", category: "Communication", isPinned: false },
  { id: "3", name: "Bug Analyzer", category: "Development", isPinned: true },
  { id: "4", name: "Meeting Notes", category: "Communication", isPinned: false },
  { id: "5", name: "Data Analyst", category: "Analytics", isPinned: false },
];

const mockCategories: PromptCategory[] = [
  { id: "1", name: "Development" },
  { id: "2", name: "Communication" },
  { id: "3", name: "Analytics" },
];

interface ThinkTankProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThinkTank({ isOpen, onClose }: ThinkTankProps) {
  const tExt = useExtendedTranslations();
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [spaces, setSpaces] = useState<Space[]>(mockSpaces);
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);
  const [categories, setCategories] = useState<PromptCategory[]>(mockCategories);

  // Expansion states
  const [chatsExpanded, setChatsExpanded] = useState(true);
  const [spacesExpanded, setSpacesExpanded] = useState(true);
  const [promptsExpanded, setPromptsExpanded] = useState(true);

  // Search states
  const [chatsSearch, setChatsSearch] = useState("");
  const [spacesSearch, setSpacesSearch] = useState("");
  const [promptsSearch, setPromptsSearch] = useState("");
  const [showChatsSearch, setShowChatsSearch] = useState(false);
  const [showSpacesSearch, setShowSpacesSearch] = useState(false);
  const [showPromptsSearch, setShowPromptsSearch] = useState(false);

  // Creation states
  const [showNewSpace, setShowNewSpace] = useState(false);
  const [newSpaceName, setNewSpaceName] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // View states
  const [view, setView] = useState<"main" | "trash" | "archive">("main");

  // Sort states
  const [chatSortBy, setChatSortBy] = useState<ChatSortBy>("date");
  const [chatSortOrder, setChatSortOrder] = useState<SortOrder>("desc");

  // Detect if mobile for DnD backend
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Filter and sort chats
  const getFilteredChats = () => {
    let filtered = chats.filter((chat) => {
      if (view === "trash") return chat.isDeleted;
      if (view === "archive") return chat.isArchived;
      return !chat.isDeleted && !chat.isArchived;
    });

    if (chatsSearch) {
      filtered = filtered.filter((chat) =>
        chat.title.toLowerCase().includes(chatsSearch.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (chatSortBy === "date") {
        const diff = b.date.getTime() - a.date.getTime();
        return chatSortOrder === "asc" ? -diff : diff;
      } else {
        const comp = a.title.localeCompare(b.title);
        return chatSortOrder === "asc" ? comp : -comp;
      }
    });

    return filtered;
  };

  // Group chats by date
  const groupChatsByDate = (chatList: Chat[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 86400000);
    const lastWeek = new Date(today.getTime() - 7 * 86400000);
    const lastMonth = new Date(today.getTime() - 30 * 86400000);

    const groups: { [key: string]: Chat[] } = {
      [tExt.thinkTankPanel.dateGroups.today]: [],
      [tExt.thinkTankPanel.dateGroups.yesterday]: [],
      [tExt.thinkTankPanel.dateGroups.lastWeek]: [],
      [tExt.thinkTankPanel.dateGroups.lastMonth]: [],
      [tExt.thinkTankPanel.dateGroups.older]: [],
    };

    chatList.forEach((chat) => {
      const chatDate = new Date(chat.date);
      if (chatDate >= today) {
        groups[tExt.thinkTankPanel.dateGroups.today].push(chat);
      } else if (chatDate >= yesterday) {
        groups[tExt.thinkTankPanel.dateGroups.yesterday].push(chat);
      } else if (chatDate >= lastWeek) {
        groups[tExt.thinkTankPanel.dateGroups.lastWeek].push(chat);
      } else if (chatDate >= lastMonth) {
        groups[tExt.thinkTankPanel.dateGroups.lastMonth].push(chat);
      } else {
        groups[tExt.thinkTankPanel.dateGroups.older].push(chat);
      }
    });

    return groups;
  };

  // Pin/Unpin handlers
  const toggleChatPin = (id: string) => {
    setChats((prev) =>
      prev.map((chat) => (chat.id === id ? { ...chat, isPinned: !chat.isPinned } : chat))
    );
  };

  const toggleSpacePin = (id: string) => {
    setSpaces((prev) =>
      prev.map((space) => (space.id === id ? { ...space, isPinned: !space.isPinned } : space))
    );
  };

  const togglePromptPin = (id: string) => {
    setPrompts((prev) =>
      prev.map((prompt) => (prompt.id === id ? { ...prompt, isPinned: !prompt.isPinned } : prompt))
    );
  };

  // Move to trash/archive
  const moveToTrash = (id: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === id ? { ...chat, isDeleted: true, deletedAt: new Date() } : chat
      )
    );
  };

  const moveToArchive = (id: string) => {
    setChats((prev) =>
      prev.map((chat) => (chat.id === id ? { ...chat, isArchived: true } : chat))
    );
  };

  const restoreFromTrash = (id: string) => {
    setChats((prev) =>
      prev.map((chat) => (chat.id === id ? { ...chat, isDeleted: false, deletedAt: undefined } : chat))
    );
  };

  const permanentlyDelete = (id: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== id));
  };

  const restoreFromArchive = (id: string) => {
    setChats((prev) =>
      prev.map((chat) => (chat.id === id ? { ...chat, isArchived: false } : chat))
    );
  };

  // Create new space
  const createSpace = () => {
    if (newSpaceName.trim()) {
      const newSpace: Space = {
        id: Date.now().toString(),
        name: newSpaceName,
        icon: "📁",
        isPinned: false,
        order: spaces.length,
      };
      setSpaces([...spaces, newSpace]);
      setNewSpaceName("");
      setShowNewSpace(false);
    }
  };

  // Create new category
  const createCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: PromptCategory = {
        id: Date.now().toString(),
        name: newCategoryName,
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setShowNewCategory(false);
    }
  };

  const filteredChats = getFilteredChats();
  const groupedChats = view === "main" ? groupChatsByDate(filteredChats) : null;
  const pinnedChats = chats.filter((c) => c.isPinned && !c.isDeleted && !c.isArchived).slice(0, 5);
  const pinnedSpaces = spaces.filter((s) => s.isPinned).slice(0, 5);
  const pinnedPrompts = prompts.filter((p) => p.isPinned).slice(0, 5);

  const filteredSpaces = spaces.filter((s) =>
    s.name.toLowerCase().includes(spacesSearch.toLowerCase())
  );

  const filteredPrompts = prompts.filter((p) =>
    p.name.toLowerCase().includes(promptsSearch.toLowerCase())
  );

  const promptsByCategory = categories.map((cat) => ({
    category: cat,
    prompts: filteredPrompts.filter((p) => p.category === cat.name),
  }));

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-full sm:w-[400px] z-20 shadow-lg flex flex-col"
            style={{
              backgroundColor: "var(--color-card)",
              borderRight: "1px solid var(--color-border)",
            }}
          >
            {/* Header */}
            <div
              className="h-14 flex items-center justify-between px-4 cursor-pointer"
              style={{ backgroundColor: "#B9DE1D", borderBottom: "1px solid var(--color-border)" }}
              onClick={onClose}
            >
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span className="text-sm">Think Tank</span>
              </div>
              <ChevronLeft className="h-3.5 w-3.5" />
            </div>

            {/* Main Content */}
            <ScrollArea className="flex-1">
              <div className="flex flex-col">
                {/* Pinwand Section */}
                <PinboardSection
                  pinnedChats={pinnedChats}
                  pinnedSpaces={pinnedSpaces}
                  pinnedPrompts={pinnedPrompts}
                  onChatClick={(id) => console.log("Open chat", id)}
                  onSpaceClick={(id) => console.log("Open space", id)}
                  onPromptClick={(id) => console.log("Use prompt", id)}
                />

                <Separator />

                {/* Trash/Archive Views */}
                {view === "trash" && (
                  <TrashView
                    chats={filteredChats}
                    onRestore={restoreFromTrash}
                    onDelete={permanentlyDelete}
                    onBack={() => setView("main")}
                  />
                )}

                {view === "archive" && (
                  <ArchiveView
                    chats={filteredChats}
                    onRestore={restoreFromArchive}
                    onBack={() => setView("main")}
                  />
                )}

                {/* Main Menus */}
                {view === "main" && (
                  <>
                    {/* Chats Section */}
                    <ChatsSection
                      chats={groupedChats}
                      expanded={chatsExpanded}
                      onToggleExpand={() => setChatsExpanded(!chatsExpanded)}
                      showSearch={showChatsSearch}
                      searchValue={chatsSearch}
                      onSearchChange={setChatsSearch}
                      onToggleSearch={() => {
                        setShowChatsSearch(!showChatsSearch);
                        if (showChatsSearch) setChatsSearch("");
                      }}
                      onChatClick={(id) => console.log("Open chat", id)}
                      onPinChat={toggleChatPin}
                      onArchive={moveToArchive}
                      onDelete={moveToTrash}
                      onViewArchive={() => setView("archive")}
                      onViewTrash={() => setView("trash")}
                      sortBy={chatSortBy}
                      sortOrder={chatSortOrder}
                      onChangeSortBy={setChatSortBy}
                      onChangeSortOrder={setChatSortOrder}
                    />

                    <Separator />

                    {/* Spaces Section */}
                    <SpacesSection
                      spaces={filteredSpaces}
                      expanded={spacesExpanded}
                      onToggleExpand={() => setSpacesExpanded(!spacesExpanded)}
                      showSearch={showSpacesSearch}
                      searchValue={spacesSearch}
                      onSearchChange={setSpacesSearch}
                      onToggleSearch={() => {
                        setShowSpacesSearch(!showSpacesSearch);
                        if (showSpacesSearch) setSpacesSearch("");
                      }}
                      showNewSpace={showNewSpace}
                      newSpaceName={newSpaceName}
                      onNewSpaceNameChange={setNewSpaceName}
                      onCreateSpace={createSpace}
                      onCancelNewSpace={() => {
                        setShowNewSpace(false);
                        setNewSpaceName("");
                      }}
                      onShowNewSpace={() => setShowNewSpace(true)}
                      onSpaceClick={(id) => console.log("Open space", id)}
                      onPinSpace={toggleSpacePin}
                      onDeleteSpace={(id) => setSpaces(spaces.filter((s) => s.id !== id))}
                      onReorderSpaces={setSpaces}
                    />

                    <Separator />

                    {/* Prompts Section */}
                    <PromptsSection
                      promptsByCategory={promptsByCategory}
                      expanded={promptsExpanded}
                      onToggleExpand={() => setPromptsExpanded(!promptsExpanded)}
                      showSearch={showPromptsSearch}
                      searchValue={promptsSearch}
                      onSearchChange={setPromptsSearch}
                      onToggleSearch={() => {
                        setShowPromptsSearch(!showPromptsSearch);
                        if (showPromptsSearch) setPromptsSearch("");
                      }}
                      showNewCategory={showNewCategory}
                      newCategoryName={newCategoryName}
                      onNewCategoryNameChange={setNewCategoryName}
                      onCreateCategory={createCategory}
                      onCancelNewCategory={() => {
                        setShowNewCategory(false);
                        setNewCategoryName("");
                      }}
                      onShowNewCategory={() => setShowNewCategory(true)}
                      onPromptClick={(id) => console.log("Use prompt", id)}
                      onPinPrompt={togglePromptPin}
                      onDeleteCategory={(id) => setCategories(categories.filter((c) => c.id !== id))}
                    />
                  </>
                )}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </DndProvider>
  );
}

// Pinboard Section Component
function PinboardSection({
  pinnedChats,
  pinnedSpaces,
  pinnedPrompts,
  onChatClick,
  onSpaceClick,
  onPromptClick,
}: {
  pinnedChats: Chat[];
  pinnedSpaces: Space[];
  pinnedPrompts: Prompt[];
  onChatClick: (id: string) => void;
  onSpaceClick: (id: string) => void;
  onPromptClick: (id: string) => void;
}) {
  const tExt = useExtendedTranslations();
  const hasItems = pinnedChats.length > 0 || pinnedSpaces.length > 0 || pinnedPrompts.length > 0;

  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-2 mb-3">
        <Brain className="h-4 w-4" />
        <span className="text-sm">{tExt.thinkTankPanel.pinboard}</span>
      </div>

      {!hasItems ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Pin className="h-8 w-8 mb-2" style={{ color: "var(--color-muted-foreground)" }} />
          <p className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
            {tExt.thinkTankPanel.noPinnedItems}
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {pinnedChats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              onClick={() => onChatClick(chat.id)}
              onPin={() => {}}
              showActions={false}
            />
          ))}
          {pinnedSpaces.map((space) => (
            <SpaceItem
              key={space.id}
              space={space}
              onClick={() => onSpaceClick(space.id)}
              onPin={() => {}}
              showActions={false}
            />
          ))}
          {pinnedPrompts.map((prompt) => (
            <PromptItem
              key={prompt.id}
              prompt={prompt}
              onClick={() => onPromptClick(prompt.id)}
              onPin={() => {}}
              showActions={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Chats Section Component
function ChatsSection({
  chats,
  expanded,
  onToggleExpand,
  showSearch,
  searchValue,
  onSearchChange,
  onToggleSearch,
  onChatClick,
  onPinChat,
  onArchive,
  onDelete,
  onViewArchive,
  onViewTrash,
  sortBy,
  sortOrder,
  onChangeSortBy,
  onChangeSortOrder,
}: {
  chats: { [key: string]: Chat[] } | null;
  expanded: boolean;
  onToggleExpand: () => void;
  showSearch: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onToggleSearch: () => void;
  onChatClick: (id: string) => void;
  onPinChat: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onViewArchive: () => void;
  onViewTrash: () => void;
  sortBy: ChatSortBy;
  sortOrder: SortOrder;
  onChangeSortBy: (value: ChatSortBy) => void;
  onChangeSortOrder: (value: SortOrder) => void;
}) {
  const tExt = useExtendedTranslations();
  
  return (
    <div>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-[12px] cursor-pointer transition-colors hover:bg-[#DCE5B7]"
        onClick={onToggleExpand}
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm">{tExt.thinkTankPanel.chats}</span>
        </div>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs">
              <DropdownMenuItem onClick={onViewArchive}>
                <Archive className="mr-2 h-3.5 w-3.5" />
                {tExt.thinkTankPanel.archive}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onViewTrash}>
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                {tExt.thinkTankPanel.trash}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onChangeSortBy("date")}>
                <CalendarDays className="mr-2 h-3.5 w-3.5" />
                {tExt.thinkTankPanel.sortByDate}
                {sortBy === "date" && <Check className="ml-auto h-3.5 w-3.5" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onChangeSortBy("alphabetical")}>
                <SortAsc className="mr-2 h-3.5 w-3.5" />
                {tExt.thinkTankPanel.sortAlphabetically}
                {sortBy === "alphabetical" && <Check className="ml-auto h-3.5 w-3.5" />}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onChangeSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                <ArrowUpDown className="mr-2 h-3.5 w-3.5" />
                {sortOrder === "asc" ? tExt.thinkTankPanel.descending : tExt.thinkTankPanel.ascending}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              console.log("New chat");
            }}
          >
            <Plus className="h-3 w-3" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSearch();
            }}
          >
            <Search className="h-3 w-3" />
          </Button>

          {expanded ? (
            <ChevronDown className="h-3.5 w-3.5" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5" />
          )}
        </div>
      </div>

      {/* Search */}
      {showSearch && (
        <div className="px-4 py-2 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3" />
            <Input
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={tExt.thinkTankPanel.searchChats}
              className="pl-8 h-8 text-xs"
            />
            {searchValue && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-6 w-6"
                onClick={() => onSearchChange("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-3"
          >
            {chats &&
              Object.entries(chats).map(
                ([group, groupChats]) =>
                  groupChats.length > 0 && (
                    <div key={group} className="mb-3">
                      <h4 className="text-xs mb-1" style={{ color: "var(--color-muted-foreground)" }}>
                        {group}
                      </h4>
                      <div className="space-y-1">
                        {groupChats.map((chat) => (
                          <ChatItem
                            key={chat.id}
                            chat={chat}
                            onClick={() => onChatClick(chat.id)}
                            onPin={() => onPinChat(chat.id)}
                            onArchive={() => onArchive(chat.id)}
                            onDelete={() => onDelete(chat.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Chat Item Component
function ChatItem({
  chat,
  onClick,
  onPin,
  onArchive,
  onDelete,
  showActions = true,
}: {
  chat: Chat;
  onClick: () => void;
  onPin?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}) {
  return (
    <div
      className="group p-1.5 rounded-md cursor-pointer transition-colors hover:bg-[#DCE5B7]"
      onClick={onClick}
    >
      <div className="flex items-start gap-2">
        <MessageSquare className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium line-clamp-1">{chat.title}</div>
          <div className="text-[10px]" style={{ color: "var(--color-muted-foreground)" }}>
            {chat.preview}
          </div>
        </div>
        {showActions && (
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {onPin && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onPin();
                }}
              >
                <Pin
                  className="h-3 w-3"
                  style={{ color: chat.isPinned ? "#5ebc67" : undefined }}
                />
              </Button>
            )}
            {onArchive && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onArchive();
                }}
              >
                <Archive className="h-3 w-3" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Spaces Section Component
function SpacesSection({
  spaces,
  expanded,
  onToggleExpand,
  showSearch,
  searchValue,
  onSearchChange,
  onToggleSearch,
  showNewSpace,
  newSpaceName,
  onNewSpaceNameChange,
  onCreateSpace,
  onCancelNewSpace,
  onShowNewSpace,
  onSpaceClick,
  onPinSpace,
  onDeleteSpace,
  onReorderSpaces,
}: {
  spaces: Space[];
  expanded: boolean;
  onToggleExpand: () => void;
  showSearch: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onToggleSearch: () => void;
  showNewSpace: boolean;
  newSpaceName: string;
  onNewSpaceNameChange: (value: string) => void;
  onCreateSpace: () => void;
  onCancelNewSpace: () => void;
  onShowNewSpace: () => void;
  onSpaceClick: (id: string) => void;
  onPinSpace: (id: string) => void;
  onDeleteSpace: (id: string) => void;
  onReorderSpaces: (spaces: Space[]) => void;
}) {
  const tExt = useExtendedTranslations();
  
  const moveSpace = (dragIndex: number, hoverIndex: number) => {
    const dragSpace = spaces[dragIndex];
    const newSpaces = [...spaces];
    newSpaces.splice(dragIndex, 1);
    newSpaces.splice(hoverIndex, 0, dragSpace);
    onReorderSpaces(newSpaces.map((s, i) => ({ ...s, order: i })));
  };

  return (
    <div>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-[12px] cursor-pointer transition-colors hover:bg-[#DCE5B7]"
        onClick={onToggleExpand}
      >
        <div className="flex items-center gap-2">
          <FolderOpen className="h-4 w-4" />
          <span className="text-sm">{tExt.thinkTankPanel.spaces}</span>
        </div>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs">
              <DropdownMenuItem onClick={onShowNewSpace}>
                <FolderPlus className="mr-2 h-3.5 w-3.5" />
                {tExt.thinkTankPanel.newSpace}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onShowNewSpace();
            }}
          >
            <Plus className="h-3 w-3" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSearch();
            }}
          >
            <Search className="h-3 w-3" />
          </Button>

          {expanded ? (
            <ChevronDown className="h-3.5 w-3.5" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5" />
          )}
        </div>
      </div>

      {/* Search */}
      {showSearch && (
        <div className="px-4 py-2 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3" />
            <Input
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={tExt.thinkTankPanel.searchSpaces}
              className="pl-8 h-8 text-xs"
            />
            {searchValue && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-6 w-6"
                onClick={() => onSearchChange("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* New Space Input */}
      {showNewSpace && (
        <div className="px-4 py-2 flex-shrink-0">
          <div
            className="flex items-center gap-1 p-1.5 rounded-md border transition-colors hover:border-[#DCE5B7]"
            style={{
              borderColor: "var(--color-gray-medium)",
              maxWidth: "calc(100% - 13px)",
            }}
          >
            <Input
              value={newSpaceName}
              onChange={(e) => onNewSpaceNameChange(e.target.value)}
              placeholder={tExt.thinkTankPanel.spaceName}
              className="h-6 text-xs border-0 focus-visible:ring-0"
              onKeyDown={(e) => {
                if (e.key === "Enter") onCreateSpace();
                if (e.key === "Escape") onCancelNewSpace();
              }}
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 hover:text-[#5ebc67]"
              onClick={onCreateSpace}
            >
              <Check className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0"
              onClick={onCancelNewSpace}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-3"
          >
            <ScrollArea className="max-h-[300px]">
              <div className="space-y-2">
                {spaces.map((space, index) => (
                  <DraggableSpaceItem
                    key={space.id}
                    space={space}
                    index={index}
                    moveSpace={moveSpace}
                    onClick={() => onSpaceClick(space.id)}
                    onPin={() => onPinSpace(space.id)}
                    onDelete={() => onDeleteSpace(space.id)}
                  />
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Draggable Space Item Component
const SPACE_TYPE = "space";

function DraggableSpaceItem({
  space,
  index,
  moveSpace,
  onClick,
  onPin,
  onDelete,
}: {
  space: Space;
  index: number;
  moveSpace: (dragIndex: number, hoverIndex: number) => void;
  onClick: () => void;
  onPin: () => void;
  onDelete: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: SPACE_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: SPACE_TYPE,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveSpace(item.index, index);
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <SpaceItem
        space={space}
        onClick={onClick}
        onPin={onPin}
        onDelete={onDelete}
      />
    </div>
  );
}

// Space Item Component
function SpaceItem({
  space,
  onClick,
  onPin,
  onDelete,
  showActions = true,
}: {
  space: Space;
  onClick: () => void;
  onPin?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}) {
  return (
    <div
      className="group p-1.5 rounded-md cursor-pointer transition-colors hover:bg-[#DCE5B7]"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        {showActions && <GripVertical className="h-3 w-3 opacity-50" />}
        <span className="text-sm">{space.icon}</span>
        <span className="flex-1 text-xs font-medium">{space.name}</span>
        {showActions && (
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {onPin && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onPin();
                }}
              >
                <Pin
                  className="h-3 w-3"
                  style={{ color: space.isPinned ? "#5ebc67" : undefined }}
                />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Prompts Section Component
function PromptsSection({
  promptsByCategory,
  expanded,
  onToggleExpand,
  showSearch,
  searchValue,
  onSearchChange,
  onToggleSearch,
  showNewCategory,
  newCategoryName,
  onNewCategoryNameChange,
  onCreateCategory,
  onCancelNewCategory,
  onShowNewCategory,
  onPromptClick,
  onPinPrompt,
  onDeleteCategory,
}: {
  promptsByCategory: { category: PromptCategory; prompts: Prompt[] }[];
  expanded: boolean;
  onToggleExpand: () => void;
  showSearch: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onToggleSearch: () => void;
  showNewCategory: boolean;
  newCategoryName: string;
  onNewCategoryNameChange: (value: string) => void;
  onCreateCategory: () => void;
  onCancelNewCategory: () => void;
  onShowNewCategory: () => void;
  onPromptClick: (id: string) => void;
  onPinPrompt: (id: string) => void;
  onDeleteCategory: (id: string) => void;
}) {
  const tExt = useExtendedTranslations();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <div>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-[12px] cursor-pointer transition-colors hover:bg-[#DCE5B7]"
        onClick={onToggleExpand}
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4" />
          <span className="text-sm">{tExt.thinkTankPanel.prompts}</span>
        </div>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs">
              <DropdownMenuItem onClick={onShowNewCategory}>
                <Plus className="mr-2 h-3.5 w-3.5" />
                {tExt.thinkTankPanel.newCategory}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onShowNewCategory();
            }}
          >
            <Plus className="h-3 w-3" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSearch();
            }}
          >
            <Search className="h-3 w-3" />
          </Button>

          {expanded ? (
            <ChevronDown className="h-3.5 w-3.5" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5" />
          )}
        </div>
      </div>

      {/* Search */}
      {showSearch && (
        <div className="px-4 py-2 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3" />
            <Input
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={tExt.thinkTankPanel.searchPrompts}
              className="pl-8 h-8 text-xs"
            />
            {searchValue && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-6 w-6"
                onClick={() => onSearchChange("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* New Category Input */}
      {showNewCategory && (
        <div className="px-4 py-2 flex-shrink-0">
          <div
            className="flex items-center gap-1 p-1.5 rounded-md border transition-colors hover:border-[#DCE5B7]"
            style={{
              borderColor: "var(--color-gray-medium)",
              maxWidth: "calc(100% - 13px)",
            }}
          >
            <Input
              value={newCategoryName}
              onChange={(e) => onNewCategoryNameChange(e.target.value)}
              placeholder={tExt.thinkTankPanel.categoryName}
              className="h-6 text-xs border-0 focus-visible:ring-0"
              onKeyDown={(e) => {
                if (e.key === "Enter") onCreateCategory();
                if (e.key === "Escape") onCancelNewCategory();
              }}
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 hover:text-[#5ebc67]"
              onClick={onCreateCategory}
            >
              <Check className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0"
              onClick={onCancelNewCategory}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-3"
          >
            <ScrollArea className="h-[270px] max-h-[270px]">
              <div className="space-y-2">
                {promptsByCategory.map(({ category, prompts }) => (
                  <div key={category.id}>
                    <div
                      className="flex items-center justify-between p-1.5 rounded-md cursor-pointer transition-colors hover:bg-[#DCE5B7]"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <div className="flex items-center gap-2">
                        {expandedCategories.includes(category.id) ? (
                          <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronRight className="h-3 w-3" />
                        )}
                        <span className="text-xs font-medium">{category.name}</span>
                        <span className="text-[10px]" style={{ color: "var(--color-muted-foreground)" }}>
                          ({prompts.length})
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteCategory(category.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <AnimatePresence>
                      {expandedCategories.includes(category.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ml-4 mt-1 space-y-1"
                        >
                          {prompts.map((prompt) => (
                            <PromptItem
                              key={prompt.id}
                              prompt={prompt}
                              onClick={() => onPromptClick(prompt.id)}
                              onPin={() => onPinPrompt(prompt.id)}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Prompt Item Component
function PromptItem({
  prompt,
  onClick,
  onPin,
  showActions = true,
}: {
  prompt: Prompt;
  onClick: () => void;
  onPin?: () => void;
  showActions?: boolean;
}) {
  return (
    <div
      className="group p-1.5 rounded-md cursor-pointer transition-colors hover:bg-[#DCE5B7]"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <Lightbulb className="h-3.5 w-3.5 flex-shrink-0" />
        <span className="flex-1 text-xs font-medium line-clamp-1">{prompt.name}</span>
        {showActions && onPin && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onPin();
              }}
            >
              <Pin
                className="h-3 w-3"
                style={{ color: prompt.isPinned ? "#5ebc67" : undefined }}
              />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Trash View Component
function TrashView({
  chats,
  onRestore,
  onDelete,
  onBack,
}: {
  chats: Chat[];
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}) {
  const tExt = useExtendedTranslations();
  
  const getDaysRemaining = (deletedAt?: Date) => {
    if (!deletedAt) return 30;
    const diff = Date.now() - deletedAt.getTime();
    const daysElapsed = Math.floor(diff / (1000 * 60 * 60 * 24));
    return Math.max(0, 30 - daysElapsed);
  };

  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trash2 className="h-4 w-4" />
          <span className="text-sm">{tExt.thinkTankPanel.trash}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={onBack}>
          <X className="h-3 w-3" />
        </Button>
      </div>

      {chats.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Trash2 className="h-8 w-8 mb-2" style={{ color: "var(--color-muted-foreground)" }} />
          <p className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
            {tExt.thinkTankPanel.emptyTrash}
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="group p-1.5 rounded-md transition-colors hover:bg-[#DCE5B7]"
            >
              <div className="flex items-start gap-2">
                <MessageSquare className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium line-clamp-1">{chat.title}</div>
                  <div className="flex items-center gap-1 text-[10px]" style={{ color: "var(--color-muted-foreground)" }}>
                    <Clock className="h-3 w-3" />
                    <span>Wird in {getDaysRemaining(chat.deletedAt)} Tagen gelöscht</span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0"
                    onClick={() => onRestore(chat.id)}
                  >
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0"
                    onClick={() => onDelete(chat.id)}
                  >
                    <Trash2 className="h-3 w-3" style={{ color: "#d13438" }} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Archive View Component
function ArchiveView({
  chats,
  onRestore,
  onBack,
}: {
  chats: Chat[];
  onRestore: (id: string) => void;
  onBack: () => void;
}) {
  const tExt = useExtendedTranslations();
  
  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Archive className="h-4 w-4" />
          <span className="text-sm">{tExt.thinkTankPanel.archive}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={onBack}>
          <X className="h-3 w-3" />
        </Button>
      </div>

      {chats.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Archive className="h-8 w-8 mb-2" style={{ color: "var(--color-muted-foreground)" }} />
          <p className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
            {tExt.thinkTankPanel.emptyArchive}
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="group p-1.5 rounded-md transition-colors hover:bg-[#DCE5B7]"
            >
              <div className="flex items-start gap-2">
                <MessageSquare className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium line-clamp-1">{chat.title}</div>
                  <div className="text-[10px]" style={{ color: "var(--color-muted-foreground)" }}>
                    {chat.preview}
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0"
                    onClick={() => onRestore(chat.id)}
                  >
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}