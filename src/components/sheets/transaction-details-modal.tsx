import { TransactionsType } from "@/types/buy-request.types";
import { formatTransactionCode, PriceFormat, safeDate, safeStr } from "@/utils/format-helper";
import { AlertCircle, CheckCircle, Info, XCircle, ArrowLeft } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/routes-bread-crumb";

interface TransactionDetailsPageProps {
  transaction: TransactionsType | null;
  onBack: () => void;
  title?: string;
}

const TransactionDetailsPage: React.FC<TransactionDetailsPageProps> = ({
  transaction,
  onBack,
  title = "Transaction Details",
}) => {
  if (!transaction) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400">No transaction data available.</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('completed') || lowerStatus.includes('approved')) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (lowerStatus.includes('rejected') || lowerStatus.includes('terminated')) {
      return <XCircle className="h-4 w-4 text-red-500" />;
    } else if (lowerStatus.includes('pending')) {
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
    return <Info className="h-4 w-4 text-blue-500" />;
  };

  const renderSection = (
    sectionTitle: string,
    children: React.ReactNode,
    showSection: boolean = true
  ) => {
    if (!showSection) return null;
    
    return (
      <div className="pt-6 border-t border-gray-700 space-y-4">
        <h3 className="text-lg font-semibold text-gray-200">{sectionTitle}</h3>
        {children}
      </div>
    );
  };

  const renderField = (
    label: string,
    value: React.ReactNode,
    showField: boolean = true,
    isSmallLabel: boolean = true
  ) => {
    if (!showField) return null;
    
    return (
      <div>
        <p className={`font-medium text-gray-300 ${isSmallLabel ? 'text-sm' : 'text-base'}`}>
          {label}
        </p>
        <div className="text-gray-100 mt-1">{value}</div>
      </div>
    );
  };

  const renderGridSection = (
    fields: Array<{
      label: string;
      value: React.ReactNode;
      show?: boolean;
      isSmallLabel?: boolean;
    }>
  ) => {
    const visibleFields = fields.filter(field => field.show !== false);
    
    if (visibleFields.length === 0) return null;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleFields.map((field, index) => (
          <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            {renderField(field.label, field.value, field.show, field.isSmallLabel)}
          </div>
        ))}
      </div>
    );
  };
  console.log('transaction',transaction);
  return (
    <div className="min-h-screen bg-[#1E1E20] text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="h-6 w-px bg-gray-600" />
              <Breadcrumb />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">{title}</h1>
              <p className="text-gray-400 mt-2">
                Transaction Code: {formatTransactionCode(transaction.transactionCode)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
                {getStatusIcon(transaction.transactionStatus)}
                <span className="font-medium">{transaction.transactionStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {renderField(
            "Transaction ID",
            formatTransactionCode(transaction.txnID ?? "") || 'N/A',
            !!transaction.txnID,
            false
          )}
          
          {renderField(
            "Tracking Number",
            formatTransactionCode(transaction.trackingNumber ?? ''),
            !!transaction.trackingNumber,
            false
          )}

          {renderField(
            "Customer Name",
            safeStr(transaction.documentId),
            !!transaction.documentId,
            false
          )}

          {renderField(
            "Conversion ID",
            safeStr(transaction.conversionID) || 'N/A',
            !!transaction.conversionID,
            false
          )}
        </div>

        {/* Financial Details */}
        {renderSection("Financial Details", 
          renderGridSection([
            {
              label: "From Amount",
              value: PriceFormat(transaction.fromValue, transaction, false, 'fromValue'),
              show: !!transaction.fromValue
            },
            {
              label: "To Amount",
              value: PriceFormat(transaction.toValue, transaction, false, 'toValue'),
              show: !!transaction.toValue
            },
            {
              label: "Transaction Fee",
              value: PriceFormat(transaction.transactionFee),
              show: !!transaction.transactionFee
            },
            {
              label: "USD Rate",
              value: `$${safeStr(transaction.usdRate)}`,
              show: !!transaction.usdRate
            },
            {
              label: "Gold Price",
              value: `$${safeStr(transaction.goldPrice)}`,
              show: !!transaction.goldPrice
            },
            {
              label: "Total Amount",
              value: transaction.totalAmountPay ? PriceFormat(transaction.totalAmountPay) : 'N/A',
              show: !!transaction.totalAmountPay
            }
          ])
        )}

        {/* Dates and Timeline */}
        {renderSection("Timeline & Dates",
          <>
            {renderGridSection([
              {
                label: "Created Date",
                value: safeDate(transaction.createdAt),
                show: !!transaction.createdAt
              },
              {
                label: "Transaction Date",
                value: safeDate(transaction.trDate),
                show: !!transaction.trDate
              },
              {
                label: "Updated Date",
                value: safeDate(transaction.updatedAt),
                show: !!transaction.updatedAt
              },
              {
                label: "Published Date",
                value: safeDate(transaction.publishedAt),
                show: !!transaction.publishedAt
              }
            ])}

            {(transaction.contractStartDate || transaction.contractEndDate) && (
              <div className="mt-6 pt-6 border-t border-gray-600">
                <h4 className="text-md font-medium text-gray-300 mb-4">Contract Period</h4>
                {renderGridSection([
                  {
                    label: "Contract Start",
                    value: safeDate(transaction.contractStartDate),
                    show: !!transaction.contractStartDate
                  },
                  {
                    label: "Contract End",
                    value: safeDate(transaction.contractEndDate),
                    show: !!transaction.contractEndDate
                  }
                ])}
              </div>
            )}
          </>
        )}

        {/* Additional Information */}
        {renderSection(
          "Additional Information",
          <div className="space-y-4">
            {renderField("Remarks", transaction.remarks, !!transaction.remarks)}
            {renderField("Narrative", transaction.narrative, !!transaction.narrative)}
            {renderField("Booking Note", transaction.bookingNote, !!transaction.bookingNote)}
          </div>,
          !!(transaction.remarks || transaction.narrative || transaction.bookingNote)
        )}

        {/* Payment Information */}
        {renderSection(
          "Payment Information",
          <>
            {renderGridSection([
              {
                label: "Payment Method",
                value: transaction.paymentMethodUser,
                show: !!transaction.paymentMethodUser
              },
              {
                label: "Deposit Date",
                value: safeDate(transaction.depositDateUser),
                show: !!transaction.depositDateUser
              },
              {
                label: "Reference Number",
                value: transaction.referenceNumberUser,
                show: !!transaction.referenceNumberUser
              }
            ])}

            {transaction.receiptImageLinkUser && (
              <div className="mt-6">
                {renderField("Receipt Image", 
                  <div className="mt-3">
                    <img
                      src={transaction.receiptImageLinkUser}
                      alt="Receipt"
                      className="w-full max-w-md rounded-lg border border-gray-600 shadow-lg"
                    />
                  </div>,
                  true,
                  false
                )}
              </div>
            )}
          </>,
          !!(transaction.paymentMethodUser || transaction.receiptImageLinkUser)
        )}

        {/* GAE Specific Information */}
        {renderSection(
          "GAE Details",
          renderGridSection([
            {
              label: "GAE Units",
              value: `${transaction.unitGaeUser} Units`,
              show: !!transaction.unitGaeUser
            },
            {
              label: "GAE To Be Paid",
              value: PriceFormat(transaction.gaeToBePaid ?? 0),
              show: !!transaction.gaeToBePaid
            },
            {
              label: "Down Payment",
              value: PriceFormat(transaction.gaeDownPayment ?? 0),
              show: !!transaction.gaeDownPayment
            },
            {
              label: "Total GAE Value",
              value: PriceFormat(transaction.gaeTotal ?? 0),
              show: !!transaction.gaeTotal
            }
          ]),
          !!transaction.unitGaeUser
        )}

        {/* Termination Information */}
        {renderSection(
          "Termination Details",
          <>
            {renderGridSection([
              {
                label: "Termination Status",
                value: <span className="text-red-400 font-medium">{transaction.statusOfTermination}</span>,
                show: !!transaction.statusOfTermination
              },
              {
                label: "Request Date",
                value: safeDate(transaction.requestDateForTermination),
                show: !!transaction.requestDateForTermination
              },
              {
                label: "Approved By",
                value: transaction.approvedByTermination,
                show: !!transaction.approvedByTermination
              },
              {
                label: "Terminated P&L",
                value: PriceFormat(transaction.terminatedPnl ?? 0),
                show: !!transaction.terminatedPnl
              }
            ])}

            {transaction.rejectReason && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                {renderField("Rejection Reason", 
                  <span className="text-red-400">{transaction.rejectReason}</span>,
                  true
                )}
              </div>
            )}
          </>,
          !!transaction.statusOfTermination
        )}
      </div>
    </div>
  );
};

export default TransactionDetailsPage;
