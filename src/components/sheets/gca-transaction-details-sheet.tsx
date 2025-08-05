import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TransactionsType } from "@/types/buy-request.types";
import {
  dateStringFormatter,
  formatTransactionCode
} from "@/utils/format-helper";
import { FileText } from "lucide-react";
import React from "react";
import { PHPDisplay, QMGTDisplay, USDTDisplay } from "../features/price-display";
import StatusChip from "../status-chip";

interface TransactionDetailsSheetProps {
  open: boolean;
  onClose: () => void;
  transaction: TransactionsType | null;
}

const TransactionDetailsSheet: React.FC<TransactionDetailsSheetProps> = ({
  open,
  onClose,
  transaction,
}) => {
  if (!transaction) return null;
  console.log(transaction);
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="bg-[#1E1E20] overflow-y-auto [&>button[data-radix-sheet-close]]:hidden">
        <div className="p-6 space-y-4 text-sm text-white">
          <h2 className="text-xl font-semibold">Transaction Details</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-300">Customer</p>
              <p>
                {transaction.customer.firstName} {transaction.customer.lastName}
              </p>
              <p className="text-gray-400 text-xs">
                {transaction.customer.email}
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-300">Transaction ID</p>
              <p>{transaction.txnID}</p>
              <p className="text-gray-400 text-xs">
                {formatTransactionCode(transaction.transactionCode)}
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-300">Amount</p>
              <PHPDisplay value={transaction.fromValue} />
            </div>

            <div>
              <p className="font-medium text-gray-300">Converted To</p>
              <PHPDisplay value={transaction.toValue} />
            </div>

            <div>
              <p className="font-medium text-gray-300">Gold Price</p>
              <USDTDisplay value={transaction.goldPrice} />
            </div>

            <div>
              <p className="font-medium text-gray-300">Transaction Fee</p>
              <PHPDisplay value={transaction.transactionFee} />
            </div>

            <div>
              <p className="font-medium text-gray-300">Status</p>
              <StatusChip status={transaction.transactionStatus} />
            </div>

            <div>
              <p className="font-medium text-gray-300">Booking Note</p>
              {transaction.bookingNote ? <QMGTDisplay value={transaction.bookingNote} /> : "-"}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <p className="font-medium text-gray-300 mb-2">Created At</p>
            <p>{dateStringFormatter(transaction.createdAt)}</p>
          </div>

          {transaction.certificates && (
            <div className="pt-4 border-t border-gray-700 space-y-2">
              <p className="font-medium text-gray-300">Certificates</p>
              {transaction.certificates.some(
                (cert) => cert.goldCertificateLink || cert.paymentVoucherLink
              ) ? (
                transaction.certificates.map((cert, idx) => {
                  const hasGold = !!cert.goldCertificateLink;
                  const hasVoucher = !!cert.paymentVoucherLink;

                  if (!hasGold && !hasVoucher) return null;

                  return (
                    <div key={idx} className="flex gap-4">
                      {hasGold && (
                        <a
                          href={cert.goldCertificateLink!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-600 flex items-center cursor-pointer gap-1 hover:underline"
                        >
                          <FileText size={18} /> Gold Certificate
                        </a>
                      )}
                      {hasVoucher && (
                        <a
                          href={cert.paymentVoucherLink!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-600 flex items-center cursor-pointer gap-1 hover:underline"
                        >
                         <FileText size={18} /> Payment Voucher
                        </a>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-400 text-sm">
                  No certificates available.
                </p>
              )}
            </div>
          )}
          {transaction.receiptImageLinkUser && (
            <div className="pt-6 border-t border-gray-700 space-y-2">
              <p className="font-medium text-gray-300">Receipt Image</p>
              <img
                src={transaction.receiptImageLinkUser}
                alt="Receipt"
                className="w-full max-w-md rounded border border-gray-600"
              />

              <div className="mt-2 space-y-1 text-sm text-gray-300">
                <div>
                  <span className="font-medium">Reference Number: </span>
                  <span>{transaction.referenceNumberUser || "—"}</span>
                </div>
                <div>
                  <span className="font-medium">Deposit Date: </span>
                  <span>
                    {transaction.depositDateUser
                      ? dateStringFormatter(transaction.depositDateUser)
                      : "—"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TransactionDetailsSheet;
