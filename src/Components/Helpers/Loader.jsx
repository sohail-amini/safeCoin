import React, { useContext } from "react";
import { GlobalContext } from "../../App";

export const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center pt-52">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 dark:text-slate-200 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};
