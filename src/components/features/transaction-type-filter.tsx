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

const TransactionTypeRadioFilter = ({
  state,
  onStateChange,
  onAction,
  buttons,
}: Props) => {
  const initialValue = typeof state.model?.filter === "string" ? state.model.filter : "";
  const [selectedValue, setSelectedValue] = useState<string>(initialValue);

  const refInput = useRef<HTMLInputElement>(null);

  const afterGuiAttached = useCallback((params?: IAfterGuiAttachedParams) => {
    if (!params?.suppressFocus) {
      refInput.current?.focus();
    }
  }, []);

  useGridFilterDisplay({ afterGuiAttached });

  const handleChange = (value: string) => {
    setSelectedValue(value);

    onStateChange({
      model: {
        type: "equals",
        filterType: "text",
        filter: value.toLowerCase(),
      },
    });

    if (!buttons?.includes("apply")) {
      onAction("apply");
    }
  };

  return (
    <div className="space-y-2 p-2 text-sm">
      <div className="font-medium">Filter by Transaction Type</div>
      {allowedTransactionTypes.map(({ label, value }, index) => (
        <label key={value} className="flex items-center gap-1">
          <input
            ref={index === 0 ? refInput : undefined}
            type="radio"
            name="transactionType"
            checked={selectedValue === value}
            onChange={() => handleChange(value)}
          />
          {label}
        </label>
      ))}
    </div>
  );
};

export default TransactionTypeRadioFilter;
