import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerificationCode = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [email, setEmail] = useState("");
  const [hashcode, setHashcode] = useState("");
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [isResendActive, setIsResendActive] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedHashnode = localStorage.getItem("hashnode");
    if (storedEmail) setEmail(storedEmail);
    if (storedHashnode) setHashcode(storedHashnode);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsResendActive(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleResend = async () => {
    if (!isResendActive) return;

    setIsResendActive(false);
    setTimeLeft(5 * 60);

    const apiUrl = `https://backend.pluralcode.institute/student/otp?email=${email}`;
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const result = await response.json();
      if (response.ok) {
        console.log("OTP Resent:", result);
        toast.success("New verification code sent to your email.");
        setHashcode(result.encrypted_data);
        localStorage.setItem("hashnode", result.encrypted_data);
      } else {
        console.error("API Error:", result.message);
        toast.error("An error occurred while resending the verification code.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("An error occurred while resending the verification code.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      toast.warning("Please enter the complete 4-digit code.");
      return;
    }

    if (!hashcode) {
      toast.error("Error: Missing verification data. Please try again.");
      return;
    }

    const apiUrl = `https://backend.pluralcode.institute/student/otp?otp=${otpValue}&hashcode=${hashcode}&email=${email}&type=validate`;
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const result = await response.text();
      console.log(result);

      if (response.ok) {
        toast.success("OTP verified successfully.");
        // Redirect or perform next steps here
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("An error occurred while verifying the OTP.");
    }
  };

  return (
    <div className="bg-[#F5F6FA] h-screen flex items-center justify-center px-[35px] md:px-0">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full md:w-[80%] lg:w-[748px] h-max lg:h-[652px] bg-white shadow-md rounded-lg flex items-center justify-center flex-col py-16 lg:py-0 md:px-10 lg:px-0">
        <div className="px-[20px] lg:px-[29px] py-[20px]">
          <h1 className="text-pc_blue font-gilroy_semibold font-semibold text-[30px] md:text-[36px] leading-tight text-start md:text-center">
            Enter Verification Code
          </h1>
          <p className="font-gilroy_light font-extralight text-pc_black/70 mt-1 w-full md:w-[75%] mx-auto text-start md:text-center">
            Please enter the four digit number that was sent to
            <span> {email.replace(/(.{3}).*(@.*)/, "$1******$2")}</span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-[29px] lg:px-32 w-full mt-3 flex items-center justify-center flex-col"
        >
          <div className="grid grid-cols-4 place-content-center place-items-center gap-3 lg:gap-7 w-max">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                className="rounded-lg mt-3 py-4 flex items-center justify-center border border-[#939393] w-[47px] h-[45px] font-bold text-center"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
              />
            ))}
          </div>
          <div className="flex items-center justify-center my-4 lg:my-10 gap-3">
            <span className="text-pc_blue font-bold font-gilroy_semibold">
              {`${Math.floor(timeLeft / 60)
                .toString()
                .padStart(2, "0")}:${(timeLeft % 60)
                .toString()
                .padStart(2, "0")}`}
            </span>{" "}
            <button
              type="button"
              onClick={handleResend}
              className={`${
                isResendActive
                  ? "text-pc_blue cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
              disabled={!isResendActive}
            >
              Resend
            </button>
          </div>
          <div className="flex items-center justify-center flex-col w-full mx-auto mt-4">
            <button
              type="submit"
              className="mb-4 rounded-lg mt-3 px-6 py-4 bg-pc_orange text-white font-gilroy_semibold font-semibold hover:shadow-md hover:outline hover:outline-slate-200 transition-shadow duration-150 ease-linear capitalize w-full lg:w-[85%] mx-auto"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationCode;
