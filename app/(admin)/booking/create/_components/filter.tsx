import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const FilterRoom = () => {
  return (
    <div className="flex gap-x-4">
      <Select>
        <SelectTrigger className="w-[300px] h-8">
          <SelectValue placeholder="Pilih Gedung" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Gedung A</SelectItem>
          <SelectItem value="dark">Gedung B</SelectItem>
          <SelectItem value="system">Gedung C</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[300px] h-8">
          <SelectValue placeholder="Pilih Lantai" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Lantai 1</SelectItem>
          <SelectItem value="dark">Lantai 2</SelectItem>
          <SelectItem value="system">Lantai 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
