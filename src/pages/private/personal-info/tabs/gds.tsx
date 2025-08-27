import type React from "react";
import CustomDataTable from "@/components/custom-data-table";
import type { Group } from "@/types/personalinfo";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { formatNumber, dateStringFormatter } from "@/utils/format-helper";

type GDSTabProps = {
  groups: Group[];
  loading?: boolean;
};

const columnDefs: ColDef<Group>[] = [
  { headerName: "Group Name", field: "groupName", sortable: true, filter: "agTextColumnFilter" },
  { headerName: "Group Wallet", field: "groupWallet", sortable: true, filter: "agTextColumnFilter" },
  { headerName: "Status", field: "groupStatus", sortable: true, filter: "agTextColumnFilter" },
  { headerName: "Currency", field: "currency", sortable: true, filter: "agTextColumnFilter" },
  {
    headerName: "Initial Contribution",
    field: "initialContri",
    sortable: true,
    filter: "agNumberColumnFilter",
    cellRenderer: ({ data }: ICellRendererParams<Group>) => (data ? `$ ${formatNumber(data.initialContri)}` : null),
  },
  {
    headerName: "Monthly Contribution",
    field: "monthlyContri",
    sortable: true,
    filter: "agNumberColumnFilter",
    cellRenderer: ({ data }: ICellRendererParams<Group>) => (data ? `$ ${formatNumber(data.monthlyContri)}` : null),
  },
  { headerName: "Members", field: "members", sortable: true, filter: "agTextColumnFilter" },
  { headerName: "No. Members", field: "noMembers", sortable: true, filter: "agNumberColumnFilter" },
  {
    headerName: "Start Date",
    field: "startDate",
    sortable: true,
    filter: "agDateColumnFilter",
    cellDataType: "dateTime",
    valueFormatter: (p) => (p.value ? dateStringFormatter(p.value as string) : ""),
  },
  {
    headerName: "End Date",
    field: "endDate",
    sortable: true,
    filter: "agDateColumnFilter",
    cellDataType: "dateTime",
    valueFormatter: (p) => (p.value ? dateStringFormatter(p.value as string) : ""),
  },
];

const GDSTab: React.FC<GDSTabProps> = ({ groups, loading = false }) => {
  return (
    <div className="space-y-4">
      <CustomDataTable columnDefs={columnDefs} rowData={groups || []} loading={loading} />
    </div>
  );
};

export default GDSTab;

