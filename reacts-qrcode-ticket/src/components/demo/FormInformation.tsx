"use client";

// import { BackgroundBeams } from "../ui/background-beams";
import React, { useEffect, useState } from "react";
import { FormContent } from "./FormContent";
import "../../App.css";
import Loading from "./Loading";

export function FormInformation() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="min-h-screen w-full rounded-md  relative flex flex-col items-center justify-center antialiased">
            <div className="z-0 absolute inset-0">
              {/* <BackgroundBeams /> */}
            </div>
            <div className="mx-auto py-5 z-10 relative ">
              <FormContent />
            </div>
          </div>
        </>
      )}
    </>
  );
}
