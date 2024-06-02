"use client";

import React, { useState } from "react";
import { BookingLogStatus } from "@prisma/client";

import { Hint } from "@/components/ui/Hint";

import StatusBadge from "./status-badge";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import ContainerModal from "@/components/modals/container-modal";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface IProps {
  status: BookingLogStatus;
  bookingId: string;
}

const StatusAction = ({ status, bookingId }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toogleModal = () => setIsModalOpen(!isModalOpen);

  const onDelete = () => {
    console.log(bookingId);
  };

  return (
    <div>
      <div onClick={toogleModal}>
        <Hint description="Ubah status" side="top" sideOffset={5}>
          <StatusBadge status={status} />
        </Hint>
      </div>
      <ContainerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div>modal</div>
      </ContainerModal>
    </div>
  );
};

export default StatusAction;
