"use client";

import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { format, formatDistanceToNowStrict } from "date-fns";
import { id } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { DeleteAction } from "@/app/(admin)/master-data/building/_components/DeleteAction";
import { BookingWithRelations } from "@/types/app";
import StatusAction from "./_components/status-action";
import {StatusHistory} from "./_components/status-history";

export const columns: ColumnDef<BookingWithRelations>[] = [
  {
    id: "index",
    header: "No.",
    cell: ({ row }) => {
      return <div className="">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Peminjam",
    cell: ({ row }) => {
      const { user } = row.original;

      return (
        <div>
          <h3 className="font-bold">{user.name}</h3>
          <p className="text-xs text-muted-foreground font-normal">
            {user.role}
          </p>
        </div>
      );
    },
  },
  {
    id: "room",
    header: "Ruangan",
    cell: ({ row }) => {
      const { room } = row.original;

      return (
        <div>
          <h3 className="font-bold">{room.name}</h3>
          <p className="text-xs text-muted-foreground font-normal">
            {room.Floor.name}, {room.Floor.building.name}
          </p>
        </div>
      );
    },
  },
  {
    id: "date_activity",
    header: "Tanggal Kegiatan",
    cell: ({ row }) => {
      const { startDate, endDate } = row.original;

      const formattedStartDate = format(
        new Date(startDate),
        "dd MMMM yyyy HH:mm",
        { locale: id }
      );
      const formattedEndDate = format(new Date(endDate), "dd MMMM yyyy HH:mm", {
        locale: id,
      });

      return (
        <div>
          <div>
            Mulai:{" "}
            <span className="text-muted-foreground">{formattedStartDate}</span>
          </div>
          <div>
            Selesai:{" "}
            <span className="text-muted-foreground">{formattedEndDate}</span>
          </div>
        </div>
      );
    },
  },
  {
    id: "purpose",
    header: "Kegiatan",
    cell: ({ row }) => {
      const { purpose } = row.original;

      return (
        <div>
          <p className="text-muted-foreground font-normal truncate hover:text-clip">
            {purpose}
          </p>
        </div>
      );
    },
  },
  {
    id: "created_at",
    header: "Dibuat",
    cell: ({ row }) => {
      const { createdAt } = row.original;

      const createdAtText = formatDistanceToNowStrict(new Date(createdAt), {
        locale: id,
        addSuffix: true,
      });

      return <div>{createdAtText}</div>;
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const { BookingLog, id } = row.original;

      if (BookingLog && BookingLog.length > 0) {
        const latestLog = BookingLog.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];
        return (
          <div className="flex items-center gap-x-2">
            <StatusAction status={latestLog.status} bookingId={id} />
            {BookingLog.length > 1 && (
                <StatusHistory data={BookingLog} />
            )}
          </div>
        );
      }
    },
  },
  {
    id: "Aksi",
    header: "Aksi",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/master-data/building/${row.original.id}/edit`}>
                Ubah
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteAction id={row.original.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
