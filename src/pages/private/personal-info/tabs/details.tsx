import type React from "react";
import { Badge } from "@/components/ui/badge";
import { dateStringFormatter, safeStr } from "@/utils/format-helper";
import type { PersonalInfo } from "@/types/personalinfo";

type DetailsTabProps = {
  personalInfo: PersonalInfo;
};

const InfoRow: React.FC<{ label: string; value?: string | number | null }> = ({ label, value }) => (
  <div className="grid grid-cols-3 gap-2 py-2">
    <div className="text-sm text-gray-400 col-span-1">{label}</div>
    <div className="text-sm text-white col-span-2">{safeStr(value)}</div>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="rounded-xl bg-[#1E1E20]/20 p-6">
    <h3 className="text-white font-medium mb-4">{title}</h3>
    <div className="divide-y divide-white/5">{children}</div>
  </div>
);

const DetailsTab: React.FC<DetailsTabProps> = ({ personalInfo }) => {
  const p = personalInfo.personal_information;

  return (
    <div className="space-y-4">
      <Section title="Personal Information">
        <InfoRow label="Full Name" value={`${p.firstName} ${p.lastName}${p.suffixName ? `, ${p.suffixName}` : ""}`} />
        <InfoRow label="Gender" value={p.gender} />
        <InfoRow label="Marital Status" value={p.maritalStatus} />
        <InfoRow label="Country" value={p.country} />
        <InfoRow label="City" value={p.city} />
        <InfoRow label="Address" value={p.address} />
        <InfoRow label="Postal Code" value={p.postalCode} />
        <InfoRow label="Currency" value={p.currency} />
      </Section>

      <Section title="Account Details">
        <InfoRow label="Username" value={String(personalInfo.username)} />
        <InfoRow label="Email" value={personalInfo.email} />
        <div className="grid grid-cols-3 gap-2 py-2">
          <div className="text-sm text-gray-400 col-span-1">KYC</div>
          <div className="text-sm text-white col-span-2">
            {personalInfo.kycVerified?.toUpperCase() === "VERIFIED" ? (
              <Badge className="bg-green-100 text-green-700 border-green-200" variant="outline">Verified</Badge>
            ) : (
              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200" variant="outline">{safeStr(personalInfo.kycVerified)}</Badge>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 py-2">
          <div className="text-sm text-gray-400 col-span-1">Email</div>
          <div className="text-sm text-white col-span-2">
            {personalInfo.isVerifyEmail ? (
              <Badge variant="outline" className="border-green-200 text-green-700">Verified</Badge>
            ) : (
              <Badge variant="outline" className="border-yellow-200 text-yellow-700">Not Verified</Badge>
            )}
          </div>
        </div>
        <InfoRow label="Country" value={personalInfo.country} />
        <InfoRow label="Phone" value={personalInfo.phoneNumber} />
        <InfoRow label="Created At" value={dateStringFormatter(personalInfo.createdAt as unknown as string)} />
        <InfoRow label="Updated At" value={dateStringFormatter(personalInfo.updatedAt as unknown as string)} />
      </Section>

      <Section title="Security & Status">
        <InfoRow label="Login Status" value={personalInfo.login_attempt?.loginStatus} />
        <div className="grid grid-cols-3 gap-2 py-2">
          <div className="text-sm text-gray-400 col-span-1">Blocked</div>
          <div className="text-sm text-white col-span-2">
            {personalInfo.blocked ? (
              <Badge variant="outline" className="text-red-700 border-red-200">Yes</Badge>
            ) : (
              <Badge variant="outline" className="text-green-700 border-green-200">No</Badge>
            )}
          </div>
        </div>
        <InfoRow label="MFA Enabled" value={personalInfo.mfa_set_enable?.mfaEnabled ? "Enabled" : "Disabled"} />
      </Section>
    </div>
  );
};

export default DetailsTab;

