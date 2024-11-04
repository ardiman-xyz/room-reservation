"use client";

import React from "react";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const Jumbotron = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/register");
  };

  const onCreateAccount = () => {
    router.push("/account");
  };

  return (
    <div className="flex lg:flex-row flex-col gap-x-20">
      <div className="lg:w-1/2 w-full lg:order-1 order-2 lg:mt-0 mt-10">
        <h1 className="text-black font-semibold text-3xl lg:text-7xl">
          Reservasi dengan Mudah{" "}
        </h1>
        <p className="lg:mt-6 mt-3 text-md text-muted-foreground ">
          Pesan ruangan yang tepat untuk rapat, acara, atau pertemuan Anda
          dengan mudah. Sistem kami menyederhanakan proses pemesanan untuk Anda.
        </p>
        <div className="mt-10 flex gap-x-3 w-full">
          <Button
            variant="primary"
            size="xl"
            className="w-full lg:w-max"
            onClick={onClick}
          >
            Buat Akun
          </Button>
        </div>
      </div>
      <div className="lg:w-1/2 w-full lg:mt-0 lg:order-2 order-1">
        <Image
          src="/images/umk.jpeg"
          alt="image"
          width={700}
          height={400}
        />
      </div>
    </div>
  );
};
