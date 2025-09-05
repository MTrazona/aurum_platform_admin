import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import type { TransactionsType } from "@/types/buy-request.types";
import { DocumentCard } from "./document-card";
import { NoDataDisplay } from "../no-data-display";

interface DocumentsTabProps {
  transaction: TransactionsType;
  onPreview: (url: string, title: string) => void;
}

const hasDocumentsData = (transaction: TransactionsType) => {
  return !!(
    transaction.certificates?.[0]?.paymentVoucherLink ||
    transaction.certificates?.[0]?.goldCertificateLink
  );
};

export const DocumentsTab: React.FC<DocumentsTabProps> = ({
  transaction,
  onPreview,
}) => {
  if (!hasDocumentsData(transaction)) {
    return <NoDataDisplay message="No documents available" />;
  }

  return (
    <div className="space-y-6">
      {/* Document Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {transaction.certificates?.[0]?.paymentVoucherLink && (
          <DocumentCard
            title="Payment Voucher"
            url={transaction.certificates[0].paymentVoucherLink}
            description="Official payment voucher for this transaction"
            onPreview={onPreview}
          />
        )}
        
        {transaction.certificates?.[0]?.goldCertificateLink && (
          <DocumentCard
            title="Gold Certificate"
            url={transaction.certificates[0].goldCertificateLink}
            description="Gold certificate documentation"
            onPreview={onPreview}
          />
        )}
      </div>

      {/* Additional Document Information */}
      <Card className="bg-[#1E1E1E] border-[#3A3A3A]">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#f89004] flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5" />
            Document Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-medium">Total Documents</label>
              <p className="text-sm text-white">
                {[transaction.certificates?.[0]?.paymentVoucherLink, transaction.certificates?.[0]?.goldCertificateLink].filter(Boolean).length}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-medium">Document Types</label>
              <div className="flex flex-wrap gap-2">
                {transaction.certificates?.[0]?.paymentVoucherLink && (
                  <Badge variant="secondary" className="text-xs">Payment Voucher</Badge>
                )}
                {transaction.certificates?.[0]?.goldCertificateLink && (
                  <Badge variant="secondary" className="text-xs">Gold Certificate</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
