"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const TopBar = () => {
  const router = useRouter();

  return (
    <div className="h-[74px] w-full">
      <div className="flex items-center h-full text-sm justify-between">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
          <h1 className="text-lg font-semibold ml-3">Sim Ruang</h1>
        </div>
        <ul className="flex items-center gap-x-4">
          <li
            className="hover:underline cursor-pointer"
            onClick={() => router.push("/info")}
          >
            Cara Penggunaan
          </li>
          <li>
            <div />
          </li>
          <li>
            <Button
              variant="primary"
              size="primary"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};
