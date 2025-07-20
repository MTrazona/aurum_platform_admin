import React from "react";
import clsx from "clsx";

interface StatusChipProps {
  status: string;
}

const statusColors: Record<string, string> = {
  Verified: "bg-green-100 text-green-800",
  Completed: "bg-green-100 text-green-800",
  "Not Verified": "bg-gray-100 text-gray-800",
  Rejected: "bg-red-100 text-red-800",
  Blocked: "bg-red-100 text-red-800",
  Active: "bg-blue-100 text-blue-800",
  Inactive: "bg-yellow-100 text-yellow-800",
  Pending: "bg-orange-100 text-orange-800",
  Default: "bg-muted text-muted-foreground",
};

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const colorClass = statusColors[status] || statusColors["Default"];

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-3 py-0.5 text-xs font-medium min-w-24",
        colorClass
      )}
    >
      {status}
    </span>
  );
};

export default StatusChip;
