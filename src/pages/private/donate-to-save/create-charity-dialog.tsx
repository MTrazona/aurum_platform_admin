import { useState } from "react";
import { useCharities } from "@/hooks/use-charities";
import type { CreateCharityRequest, CharityCategory } from "@/types/charity.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Upload, X } from "lucide-react";

interface CreateCharityDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateCharityDialog({ open, onClose }: CreateCharityDialogProps) {
  const { createCharity } = useCharities();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CreateCharityRequest>({
    name: "",
    description: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    category: "Other",
    donationGoal: 0,
  });

  const handleInputChange = (field: keyof CreateCharityRequest, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Create charity
      const newCharity = await createCharity(formData);
      
      // Upload image if selected
      if (imageFile && newCharity) {
        // Note: You might want to handle image upload separately or include it in the create request
        // For now, we'll just create the charity without the image
        console.log("Image upload would happen here");
      }
      
      // Reset form and close dialog
      setFormData({
        name: "",
        description: "",
        website: "",
        email: "",
        phone: "",
        address: "",
        country: "",
        category: "Other",
        donationGoal: 0,
      });
      setImageFile(null);
      setImagePreview(null);
      onClose();
      
    } catch (error) {
      console.error("Failed to create charity:", error);
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Create New Charity
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Image Upload */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Charity Image</h3>
              
              <div className="space-y-2">
                <Label htmlFor="image">Upload Image</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1"
                  />
                  {imagePreview && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={removeImage}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Remove
                    </Button>
                  )}
                </div>
              </div>

              {imagePreview && (
                <div className="flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
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
              {isSubmitting ? "Creating..." : "Create Charity"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
