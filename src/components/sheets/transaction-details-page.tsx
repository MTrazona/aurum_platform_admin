import Breadcrumb from "@/components/routes-bread-crumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { TransactionsType } from "@/types/buy-request.types";
import { PriceFormat, formatTransactionCode, safeDate, safeStr } from "@/utils/format-helper";
import { 
  ArrowLeft, 
  CalendarDays, 
  ChevronDown, 
  ChevronRight, 
  Coins, 
  CreditCard, 
  DollarSign, 
  FileCheck, 
  FileText, 
  Hash, 
  Link, 
  TrendingUp, 
  XCircle,
  User,
  FileText as FileTextIcon,
  CheckCircle,
  Clock,
  Info
} from "lucide-react";
import React, { useState } from "react";
import { USDTDisplay } from "../features/price-display";
import { DocumentPreviewModal } from "../transaction/document-preview-modal";
import { DocumentsTab } from "../transaction/documents-tab";
import { GAETerminationPartials } from "../transaction/gae-termination-partials";
import { EnhancedField } from "../enhanced-field";
import { NoDataDisplay } from "../no-data-display";
import { getStatusIcon, getFileType, copyToClipboard } from "../../utils/transaction-utils";
import { useGAETermination } from "../../hooks/use-gae-termination";
import type { TabType, PreviewModalState, TabConfig } from "../../types/transaction.types";

interface TransactionDetailsPageProps {
  transaction: TransactionsType;
  onBack: () => void;
  title: string;
}

