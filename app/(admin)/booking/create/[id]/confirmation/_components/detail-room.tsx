import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DetailRoom = () => {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList>
        <TabsTrigger value="account">Detail ruangan</TabsTrigger>
        <TabsTrigger value="password">Jadwal Ruangan</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Aula</CardTitle>
            <CardDescription>Gedung A, Lantai 1</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-normal text-muted-foreground">
                  Status
                </p>
                <div className="flex items-center gap-x-2 mt-1">
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                  <p className="text-sm ">Tersedia hari ini</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-normal text-muted-foreground">
                  Fasilitas
                </p>
                <div className="flex items-center gap-x-2 mt-1">
                  <p className="text-sm ">Tersedia</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-normal text-muted-foreground">
                  Daya Tampung
                </p>
                <div className="flex items-center gap-x-2 mt-1">
                  <p className="text-sm ">100 Orang</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Jadwal</CardTitle>
            <CardDescription>
              List detail jadwal peminjaman ruangan{" "}
              <Badge className="rounded-sm bg-gray-100 text-gray-700 hover:bg-gray-100">
                Aula
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No.</TableHead>
                  <TableHead>Peminjam</TableHead>
                  <TableHead>Tanggal Kegiatan</TableHead>
                  <TableHead>Perihal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DetailRoom;
