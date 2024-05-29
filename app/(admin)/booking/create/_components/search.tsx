import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SearchBookingRoom = () => {
  return (
    <div className="lg:w-1/2 w-full flex gap-x-2">
      <Input placeholder="Cari..." className="h-8 mr-3" />
      <Button className="h-8" variant="outline">
        Clear
      </Button>
      <Button className="h-8">Cari</Button>
    </div>
  );
};
