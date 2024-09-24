import React from "react";

const ResetPassword = () => {
  return (
    <div className="bg-[#F5F6FA] h-screen flex items-center justify-center px-[35px] md:px-0">
      <div className="w-full md:w-[80%] lg:w-[748px] h-max lg:h-[652px] bg-white shadow-md rounded-lg flex items-center justify-center flex-col py-16 lg:py-0 md:px-10 lg:px-0">
        <div className="px-[29px] py-[20px]">
          <h1 className="text-pc_blue font-gilroy_semibold font-semibold text-[30px] md:text-[36px] leading-tight text-start lg:text-center">
            Reset Password
          </h1>
          <p className="font-gilroy_light font-extralight text-pc_black/70 mt-1 text-center">
            Enter your new password
          </p>
        </div>

        <div className="px-[29px] lg:px-32 w-full mt-10">
          <div className="flex flex-col items-start justify-start w-full">
            <label
              htmlFor="new password"
              className="font-gilroy_light font-extralight"
            >
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="rounded-lg mt-3 px-6 py-4 w-full placeholder:text-[#939393] placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border border-[#939393]"
            />
          </div>
          <div className="flex flex-col items-start justify-start w-full mt-3 lg:mt-7">
            <input
              type="password"
              placeholder="Confirm new password"
              className="rounded-lg mt-3 px-6 py-4 w-full placeholder:text-[#939393] placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border border-[#939393]"
            />
          </div>

          <div className="flex items-center justify-center flex-col w-full mx-auto mt-4">
            <button className="mb-4 rounded-lg mt-3 px-6 py-4 w-full bg-pc_orange text-white font-gilroy_semibold font-semibold hover:shadow-md hover:outline hover:outline-slate-200 transition-shadow duration-150 ease-linear capitalize">
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
