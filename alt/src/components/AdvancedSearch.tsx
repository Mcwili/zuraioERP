import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { 
  Search, 
  Filter, 
  X, 
  Calendar as CalendarIcon,
  Plus,
  Save,
  Trash2
} from 'lucide-react';
import { format } from 'date-fns';

export interface SearchFilter {
  id: string;
  field: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'between' | 'in';
  value: any;
  label?: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  filters: SearchFilter[];
  createdAt: Date;
}

interface AdvancedSearchProps {
  fields: Array<{
    key: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'select';
    options?: string[];
  }>;
  onSearch: (filters: SearchFilter[]) => void;
  onSaveSearch?: (search: SavedSearch) => void;
  savedSearches?: SavedSearch[];
  isDarkMode?: boolean;
}

const operators = [
  { value: 'equals', label: 'Equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'startsWith', label: 'Starts with' },
  { value: 'endsWith', label: 'Ends with' },
  { value: 'greaterThan', label: 'Greater than' },
  { value: 'lessThan', label: 'Less than' },
  { value: 'between', label: 'Between' },
  { value: 'in', label: 'In list' },
];

/**
 * AdvancedSearch Component
 * Provides advanced filtering capabilities with:
 * - Multiple filter conditions
 * - Different operators (equals, contains, etc.)
 * - Date range filtering
 * - Save/load search configurations
 */
export function AdvancedSearch({
  fields,
  onSearch,
  onSaveSearch,
  savedSearches = [],
  isDarkMode
}: AdvancedSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilter[]>([]);
  const [searchName, setSearchName] = useState('');

  const addFilter = () => {
    const newFilter: SearchFilter = {
      id: Math.random().toString(36).substr(2, 9),
      field: fields[0]?.key || '',
      operator: 'equals',
      value: ''
    };
    setFilters([...filters, newFilter]);
  };

  const updateFilter = (id: string, updates: Partial<SearchFilter>) => {
    setFilters(filters.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  const handleSearch = () => {
    onSearch(filters);
    setIsOpen(false);
  };

  const handleSaveSearch = () => {
    if (searchName && onSaveSearch) {
      const savedSearch: SavedSearch = {
        id: Math.random().toString(36).substr(2, 9),
        name: searchName,
        filters: filters,
        createdAt: new Date()
      };
      onSaveSearch(savedSearch);
      setSearchName('');
    }
  };

  const loadSavedSearch = (search: SavedSearch) => {
    setFilters(search.filters);
  };

  const clearFilters = () => {
    setFilters([]);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="border-[#e1dfdd] hover:bg-[#E9C796] text-black"
      >
        <Filter className="h-4 w-4 mr-2" />
        Advanced Search
        {filters.length > 0 && (
          <Badge className="ml-2 bg-[#DE851D] text-white border-0">
            {filters.length}
          </Badge>
        )}
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-[600px] sm:w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Advanced Search</SheetTitle>
            <SheetDescription>
              Create complex search queries with multiple conditions
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {/* Active Filters */}
            <div className="space-y-3">
              {filters.map((filter, index) => (
                <Card key={filter.id} className="border-[#e1dfdd]">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-black">Filter {index + 1}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFilter(filter.id)}
                          className="h-6 w-6 p-0 hover:bg-[#E9C796]"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">Field</Label>
                          <Select
                            value={filter.field}
                            onValueChange={(value) => updateFilter(filter.id, { field: value })}
                          >
                            <SelectTrigger className="border-[#e1dfdd]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {fields.map(field => (
                                <SelectItem key={field.key} value={field.key}>
                                  {field.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-xs">Operator</Label>
                          <Select
                            value={filter.operator}
                            onValueChange={(value: any) => updateFilter(filter.id, { operator: value })}
                          >
                            <SelectTrigger className="border-[#e1dfdd]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {operators.map(op => (
                                <SelectItem key={op.value} value={op.value}>
                                  {op.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs">Value</Label>
                        <Input
                          value={filter.value}
                          onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
                          placeholder="Enter value..."
                          className="border-[#e1dfdd]"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Filter Button */}
            <Button
              variant="outline"
              onClick={addFilter}
              className="w-full border-[#e1dfdd] hover:bg-[#E9C796] text-black border-dashed"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Filter
            </Button>

            <Separator className="bg-[#e1dfdd]" />

            {/* Saved Searches */}
            {savedSearches.length > 0 && (
              <div className="space-y-2">
                <Label>Saved Searches</Label>
                <div className="space-y-2">
                  {savedSearches.map(search => (
                    <div
                      key={search.id}
                      className="flex items-center justify-between p-2 border border-[#e1dfdd] rounded hover:bg-[#E9C796] cursor-pointer"
                      onClick={() => loadSavedSearch(search)}
                    >
                      <div>
                        <div className="text-sm">{search.name}</div>
                        <div className="text-xs text-gray-500">
                          {search.filters.length} filters
                        </div>
                      </div>
                      <Badge variant="outline" className="border-[#e1dfdd]">
                        {format(search.createdAt, 'MMM d')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Search */}
            {filters.length > 0 && onSaveSearch && (
              <div className="space-y-2">
                <Label>Save this search</Label>
                <div className="flex gap-2">
                  <Input
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="Search name..."
                    className="border-[#e1dfdd]"
                  />
                  <Button
                    onClick={handleSaveSearch}
                    disabled={!searchName}
                    className="bg-[#DE851D] hover:bg-[#E9C796] text-black border border-[#e1dfdd]"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <Separator className="bg-[#e1dfdd]" />

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={handleSearch}
                disabled={filters.length === 0}
                className="flex-1 bg-[#DE851D] hover:bg-[#E9C796] text-black border border-[#e1dfdd]"
              >
                <Search className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="border-[#e1dfdd] hover:bg-[#E9C796] text-black"
              >
                Clear
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
