/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  FilterWrapperParams,
  IAfterGuiAttachedParams,
  TextFilterModel,
} from "ag-grid-community";
import type { CustomFilterDisplayProps } from "ag-grid-react";
import { useGridFilterDisplay } from "ag-grid-react";
import { useCallback, useRef, useState } from "react";

type Props = CustomFilterDisplayProps<any, any, TextFilterModel> &
  FilterWrapperParams;

const allowedTransactionTypes = [
  { label: "Buy", value: "buy" },
  { label: "Sell", value: "sell" },
  { label: "Gold Convert", value: "gold convert" },
  { label: "GAE", value: "gae" },
  { label: "GAE Extra", value: "gae extra" },
  { label: "GAE PH", value: "gae ph" },
];

const TransactionTypeMultiSelectFilter = ({
  state,
  onStateChange,
  onAction,
  buttons,
}: Props) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(state.model?.filter)
      ? state.model.filter
      : state.model?.filter?.split("|") || []
  );

  const refInput = useRef<HTMLInputElement>(null);

  const afterGuiAttached = useCallback((params?: IAfterGuiAttachedParams) => {
    if (!params?.suppressFocus) {
      refInput.current?.focus();
    }
  }, []);

  useGridFilterDisplay({ afterGuiAttached });

  const handleChange = (value: string) => {
    let updated: string[];

    if (selectedValues.includes(value)) {
      updated = selectedValues.filter((v) => v !== value);
    } else {
      updated = [...selectedValues, value];
    }

    setSelectedValues(updated);

    const joined = updated.map((v) => v.toLowerCase()).join("|");

    console.log("[FILTER] Updated selected values:", updated);
    console.log("[FILTER] Pipe-joined filter string:", joined);

    onStateChange({
      model:
        updated.length === 0
          ? null
          : {
              type: "equals",
              filterType: "text",
              filter: joined,
            },
    });

    if (!buttons?.includes("apply")) {
      console.log("[FILTER] Auto-applying filter");
      onAction("apply");
    }
  };

  return (
    <div className="space-y-2 p-2 text-sm">
      <div className="font-medium">Filter by Transaction Type</div>
      {allowedTransactionTypes.map(({ label, value }) => (
        <label key={value} className="flex items-center gap-1">
          <input
            ref={refInput}
            type="checkbox"
            checked={selectedValues.includes(value)}
            onChange={() => handleChange(value)}
          />
          {label}
        </label>
      ))}
    </div>
  );
};

export default TransactionTypeMultiSelectFilter;
