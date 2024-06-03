"use client"

import {toast} from "sonner";
import {useRouter} from "next/navigation";

import {ConfirmModal} from "@/components/modals/confirm-modal";
import {deleteById} from "@/actions/booking";

interface IDeleteAction {
    id: string;
}

export const DeleteAction =  ({id}: IDeleteAction) => {

    const router = useRouter()

    const onDelete = () => {

       const promise = deleteById(id);

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