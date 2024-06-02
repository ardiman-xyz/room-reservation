import React from "react";
import { PlusCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { getAllData } from "@/data/booking";
import { DataTable } from "./data-datable";
import { columns } from "./column";

const BookingPage = async () => {
  const bookings = await getAllData();

  return (
    <div className="">
      <div className="flex justify-end items-center gap-2 mb-2">
        <Link href={"/booking/create"}>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Buat pinjaman
            </span>
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Peminjaman</CardTitle>
          <CardDescription>List data peminjaman</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={bookings} />
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage;
