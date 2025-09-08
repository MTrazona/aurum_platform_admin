import type { Charity } from "@/types/charity.types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Mail, 
  MapPin, 
  Calendar,
  Heart,
  DollarSign,
  User,
  Phone,
  Globe,
  TrendingUp,
  Users,
  Copy,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

interface ViewCharityDialogProps {
  charity: Charity | null;
  open: boolean;
  onClose: () => void;
}

export default function ViewCharityDialog({ charity, open, onClose }: ViewCharityDialogProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!charity) return null;


  const getTotalDonations = () => {
    return charity.donateReceiver.length;
  };

  const getTotalAmount = () => {
    return charity.donateReceiver.reduce((total, donation) => {
      return total + parseFloat(String(donation.amount || 0));
    }, 0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const EnhancedField = ({ 
    label, 
    value, 
    icon, 
    copyable = false, 
    highlight = false,
    fullWidth = false 
  }: { 
    label: string; 
    value: string; 
    icon?: React.ReactNode; 
    copyable?: boolean; 
    highlight?: boolean;
    fullWidth?: boolean;
  }) => (
    <div className={`space-y-2 ${fullWidth ? "md:col-span-2" : ""}`}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-slate-400">{icon}</span>}
        <label className="text-xs text-slate-400 font-medium">{label}</label>
      </div>
      <div className="flex items-center gap-2">
        <p className={`text-sm ${highlight ? "text-amber-400 font-semibold" : "text-white"}`}>
          {value || "—"}
        </p>
        {copyable && value && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => copyToClipboard(value, label)}
            className="h-6 w-6 p-0 text-slate-400 hover:text-white"
          >
            {copiedField === label ? (
              <CheckCircle className="w-3 h-3 text-green-500" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
        )}
      </div>
    </div>
  );


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[65vw] min-w-[55vw] max-h-[90vh] overflow-y-auto bg-primary border-0 shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-white">
            <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            Charity Details: {charity.charity.charityName}
          </DialogTitle>
          <p className="text-slate-300 mt-2">View comprehensive information about this charity organization</p>
        </DialogHeader>

        <div className="space-y-8">
          {/* Charity Overview */}
          <Card className="bg-[#1E1E20] border border-slate-700/50 shadow-xl">
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30">
                  <Heart className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-bold text-xl text-white">Charity Overview</h3>
              </div>
              
              <div className="flex items-start gap-6">
                {charity.charity.imageUrl ? (
                  <img
                    src={charity.charity.imageUrl}
                    alt={charity.charity.charityName}
                    className="w-32 h-32 rounded-lg object-cover border-2 border-slate-600 shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-lg bg-slate-700/50 border-2 border-slate-600 flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-slate-400" />
                  </div>
                )}
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{charity.charity.charityName}</h2>
                    <p className="text-slate-300 mt-2">{charity.charity.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {charity.charity.charityType}
                    </Badge>
                    <Badge className={charity.charity.is_active ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}>
                      {charity.charity.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">Created: {formatDate(charity.charity.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">Total Donations: {getTotalDonations()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Person Information */}
          <Card className="bg-[#1E1E20] border border-slate-700/50 shadow-xl">
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <User className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-bold text-xl text-white">Contact Person Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EnhancedField
                  label="Full Name"
                  value={`${charity.firstName} ${charity.middleName || ''} ${charity.lastName}`.trim()}
                  icon={<User className="w-4 h-4" />}
                  highlight={true}
                />
                
                <EnhancedField
                  label="Username"
                  value={`@${charity.username}`}
                  icon={<User className="w-4 h-4" />}
                  copyable={true}
                />
                
                <EnhancedField
                  label="Email"
                  value={charity.email}
                  icon={<Mail className="w-4 h-4" />}
                  copyable={true}
                />
                
                <EnhancedField
                  label="Phone Number"
                  value="Not provided"
                  icon={<Phone className="w-4 h-4" />}
                  copyable={false}
                />
                
                <EnhancedField
                  label="Country"
                  value={charity.country}
                  icon={<Globe className="w-4 h-4" />}
                  fullWidth={true}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card className="bg-[#1E1E20] border border-slate-700/50 shadow-xl">
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-bold text-xl text-white">Location Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EnhancedField
                  label="Country"
                  value={charity.country}
                  icon={<Globe className="w-4 h-4" />}
                />
                
                <EnhancedField
                  label="Location"
                  value={charity.charity.location}
                  icon={<MapPin className="w-4 h-4" />}
                  fullWidth={true}
                />
              </div>
            </CardContent>
          </Card>

          {/* Donation Statistics */}
          <Card className="bg-[#1E1E20] border border-slate-700/50 shadow-xl">
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="font-bold text-xl text-white">Donation Statistics</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-green-400 font-medium">Total Donations</span>
                  </div>
                  <div className="text-3xl font-bold text-green-400">{getTotalDonations()}</div>
                </div>
                
                <div className="text-center p-6 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-blue-400 font-medium">Total Amount</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-400">${getTotalAmount().toFixed(2)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Donations */}
          {charity.donateReceiver.length > 0 && (
            <Card className="bg-[#1E1E20] border border-slate-700/50 shadow-xl">
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-pink-500/20 rounded-lg border border-pink-500/30">
                    <Heart className="w-5 h-5 text-pink-400" />
                  </div>
                  <h3 className="font-bold text-xl text-white">Recent Donations</h3>
                </div>
                
                <div className="space-y-4">
                  {charity.donateReceiver.slice(0, 5).map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-700/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                          <User className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {donation.sender.firstName} {donation.sender.lastName}
                          </div>
                          <div className="text-sm text-slate-400">{donation.sender.email}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-400 text-lg">${parseFloat(donation.amount).toFixed(2)}</div>
                        <div className="text-sm text-slate-400">{formatDate(donation.donateDate)}</div>
                      </div>
                    </div>
                  ))}
                  {charity.donateReceiver.length > 5 && (
                    <div className="text-center text-sm text-slate-400 py-2">
                      And {charity.donateReceiver.length - 5} more donations...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-slate-700/50">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-8 py-3 bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600/50 hover:border-slate-500 hover:text-white transition-all duration-200"
            >
              Close
            </Button>
            <Button
              onClick={() => window.open(`mailto:${charity.email}`, '_blank')}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 font-semibold transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact Charity
              </div>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
