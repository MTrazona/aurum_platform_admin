import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useCharities } from "@/hooks/use-charities";
import type { CreateCharityRequest } from "@/types/charity.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Upload, X, User, Heart, Image as ImageIcon } from "lucide-react";

interface CreateCharityDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateCharityDialog({ open, onClose }: CreateCharityDialogProps) {
  const { createCharity, fetchCharities } = useCharities();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CreateCharityRequest>({
    // User/Contact Information
    username: "",
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
    country: "",
    phoneNumber: "",
    
    // Charity Information (flat structure)
    charityName: "",
    description: "",
    imageUrl: "",
    location: "",
    charityType: "",
  });

  const handleInputChange = (field: keyof CreateCharityRequest, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        // Set the imageUrl in formData
        setFormData(prev => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData(prev => ({ ...prev, imageUrl: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Create charity
      await createCharity(formData);
      
      // Refetch the charities list to show the new charity
      await fetchCharities();
      
      // Reset form and close dialog
      setFormData({
        // User/Contact Information
        username: "",
        email: "",
        firstName: "",
        middleName: "",
        lastName: "",
        country: "",
        phoneNumber: "",
        
        // Charity Information (flat structure)
        charityName: "",
        description: "",
        imageUrl: "",
        location: "",
        charityType: "",
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


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[65vw] min-w-[55vw] max-h-[90vh] overflow-y-auto bg-primary border-0 shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-white">
            <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            Create New Charity
          </DialogTitle>
          <p className="text-slate-300 mt-2">Fill in the details below to register a new charity organization</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* User/Contact Information */}
          <Card className="bg-[#1E1E20] border border-slate-700/50 shadow-xl">
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg border border-secondary/30">
                  <User className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-bold text-xl text-white">Contact Person Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="username" className="text-sm font-semibold text-slate-300">Username *</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    placeholder="Enter username"
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500/20 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-semibold text-slate-300">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500/20 h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-sm font-semibold text-slate-300">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Enter first name"
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500/20 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="middleName" className="text-sm font-semibold text-slate-300">Middle Name</Label>
                  <Input
                    id="middleName"
                    value={formData.middleName}
                    onChange={(e) => handleInputChange("middleName", e.target.value)}
                    placeholder="Enter middle name"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500/20 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-sm font-semibold text-slate-300">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Enter last name"
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500/20 h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="country" className="text-sm font-semibold text-slate-300">Country *</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    placeholder="Enter country"
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500/20 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phoneNumber" className="text-sm font-semibold text-slate-300">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    placeholder="Enter phone number"
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500/20 h-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charity Information */}
          <Card className="bg-[#1E1E20] border border-slate-700/50 shadow-xl">
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30">
                  <Heart className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-bold text-xl text-white">Charity Information</h3>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="charityName" className="text-sm font-semibold text-slate-300">Charity Name *</Label>
                <Input
                  id="charityName"
                  value={formData.charityName}
                  onChange={(e) => handleInputChange("charityName", e.target.value)}
                  placeholder="Enter charity name"
                  required
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500/20 h-12"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-sm font-semibold text-slate-300">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe the charity's mission and activities"
                  rows={4}
                  required
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500/20 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="location" className="text-sm font-semibold text-slate-300">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Enter location"
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500/20 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="charityType" className="text-sm font-semibold text-slate-300">Charity Type *</Label>
                  <Input
                    id="charityType"
                    value={formData.charityType}
                    onChange={(e) => handleInputChange("charityType", e.target.value)}
                    placeholder="Enter charity type"
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500/20 h-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Image Upload */}
          <Card className="bg-[#1E1E20] border border-slate-700/50 shadow-xl">
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                  <Upload className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-bold text-xl text-white">Charity Image</h3>
              </div>
              
              <div className="space-y-4">
                <Label className="text-sm font-semibold text-slate-300">Upload Image</Label>
                
                {!imagePreview ? (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
                      isDragActive
                        ? 'border-amber-500 bg-amber-500/10'
                        : 'border-slate-600 bg-slate-700/30 hover:border-amber-500/50 hover:bg-slate-700/50'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 bg-slate-600/50 rounded-full">
                        <ImageIcon className="w-8 h-8 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium mb-2">
                          {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
                        </p>
                        <p className="text-slate-400 text-sm">
                          or click to browse files
                        </p>
                        <p className="text-slate-500 text-xs mt-2">
                          Supports: JPG, PNG, GIF, WebP (max 5MB)
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded-lg border-2 border-slate-600 shadow-lg"
                      />
                    </div>
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeImage}
                        className="flex items-center gap-2 bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30 hover:border-red-500/50"
                      >
                        <X className="w-4 h-4" />
                        Remove Image
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-slate-700/50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-8 py-3 bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600/50 hover:border-slate-500 hover:text-white transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Create Charity
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
