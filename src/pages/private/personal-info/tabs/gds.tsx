import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Group } from "@/types/personalinfo";
import { formatNumber, dateStringFormatter } from "@/utils/format-helper";
import { 
  Users, 
  Wallet, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Clock,
  Hash,
  Star,
  Shield,
  Building,
  Lock,
  Target,
  BarChart3,
  Coins
} from "lucide-react";

type GDSTabProps = {
  groups: Group[];
  loading?: boolean;
};

// Helper function to parse members string and extract member information
const parseMembers = (membersString: string): string[] => {
  if (!membersString) return [];
  
  // Split by common delimiters and clean up
  const members = membersString
    .split(/[,;|]/)
    .map(member => member.trim())
    .filter(member => member.length > 0);
  
  return members;
};

// Helper function to get initials from a name
const getInitials = (name: string): string => {
  if (!name) return "?";
  return name
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Helper function to get status color and icon
const getStatusInfo = (status: string) => {
  const statusLower = status.toLowerCase();
  if (statusLower.includes("active") || statusLower.includes("active")) {
    return {
      color: "bg-emerald-500/20 text-emerald-600 border-emerald-500/30",
      icon: Shield,
      bgGradient: "from-slate-800/50 to-slate-900/50"
    };
  } else if (statusLower.includes("pending") || statusLower.includes("pending")) {
    return {
      color: "bg-amber-500/20 text-amber-600 border-amber-500/30",
      icon: Clock,
      bgGradient: "from-slate-800/50 to-slate-900/50"
    };
  } else if (statusLower.includes("completed") || statusLower.includes("completed")) {
    return {
      color: "bg-blue-500/20 text-blue-600 border-blue-500/30",
      icon: Star,
      bgGradient: "from-slate-800/50 to-slate-900/50"
    };
  } else if (statusLower.includes("cancelled") || statusLower.includes("cancelled")) {
    return {
      color: "bg-red-500/20 text-red-600 border-red-500/30",
      icon: Shield,
      bgGradient: "from-slate-800/50 to-slate-900/50"
    };
  } else if (statusLower.includes("on process")) {
    return {
      color: "bg-blue-500/20 text-blue-600 border-blue-500/30",
      icon: Clock,
      bgGradient: "from-slate-800/50 to-slate-900/50"
    };
  }
  return {
    color: "bg-gray-500/20 text-gray-600 border-gray-500/30",
    icon: Hash,
    bgGradient: "from-slate-800/50 to-slate-900/50"
  };
};

// Helper function to get currency color
const getCurrencyColor = (currency: string): string => {
  return "bg-slate-600/20 text-slate-300 border-slate-600/30";
};

// Helper function to get group type color
const getGroupTypeColor = (type: string): string => {
  return "bg-slate-600/20 text-slate-300 border-slate-600/30";
};

const GDSTab: React.FC<GDSTabProps> = ({ groups, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <Skeleton className="h-5 w-3/4 bg-slate-700" />
              <Skeleton className="h-4 w-1/2 bg-slate-700" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full bg-slate-700" />
              <Skeleton className="h-4 w-2/3 bg-slate-700" />
              <Skeleton className="h-4 w-1/2 bg-slate-700" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!groups || groups.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="h-12 w-12 text-slate-400 mb-3" />
          <p className="text-lg font-semibold text-slate-200 mb-2">No Groups Found</p>
          <p className="text-sm text-slate-400 text-center max-w-md">
            This user is not part of any decentralized staking groups yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map((group) => {
        const members = parseMembers(group.members);
        const statusInfo = getStatusInfo(group.groupStatus);
        const StatusIcon = statusInfo.icon;
        
        return (
          <Card 
            key={group.id} 
            className={`dark-bg border-slate-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-200 transform hover:-translate-y-1 group`}
          >
            <CardHeader className="pb-3">
              <div className="mb-3">
                <CardTitle className="text-base font-bold text-slate-100 truncate mb-2 group-hover:text-white transition-colors">
                  {group.groupName}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge 
                    variant="outline" 
                    className={`${statusInfo.color} border font-medium text-xs`}
                  >
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {group.groupStatus}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`${getCurrencyColor(group.currency)} border text-xs font-medium`}
                  >
                    {group.currency}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`${getGroupTypeColor(group.groupType)} border text-xs font-medium`}
                  >
                    <Building className="w-3 h-3 mr-1" />
                    {group.groupType}
                  </Badge>
                </div>
                {group.description && (
                  <p className="text-xs text-slate-400 italic">"{group.description}"</p>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {/* Financial Information */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <Coins className="w-3 h-3 text-slate-400" />
                  Financial
                </h4>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-slate-800/30 rounded border border-slate-700/50">
                    <div className="flex items-center gap-1 mb-1">
                      <DollarSign className="h-3 w-3 text-slate-400" />
                      <span className="text-xs text-slate-400">Initial</span>
                    </div>
                    <span className="text-sm font-bold text-slate-200">
                      ${formatNumber(group.initialContri)}
                    </span>
                  </div>
                  
                  <div className="p-2 bg-slate-800/30 rounded border border-slate-700/50">
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingUp className="h-3 w-3 text-slate-400" />
                      <span className="text-xs text-slate-400">Monthly</span>
                    </div>
                    <span className="text-sm font-bold text-slate-200">
                      ${formatNumber(group.monthlyContri)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-slate-800/30 rounded border border-slate-700/50">
                    <div className="flex items-center gap-1 mb-1">
                      <Lock className="h-3 w-3 text-slate-400" />
                      <span className="text-xs text-slate-400">Locked</span>
                    </div>
                    <span className="text-sm font-bold text-slate-200">
                      ${formatNumber(group.lockedTokens)}
                    </span>
                  </div>
                  
                  <div className="p-2 bg-slate-800/30 rounded border border-slate-700/50">
                    <div className="flex items-center gap-1 mb-1">
                      <BarChart3 className="h-3 w-3 text-slate-400" />
                      <span className="text-xs text-slate-400">Balance</span>
                    </div>
                    <span className="text-sm font-bold text-slate-200">
                      ${formatNumber(group.groupBalance)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Group Configuration */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <Target className="w-3 h-3 text-slate-400" />
                  Details
                </h4>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-slate-800/30 rounded border border-slate-700/50">
                    <div className="flex items-center gap-1 mb-1">
                      <Users className="h-3 w-3 text-slate-400" />
                      <span className="text-xs text-slate-400">Members</span>
                    </div>
                    <span className="text-sm font-bold text-slate-200">{group.noMembers}</span>
                  </div>
                  
                  <div className="p-2 bg-slate-800/30 rounded border border-slate-700/50">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      <span className="text-xs text-slate-400">Duration</span>
                    </div>
                    <span className="text-sm font-bold text-slate-200">{group.months} months</span>
                  </div>
                </div>
              </div>

              {/* Wallet Info */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <Wallet className="w-3 h-3 text-slate-400" />
                  Wallet
                </h4>
                
                <div className="p-2 bg-slate-800/30 rounded border border-slate-700/50">
                  <div className="flex items-center gap-1 mb-1">
                    <Hash className="h-3 w-3 text-slate-400" />
                    <span className="text-xs text-slate-400">Address</span>
                  </div>
                  <span className="font-mono text-xs text-slate-300 break-all">
                    {group.groupWallet.slice(0, 12)}...{group.groupWallet.slice(-8)}
                  </span>
                </div>
              </div>

              {/* Timeline */}
              {(group.startDate || group.endDate) && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    Timeline
                  </h4>
                  
                  <div className="space-y-1">
                    {group.startDate && (
                      <div className="p-2 bg-slate-800/30 rounded border border-slate-700/50">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-400">Start</span>
                        </div>
                        <span className="text-xs text-slate-300">
                          {dateStringFormatter(group.startDate)}
                        </span>
                      </div>
                    )}
                    
                    {group.endDate && (
                      <div className="p-2 bg-slate-800/30 rounded border border-slate-700/50">
                        <div className="flex items-center gap-1 mb-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-400">End</span>
                        </div>
                        <span className="text-xs text-slate-300">
                          {dateStringFormatter(group.endDate)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default GDSTab;

