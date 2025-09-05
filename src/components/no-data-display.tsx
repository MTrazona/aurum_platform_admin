import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface NoDataDisplayProps {
  message?: string;
}

export const NoDataDisplay: React.FC<NoDataDisplayProps> = ({ 
  message = "No information available" 
}) => (
  <Card className="bg-[#1E1E1E] border-[#3A3A3A]">
    <CardContent className="p-12">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-[#3A3A3A] rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-gray-400 text-lg font-medium">{message}</p>
        <p className="text-gray-500 text-sm mt-1">This section doesn't have any data to display at the moment.</p>
      </div>
    </CardContent>
  </Card>
);
