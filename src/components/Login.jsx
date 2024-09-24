import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginImg from "../assets/loginImg.png";
import { Link } from "react-router-dom";
import { TbRotateClockwise2 } from "react-icons/tb";
import { AuthContext } from "../context/AuthContext";
import "../index.css";
import Pluralcode from "../assets/PluralCode.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); // Start loading
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ email, password });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://backend.pluralcode.institute/student/login",
        requestOptions
      );
      const result = await response.json();

      if (response.ok) {
        console.log(result);
        localStorage.setItem("isAuthenticated", true);
        setUserData(result); // Store user data in context
        navigate("/dashboard");
      } else {
        setError(
          result.message || "Login failed. Please check your credentials."
        );
        setLoading(false); // Stop loading on error
      }
    } catch (error) {
      console.log("error", error);
      setError("An error occurred. Please try again later.");
      setLoading(false); // Stop loading on error
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 bg-pc_bg md:bg-[#F5F6FA] gap-3 lg:gap-16 overflow-auto lg:overflow-hidden px-6 md:px-0 py-6 lg:py-0">
      <div className="flex lg:hidden items-center justify-center">
        <img src={Pluralcode} alt="" className="w-[200px] mt-10 mb-5" />
      </div>
      <div className="flex flex-col items-center lg:items-start justify-center px-[25px] md:px-24 bg-white rounded-tl-3xl lg:rounded-tl-none rounded-tr-3xl rounded-bl-rounded-tr-3xl py-24">
        <h1 className="text-pc_blue font-gilroy_semibold lg:font-gilroy_bold font-medium text-[36px] lg:text-[46px] leading-tight">
          Welcome Back!
        </h1>
        <p className="font-gilroy_light font-extralight text-pc_black/70 pl-2">
          Login to your PluralCode account
        </p>

        <div className="mt-10 w-full space-y-10">
          <div className="flex flex-col items-start justify-start">
            <label
              htmlFor="email"
              className="font-gilroy_light font-extralight"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="rounded-lg mt-3 px-6 py-4 w-full placeholder:text-[#939393] font-gilroy placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border border-[#939393]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start justify-start relative">
            <label
              htmlFor="password"
              className="font-gilroy_light font-extralight"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="relative rounded-lg mt-3 px-6 py-4 w-full placeholder:text-[#939393] font-gilroy placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border border-[#939393]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute top-[50%] right-5 translate-y-[50%] cursor-pointer text-[#939393]"
              onClick={togglePasswordVisibility}
            >
              <div className="flex items-center justify-center text-pc_black text-lg">
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between w-full">
          <div className="flex items-center invisible">
            <input
              type="checkbox"
              id="remember_me"
              className="custom-checkbox"
            />
            <label
              htmlFor="remember_me"
              className="ml-2 font-gilroy_light font-extralight"
            >
              Remember Me
            </label>
          </div>
          <Link
            to="/forgotpassword"
            className="font-gilroy_semibold font-medium text-pc_blue"
          >
            Forgot Password
          </Link>
        </div>
        <div className="flex items-center justify-center flex-col w-full mx-auto mt-10">
          <button
            onClick={handleLogin}
            className="mb-4 rounded-lg mt-3 px-6 py-4 w-full bg-pc_orange text-white font-gilroy_semibold font-semibold hover:shadow-md hover:outline hover:outline-slate-200 transition-shadow duration-150 ease-linear flex items-center justify-center gap-2"
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <>
                <span>Logging In...</span>
                <TbRotateClockwise2 className="text-xl animate-spin" />
              </>
            ) : (
              "Login"
            )}
          </button>
          {error && (
            <p className="text-red-500 font-bold font-gilroy_bold mt-2">
              {error}
            </p>
          )}
          <p className="text-base text-center font-gilroy">
            Don't have an account?{" "}
            <Link to="/" className="text-pc_orange">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden md:flex relative bg-white items-center justify-center p-[35px] lg:p-20 overflow-hidden">
        <img
          src={LoginImg}
          alt="Login"
          className="relative z-10 p-0 md:p-20 -mt-14"
        />
        {[...Array(7)].map(
          (_, index) =>
            index !== 0 && (
              <div
                key={index}
                className={`absolute border border-[#939393]/25 rounded-full`}
                style={{
                  width: `${400 + index * 80}px`,
                  height: `${400 + index * 80}px`,
                  top: `calc(50% - ${200 + index * 40}px)`,
                  left: `calc(50% - ${200 + index * 40}px)`,
                  zIndex: 1,
                }}
              ></div>
            )
        )}
      </div>
    </div>
  );
};

export default Login;
