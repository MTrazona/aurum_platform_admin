import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { redemptionApi } from "@/apis/redemptionAPI";
import type { RedemptionBusiness } from "@/types/redemption.type";

interface CreateRedemptionBusinessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (business: RedemptionBusiness) => void;
}

export default function CreateRedemptionBusinessDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateRedemptionBusinessDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessInformation: "",
    legalBusinessName: "",
    DBA_TradeName: "",
    businessType: "",
    businessRegistration: "",
    businessAddress: "",
    BusinessPhoneNo: "",
    businessEmail: "",
    businessWebsite: "",
    industry_merchantCategoryCode: "",
    descriptionProduct: "",
    customerId: "", // 👈 only ID is needed
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      // Call API (map `customerId` into nested object if needed)
      const payload = {
        ...formData,
        customer: { id: Number(formData.customerId) },
      };

      const newBusiness = await redemptionApi.create(payload);
      if (onCreated) onCreated(newBusiness);

      setFormData({
        businessInformation: "",
        legalBusinessName: "",
        DBA_TradeName: "",
        businessType: "",
        businessRegistration: "",
        businessAddress: "",
        BusinessPhoneNo: "",
        businessEmail: "",
        businessWebsite: "",
        industry_merchantCategoryCode: "",
        descriptionProduct: "",
        customerId: "",
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create redemption business:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[60vw] min-w-[50vw] max-h-[90vh] overflow-y-auto bg-primary border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-white">
            <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            Create New Merchant
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="bg-[#1E1E20] border border-slate-700/50">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-3">
                <Label className="text-slate-300">Legal Business Name *</Label>
                <Input
                  value={formData.legalBusinessName}
                  onChange={(e) => handleChange("legalBusinessName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label className="text-slate-300">Business Information *</Label>
                <Textarea
                  value={formData.businessInformation}
                  onChange={(e) => handleChange("businessInformation", e.target.value)}
                  required
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-slate-300">Business Type *</Label>
                  <Input
                    value={formData.businessType}
                    onChange={(e) => handleChange("businessType", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300">Business Registration *</Label>
                  <Input
                    value={formData.businessRegistration}
                    onChange={(e) => handleChange("businessRegistration", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-slate-300">Business Address *</Label>
                <Input
                  value={formData.businessAddress}
                  onChange={(e) => handleChange("businessAddress", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-slate-300">Business Email *</Label>
                  <Input
                    type="email"
                    value={formData.businessEmail}
                    onChange={(e) => handleChange("businessEmail", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300">Phone No.</Label>
                  <Input
                    value={formData.BusinessPhoneNo}
                    onChange={(e) => handleChange("BusinessPhoneNo", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-slate-300">Description *</Label>
                <Textarea
                  value={formData.descriptionProduct}
                  onChange={(e) => handleChange("descriptionProduct", e.target.value)}
                  rows={3}
                  required
                />
              </div>

              {/* Customer ID */}
              <div className="space-y-3">
                <Label className="text-slate-300">Customer ID *</Label>
                <Input
                  type="number"
                  value={formData.customerId}
                  onChange={(e) => handleChange("customerId", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Business"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
