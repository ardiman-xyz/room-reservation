"use client";

import React, {useState, useTransition} from "react";
import { BookingLogStatus } from "@prisma/client";
import {toast} from "sonner";

import StatusBadge from "./status-badge";

import { Hint } from "@/components/ui/Hint";
import ContainerModal from "@/components/modals/container-modal";
import {DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Textarea} from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {updateStatus} from "@/actions/booking";
import {useRouter} from "next/navigation";

interface IProps {
  status: BookingLogStatus;
  bookingId: string;
}

const StatusAction = ({ status, bookingId }: IProps) => {

  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [statusData, setStatusData] = useState<BookingLogStatus|string>(status);
  const [description, setDescription] = useState("");

  const handleSelectChange = (e: string) => {
      setStatusData(e)
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;

      setDescription(value)
  }

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const onSubmit = () => {
    if(statusData === "SUBMITTED") {
      toast.error("Anda tidak dapat memilih status SUBMITTED");
      return
    }

    startTransition(() => {
      updateStatus(bookingId, statusData as BookingLogStatus , description).then((data) => {
        if(data?.success) {
          router.refresh();
          toggleModal()
        }
      })
    })
  }

  return (
    <div>
      <div onClick={toggleModal}>
        <Hint description="Ubah status" side="top" sideOffset={5}>
          <StatusBadge status={status} />
        </Hint>
      </div>
      <ContainerModal
        isOpen={isModalOpen}
        title="Ubah status pengajuan"
        onClose={() => setIsModalOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Ubah status pengajuan</DialogTitle>
          <DialogDescription>
            Silahkan pilih status pengajuan
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-y-6 flex-col">
          <div>
            <Select defaultValue={statusData} onValueChange={handleSelectChange} disabled={isPending}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SUBMITTED">SUBMITTED</SelectItem>
                <SelectItem value="APPROVED">APPROVED</SelectItem>
                <SelectItem value="REJECTED">REJECTED</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2 block">
              Deskripsi
            </Label>
            <Textarea disabled={isPending} placeholder="Masukkan pesan..." value={description} onChange={handleTextareaChange}  />
          </div>
          <div>
            <Button className="w-full h-8" onClick={onSubmit} disabled={isPending}>
              Simpan
            </Button>
          </div>
        </div>
      </ContainerModal>
    </div>
  );
};

export default StatusAction;
