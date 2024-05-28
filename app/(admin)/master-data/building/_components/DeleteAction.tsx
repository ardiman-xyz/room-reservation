"use client"

import {toast} from "sonner";
import {useRouter} from "next/navigation";

import {ConfirmModal} from "@/components/modals/confirm-modal";
import {deleteBuilding} from "@/actions/building";

interface IDeleteAction {
    id: string;
}

export const DeleteAction =  ({id}: IDeleteAction) => {

    const router = useRouter()

    const onDelete = () => {

       const promise = deleteBuilding(id);

       toast.promise(promise, {
           loading: "Menghapus data",
           success: "Gedung berhasil dihapus",
           error: "Gagal mengapus data",
           finally: () => {
               router.refresh();
           }
       });
    }

    return (
        <ConfirmModal onConfirm={onDelete}>
            <div>
                Hapus
            </div>
        </ConfirmModal>
    )
}