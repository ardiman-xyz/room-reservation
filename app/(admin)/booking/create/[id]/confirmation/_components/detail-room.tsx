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
import { Room } from "@prisma/client";
import { getRoomByIdAndStatus } from "@/data/room";

interface DetailRoomProps {
  id: string;
}

const DetailRoom = async ({ id }: DetailRoomProps) => {
  const data = await getRoomByIdAndStatus(id);

  if (!data.room) return null;

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList>
        <TabsTrigger value="account">Detail ruangan</TabsTrigger>
        <TabsTrigger value="password">Jadwal Ruangan</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle className="capitalize">{data.room.name}</CardTitle>
            <CardDescription>
              {data.room.Floor.building.name}, {data.room.Floor.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-normal text-muted-foreground">
                  Status
                </p>
                <div className="flex items-center gap-x-2 mt-1">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      data.status ? "bg-green-400" : "bg-red-400"
                    }`}
                  />
                  <p className="text-sm ">{data.statusText}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-normal text-muted-foreground">
                  Fasilitas
                </p>
                <div className="flex items-center gap-x-2 mt-1">
                  <p className="text-sm ">{data.room.facilities}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-normal text-muted-foreground">
                  Daya Tampung
                </p>
                <div className="flex items-center gap-x-2 mt-1">
                  <p className="text-sm ">{data.room.capacity} Orang</p>
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
          <CardContent>Belum ada</CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DetailRoom;
