import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchBookingRoom = () => {
  return (
    <div className="w-full flex gap-x-2">
      <Input placeholder="Cari..." className=" mr-3" />
      <Button className="flex items-center">
        <Search className="h-4 w-4 mr-2" />
        Cari
      </Button>
    </div>
  );
};
