/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface AgGridTableProps {
  columnDefs: any[];
  rowData: any[];
  paginationPageSize?: number;
  loading?: boolean;
}

const CustomDataTable: React.FC<AgGridTableProps> = ({
  columnDefs,
  rowData,
  paginationPageSize = 10,
  loading,
}) => {
  const myTheme = themeQuartz.withParams({
    backgroundColor: "#2F2F2F",
    browserColorScheme: "dark",
    chromeBackgroundColor: {
      ref: "foregroundColor",
      mix: 0.07,
      onto: "backgroundColor",
    },
    foregroundColor: "#FFF",
    headerBackgroundColor: "#DCA955",
    headerFontSize: 14,
    oddRowBackgroundColor: "#1E1E20",
    rowVerticalPaddingScale: 1.5,
  });

  return (
    <div>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        theme={myTheme}
        pagination={true}
        loading={loading}
        paginationPageSize={paginationPageSize}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default CustomDataTable;
