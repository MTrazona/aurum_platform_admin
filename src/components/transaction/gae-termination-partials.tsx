import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CalendarDays, 
  FileText, 
  TrendingDown, 
  TrendingUp,
  ExternalLink,
  Download,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import type { GAETerminationPartial } from "@/types/gae-termination.types";
import { safeDate } from "@/utils/format-helper";

interface GAETerminationPartialsProps {
  partials: GAETerminationPartial[];
  loading?: boolean;
}

const getStatusIcon = (status: string) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case "failed":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4 text-blue-500" />;
  }
};

const getStatusBadge = (status: string) => {
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
    case "failed":
      return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
  }
};

export const GAETerminationPartials: React.FC<GAETerminationPartialsProps> = ({
  partials,
  loading = false
}) => {
  if (loading) {
    return (
      <Card className="bg-[#1E1E1E] border-[#3A3A3A]">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f89004]"></div>
            <span className="ml-3 text-gray-400">Loading termination data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!partials || partials.length === 0) {
    return (
      <Card className="bg-[#1E1E1E] border-[#3A3A3A]">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#3A3A3A] rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No Partial Terminations</h3>
            <p className="text-gray-400 text-sm">No partial termination records found for this GAE transaction.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#f89004] flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Partial Terminations ({partials.length})
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {partials.map((partial) => (
          <Card key={partial.id} className="bg-[#1E1E1E] border-[#3A3A3A] hover:border-[#4A4A4A] transition-colors">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(partial.statusOfTermination)}
                    <span className="text-white font-medium">Termination #{partial.id}</span>
                  </div>
                  {getStatusBadge(partial.statusOfTermination)}
                </div>

                {/* Termination Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-medium">Terminated Units</label>
                    <p className="text-sm text-white font-semibold">{partial.terminatedUnits}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-medium">Terminated Amount</label>
                    <p className="text-sm text-white font-semibold">{partial.terminatedAmount} {partial.terminatedCurrency}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-medium">USD Rate</label>
                    <p className="text-sm text-white">{partial.terminatedUsdrate}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-medium">Gold Price</label>
                    <p className="text-sm text-white">{partial.goldpriceTermination}</p>
                  </div>
                </div>

                {/* PnL */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-medium">Profit/Loss</label>
                  <div className="flex items-center gap-2">
                    {parseFloat(partial.terminatedPnl) >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-semibold ${
                      parseFloat(partial.terminatedPnl) >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {partial.terminatedPnl} {partial.terminatedCurrency}
                    </span>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-medium">Request Date</label>
                    <p className="text-sm text-white flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      {safeDate(partial.terminationReqDate)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-medium">Approved By</label>
                    <p className="text-sm text-white">{partial.approvedByTermination}</p>
                  </div>
                </div>

                {/* Certificate */}
                {partial.terminatedCertificate && (
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-medium">Termination Certificate</label>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(partial.terminatedCertificate, '_blank')}
                        className="h-8 px-3 text-gray-400 hover:text-white hover:bg-[#3A3A3A]"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = partial.terminatedCertificate;
                          link.download = `termination-certificate-${partial.id}.pdf`;
                          link.click();
                        }}
                        className="h-8 px-3 text-gray-400 hover:text-white hover:bg-[#3A3A3A]"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
