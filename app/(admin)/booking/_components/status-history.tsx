"use client";
import {useState} from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import {BookingLog} from "@prisma/client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import StatusBadge from "@/app/(admin)/booking/_components/status-badge";
import {Hint} from "@/components/ui/Hint";
import {History} from "lucide-react";

interface IProps {
    data: BookingLog[]
}

export const StatusHistory = ({ data }: IProps) => {

    const [isSheetShown, setIsSheetShown] = useState<boolean>(false);

    const toggleSheetShown = () => setIsSheetShown(!isSheetShown);

    return (
        <div>
            <div className="flex items-center gap-x-1 mt-2 cursor-pointer">
                <Hint description={"Lihat riwayat"}>
                    <p className="hover:text-blue-500 hover:underline text-muted-foreground"
                       onClick={toggleSheetShown}>
                        <History className="size-4" />
                    </p>
                </Hint>
            </div>

            <Sheet open={isSheetShown} onOpenChange={() => setIsSheetShown(false)}>
            <SheetContent className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                        <SheetTitle>Riwayat Perubahan Status Ajuan</SheetTitle>
                        <SheetDescription>
                            Lihat riwayat perubahan status ajuan Anda, termasuk tanggal dan deskripsi setiap perubahan.
                        </SheetDescription>
                    </SheetHeader>

                    <ul className="mt-8 flex flex-col gap-y-4">
                        {
                            data.map((item) => (
                                <li key={item.id} className="flex gap-x-4">
                                    <div className="">
                                        <StatusBadge status={item.status}/>
                                    </div>
                                    <div className="bg-gray-100 rounded-sm p-2">
                                        <p className="text-base text-muted-foreground ">
                                            {item.description}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm', {locale: id})}</p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </SheetContent>
            </Sheet>

        </div>
    )
}