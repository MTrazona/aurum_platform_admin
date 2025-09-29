import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { redemptionApi } from "@/apis/redemptionAPI";
import FileInput from "./FileInput";
import AUPUserDropdown, { AUPUserType } from "./AUPUserDropdown";
import { aupUserAPI } from "@/apis/aupUserAPI";
import { Building2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export type RedemptionCustomer = {
  id: number;
  firstName: string;
  lastName: string;
};

export type RedemptionBusiness = {
  id: number;
  documentId: string;
  businessInformation: string;
  legalBusinessName: string;
  DBA_TradeName: string | null;
  businessType: string;
  businessRegistration: string;
  businessAddress: string;
  BusinessPhoneNo: string | null;
  businessEmail: string;
  businessWebsite: string | null;
  requiredDocuments: string | null;
  businessRegistrationCertificate: string | null;
  proofOfBusinessAddress: string | null;
  articleOfCorporation: string | null;
  bankDocument: string | null;
  industry_merchantCategoryCode: string;
  descriptionProduct: string;
  locale: string | null;
  customer: RedemptionCustomer;
  businessImage: string;
};

export type CreateRedemptionBusiness = {
  legalBusinessName: string;
  businessInformation: string;
  DBA_TradeName: string;
  businessType: string;
  businessRegistration: string;
  businessAddress: string;
  BusinessPhoneNo: string;
  businessEmail: string;
  businessWebsite: string;
  industry_merchantCategoryCode: string;
  descriptionProduct: string;
  customerId: string;
  requiredDocuments: File | null;
  businessRegistrationCertificate: File | null;
  proofOfBusinessAddress: File | null;
  articleOfCorporation: File | null;
  bankDocument: File | null;
  businessImage: File | null;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (business: RedemptionBusiness) => void;
};

const CreateRedemptionBusinessDialog = ({ open, onOpenChange, onCreated }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aupUser, setAUPUser] = useState<AUPUserType[]>([]);
  const [formData, setFormData] = useState<CreateRedemptionBusiness>({
    legalBusinessName: "",
    businessInformation: "",
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
    // file fields
    requiredDocuments: null as File | null,
    businessRegistrationCertificate: null as File | null,
    proofOfBusinessAddress: null as File | null,
    articleOfCorporation: null as File | null,
    bankDocument: null as File | null,
    businessImage: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (name: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      console.log("📌 Submitting form with state:", formData);

      const formDataToSend = new FormData();
      formDataToSend.append("legalBusinessName", formData.legalBusinessName);
      formDataToSend.append("businessInformation", formData.businessInformation);
      formDataToSend.append("DBA_TradeName", formData.DBA_TradeName);
      formDataToSend.append("businessType", formData.businessType);
      formDataToSend.append("businessRegistration", formData.businessRegistration);
      formDataToSend.append("businessAddress", formData.businessAddress);
      formDataToSend.append("BusinessPhoneNo", formData.BusinessPhoneNo);
      formDataToSend.append("businessEmail", formData.businessEmail);
      formDataToSend.append("businessWebsite", formData.businessWebsite);
      formDataToSend.append("industry_merchantCategoryCode", formData.industry_merchantCategoryCode);
      formDataToSend.append("descriptionProduct", formData.descriptionProduct);
      formDataToSend.append("customerId", formData.customerId);

      if (formData.requiredDocuments)
        formDataToSend.append("requiredDocuments", formData.requiredDocuments);
      if (formData.businessRegistrationCertificate)
        formDataToSend.append("businessRegistrationCertificate", formData.businessRegistrationCertificate);
      if (formData.proofOfBusinessAddress)
        formDataToSend.append("proofOfBusinessAddress", formData.proofOfBusinessAddress);
      if (formData.articleOfCorporation)
        formDataToSend.append("articleOfCorporation", formData.articleOfCorporation);
      if (formData.bankDocument)
        formDataToSend.append("bankDocument", formData.bankDocument);
      if (formData.businessImage)
        formDataToSend.append("businessImage", formData.businessImage);

      const newBusiness = await redemptionApi.create(formDataToSend) as unknown as RedemptionBusiness;
      if (onCreated) onCreated(newBusiness);

      // reset form
      setFormData({
        legalBusinessName: "",
        businessInformation: "",
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
        requiredDocuments: null,
        businessRegistrationCertificate: null,
        proofOfBusinessAddress: null,
        articleOfCorporation: null,
        bankDocument: null,
        businessImage: null,
      } as CreateRedemptionBusiness);

      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create redemption business:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await aupUserAPI.getAll();
        setAUPUser(data);
      } catch (error) {
        console.error("Failed to fetch AUP users:", error);
      } finally {
        
      }
    };
    fetchUsers();
  }, []);

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label className="text-slate-300">Legal Business Name *</Label>
              <Input name="legalBusinessName" value={formData.legalBusinessName} onChange={handleChange} required />
            </div>
            <div className="space-y-3">
              <Label className="text-slate-300">Trade Name</Label>
              <Input name="DBA_TradeName" value={formData.DBA_TradeName} onChange={handleChange} />
            </div>
            <div className="space-y-3 col-span-2">
              <Label className="text-slate-300">Business Information *</Label>
              <Textarea
                name="businessInformation" // ✅ added
                value={formData.businessInformation}
                onChange={handleChange}
                required
                rows={3}
                className="bg-white border-none"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-slate-300">Business Type *</Label>
              <Input name="businessType" value={formData.businessType} onChange={handleChange} required />
            </div>
            <div className="space-y-3">
              <Label className="text-slate-300">Business Registration *</Label>
              <Input name="businessRegistration" value={formData.businessRegistration} onChange={handleChange} required />
            </div>
            <div className="space-y-3">
              <Label className="text-slate-300">Business Address *</Label>
              <Input name="businessAddress" value={formData.businessAddress} onChange={handleChange} required />
            </div>
            <div className="space-y-3">
                <Label className="text-slate-300">Phone Number</Label>
              <Input name="BusinessPhoneNo" value={formData.BusinessPhoneNo} onChange={handleChange} />
            </div>
            <div className="space-y-3">
                <Label className="text-slate-300">Email *</Label>
              <Input type="email" name="businessEmail" value={formData.businessEmail} onChange={handleChange} required />
            </div>
            <div className="space-y-3">
              <Label className="text-slate-300">Website</Label>
              <Input name="businessWebsite" value={formData.businessWebsite} onChange={handleChange} />
            </div>
            <div className="space-y-3">
              <Label className="text-slate-300">Industry Code *</Label>
              <Input name="industry_merchantCategoryCode" value={formData.industry_merchantCategoryCode} onChange={handleChange} required />
            </div>
            <div className="space-y-3">
              <Label className="text-slate-300">AUP Users *</Label>
              <AUPUserDropdown users={aupUser} onSelect={(customerId) => setFormData((prev) => ({ ...prev, customerId: String(customerId) }))} />
            </div>
            <div className="space-y-3 col-span-2">
              <Label className="text-slate-300">Product Description</Label>
              {/* <Input name="descriptionProduct" value={formData.descriptionProduct} onChange={handleChange} required /> */}
              <Textarea
                name="descriptionProduct" // ✅ added
                value={formData.descriptionProduct}
                onChange={handleChange}
                required
                rows={3}
                className="bg-white border-none"
              />
            </div>
          </div>

          {/* File inputs */}
          <FileInput 
            name="businessRegistrationCertificate"
            title="Business Registration Certificate"
            onFileSelect={handleFileSelect}
          />
          <FileInput 
            name="proofOfBusinessAddress"
            title="Proof of Business Address"
            onFileSelect={handleFileSelect}
          />
          <FileInput 
            name="articleOfCorporation"
            title="Article of Corporation"
            onFileSelect={handleFileSelect}
          />
          <FileInput 
            name="bankDocument"
            title="Bank Document"
            onFileSelect={handleFileSelect}
          />
          <FileInput 
            name="requiredDocuments"
            title="Required Documents"
            onFileSelect={handleFileSelect}
          />
          <FileInput 
            name="businessImage"
            title="Business Image"
            onFileSelect={handleFileSelect}
          />

          <DialogFooter>
            <div className="flex justify-end px-4 py-8 gap-4 border-t border-white w-full">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                {isSubmitting ? "Creating..." : "Create Business"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRedemptionBusinessDialog;