import React from "react";
import DetailRoom from "./_components/detail-room";
import FormReservationRoom from "./_components/form-reservation-room";
import { getRoomById } from "@/data/room";

const ConfirmationPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      <div>
        <DetailRoom id={id} />
      </div>
      <div className="mt-5">
        <FormReservationRoom id={id} />
      </div>
    </div>
  );
};

export default ConfirmationPage;
