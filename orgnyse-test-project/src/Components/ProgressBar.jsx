import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProgressBar = ({ progressPercentage, handleSubmit }) => {
  const nav = useNavigate();
  const location = useLocation();

  const isSubmit = location.pathname === "/checkout" ? true : false;

  if (isSubmit) {
    progressPercentage = 70;
  } else {
    progressPercentage = 40;
  }

  return (
    <div className="w-full">
      <div className="hidden sm:block h-1 w-full bg-gray-300">
        <div
          style={{ width: `${progressPercentage}%` }}
          className="h-full bg-primary"
        ></div>
      </div>

      <div className="flex justify-around mt-8 mb-6">
        <div className="">
          <button
            onClick={() => nav("/")}
            className="border hidden sm:block border-outerline rounded-md pl-6 pr-6 pt-2 pb-2 text-black"
          >
            back
          </button>
        </div>
        <div className="hidden sm:block">
          <p>Questions</p>
        </div>
        <div className="flex items-center flex-grow sm:flex-initial"> 
          <div className="sm:hidden flex-grow"></div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-primary rounded-md pl-6 pr-6 pt-2 pb-2 text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
