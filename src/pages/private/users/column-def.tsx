/* eslint-disable @typescript-eslint/no-explicit-any */
import UserActionMenu from "@/components/features/user-action-menu";
import StatusChip from "@/components/status-chip";
import { dateStringFormatter } from "@/utils/format-helper";

export const usersColumnDefs = [
  { headerName: "ID", field: "id", width: 100, filter: "agNumberColumnFilter" },
  {
    headerName: "First Name",
    field: "firstName",
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "Last Name",
    field: "lastName",
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "Username",
    field: "username",
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "Email",
    field: "email",
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "Country",
    field: "country",
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "KYC Status",
    field: "kycVerified",
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: (params: any) => (
      <StatusChip status={params.data.kycVerified} />
    ),
  },
  {
    headerName: "Account Status",
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: (params: any) => {
      const status = params.data?.login_attempt?.loginStatus !== 'Active' ? 'Locked' : params.data.blocked === true ? 'Blocked' : 'Active'
      return(
      <StatusChip status={status} />
    )},
  },
  {
    headerName: "Created At",
    field: "createdAt",
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: (params: any) => (
      <p>{dateStringFormatter(params.data?.createdAt)}</p>
    ),
  },
  {
    headerName: "Action",
    field: "action",
    width: 80,
    pinned: "right",
    cellRenderer: (params: any) => <UserActionMenu userData={params.data} />,
  },
];
