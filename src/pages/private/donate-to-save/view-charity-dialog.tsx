import type { Charity } from "@/types/charity.types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  Mail, 
  MapPin, 
  Calendar,
  Heart,
  DollarSign,
  User
} from "lucide-react";

interface ViewCharityDialogProps {
  charity: Charity | null;
  open: boolean;
  onClose: () => void;
}

export default function ViewCharityDialog({ charity, open, onClose }: ViewCharityDialogProps) {
  if (!charity) return null;

  const getStatusBadgeVariant = (isActive: boolean) => {
    return isActive ? "default" : "secondary";
  };

  const getTotalDonations = () => {
    return charity.donateReceiver.length;
  };

  const getTotalAmount = () => {
    return charity.donateReceiver.reduce((total, donation) => {
      return total + parseFloat(donation.amount || 0);
    }, 0);
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Charity Details: {charity.charity.charityName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with Image and Basic Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                {charity.charity.imageUrl ? (
                  <img
                    src={charity.charity.imageUrl}
                    alt={charity.charity.charityName}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold">{charity.charity.charityName}</h2>
                    <p className="text-gray-600 mt-1">{charity.charity.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      {charity.charity.charityType}
                    </Badge>
                    <Badge variant={getStatusBadgeVariant(charity.charity.is_active)}>
                      {charity.charity.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Created: {formatDate(charity.charity.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-gray-400" />
                      <span>Total Donations: {getTotalDonations()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Person Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Person Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-medium">Full Name</p>
                  <p className="text-gray-600">
                    {charity.firstName} {charity.middleName} {charity.lastName}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium">Username</p>
                  <p className="text-gray-600">@{charity.username}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium">Email</p>
                  <a 
                    href={`mailto:${charity.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {charity.email}
                  </a>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium">Country</p>
                  <p className="text-gray-600">{charity.country}</p>
                </div>
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
                <p className="text-gray-600 ml-6">{charity.charity.location}</p>
              </div>
            </CardContent>
          </Card>

          {/* Donation Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Donation Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{getTotalDonations()}</div>
                  <div className="text-sm text-gray-600">Total Donations</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">${getTotalAmount().toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Total Amount</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Donations */}
          {charity.donateReceiver.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Recent Donations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {charity.donateReceiver.slice(0, 5).map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {donation.sender.firstName} {donation.sender.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{donation.sender.email}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">${parseFloat(donation.amount).toFixed(2)}</div>
                        <div className="text-sm text-gray-500">{formatDate(donation.donateDate)}</div>
                      </div>
                    </div>
                  ))}
                  {charity.donateReceiver.length > 5 && (
                    <div className="text-center text-sm text-gray-500">
                      And {charity.donateReceiver.length - 5} more donations...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
