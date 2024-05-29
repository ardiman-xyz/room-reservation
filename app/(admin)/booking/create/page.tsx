import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import React from "react";
import { FilterRoom } from "./_components/filter";
import { SearchBookingRoom } from "./_components/search";

const CreateBookingPage = () => {
  return (
    <div>
      <div className="w-full mb-8 mt-4">
        <FilterRoom />
      </div>

      <div className="w-full mb-8 mt-4">
        <SearchBookingRoom />
      </div>

      <div className="flex gap-x-3">
        <div className="lg:w-1/2 w-full">
          <div className="w-full rounded p-4 bg-white flex gap-x-4 cursor-pointer hover:bg-blue-50 transition-all">
            <div className="w-[270px] bg-gray-200 rounded h-[150px] flex items-center justify-center">
              <Image className="h-8 w-8 stroke-slate-600" />
            </div>
            <div className=" w-full flex flex-col justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Gedung A, Lantai 1
                </p>
                <h3 className="text-lg font-semibold">
                  Ruangan Teleconference
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full">kanan</div>
      </div>
    </div>
  );
};

export default CreateBookingPage;
