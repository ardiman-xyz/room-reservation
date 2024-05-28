"use client"

import { MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import {Floor} from "@prisma/client";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import {DeleteAction} from "@/app/(admin)/master-data/building/_components/DeleteAction";
import {FloorWithBuilding} from "@/types/app";

export const columns: ColumnDef<FloorWithBuilding>[] = [
    {
        accessorKey: "name",
        header: "Nama",
        cell: ({row}) => {
            return <div className="font-bold">{row.original.name}</div>
        }
    },
    {
        id: "building",
        header: "Gedung",
        cell: ({row}) => {
            return <div className="font-bold">{row.original.building.name}</div>
        }
    },
    {
        accessorKey: "createdAt",
        header: "Dibuat",
        cell: ({row}) => {
            const dateFormat = new Date(row.original.createdAt).toLocaleString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });

            return <div className="">{dateFormat}</div>
        }
    },
    {
        id: "Aksi",
        header: "Aksi",
        cell: ({ row }) => {
            const handleDelete = () => {
                console.info(row.original.id)
            }

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
                            <Link href={`/master-data/floor/${row.original.id}/edit`}>
                                Ubah
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <DeleteAction id={row.original.id} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]