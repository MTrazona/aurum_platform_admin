import type { ColDef, ICellRendererParams } from "ag-grid-community";
import UserActionMenu from "@/components/features/user-action-menu";
import StatusChip from "@/components/status-chip";
import { dateStringFormatter } from "@/utils/format-helper";
import type { User } from "@/types/customer.types";

export const usersColumnDefs = ({
  fetchWalletAddress,
  handleBlockedUnblock,
  handleLockedUnlock,
}: {
  fetchWalletAddress: (userHash: string) => Promise<void>;
  handleBlockedUnblock: (userHash: string, status: boolean) => Promise<void>;
  handleLockedUnlock: (userHash: string, status: boolean) => Promise<void>;
}): ColDef<User>[] => [
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
    cellRenderer: ({ data }: ICellRendererParams<User>) =>
      data ? <StatusChip status={data.kycVerified} /> : null,
  },
  {
    headerName: "Account Status",
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams<User>) => {
      if (!data) return null;
      const status =
        data.login_attempt?.loginStatus !== "Active"
          ? "Locked"
          : data.blocked
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
    cellRenderer: ({ data }: ICellRendererParams<User>) =>
      data ? <p>{dateStringFormatter(data.createdAt)}</p> : null,
  },
  {
    headerName: "Action",
    width: 80,
    pinned: "right",
    sortable: false,
    cellRenderer: ({ data }: ICellRendererParams<User>) =>
      data ? (
        <UserActionMenu
          userData={data}
          fetchWalletAddress={fetchWalletAddress}
          handleBlockedUnblock={handleBlockedUnblock}
          handleLockedUnlock={handleLockedUnlock}
        />
      ) : null,
  },
];
