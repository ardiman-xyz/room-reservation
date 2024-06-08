import { Badge } from "@/components/ui/badge";
import { BookingLogStatus } from "@prisma/client";
import React from "react";

interface StatusBadgeProps {
  status: BookingLogStatus;
}

const statusColors = {
  [BookingLogStatus.SUBMITTED]: "bg-yellow-500 hover:bg-yellow-600 text-white",
  [BookingLogStatus.APPROVED]: "bg-green-500 hover:bg-green-600 text-white",
  [BookingLogStatus.REJECTED]: "bg-red-500 hover:bg-red-500 text-white",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colorClass = statusColors[status] || "bg-gray-500 text-white";

  return (
    <Badge
      className={`px-2 py-1 text-xs rounded w-[90px] flex items-center justify-center ${colorClass}`}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
