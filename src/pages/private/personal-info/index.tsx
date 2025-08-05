import { fetchUsersInfoById } from "@/apis/users";
import StatusChip from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PersonalInfo } from "@/types/personalinfo";
import { dateStringFormatter } from "@/utils/format-helper";
import { BadgeDollarSign, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PersonalInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchInfo = async () => {
      const res = await fetchUsersInfoById(id);
      if (res) setPersonalInfo(res);
    };

    fetchInfo();
  }, [id]);
  if (!personalInfo) return;
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <p>Customer ID : {personalInfo?.documentId}</p>
          <p>{dateStringFormatter(personalInfo?.createdAt)}</p>
        </div>
        <Button>Blocked User</Button>
      </div>
      <div className="grid grid-cols-7 mt-4 gap-4 min-h-screen">
        <div className="col-span-2 flex flex-col">
          <div className="h-[600px] pt-12 px-[24px] rounded-xl bg-white">
            <div className="flex w-full flex-col justify-center items-center">
              <img
                className="w-36 h-36 rounded-lg mb-4"
                src={personalInfo?.personal_information?.profileLink}
                alt=""
              />
              <p className="text-lg font-semibold">
                {personalInfo?.personal_information.firstName}{" "}
                {personalInfo.personal_information?.lastName}
              </p>
              <p className="text-md text-black/60">
                Customer ID #{personalInfo?.documentId}
              </p>
            </div>
            <div className="flex items-center justify-around my-4">
              <div className="flex items-center gap-2">
                <div className="bg-golden w-max rounded-sm p-2">
                  <BadgeDollarSign size={32} />
                </div>
                <div>
                  <p>{personalInfo?.transactions?.length}</p>
                  <p className="text-[#676a7b]">Transactions</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-golden w-max rounded-sm p-2">
                  <Users />
                </div>
                <div>
                  <p>{personalInfo?.referralsFK?.length}</p>
                  <p className="text-[#676a7b]">Referral</p>
                </div>
              </div>
            </div>
            <h1 className="font-semibold text-xl text-[#3C4056] mt-2 mb-4">Details</h1>
            <Separator />
            <ul className="py-4 text-[#3C4056]">
                <li><p className="font-semibold">Username: <span className="font-normal text-black">{personalInfo?.username}</span></p></li>
                <li><p className="font-semibold">Email: <span className="font-normal text-black">{personalInfo?.email}</span></p></li>
                <li><p className="font-semibold">Status: <span className="font-normal text-black"><StatusChip status={personalInfo?.kycVerified} /></span></p></li>
                <li><p className="font-semibold">Contact: <span className="font-normal text-black">{personalInfo?.personal_information?.mobilePhone}</span></p></li>
                <li><p className="font-semibold">Citizenship: <span className="font-normal text-black">{personalInfo?.personal_information?.citizenship}</span></p></li>
                <li><p className="font-semibold">Country: <span className="font-normal text-black">{personalInfo?.country}</span></p></li>
            </ul>
          </div>
        </div>
        <div className="col-span-5 border"></div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
