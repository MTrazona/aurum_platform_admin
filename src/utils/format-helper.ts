import type { TransactionData } from "@/types/transaction.types";
import moment from "moment";

function maskName(name?: string): string | undefined {
  if (!name || name.length <= 1) return name;
  const firstLetter = name.charAt(0);
  const maskedPart = "*".repeat(name.length - 1);
  return firstLetter + maskedPart;
}

const dateFormatter = (date: string | Date): string =>
  moment(date).format("MMMM DD, YYYY");

const dateStringFormatter = (date: string | Date): string =>
  moment(date).format("MMMM DD, YYYY hh:mm A");

function formatPrice(amount: number, currency: string = "PHP"): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  });
}

export const formatTransactionCode = (code: string): string => {
  if (!code) return "";
  const start = code.slice(0, 7);
  const end = code.slice(-4);
  return `${start}...${end}`;
};

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatNumber(value: string | number, decimalPlaces: number = 2): string {
  const number = parseFloat(value as string);
  if (isNaN(number)) return value?.toString();

  const abs = Math.abs(number);

  if (abs < 1_000_000) {
    // Show comma-separated numbers up to < 1M
    return number.toLocaleString("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });
  }

  // 1M and above — format using M or B
  let divisor = 1;
  let suffix = "";

  if (abs >= 1_000_000_000) {
    divisor = 1_000_000_000;
    suffix = "B";
  } else if (abs >= 1_000_000) {
    divisor = 1_000_000;
    suffix = "M";
  }

  const result = number / divisor;
  return `${result.toFixed(decimalPlaces)}${suffix}`;
}




function PriceFormat(
  value: string | number,
  details?: TransactionData,
  isQMGT?: boolean,
  key?: "fromValue" | "toValue"
): string {
  let numericValue = Number(value);
  let currency = "";

  if (details && key) {
    const extractedValue = details[key];
    numericValue = Number(extractedValue);

    if (key === "fromValue") {
      currency = details.fromCurrency;
    } else if (key === "toValue") {
      currency = details.toCurrency;
    }

    const transactionType = details.transactionType?.toLowerCase();
    const isGaeType =
      transactionType === "gae" ||
      transactionType === "gae extra" ||
      transactionType === "gae ph";

    if (isGaeType) {

      return key === 'toValue' ? '--' : `${numericValue} ${numericValue > 1 ? "Units" : "Unit"}`;
    }
  }

  const decimalPlaces = isQMGT ? 6 : 2;
  const formattedValue = formatNumber(numericValue, decimalPlaces);

  return isQMGT
    ? `${formattedValue} QMGT`
    : `${currency ? currency : 'USDT'} ${formattedValue}`;
}



export const setCookie = (
  name: string,
  value: string,
  minutes: number
): void => {
  const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

function maskEmail(email?: string): string | undefined {
  if (!email || !email.includes("@")) return email;

  const [localPart, domain] = email.split("@");
  return `${localPart}****@${domain}`;
}

export const getContrastColor = (hex: string): string => {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000" : "#fff";
};

export {
  maskName,
  formatPrice,
  toTitleCase,
  dateFormatter,
  dateStringFormatter,
  formatNumber,
  PriceFormat,
  maskEmail,
};
