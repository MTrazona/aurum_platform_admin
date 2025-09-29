import { useState } from "react";
import { Upload, Image as ImageIcon, FileText } from "lucide-react";
import { Label } from "@/components/ui/label";

type FileInputProps = {
  name: string;
  title: string;
  onFileSelect: (name: string, file: File | null) => void;
};

const FileInput = ({ name, title, onFileSelect }: FileInputProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const type = file.type;

      setFileType(type);

      if (type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreview(url);
      } else {
        setPreview(null);
      }

      // ✅ Pass name + file to parent
      onFileSelect(name, file);
    } else {
      setPreview(null);
      setFileType(null);
      onFileSelect(name, null);
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <Label className="text-slate-300">{title} *</Label>
      <div className="w-full">
        <label className="cursor-pointer flex flex-col space-y-2">
          {preview && fileType?.startsWith("image/") ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md"
            />
          ) : fileType === "application/pdf" ? (
            <div className="flex flex-col items-center justify-center border border-gray-600 rounded-md p-6 space-y-2 bg-gray-800">
              <FileText className="w-12 h-12 text-red-500" />
              <span className="text-sm text-gray-200">PDF Selected</span>
            </div>
          ) : (
            <div className="flex flex-col border-2 border-dashed border-[#363F4D] rounded-lg justify-center items-center text-center space-y-4 p-6 w-full">
              <ImageIcon className="w-12 h-12 text-white/70" />
              <div className="flex flex-col">
                <span className="text-base leading-6 text-white/75">
                  Drag and drop an image or PDF here, or click to select
                </span>
                <span className="text-sm leading-4 text-white/50">
                  Supports PNG, JPG, PDF up to 10MB
                </span>
              </div>
              <div className="w-full">
                <div className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 py-3 rounded-lg text-black font-medium">
                  <Upload className="w-6 h-6" /> Upload File
                </div>
              </div>
            </div>
          )}
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default FileInput;
