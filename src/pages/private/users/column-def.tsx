/* eslint-disable @typescript-eslint/no-explicit-any */
import UserActionMenu from "@/components/features/user-action-menu";
import StatusChip from "@/components/status-chip";
import { dateStringFormatter } from "@/utils/format-helper";

export const usersColumnDefs = ({
  fetchWalletAddress,
  handleBlockedUnblock,
  handleLockedUnlock,
}: {
  fetchWalletAddress: (userHash: string) => Promise<void>;
  handleBlockedUnblock: (userHash: string, status: boolean) => Promise<void>;
  handleLockedUnlock: (userHash: string, status: boolean) => Promise<void>;
}) => [
  {
    headerName: "ID",
    field: "id",
    width: 100,
    filter: "agNumberColumnFilter",
    sortable: true,
  },
  {
    headerName: "First Name",
    field: "firstName",
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    sortable: true,
  },
  {
    headerName: "Last Name",
    field: "lastName",
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    sortable: true,
  },
  {
    headerName: "Username",
    field: "username",
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    sortable: true,
  },
  {
    headerName: "Email",
    field: "email",
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    sortable: true,
  },
  {
    headerName: "Country",
    field: "country",
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    sortable: true,
  },
  {
    headerName: "KYC Status",
    field: "kycVerified",
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    sortable: true,
    cellRenderer: (params: any) => (
      <StatusChip status={params.data.kycVerified} />
    ),
  },
  {
    headerName: "Account Status",
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    sortable: true,
    cellRenderer: (params: any) => {
      const status =
        params.data?.login_attempt?.loginStatus !== "Active"
          ? "Locked"
          : params.data.blocked === true
          ? "Blocked"
          : "Active";
      return <StatusChip status={status} />;
    },
  },
  {
    headerName: "Created At",
    field: "createdAt",
    filter: "agDateColumnFilter",
    cellDataType: "dateTime",
    filterParams: { buttons: ["reset", "apply"] },
    sortable: true,
    cellRenderer: (params: any) => (
      <p>{dateStringFormatter(params.data?.createdAt)}</p>
    ),
  },
  {
    headerName: "Action",
    field: "action",
    width: 80,
    pinned: "right",
    sortable: false,
    cellRenderer: (params: any) => (
      <UserActionMenu
        userData={params.data}
        fetchWalletAddress={fetchWalletAddress}
        handleBlockedUnblock={handleBlockedUnblock}
        handleLockedUnlock={handleLockedUnlock}
      />
    ),
  },
];
