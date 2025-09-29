export type RedemptionCustomer = {
  id: number;
  firstName: string
  lastName: string
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
  businessImage: string
};