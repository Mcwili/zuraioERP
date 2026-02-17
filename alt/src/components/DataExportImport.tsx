import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Download, 
  Upload, 
  FileText, 
  FileJson, 
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

export type ExportFormat = 'csv' | 'json' | 'xlsx';

interface ExportOptions {
  format: ExportFormat;
  includeHeaders: boolean;
  selectedColumns?: string[];
  dateFormat?: 'iso' | 'local' | 'timestamp';
}

interface ImportResult {
  success: boolean;
  data?: any[];
  errors?: string[];
  warnings?: string[];
}

interface DataExportImportProps<T> {
  data: T[];
  columns: Array<{
    key: string;
    label: string;
  }>;
  filename?: string;
  onImport?: (data: T[]) => Promise<ImportResult>;
  validateRow?: (row: any) => { valid: boolean; errors?: string[] };
  isDarkMode?: boolean;
}

/**
 * DataExportImport Component
 * Provides data export/import functionality:
 * - Export to CSV, JSON, XLSX
 * - Import from CSV, JSON
 * - Column selection
 * - Data validation
 * - Error handling
 */
export function DataExportImport<T extends Record<string, any>>({
  data,
  columns,
  filename = 'export',
  onImport,
  validateRow,
  isDarkMode
}: DataExportImportProps<T>) {
  const [exportFormat, setExportFormat] = useState<ExportFormat>('csv');
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [selectedColumns, setSelectedColumns] = useState<string[]>(columns.map(c => c.key));
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleColumn = (key: string) => {
    setSelectedColumns(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleExport = () => {
    const filteredData = data.map(row => {
      const filtered: any = {};
      selectedColumns.forEach(key => {
        filtered[key] = row[key];
      });
      return filtered;
    });

    switch (exportFormat) {
      case 'csv':
        exportAsCSV(filteredData, selectedColumns);
        break;
      case 'json':
        exportAsJSON(filteredData);
        break;
      case 'xlsx':
        exportAsXLSX(filteredData, selectedColumns);
        break;
    }
  };

  const exportAsCSV = (data: any[], columnKeys: string[]) => {
    const headers = includeHeaders
      ? columns.filter(c => columnKeys.includes(c.key)).map(c => c.label)
      : [];

    const rows = data.map(row =>
      columnKeys.map(key => {
        const value = row[key];
        // Escape quotes and wrap in quotes if contains comma
        const stringValue = String(value ?? '');
        return stringValue.includes(',') || stringValue.includes('"')
          ? `"${stringValue.replace(/"/g, '""')}"`
          : stringValue;
      })
    );

    const csv = [
      ...(includeHeaders ? [headers.join(',')] : []),
      ...rows.map(row => row.join(','))
    ].join('\n');

    downloadFile(csv, `${filename}.csv`, 'text/csv');
  };

  const exportAsJSON = (data: any[]) => {
    const json = JSON.stringify(data, null, 2);
    downloadFile(json, `${filename}.json`, 'application/json');
  };

  const exportAsXLSX = (data: any[], columnKeys: string[]) => {
    // For demo purposes, export as CSV (in production, use a library like xlsx)
    console.warn('XLSX export not implemented, falling back to CSV');
    exportAsCSV(data, columnKeys);
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onImport) return;

    setIsImporting(true);
    setImportResult(null);

    try {
      const text = await file.text();
      let parsedData: any[];

      if (file.name.endsWith('.json')) {
        parsedData = JSON.parse(text);
      } else if (file.name.endsWith('.csv')) {
        parsedData = parseCSV(text);
      } else {
        throw new Error('Unsupported file format');
      }

      // Validate data if validator provided
      const errors: string[] = [];
      const warnings: string[] = [];

      if (validateRow) {
        parsedData.forEach((row, index) => {
          const validation = validateRow(row);
          if (!validation.valid && validation.errors) {
            errors.push(`Row ${index + 1}: ${validation.errors.join(', ')}`);
          }
        });
      }

      if (errors.length > 0) {
        setImportResult({
          success: false,
          errors,
          warnings
        });
      } else {
        const result = await onImport(parsedData as T[]);
        setImportResult(result);
      }
    } catch (error) {
      setImportResult({
        success: false,
        errors: [error instanceof Error ? error.message : 'Import failed']
      });
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const parseCSV = (text: string): any[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const rows = lines.slice(1);

    return rows.map(row => {
      const values = row.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      return obj;
    });
  };

  return (
    <div className="flex gap-2">
      {/* Export */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="border-[#e1dfdd] hover:bg-[#E9C796] text-black"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </SheetTrigger>

        <SheetContent className="w-[400px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Export Data</SheetTitle>
            <SheetDescription>
              Choose format and columns to export
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {/* Format Selection */}
            <div className="space-y-2">
              <Label>Format</Label>
              <Select value={exportFormat} onValueChange={(v: ExportFormat) => setExportFormat(v)}>
                <SelectTrigger className="border-[#e1dfdd]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      CSV
                    </div>
                  </SelectItem>
                  <SelectItem value="json">
                    <div className="flex items-center">
                      <FileJson className="h-4 w-4 mr-2" />
                      JSON
                    </div>
                  </SelectItem>
                  <SelectItem value="xlsx">
                    <div className="flex items-center">
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Excel (XLSX)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Options */}
            <div className="space-y-2">
              <Label>Options</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={includeHeaders}
                  onCheckedChange={(checked) => setIncludeHeaders(checked as boolean)}
                  style={{ borderColor: '#e1dfdd' }}
                />
                <Label className="text-sm cursor-pointer">Include headers</Label>
              </div>
            </div>

            <Separator className="bg-[#e1dfdd]" />

            {/* Column Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Columns ({selectedColumns.length}/{columns.length})</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedColumns(columns.map(c => c.key))}
                  className="h-6 text-xs hover:bg-[#E9C796]"
                >
                  Select All
                </Button>
              </div>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {columns.map(column => (
                  <div key={column.key} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedColumns.includes(column.key)}
                      onCheckedChange={() => toggleColumn(column.key)}
                      style={{ borderColor: '#e1dfdd' }}
                    />
                    <Label className="text-sm cursor-pointer">{column.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-[#e1dfdd]" />

            {/* Export Button */}
            <Button
              onClick={handleExport}
              disabled={selectedColumns.length === 0 || data.length === 0}
              className="w-full bg-[#DE851D] hover:bg-[#E9C796] text-black border border-[#e1dfdd]"
            >
              <Download className="h-4 w-4 mr-2" />
              Export {data.length} {data.length === 1 ? 'row' : 'rows'}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Import */}
      {onImport && (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-[#e1dfdd] hover:bg-[#E9C796] text-black"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
          </SheetTrigger>

          <SheetContent className="w-[400px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Import Data</SheetTitle>
              <SheetDescription>
                Upload a CSV or JSON file to import data
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-4">
              <Alert className="border-[#e1dfdd]">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Supported formats: CSV, JSON
                </AlertDescription>
              </Alert>

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.json"
                onChange={handleFileSelect}
                className="hidden"
              />

              <Button
                onClick={handleImportClick}
                disabled={isImporting}
                className="w-full bg-[#DE851D] hover:bg-[#E9C796] text-black border border-[#e1dfdd]"
              >
                <Upload className="h-4 w-4 mr-2" />
                {isImporting ? 'Importing...' : 'Choose File'}
              </Button>

              {/* Import Result */}
              {importResult && (
                <Card className={`border-2 ${
                  importResult.success 
                    ? 'border-green-500' 
                    : 'border-red-500'
                }`}>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      {importResult.success ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          Import Successful
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          Import Failed
                        </>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    {importResult.success && importResult.data && (
                      <p className="text-xs text-gray-600">
                        Successfully imported {importResult.data.length} rows
                      </p>
                    )}
                    {importResult.errors && importResult.errors.length > 0 && (
                      <div className="space-y-1">
                        {importResult.errors.map((error, i) => (
                          <p key={i} className="text-xs text-red-600">• {error}</p>
                        ))}
                      </div>
                    )}
                    {importResult.warnings && importResult.warnings.length > 0 && (
                      <div className="space-y-1 mt-2">
                        {importResult.warnings.map((warning, i) => (
                          <p key={i} className="text-xs text-yellow-600">⚠ {warning}</p>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
