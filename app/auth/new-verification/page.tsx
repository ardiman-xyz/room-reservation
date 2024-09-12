"use client";

import { Suspense } from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import VerificationContent from "./VerificationContent";

const NewVerificationPage = () => {
  return (
    <CardWrapper
      headerLabel={"Confirming your email"}
      backButtonLabel={"Back to login"}
      backButtonHref={"/auth/login"}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <VerificationContent />
      </Suspense>
    </CardWrapper>
  );
};

export default NewVerificationPage;
