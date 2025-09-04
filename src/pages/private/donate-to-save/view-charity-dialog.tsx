import type { Charity } from "@/types/charity.types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  Mail, 
  MapPin, 
  Calendar
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
            Charity Details: {charity.charityName}
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
                    alt={charity.charityName}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold">{charity.charityName}</h2>
                    <p className="text-gray-600 mt-1">{charity.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      {charity.charityType}
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
                  <p className="font-medium">Phone</p>
                  <a 
                    href={`tel:${charity.phoneNumber}`}
                    className="text-blue-600 hover:underline"
                  >
                    {charity.phoneNumber}
                  </a>
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
                <p className="text-gray-600 ml-6">{charity.location}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
