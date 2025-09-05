import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Copy } from "lucide-react";

interface EnhancedFieldProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  copyable?: boolean;
  copyValue?: string;
  highlight?: boolean;
  show?: boolean;
  copied?: boolean;
  onCopy?: () => void;
}

export const EnhancedField: React.FC<EnhancedFieldProps> = ({
  label,
  value,
  icon,
  copyable = false,
  copyValue,
  highlight = false,
  show = true,
  copied = false,
  onCopy,
}) => {
  if (!show) return null;
  
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon && <span className="text-gray-400">{icon}</span>}
        <label className="text-xs text-gray-400 font-medium">{label}</label>
      </div>
      <div className="flex items-center gap-2">
        <div className={`text-sm ${highlight ? "text-[#f89004] font-semibold" : "text-white"}`}>
          {value || 'N/A'}
        </div>
        {copyable && copyValue && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onCopy}
            className="h-6 w-6 p-0 text-gray-400 hover:text-white"
          >
            {copied ? (
              <CheckCircle className="w-3 h-3 text-green-500" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
