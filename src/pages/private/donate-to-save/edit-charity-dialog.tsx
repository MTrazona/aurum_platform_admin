import { useState, useEffect } from "react";
import { useCharities } from "@/hooks/use-charities";
import type { Charity, UpdateCharityRequest, CharityCategory, CharityStatus } from "@/types/charity.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, X } from "lucide-react";

interface EditCharityDialogProps {
  charity: Charity | null;
  open: boolean;
  onClose: () => void;
}

export default function EditCharityDialog({ charity, open, onClose }: EditCharityDialogProps) {
  const { updateCharity, updateCharityStatus } = useCharities();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<UpdateCharityRequest>({
    name: "",
    description: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    category: "Other",
    donationGoal: 0,
    status: "Active",
  });

  // Update form data when charity changes
  useEffect(() => {
    if (charity) {
      setFormData({
        name: charity.name,
        description: charity.description,
        website: charity.website || "",
        email: charity.email || "",
        phone: charity.phone || "",
        address: charity.address,
        country: charity.country,
        category: charity.category,
        donationGoal: charity.donationGoal || 0,
        status: charity.status,
      });
    }
  }, [charity]);

  const handleInputChange = (field: keyof UpdateCharityRequest, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!charity) return;
    
    try {
      setIsSubmitting(true);
      
      // Update charity
      await updateCharity(charity.id, formData);
      
      // Close dialog
      onClose();
      
    } catch (error) {
      console.error("Failed to update charity:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (newStatus: CharityStatus) => {
    if (!charity) return;
    
    try {
      setIsSubmitting(true);
      await updateCharityStatus(charity.id, newStatus);
      setFormData(prev => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories: CharityCategory[] = [
    "Education",
    "Healthcare", 
    "Environment",
    "Poverty Relief",
    "Animal Welfare",
    "Disaster Relief",
    "Arts & Culture",
    "Human Rights",
    "Other"
  ];

  const statuses: CharityStatus[] = [
    "Active",
    "Inactive",
    "Pending",
    "Suspended"
  ];

  if (!charity) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Edit Charity: {charity.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Status Management */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Status Management</h3>
              
              <div className="space-y-2">
                <Label>Current Status</Label>
                <div className="flex gap-2">
                  {statuses.map((status) => (
                    <Button
                      key={status}
                      type="button"
                      variant={formData.status === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(status)}
                      disabled={isSubmitting}
                      className={formData.status === status ? "bg-[#f89004]" : ""}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Charity Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter charity name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange("category", value as CharityCategory)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe the charity's mission and activities"
                  rows={3}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="charity@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://www.charity.org"
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Location</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    placeholder="Enter country"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="donationGoal">Donation Goal (USD)</Label>
                  <Input
                    id="donationGoal"
                    type="number"
                    value={formData.donationGoal}
                    onChange={(e) => handleInputChange("donationGoal", parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter full address"
                  rows={2}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#f89004] hover:bg-[#f89004]/90"
            >
              {isSubmitting ? "Updating..." : "Update Charity"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