const TransactionDetailsPage: React.FC<TransactionDetailsPageProps> = ({
  transaction,
  onBack,
  title,
}) => {
  console.log("transaction", transaction);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview']));
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [previewModal, setPreviewModal] = useState<PreviewModalState>({
    isOpen: false,
    url: '',
    type: 'document',
    title: ''
  });

  // GAE Termination hook - only fetch if transaction type is GAE
  const { data: gaeTerminationData, loading: gaeTerminationLoading } = useGAETermination(
    transaction.transactionType === 'GAE' ? transaction.id : null
  );

  // Helper function to copy to clipboard with field tracking
  const handleCopyToClipboard = async (text: string, field: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  // Helper function to open preview modal
  const openPreview = (url: string, title: string) => {
    setPreviewModal({
      isOpen: true,
      url,
      type: getFileType(url),
      title
    });
  };

  // Helper function to close preview modal
  const closePreview = () => {
    setPreviewModal({
      isOpen: false,
      url: '',
      type: 'document',
      title: ''
    });
  };

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      case 'terminated':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="w-3 h-3 mr-1" />Terminated</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const renderField = (
    label: string,
    value: React.ReactNode,
    show: boolean = true,
    isSmallLabel: boolean = false
  ) => {
    if (!show) return null;
    
    return (
      <div className="space-y-1.5">
        <label className={`font-medium text-gray-300 ${isSmallLabel ? 'text-xs' : 'text-sm'}`}>
          {label}
        </label>
        <div className="text-gray-100 text-sm">
          {value || 'N/A'}
        </div>
      </div>
    );
  };


  const renderCollapsibleSection = (title: string, content: React.ReactNode, sectionKey: string, icon?: React.ReactNode) => {
    const isExpanded = expandedSections.has(sectionKey);
    
    return (
      <div className="border border-gray-700/50 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between p-3 bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            {icon && <div className="text-gray-400">{icon}</div>}
            <h3 className="text-base font-semibold text-gray-200">{title}</h3>
          </div>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
        </button>
        {isExpanded && (
          <div className="p-4 bg-gray-800/20">
            {content}
          </div>
        )}
      </div>
    );
  };

  const renderGridSection = (
    fields: Array<{
      label: string;
      value: React.ReactNode;
      show?: boolean;
      isSmallLabel?: boolean;
      icon?: React.ReactNode;
      copyable?: boolean;
      copyValue?: string;
      copyField?: string;
      highlight?: boolean;
    }>
  ) => {
    const visibleFields = fields.filter(field => field.show !== false);
    
    if (visibleFields.length === 0) return null;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleFields.map((field, index) => (
          <Card key={index} className="bg-[#1E1E1E] border-[#3A3A3A] hover:border-[#4A4A4A] transition-colors">
            <CardContent className="p-4">
              {field.icon || field.copyable ? (
                <EnhancedField
                  label={field.label}
                  value={field.value}
                  icon={field.icon}
                  copyable={field.copyable}
                  copyValue={field.copyValue}
                  highlight={field.highlight}
                  show={field.show}
                  copied={copiedField === field.copyField}
                  onCopy={() => field.copyValue && field.copyField && handleCopyToClipboard(field.copyValue, field.copyField)}
                />
              ) : (
                renderField(field.label, field.value, field.show, field.isSmallLabel)
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };


  const hasOverviewData = () => {
    return !!(
      transaction.transactionType ||
      transaction.transactionCode ||
      transaction.transactionStatus ||
      transaction.txnID ||
      transaction.trackingNumber ||
      transaction.customer ||
      transaction.contractStartDate ||
      transaction.contractEndDate ||
      transaction.trDate ||
      transaction.remarks ||
      transaction.narrative ||
      transaction.rejectReason ||
      transaction.conversionID
    );
  };

  const hasFinancialData = () => {
    return !!(
      transaction.fromValue ||
      transaction.toValue ||
      transaction.transactionFee ||
      transaction.bookingNote ||
      transaction.managementFeeAdvance ||
      transaction.managementFeeRate ||
      transaction.usdRate ||
      transaction.goldPrice ||
      transaction.goldPriceLME ||
      transaction.goldPriceTermination
    );
  };

  const hasGAEData = () => {
    return !!(
      transaction.gaeDownPayment ||
      transaction.gaeTotal ||
      transaction.gaeTotalUnitValue ||
      transaction.unitGaeUser ||
      transaction.gaeToBePaid
    );
  };

  const hasPaymentData = () => {
    return !!(
      transaction.paymentMethodUser ||
      transaction.receiptImageLinkUser ||
      transaction.referenceNumberUser ||
      transaction.paymentMethodAdmin ||
      transaction.depositDateAdmin ||
      transaction.receiptImageLinkAdmin ||
      transaction.referenceNumberAdmin
    );
  };


  const hasTerminationData = () => {
    return !!(
      transaction.terminatedAmount ||
      transaction.statusOfTermination ||
      transaction.requestDateForTermination ||
      transaction.approvedByTermination
    );
  };

  const tabs: TabConfig[] = [
    { key: 'overview', label: 'Overview', icon: <Hash className="h-4 w-4" /> },
    { key: 'financial', label: 'Financial', icon: <DollarSign className="h-4 w-4" /> },
    { key: 'gae', label: 'GAE Details', icon: <Coins className="h-4 w-4" /> },
    { key: 'payment', label: 'Payment', icon: <CreditCard className="h-4 w-4" /> },
    { key: 'documents', label: 'Documents', icon: <FileText className="h-4 w-4" /> },
    { key: 'termination', label: 'Termination', icon: <XCircle className="h-4 w-4" /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        if (!hasOverviewData()) {
          return <NoDataDisplay message="No overview information available" />;
        }
        return (
          <div className="space-y-4">
            {renderCollapsibleSection("Basic Information", 
              renderGridSection([
                {
                  label: "Transaction Type",
                  value: safeStr(transaction.transactionType) || 'N/A',
                  show: !!transaction.transactionType,
                  icon: <Hash className="h-4 w-4" />,
                  highlight: true
                },
                {
                  label: "Transaction Code",
                  value: formatTransactionCode(transaction.transactionCode),
                  show: !!transaction.transactionCode,
                  icon: <FileTextIcon className="h-4 w-4" />,
                  copyable: true,
                  copyValue: transaction.transactionCode,
                  copyField: 'transactionCode'
                },
                {
                  label: "Transaction Status",
                  value: transaction.transactionStatus,
                  show: !!transaction.transactionStatus,
                  icon: getStatusIcon(transaction.transactionStatus)
                },
                {
                  label: "Transaction ID",
                  value: formatTransactionCode(transaction.txnID ?? "") || 'N/A',
                  show: !!transaction.txnID,
                  icon: <Hash className="h-4 w-4" />,
                  copyable: true,
                  copyValue: transaction.txnID || '',
                  copyField: 'txnID'
                },
                {
                  label: "Tracking Number",
                  value: formatTransactionCode(transaction.trackingNumber ?? ''),
                  show: !!transaction.trackingNumber,
                  icon: <FileTextIcon className="h-4 w-4" />,
                  copyable: true,
                  copyValue: transaction.trackingNumber || '',
                  copyField: 'trackingNumber'
                },
                {
                  label: "Customer Name",
                  value: transaction.customer ? `${transaction.customer.firstName} ${transaction.customer.lastName}` : 'N/A',
                  show: !!transaction.customer,
                  icon: <User className="h-4 w-4" />
                }
              ]), "basic-info", <Hash className="h-4 w-4" />
            )}

            {renderCollapsibleSection("Contract Information", 
              renderGridSection([
                {
                  label: "Contract Start Date",
                  value: safeDate(transaction.contractStartDate),
                  show: !!transaction.contractStartDate
                },
                {
                  label: "Contract End Date",
                  value: safeDate(transaction.contractEndDate),
                  show: !!transaction.contractEndDate
                },
                {
                  label: "Transaction Date",
                  value: safeDate(transaction.trDate),
                  show: !!transaction.trDate
                }
              ]), "contract-info", <CalendarDays className="h-4 w-4" />
            )}

            {renderCollapsibleSection("Additional Information", 
              renderGridSection([
                {
                  label: "Remarks",
                  value: safeStr(transaction.remarks) || 'N/A',
                  show: !!transaction.remarks
                },
                {
                  label: "Narrative",
                  value: safeStr(transaction.narrative) || 'N/A',
                  show: !!transaction.narrative
                },
                {
                  label: "Reject Reason",
                  value: safeStr(transaction.rejectReason) || 'N/A',
                  show: !!transaction.rejectReason
                },
                {
                  label: "Conversion ID",
                  value: safeStr(transaction.conversionID) || 'N/A',
                  show: !!transaction.conversionID
                }
              ]), "additional-info", <Info className="h-4 w-4" />
            )}
          </div>
        );

      case 'financial':
        if (!hasFinancialData()) {
          return <NoDataDisplay message="No financial information available" />;
        }
        return (
          <div className="space-y-4">
            {renderCollapsibleSection("Financial Details", 
              renderGridSection([
                {
                  label: "From Amount",
                  value: PriceFormat(transaction.fromValue, transaction, false, 'fromValue'),
                  show: !!transaction.fromValue,
                  icon: <DollarSign className="h-4 w-4" />,
                  highlight: true
                },
                {
                  label: "To Amount",
                  value: PriceFormat(transaction.toValue, transaction, false, 'toValue'),
                  show: !!transaction.toValue,
                  icon: <TrendingUp className="h-4 w-4" />,
                  highlight: true
                },
                {
                  label: "Transaction Fee",
                  value: PriceFormat(transaction.transactionFee),
                  show: !!transaction.transactionFee,
                  icon: <CreditCard className="h-4 w-4" />
                },
                {
                  label: "Booking Note",
                  value: safeStr(transaction.bookingNote) || 'N/A',
                  show: !!transaction.bookingNote,
                  icon: <FileTextIcon className="h-4 w-4" />
                }
              ]), "financial-details", <DollarSign className="h-4 w-4" />
            )}

            {renderCollapsibleSection("Management Fees", 
              renderGridSection([
                {
                  label: "Management Fee Advance",
                  value: transaction.managementFeeAdvance ? PriceFormat(transaction.managementFeeAdvance) : 'N/A',
                  show: !!transaction.managementFeeAdvance
                },
                {
                  label: "Management Fee Rate",
                  value: transaction.managementFeeRate ? `${transaction.managementFeeRate}%` : 'N/A',
                  show: !!transaction.managementFeeRate
                }
              ]), "management-fees", <TrendingUp className="h-4 w-4" />
            )}

            {renderCollapsibleSection("Pricing Information", 
              renderGridSection([
                {
                  label: "USDT Rate",
                  value: <USDTDisplay value={transaction.usdRate} />,
                  show: !!transaction.usdRate
                },
                {
                  label: "Gold Price",
                  value: <USDTDisplay value={transaction.goldPrice} />,
                  show: !!transaction.goldPrice
                },
                {
                  label: "Gold Price LME",
                  value: transaction.goldPriceLME ? PriceFormat(transaction.goldPriceLME) : 'N/A',
                  show: !!transaction.goldPriceLME
                },
                {
                  label: "Gold Price Termination",
                  value: transaction.goldPriceTermination ? PriceFormat(transaction.goldPriceTermination) : 'N/A',
                  show: !!transaction.goldPriceTermination
                }
              ]), "pricing-info", <Coins className="h-4 w-4" />
            )}
          </div>
        );

      case 'gae':
        if (!hasGAEData()) {
          return <NoDataDisplay message="No GAE information available" />;
        }
        return (
          <div className="space-y-4">
            {renderCollapsibleSection("GAE Details", 
              renderGridSection([
                {
                  label: "GAE Down Payment",
                  value: transaction.gaeDownPayment ? PriceFormat(transaction.gaeDownPayment) : 'N/A',
                  show: !!transaction.gaeDownPayment
                },
                {
                  label: "GAE Total",
                  value: transaction.gaeTotal ? PriceFormat(transaction.gaeTotal) : 'N/A',
                  show: !!transaction.gaeTotal
                },
                {
                  label: "GAE Total Unit Value",
                  value: transaction.gaeTotalUnitValue ? PriceFormat(transaction.gaeTotalUnitValue) : 'N/A',
                  show: !!transaction.gaeTotalUnitValue
                },
                {
                  label: "Unit GAE User",
                  value: transaction.unitGaeUser || 'N/A',
                  show: !!transaction.unitGaeUser
                },
                {
                  label: "GAE To Be Paid",
                  value: transaction.gaeToBePaid ? PriceFormat(transaction.gaeToBePaid) : 'N/A',
                  show: !!transaction.gaeToBePaid
                }
              ]), "gae-details", <Coins className="h-4 w-4" />
            )}
          </div>
        );

      case 'payment':
        if (!hasPaymentData()) {
          return <NoDataDisplay message="No payment information available" />;
        }
        return (
          <div className="space-y-4">
            {renderCollapsibleSection("User Payment Information", 
              renderGridSection([
                {
                  label: "Payment Method User",
                  value: safeStr(transaction.paymentMethodUser) || 'N/A',
                  show: !!transaction.paymentMethodUser
                },
                {
                  label: "Receipt Image Link User",
                  value: transaction.receiptImageLinkUser ? (
                    <div className="space-y-1.5">
                      <img 
                        src={transaction.receiptImageLinkUser} 
                        alt="User Receipt" 
                        className="w-24 h-16 object-cover rounded-md border border-gray-600 shadow-sm"
                      />
                      <a 
                        href={transaction.receiptImageLinkUser} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1"
                      >
                        <Link className="h-3 w-3" />
                        View Full Image
                      </a>
                    </div>
                  ) : 'N/A',
                  show: !!transaction.receiptImageLinkUser
                },
                {
                  label: "Reference Number User",
                  value: safeStr(transaction.referenceNumberUser) || 'N/A',
                  show: !!transaction.referenceNumberUser
                }
              ]), "user-payment", <CreditCard className="h-4 w-4" />
            )}

            {renderCollapsibleSection("Admin Payment Information", 
              renderGridSection([
                {
                  label: "Payment Method Admin",
                  value: safeStr(transaction.paymentMethodAdmin) || 'N/A',
                  show: !!transaction.paymentMethodAdmin
                },
                {
                  label: "Deposit Date Admin",
                  value: safeDate(transaction.depositDateAdmin),
                  show: !!transaction.depositDateAdmin
                },
                {
                  label: "Receipt Image Link Admin",
                  value: transaction.receiptImageLinkAdmin ? (
                    <div className="space-y-1.5">
                      <img 
                        src={transaction.receiptImageLinkAdmin} 
                        alt="Admin Receipt" 
                        className="w-24 h-16 object-cover rounded-md border border-gray-600 shadow-sm"
                      />
                      <a 
                        href={transaction.receiptImageLinkAdmin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1"
                      >
                        <Link className="h-3 w-3" />
                        View Full Image
                      </a>
                    </div>
                  ) : 'N/A',
                  show: !!transaction.receiptImageLinkAdmin
                },
                {
                  label: "Reference Number Admin",
                  value: safeStr(transaction.referenceNumberAdmin) || 'N/A',
                  show: !!transaction.referenceNumberAdmin
                }
              ]), "admin-payment", <FileCheck className="h-4 w-4" />
            )}
          </div>
        );

      case 'documents':
        return <DocumentsTab transaction={transaction} onPreview={openPreview} />;

      case 'termination':
        if (!hasTerminationData() && transaction.transactionType !== 'GAE') {
          return <NoDataDisplay message="No termination information available" />;
        }
        return (
          <div className="space-y-6">
            {/* Standard Termination Information */}
            {hasTerminationData() && (
              <div>
                {renderCollapsibleSection("Termination Information", 
                  renderGridSection([
                    {
                      label: "Terminated Amount",
                      value: transaction.terminatedAmount ? PriceFormat(transaction.terminatedAmount) : 'N/A',
                      show: !!transaction.terminatedAmount
                    },
                    {
                      label: "Termination Status",
                      value: safeStr(transaction.statusOfTermination) || 'N/A',
                      show: !!transaction.statusOfTermination
                    },
                    {
                      label: "Request Date For Termination",
                      value: safeDate(transaction.requestDateForTermination),
                      show: !!transaction.requestDateForTermination
                    },
                    {
                      label: "Approved By Termination",
                      value: safeStr(transaction.approvedByTermination) || 'N/A',
                      show: !!transaction.approvedByTermination
                    }
                  ]), "termination-info", <XCircle className="h-4 w-4" />
                )}
              </div>
            )}

            {/* GAE Partial Terminations */}
            {transaction.transactionType === 'GAE' && (
              <div>
                <GAETerminationPartials 
                  partials={gaeTerminationData?.getPartials || []} 
                  loading={gaeTerminationLoading}
                />
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white">
      {/* Header */}
      <div className="border-b border-[#3A3A3A] bg-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-white hover:text-white hover:bg-[#3A3A3A] h-8 px-3"
              >
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Back
              </Button>
              <Separator orientation="vertical" className="h-5 bg-[#3A3A3A]" />
              <Breadcrumb textColor="text-white" rootColor="text-white" linkColor="text-white" currentColor="text-white" separatorColor="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#f89004]/20 rounded-lg">
                <Hash className="w-8 h-8 text-[#f89004]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <p className="text-gray-400 mt-1 text-sm">
                  Transaction Code: {formatTransactionCode(transaction.transactionCode)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {getStatusBadge(transaction.transactionStatus)}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-1 border-b border-[#3A3A3A]">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-colors ${
                  activeTab === tab.key
                    ? 'bg-[#1E1E1E] text-white border-b-2 border-[#f89004]'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-[#1E1E1E]/50'
                }`}
              >
                {tab.icon}
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {renderTabContent()}
        </div>
      </div>

      {/* Preview Modal */}
      <DocumentPreviewModal 
        previewModal={previewModal} 
        onClose={closePreview} 
      />
    </div>
  );
};

export default TransactionDetailsPage;
