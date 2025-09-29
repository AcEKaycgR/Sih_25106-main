'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileSpreadsheet, Loader2, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface BulkStudentUploadProps {
  mentorId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function BulkStudentUpload({
  mentorId,
  open,
  onOpenChange,
  onSuccess
}: BulkStudentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const downloadTemplate = () => {
    const templateData = [
      {
        name: 'John Doe',
        email: 'john.doe@university.edu',
        major: 'Computer Science',
        graduationYear: 2025,
        university: 'Indian Institute of Technology',
        skills: 'JavaScript, React, Python',
        avatarUrl: ''
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@university.edu',
        major: 'Electronics Engineering',
        graduationYear: 2024,
        university: 'Indian Institute of Technology',
        skills: 'C++, Arduino, MATLAB',
        avatarUrl: ''
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'student_upload_template.xlsx');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const parseExcelFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No File Selected',
        description: 'Please select an Excel file to upload.',
      });
      return;
    }

    setIsUploading(true);
    try {
      const studentsData = await parseExcelFile(file);
      
      if (studentsData.length === 0) {
        toast({
          variant: 'destructive',
          title: 'Empty File',
          description: 'The Excel file appears to be empty.',
        });
        return;
      }

      // Validate required fields
      const requiredFields = ['name', 'email', 'major', 'graduationYear', 'university'];
      const missingFields = requiredFields.filter(field => 
        !studentsData.every(student => student[field])
      );

      if (missingFields.length > 0) {
        toast({
          variant: 'destructive',
          title: 'Missing Required Fields',
          description: `Please ensure all rows have: ${missingFields.join(', ')}`,
        });
        return;
      }

      const response = await fetch('/api/students/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          students: studentsData,
          mentorId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload students');
      }

      const result = await response.json();

      toast({
        title: 'Upload Successful!',
        description: result.message,
      });

      onSuccess();
      onOpenChange(false);
      setFile(null);
    } catch (error) {
      console.error('Error uploading students:', error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: 'Failed to upload students. Please check your file format and try again.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Bulk Upload Students</DialogTitle>
          <DialogDescription>
            Upload multiple students from an Excel file. Download the template to see the required format.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={downloadTemplate}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Template
            </Button>
            <span className="text-sm text-muted-foreground">
              Use this template to format your data
            </span>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="file">Excel File</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="flex-1"
              />
              <FileSpreadsheet className="h-5 w-5 text-green-600" />
            </div>
            {file && (
              <p className="text-sm text-muted-foreground">
                Selected: {file.name}
              </p>
            )}
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Required Columns:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• name (Student's full name)</li>
              <li>• email (Student's email address)</li>
              <li>• major (Field of study)</li>
              <li>• graduationYear (Expected graduation year)</li>
              <li>• university (University name)</li>
              <li>• skills (Comma-separated list, optional)</li>
              <li>• avatarUrl (Profile picture URL, optional)</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={isUploading || !file}
          >
            {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Upload className="mr-2 h-4 w-4" />
            Upload Students
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}