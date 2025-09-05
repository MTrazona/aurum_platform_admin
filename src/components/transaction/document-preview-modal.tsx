import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  File, 
  Image as ImageIcon, 
  FileText, 
  ExternalLink, 
  Download 
} from "lucide-react";

interface PreviewModalState {
  isOpen: boolean;
  url: string;
  type: 'image' | 'pdf' | 'document';
  title: string;
}

interface DocumentPreviewModalProps {
  previewModal: PreviewModalState;
  onClose: () => void;
}

// Helper function to get file icon
const getFileIcon = (url: string) => {
  const extension = url.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) {
    return <ImageIcon className="h-4 w-4" />;
  } else if (extension === 'pdf') {
    return <FileText className="h-4 w-4" />;
  }
  return <File className="h-4 w-4" />;
};

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  previewModal,
  onClose,
}) => {
  return (
    <Dialog open={previewModal.isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] bg-[#1E1E1E] border-[#3A3A3A] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getFileIcon(previewModal.url)}
            {previewModal.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          {previewModal.type === 'image' ? (
            <div className="flex items-center justify-center h-[70vh]">
              <img
                src={previewModal.url}
                alt={previewModal.title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          ) : previewModal.type === 'pdf' ? (
            <div className="h-[70vh]">
              <iframe
                src={previewModal.url}
                className="w-full h-full rounded-lg border border-[#3A3A3A]"
                title={previewModal.title}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center">
              <div className="w-16 h-16 bg-[#3A3A3A] rounded-full flex items-center justify-center mb-4">
                <File className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Document Preview Not Available</h3>
              <p className="text-gray-400 text-sm mb-4">
                This file type cannot be previewed in the browser.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => window.open(previewModal.url, '_blank')}
                  className="bg-[#f89004] hover:bg-[#f89004]/80 text-white"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in New Tab
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = previewModal.url;
                    link.download = previewModal.url.split('/').pop() || 'document';
                    link.click();
                  }}
                  className="border-[#3A3A3A] text-white hover:bg-[#3A3A3A]"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
