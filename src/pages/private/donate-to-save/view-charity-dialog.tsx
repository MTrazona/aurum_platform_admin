import type { Charity } from "@/types/charity.types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  DollarSign,
  Heart
} from "lucide-react";

interface ViewCharityDialogProps {
  charity: Charity | null;
  open: boolean;
  onClose: () => void;
}

export default function ViewCharityDialog({ charity, open, onClose }: ViewCharityDialogProps) {
  if (!charity) return null;

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "outline";
      case "Suspended":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "Education":
        return "default";
      case "Healthcare":
        return "destructive";
      case "Environment":
        return "outline";
      case "Poverty Relief":
        return "secondary";
      case "Animal Welfare":
        return "default";
      case "Disaster Relief":
        return "destructive";
      case "Arts & Culture":
        return "outline";
      case "Human Rights":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Charity Details: {charity.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with Image and Basic Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                {charity.imageUrl ? (
                  <img
                    src={charity.imageUrl}
                    alt={charity.name}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold">{charity.name}</h2>
                    <p className="text-gray-600 mt-1">{charity.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={getCategoryBadgeVariant(charity.category)}>
                      {charity.category}
                    </Badge>
                    <Badge variant={getStatusBadgeVariant(charity.status)}>
                      {charity.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Created: {formatDate(charity.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Updated: {formatDate(charity.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {charity.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a 
                        href={`mailto:${charity.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {charity.email}
                      </a>
                    </div>
                  </div>
                )}
                
                {charity.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a 
                        href={`tel:${charity.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {charity.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {charity.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Website</p>
                      <a 
                        href={charity.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {charity.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{charity.country}</span>
                </div>
                <p className="text-gray-600 ml-6">{charity.address}</p>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          {(charity.donationGoal || charity.currentDonations) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Financial Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {charity.donationGoal && (
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium">Donation Goal</p>
                        <p className="text-lg font-bold text-green-600">
                          {formatCurrency(charity.donationGoal)}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {charity.currentDonations && (
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Current Donations</p>
                        <p className="text-lg font-bold text-blue-600">
                          {formatCurrency(charity.currentDonations)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {charity.donationGoal && charity.currentDonations && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>
                        {Math.round((charity.currentDonations / charity.donationGoal) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min((charity.currentDonations / charity.donationGoal) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
