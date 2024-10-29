"use client";

import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModalTerms } from "./modal-terms";
import { Logo } from "@/components/logo";

export const TopBar = () => {
  const router = useRouter();

  const [showModalTerms, setModalTerms] = useState<boolean>(false);

  return (
    <div className="h-[74px] w-full">
      <div className="flex items-center h-full text-sm justify-between">
        <div className="flex items-center">
          <Logo />
          <h1 className="text-lg font-semibold ml-3">Sim Ruang</h1>
        </div>
        <ul className="flex items-center gap-x-4">
          <li className="hover:underline cursor-pointer flex items-center gap-x-2">
            <Info className="h-4 w-4" />
            <ModalTerms />
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
