"use client";

import React, { Suspense } from "react";
import Roomcomponent from "../components/Room";

const Room = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center text-[#B6B09F] text-lg font-semibold">
          Loading Room...
        </div>
      }
    >
      <Roomcomponent />
    </Suspense>
  );
};

export default Room;
