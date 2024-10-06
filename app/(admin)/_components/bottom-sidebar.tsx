import React from "react";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const BottomSidebar = () => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="p-2 pt-0 md:p-4">
        <CardTitle>Informasi</CardTitle>
        <CardDescription>IPanduan Lengkap Penggunaan Sistem.</CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        <Button
          size="sm"
          className="w-full h-8"
          onClick={() => router.push("/tutorial")}
        >
          <Play className="size-4 mr-2" />
          Selengkapnya
        </Button>
      </CardContent>
    </Card>
  );
};
