/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  type GridOptions,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface AgGridTableProps {
  columnDefs: any[];
  rowData: any[];
  paginationPageSize?: number;
  loading?: boolean;
  gridOptions?: GridOptions;
  className?: string;
  onGridReady?: (params: any) => void;
  gridRef?: React.RefObject<any>;
}

const CustomDataTable: React.FC<AgGridTableProps> = ({
  columnDefs,
  rowData,
  paginationPageSize = 20,
  loading = false,
  gridOptions = {},
  className = "",
  gridRef,
  onGridReady,
}) => {
  const internalGridRef = useRef<any>(null);
  const activeRef = gridRef || internalGridRef;

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

  // Show/hide AG Grid loading overlay
  useEffect(() => {
    if (activeRef.current?.api) {
      if (loading) {
        activeRef.current.api.showLoadingOverlay();
      } else {
        activeRef.current.api.hideOverlay();
      }
    }
  }, [loading, activeRef]);

  return (
    <div className={`ag-theme-quartz ${className}`}>
      <AgGridReact
        ref={activeRef}
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={paginationPageSize}
        domLayout="autoHeight"
        onGridReady={onGridReady}
        {...gridOptions}
        theme={myTheme}
      />
    </div>
  );
};

export default CustomDataTable;
