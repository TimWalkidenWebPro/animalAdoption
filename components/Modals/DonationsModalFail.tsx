"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const DonationsModalFail = () => {
  const [showModal, setShowModal] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams?.get("canceled");
  useEffect(() => {
    setShowModal(!!search);
  }, [search]);
  return (
    <div
      id="popup-modal"
      className={`${
        showModal ? "flex" : "hidden"
      } bg-overlay overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow text-center">
          <div className="flex items-center justify-center bg-yellow-600 p-8 rounded-t-lg">
            <svg
              width="60"
              height="60"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
          </div>

          <div className="px-8 pb-8 pt-4">
            <h2 className="font-bold text-2xl my-4">Warning</h2>
            <p>Payment was not completed successfully</p>
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="rounded-3xl font-bold text-white bg-yellow-600 w-24 mt-8 p-2"
            >
              close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DonationsModalFailOuter = () => {
  return (
    <Suspense>
      <DonationsModalFail />
    </Suspense>
  );
};

export default DonationsModalFailOuter;
