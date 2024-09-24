import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    setIsLoading(true);
    const apiUrl = `https://backend.pluralcode.institute/student/otp?email=${email}`;
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const result = await response.json();
      if (response.ok) {
        console.log("API Response:", result);
        toast.success("Verification code sent to your email.");
        localStorage.setItem("hashnode", result.encrypted_data);
        localStorage.setItem("userEmail", email);
        setTimeout(() => {
          navigate("/verifycode");
        }, 2000);
      } else {
        console.error("API Error:", result.message);
        toast.error("An error occurred while sending the verification code.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("An error occurred while sending the verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F5F6FA] h-screen flex items-center justify-center px-[35px] md:px-0 relative">
      <Link
        to="/login"
        className="absolute mb-4 rounded-lg mt-3 px-6 py-4 w-max top-8 left-2 md:left-8 bg-transparent font-gilroy_semibold font-semibold hover:shadow-md hover:outline hover:outline-slate-200 transition-shadow duration-150 ease-linear capitalize flex items-center justify-center gap-3"
      >
        <IoIosArrowRoundBack className="text-[30px] md:text-[25px] font-extrabold md:font-normal" />
        <span className="hidden md:block">Back To Login</span>
      </Link>
      <div className="w-full md:w-[80%] lg:w-[748px] h-max lg:h-[652px] bg-white shadow-md rounded-lg flex items-center justify-center flex-col py-16 lg:py-0 md:px-10 lg:px-0">
        <div className="px-[29px] py-[20px]">
          <h1 className="text-pc_blue font-gilroy_semibold font-semibold text-[30px] md:text-[36px] leading-tight text-start lg:text-center">
            Forgot Password?
          </h1>
          <p className="font-gilroy_light font-extralight text-pc_black/70 mt-1">
            Please enter your email to re-set your password
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-[29px] lg:px-32 w-full mt-10"
        >
          <div className="flex flex-col items-start justify-start w-full">
            <label
              htmlFor="email"
              className="font-gilroy_light font-extralight"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter Email"
              className="rounded-lg mt-3 px-6 py-4 w-full placeholder:text-[#939393] placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border border-[#939393]"
            />
          </div>

          <div className="flex items-center justify-center flex-col w-full mx-auto mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="mb-4 rounded-lg mt-3 px-6 py-4 w-full bg-pc_orange text-white font-gilroy_semibold font-semibold hover:shadow-md hover:outline hover:outline-slate-200 transition-shadow duration-150 ease-linear capitalize"
            >
              {isLoading ? "Sending..." : "Get verification code"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
