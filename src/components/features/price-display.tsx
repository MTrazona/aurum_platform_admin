import type { TransactionsType } from "@/types/buy-request.types";
import { formatNumber } from "@/utils/format-helper";

interface CurrencyDisplayProps {
  value: string | number;
}
interface UnitValueDisplayProps {
  data: TransactionsType;
}

interface ConversionDisplayProps {
  currency: string;
  fromValue: string | number;
  rate: string | number;
}

export const PHPDisplay = ({ value }: CurrencyDisplayProps) => (
  <p>PHP {formatNumber(value)}</p>
);

export const USDTDisplay = ({ value }: CurrencyDisplayProps) => (
  <p>USDT {formatNumber(value)}</p>
);

export const QMGTDisplay = ({ value }: CurrencyDisplayProps) => (
  <p>{formatNumber(value, 6)} QMGT</p>
);
export const GAEDisplay = ({ value }: CurrencyDisplayProps) => (
  <p>
    {value} {Number(value) > 1 ? "Units" : "Unit"}
  </p>
);
export const ConversionDisplay = ({ currency, fromValue, rate }: ConversionDisplayProps) => (
  <p>
    {currency} {formatNumber(Number(fromValue) * Number(rate))}
  </p>
);

export const UnitValueDisplay: React.FC<UnitValueDisplayProps> = ({ data }) => {
  const isPlural = Number(data.fromValue) > 1;
  const unitText = isPlural ? "Units" : "Unit";
  const unitVlaue = data.fromCurrency === 'PHP' ? Number(data.gaeTotalUnitValue ?? 0) * Number(data.usdRate ?? 0) : (data.gaeTotalUnitValue ?? 0)
  const totalValue = formatNumber(unitVlaue);

  return (
    <p>
      {data.fromValue} {unitText} = {data.fromCurrency} {totalValue}
    </p>
  );
};
