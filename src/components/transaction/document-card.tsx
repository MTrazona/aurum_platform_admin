import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  File, 
  Image as ImageIcon, 
  FileText, 
  Eye, 
  ExternalLink, 
  Download 
} from "lucide-react";

interface DocumentCardProps {
  title: string;
  url: string;
  description?: string;
  onPreview: (url: string, title: string) => void;
}

// Helper function to detect file type from URL
const getFileType = (url: string): 'image' | 'pdf' | 'document' => {
  const extension = url.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) {
    return 'image';
  } else if (extension === 'pdf') {
    return 'pdf';
  }
  return 'document';
};

// Helper function to get file icon
const getFileIcon = (url: string) => {
  const fileType = getFileType(url);
  switch (fileType) {
    case 'image':
      return <ImageIcon className="h-4 w-4" />;
    case 'pdf':
      return <FileText className="h-4 w-4" />;
    default:
      return <File className="h-4 w-4" />;
  }
};

export const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  url,
  description,
  onPreview,
}) => {
  const fileType = getFileType(url);
  const fileName = url.split('/').pop() || 'Document';
  
  return (
    <Card className="bg-[#1E1E1E] border-[#3A3A3A] hover:border-[#4A4A4A] transition-colors group">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* File Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-[#3A3A3A] rounded-lg flex items-center justify-center group-hover:bg-[#4A4A4A] transition-colors">
              {getFileIcon(url)}
            </div>
          </div>
          
          {/* File Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-sm mb-1 truncate">{title}</h3>
            <p className="text-gray-400 text-xs mb-2 truncate">{fileName}</p>
            {description && (
              <p className="text-gray-500 text-xs mb-3">{description}</p>
            )}
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onPreview(url, title)}
                className="h-8 px-3 text-gray-400 hover:text-white hover:bg-[#3A3A3A]"
              >
                <Eye className="h-3 w-3 mr-1" />
                Preview
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => window.open(url, '_blank')}
                className="h-8 px-3 text-gray-400 hover:text-white hover:bg-[#3A3A3A]"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Open
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = fileName;
                  link.click();
                }}
                className="h-8 px-3 text-gray-400 hover:text-white hover:bg-[#3A3A3A]"
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>
          </div>
          
          {/* File Type Badge */}
          <div className="flex-shrink-0">
            <Badge 
              variant="secondary" 
              className={`text-xs ${
                fileType === 'image' ? 'bg-blue-100 text-blue-800' :
                fileType === 'pdf' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}
            >
              {fileType.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
