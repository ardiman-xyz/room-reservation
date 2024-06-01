import React from "react";
import DetailRoom from "./_components/detail-room";
import FormReservationRoom from "./_components/form-reservation-room";

const ConfirmationPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <div>
        <DetailRoom />
      </div>
      <div className="mt-5">
        <FormReservationRoom id={params.id} />
      </div>
    </div>
  );
};

export default ConfirmationPage;
