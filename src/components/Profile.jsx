import React, { useContext, useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import Pluralcode from "../assets/PluralCode.png";
import Plc from "../assets/plc.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbLogout, TbRotateClockwise2 } from "react-icons/tb";
import { HiPlus, HiUser } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { TfiHelpAlt } from "react-icons/tfi";
import { CgMenuRight } from "react-icons/cg";

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fileInput, setFileInput] = useState(null); // State to hold file input reference
  const [selectedOption, setSelectedOption] = useState("");

  const [refname1, setRefname1] = useState("");
  const [refphone1, setRefphone1] = useState("");
  const [refname2, setRefname2] = useState("");
  const [refphone2, setRefphone2] = useState("");

  const [refname1Error, setRefname1Error] = useState(false);
  const [refphone1Error, setRefphone1Error] = useState(false);
  const [refname2Error, setRefname2Error] = useState(false);
  const [refphone2Error, setRefphone2Error] = useState(false);
  const [fileInputError, setFileInputError] = useState(false);
  const [selectedOptionError, setSelectedOptionError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { userData } = useContext(AuthContext); // Access user data

  console.log(userData);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const toggleDetailsVisibility = () => {
    setIsDetailsVisible((prev) => !prev);
  };

  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "bg-pc_bg text-pc_orange border-l-4 border-pc_orange"
      : "text-pc_black";
  };

  const getLinkClasses2 = (path) => {
    return location.pathname === path
      ? "bg-white text-pc_orange border-l-4 border-pc_orange"
      : "text-pc_black";
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };
  // Function to get initials from the user's name
  const getInitials = (name) => {
    const nameArray = name.split(" ");
    const initials = nameArray.map((n) => n[0]).join("");
    return initials;
  };

  const { enrolledcourses, message, token, totalbalance, user } = userData;

  const {
    academy_level,
    age,
    country,
    year,
    student_id_number,
    state,
    email,
    phone_number,
    date,
    name,
    password,
  } = user;

  console.log(student_id_number);

  const [currentPassword, setCurrentPassword] = useState("");

  const togglePasswordModal = () => {
    setIsPasswordModalOpen(!isPasswordModalOpen);
    // Reset states when modal closes
    if (!isPasswordModalOpen) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setIsSuccess(false);
      setError("");
    }
  };

  // Capitalize the first letter of the email
  const capitalizedEmail = email.charAt(0).toUpperCase() + email.slice(1);

  // Handle scroll event to detect if the main content is scrolled
  useEffect(() => {
    const handleScroll = () => {
      const mainContent = document.getElementById("main-content");
      if (mainContent.scrollTop > 0) {
        setIsNavScrolled(true);
      } else {
        setIsNavScrolled(false);
      }
    };

    const mainContent = document.getElementById("main-content");
    mainContent.addEventListener("scroll", handleScroll);

    return () => {
      mainContent.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const savePasswordChanges = () => {
    // Reset error messages
    setError("");

    // Input validation
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm password must match.");
      return;
    }

    // Prepare API request
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      oldpassword: currentPassword,
      newpassword: newPassword,
      confirmpassword: confirmNewPassword,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // Set loading state
    setIsLoading(true);

    // Call API
    fetch(
      "https://backend.pluralcode.institute/student/update-password",
      requestOptions
    )
      .then((response) => {
        setIsLoading(false);
        if (!response.ok) {
          throw new Error("Failed to update password.");
        }
        return response.text();
      })
      .then((result) => {
        setIsSuccess(true);
        setTimeout(() => {
          setIsPasswordModalOpen(false); // Close modal after 3 seconds
          setIsSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        setError("Failed to update password.");
      });
  };

  const saveChanges = () => {
    setError("");
    setRefname1Error(false);
    setRefphone1Error(false);
    setRefname2Error(false);
    setRefphone2Error(false);
    setFileInputError(false);
    setSelectedOptionError(false);

    if (
      !refname1 ||
      !refphone1 ||
      !refname2 ||
      !refphone2 ||
      !fileInput ||
      !selectedOption ||
      selectedOption === "Select ID Type"
    ) {
      setError("All fields are required.");

      if (!refname1) setRefname1Error(true);
      if (!refphone1) setRefphone1Error(true);
      if (!refname2) setRefname2Error(true);
      if (!refphone2) setRefphone2Error(true);
      if (!fileInput) setFileInputError(true);
      if (!selectedOption || selectedOption === "Select ID Type")
        setSelectedOptionError(true);

      return;
    }

    const formdata = new FormData();
    formdata.append("refname1", refname1);
    formdata.append("refphone1", refphone1);
    formdata.append("refname2", refname2);
    formdata.append("refphone2", refphone2);
    formdata.append("image", fileInput.files[0], "hello.png");
    formdata.append("idname", "passport");

    const requestOptions = {
      method: "PUT",
      body: formdata,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      redirect: "follow",
    };

    setIsLoading(true);

    fetch(
      "https://backend.pluralcode.institute/student/upload-reference-details",
      requestOptions
    )
      .then((response) => {
        setIsLoading(false);
        if (!response.ok)
          throw new Error("Failed to update reference details.");
        return response.text();
      })
      .then(() => {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message || "Failed to update reference details.");
      });
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white ${
          isSidebarOpen ? "w-64" : "w-16"
        } hidden lg:flex flex-col items-center transition-all duration-300 bg-white text-pc_black`}
      >
        <div className="flex justify-between items-center w-full p-2">
          <div className="text-xl font-semibold">
            {isSidebarOpen ? (
              <img
                src={Pluralcode}
                alt="Expanded"
                onClick={toggleSidebar}
                className="cursor-pointer p-5"
              />
            ) : (
              <div
                className="flex items-center justify-center w-full cursor-pointer pt-5"
                onClick={toggleSidebar}
              >
                <img src={Plc} alt="Company Logo" className="w-10 h-10" />
              </div>
            )}
          </div>
        </div>
        <ul className="mt-10 w-full font-gilroy">
          <Link
            to="/dashboard"
            className={`flex items-center ${
              isSidebarOpen ? "justify-start pl-8" : "justify-center"
            } py-5 ${getLinkClasses("/dashboard")}`}
          >
            {isSidebarOpen ? (
              <div className="flex items-center gap-2 text-[18px]">
                <MdDashboard />
                <span>Dashboard</span>
              </div>
            ) : (
              <div className="text-2xl">
                <MdDashboard />
              </div>
            )}
          </Link>
          <Link
            to="/profile"
            className={`flex items-center ${
              isSidebarOpen ? "justify-start pl-8" : "justify-center"
            } py-5 ${getLinkClasses("/profile")}`}
          >
            {isSidebarOpen ? (
              <div className="flex items-center gap-2 text-[18px]">
                <HiUser />
                <span>Profile</span>
              </div>
            ) : (
              <div className="text-2xl">
                <HiUser />
              </div>
            )}
          </Link>
          <Link
            to="/help_center"
            className={`flex items-center ${
              isSidebarOpen ? "justify-start pl-8" : "justify-center"
            } py-5 ${getLinkClasses("/help_center")}`}
          >
            {isSidebarOpen ? (
              <div className="flex items-center gap-2 text-[18px]">
                <TfiHelpAlt />

                <span>Help Center</span>
              </div>
            ) : (
              <div className="text-2xl">
                <TfiHelpAlt />
              </div>
            )}
          </Link>
          <button
            onClick={handleLogout}
            className={`flex items-center ${
              isSidebarOpen ? "justify-start pl-8" : "justify-center"
            } py-5 text-[18px] w-full text-left text-pc_black`}
          >
            {isSidebarOpen ? (
              <div className="flex items-center gap-2">
                <TbLogout />
                <span>Logout</span>
              </div>
            ) : (
              <div className="text-2xl">
                <TbLogout />
              </div>
            )}
          </button>
        </ul>
      </div>

      {/* Main section */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <div
          className={`bg-white py-5 px-[30px] lg:px-12 shadow flex justify-between items-center mb-5 ${
            isNavScrolled ? "border-b border-pc_light_gray/30" : ""
          }`}
        >
          <div className="relative hidden lg:block">
            <IoMdSearch
              size={20}
              className="absolute top-[50%] left-3 -translate-y-[50%] text-[#898989] "
            />

            <input
              type="text"
              placeholder="Search..."
              className="bg-pc_bg w-[400px] shadow-sm rounded-md py-3 placeholder:text-sm placeholder:text-[#898989] placeholder:font-gilroy pl-10"
            />
          </div>
          {/* Mobile Navbar */}
          <div className="lg:hidden flex items-center justify-between w-full py-4">
            <div
              className="flex items-center justify-center text-white rounded-full cursor-pointer"
              onClick={toggleMobileSidebar}
            >
              <img src={Pluralcode} alt="Company Logo" className="w-[170px]" />
            </div>
            <button
              onClick={toggleMobileSidebar}
              className="text-[28px] cursor-pointer bg-pc_blue text-pc_white_white p-1 rounded-full"
            >
              {isMobileSidebarOpen ? <FaTimes /> : <CgMenuRight />}
            </button>
          </div>
          <div className="hidden lg:flex items-center justify-center gap-2">
            <div className="bg-blue-100 p-2 rounded-full">
              <div className="bg-pc_blue text-white p-4 rounded-full flex items-center justify-center h-11 w-11">
                <span className="leading-none font-gilroy_semibold">
                  {getInitials(user.name)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="flex flex-col items-start justify-start leading-tight">
                <span className="font-gilroy_semibold font-medium">
                  {user.name}
                </span>
                <span className="font-gilroy_light mt-1">
                  {user.student_id_number}
                </span>
              </div>
              <div className="relative">
                {isDetailsVisible ? (
                  <IoChevronUpSharp
                    size={25}
                    className="font-extrabold cursor-pointer"
                    onClick={toggleDetailsVisibility}
                  />
                ) : (
                  <IoChevronDownSharp
                    size={25}
                    className="font-extrabold cursor-pointer"
                    onClick={toggleDetailsVisibility}
                  />
                )}
                {isDetailsVisible && (
                  <div className="absolute top-10 font-gilroy_light p-6 right-0 flex flex-col mt-2 bg-white shadow-lg rounded-lg z-20">
                    <span>{capitalizedEmail}</span>
                    <span>{state}</span>
                    <span>{country}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="flex-1 p-[20px] md:p-8 bg-pc_bg overflow-y-auto font-gilroy h-auto"
          id="main-content"
        >
          <div className="bg-pc_white_white min-h-screen rounded-xl p-[20px] lg:p-14 w-full lg:w-[90%]">
            <h2 className="text-[32px] font-gilroy_semibold leading-tight font-bold text-pc_blue">
              My Profile
            </h2>
            <p className="mt-2">Kindly click on any of the fields to edit</p>
            {/* Personal Information */}
            <div className="mt-20">
              <h2 className="text-[24px] font-gilroy_semibold leading-tight font-bold text-pc_blue">
                Personal Information
              </h2>
              <div className="mt-7 w-full space-y-5">
                {/* Name */}
                <div className="flex flex-col items-start justify-start">
                  <label
                    htmlFor="name"
                    className="font-gilroy_light font-extralight"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="rounded-lg mt-2 px-6 py-4 w-full placeholder:text-[#939393] placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border border-[#939393]"
                    defaultValue={name}
                    readOnly
                  />
                </div>
                {/* Student id */}

                <div className="flex flex-col items-start justify-start">
                  <label
                    htmlFor="student_id"
                    className="font-gilroy_light font-extralight"
                  >
                    Student ID
                  </label>
                  <input
                    type="text"
                    className="rounded-lg mt-2 px-6 py-4 w-full placeholder:text-[#939393] placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border border-[#939393]"
                    defaultValue={student_id_number}
                    readOnly
                  />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <label
                    htmlFor="phone_number"
                    className="font-gilroy_light font-extralight"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="rounded-lg mt-2 px-6 py-4 w-full placeholder:text-[#939393] placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border border-[#939393]"
                    defaultValue={phone_number}
                    readOnly
                  />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <label
                    htmlFor="name"
                    className="font-gilroy_light font-extralight"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="rounded-lg mt-2 px-6 py-4 w-full placeholder:text-[#939393] placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border border-[#939393]"
                    defaultValue={email}
                    readOnly
                  />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <label
                    htmlFor="password"
                    className="font-gilroy_light font-extralight"
                  >
                    Password
                  </label>
                  <div className="w-full relative">
                    <input
                      type="password"
                      className="rounded-lg mt-2 px-6 py-4 w-full placeholder:text-[#939393] placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border border-[#939393]"
                      defaultValue={password}
                      readOnly
                    />
                    <button
                      onClick={togglePasswordModal}
                      className="absolute right-6 top-[54%] cursor-pointer text-pc_orange leading-none translate-y-[-35%]"
                    >
                      <span className="pt-2 bg-pc_white_white px-4 lg:bg-transparent lg:px-0">
                        {" "}
                        Edit Password
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Reference */}
            <div className="mt-14">
              <h2 className="text-[24px] font-gilroy_semibold leading-tight font-bold text-pc_blue">
                Reference Information
              </h2>
              <div className="mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Name */}
                <div className="flex flex-col items-start justify-start">
                  <label
                    htmlFor="name"
                    className="font-gilroy_light font-extralight"
                  >
                    Emergency Name
                  </label>
                  <input
                    type="text"
                    id="refname1"
                    className={`rounded-lg mt-2 px-6 py-4 w-full placeholder:text-[#939393] placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border ${
                      refname1Error ? "border-red-500" : "border-[#939393]"
                    }`}
                    value={refname1}
                    onChange={(e) => setRefname1(e.target.value)}
                    placeholder="Type emergency name"
                  />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <label
                    htmlFor="phone_number"
                    className="font-gilroy_light font-extralight"
                  >
                    Emergency Phone Number
                  </label>
                  <input
                    type="tel"
                    className={`rounded-lg mt-2 px-6 py-4 w-full placeholder:text-[#939393] placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border ${
                      refphone1Error ? "border-red-500" : "border-[#939393]"
                    }`}
                    value={refphone1}
                    onChange={(e) => setRefphone1(e.target.value)}
                    placeholder="Type emergency phone number"
                  />
                </div>
              </div>
            </div>

            {/* Reference 2 */}
            <div className="mt-14">
              <h2 className="text-[24px] font-gilroy_semibold leading-tight font-bold text-pc_blue">
                Reference Information II
              </h2>
              <div className="mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Name */}
                <div className="flex flex-col items-start justify-start">
                  <label
                    htmlFor="name"
                    className="font-gilroy_light font-extralight"
                  >
                    Reference Name
                  </label>
                  <input
                    type="text"
                    className={`rounded-lg mt-2 px-6 py-4 w-full placeholder:text-[#939393] placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border ${
                      refname2Error ? "border-red-500" : "border-[#939393]"
                    }`}
                    value={refname2}
                    onChange={(e) => setRefname2(e.target.value)}
                    placeholder="Type emergency name"
                  />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <label
                    htmlFor="phone_number"
                    className="font-gilroy_light font-extralight"
                  >
                    Reference Phone Number
                  </label>
                  <input
                    type="tel"
                    className={`rounded-lg mt-2 px-6 py-4 w-full placeholder:text-[#939393] placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border ${
                      refphone2Error ? "border-red-500" : "border-[#939393]"
                    }`}
                    value={refphone2}
                    onChange={(e) => setRefphone2(e.target.value)}
                    placeholder="Type emergency phone number"
                  />
                </div>
              </div>
            </div>

            {/* Id information*/}
            <div className="mt-14">
              <h2 className="text-[24px] font-gilroy_semibold leading-tight font-bold text-pc_blue">
                ID Information
              </h2>
              <div className="mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex flex-col items-start justify-start">
                  <label
                    htmlFor="select-option"
                    className="font-gilroy_light font-extralight"
                  >
                    Select Option
                  </label>
                  <div className="relative w-full">
                    <select
                      id="select-option"
                      className={`rounded-lg mt-2 px-6 py-4 w-full bg-transparent placeholder:text-[#939393] placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border ${
                        error && !selectedOption
                          ? "border-red-500"
                          : "border-[#939393]"
                      } appearance-none`}
                      onChange={handleSelectChange}
                    >
                      <option value="Select ID Type">Select ID Type</option>
                      <option value="International Passport">
                        International Passport
                      </option>
                      <option value="Driver's license">Driver's license</option>
                      <option value="Voters Card">Voters Card</option>
                      <option value="NIMC ID card">NIMC ID card</option>
                      <option value="NIN Slip">NIN Slip</option>
                    </select>
                    <div className="absolute top-1/2 right-4 transform -translate-y-[30%] pointer-events-none">
                      ▼
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start justify-start">
                  <label
                    htmlFor="file-upload"
                    className="font-gilroy_light font-extralight"
                  >
                    Upload File
                  </label>
                  <div className="relative w-full">
                    <input
                      type="file"
                      id="file-upload"
                      className={`rounded-lg mt-2 px-6 py-[15px] w-full placeholder:text-[#939393] placeholder:font-gilroy_light placeholder:font-extralight placeholder:text-[15px] border ${
                        error && !fileInput
                          ? "border-red-500"
                          : "border-[#939393]"
                      }`}
                      onChange={(e) => setFileInput(e.target)}
                      accept=".png, .jpg, .jpeg, .svg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            <button
              onClick={saveChanges}
              className="mb-4 mt-20 rounded-lg px-6 py-4 w-full lg:w-[355px] bg-pc_orange text-white font-gilroy_semibold font-semibold hover:shadow-md hover:outline hover:outline-slate-200 transition-shadow duration-150 ease-linear flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span>Saving...</span>
                  <TbRotateClockwise2 className="text-xl animate-spin" />
                </>
              ) : (
                "Save Changes"
              )}
            </button>

            {/* Success message */}
            {isSuccess && (
              <p className="text-green-500 mt-4">Changes saved successfully.</p>
            )}

            {/* Loading indicator */}
            {isLoading && (
              <p className="text-blue-500 mt-4">Saving changes...</p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`${
          isMobileSidebarOpen ? "block" : "hidden"
        } bg-pc_bg text-pc_black w-[80%] md:w-[50%] fixed top-0 left-0 h-full lg:hidden transition-all duration-300 py-[31px]`}
      >
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center justify-center gap-3 ">
            <div className="bg-blue-100 p-2 rounded-full">
              <div className="bg-pc_blue text-white p-4 rounded-full flex items-center justify-center h-11 w-11">
                <span className="leading-none font-gilroy_semibold">
                  {getInitials(user.name)}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start leading-tight">
              <span className="font-gilroy_semibold font-medium">
                {user.name}
              </span>
              <span className="font-gilroy_light mt-1">
                {user.student_id_number}
              </span>
            </div>
          </div>
        </div>
        <ul className="mt-4 w-full font-gilroy bg-pc_bg pt-16">
          <Link
            to="/dashboard"
            className={`flex items-center justify-start py-5 pl-8 ${getLinkClasses2(
              "/dashboard"
            )}`}
            onClick={toggleMobileSidebar}
          >
            <div className="flex items-center gap-2 text-[18px]">
              <MdDashboard />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link
            to="/profile"
            className={`flex items-center justify-start py-5 pl-8 ${getLinkClasses2(
              "/profile"
            )}`}
            onClick={toggleMobileSidebar}
          >
            <div className="flex items-center gap-2 text-[18px]">
              <HiUser />
              <span>Profile</span>
            </div>
          </Link>
          <Link
            onClick={toggleMobileSidebar}
            to="/help_center"
            className={`flex items-center ${
              isSidebarOpen ? "justify-start pl-8" : "justify-center"
            } py-5 ${getLinkClasses2("/help_center")}`}
          >
            {isSidebarOpen ? (
              <div className="flex items-center gap-2 text-[18px]">
                <TfiHelpAlt />

                <span>Help Center</span>
              </div>
            ) : (
              <div className="text-2xl">
                <TfiHelpAlt />
              </div>
            )}
          </Link>

          <button
            onClick={() => {
              handleLogout();
              toggleMobileSidebar();
            }}
            className="flex items-center justify-start py-5 pl-8 text-[18px] w-full text-left"
          >
            <div className="flex items-center gap-2">
              <TbLogout />
              <span>Logout</span>
            </div>
          </button>
        </ul>
      </div>

      {/* Modal JSX */}
      {isPasswordModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 font-gilroy_light">
          <div className="bg-white rounded-lg p-10 w-[450px] h-auto">
            <div className="flex flex-col space-y-4">
              {/* Error message */}
              {error && (
                <p className="text-red-500 font-gilroy_semibold">{error}</p>
              )}
              {/* Current Password */}
              <div className="flex flex-col items-start justify-start w-full mb-7">
                <label htmlFor="old_password" className="mb-2">
                  Old Password
                </label>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="rounded-lg px-4 py-3 border border-gray-300 w-full"
                />
              </div>
              <div className="w-full">
                <label htmlFor="new_password" className="">
                  New Password
                </label>
                {/* New Password */}
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="rounded-lg px-4 py-3 border border-gray-300 w-full mt-3"
                />
                {/* Confirm New Password */}
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="rounded-lg px-4 py-3 border border-gray-300 w-full mt-5"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 place-items-center place-content-center">
                <button
                  onClick={togglePasswordModal}
                  className="px-6 py-3 mr-2 rounded-lg border border-pc_orange bg-transparent text-pc_orange hover:bg-pc_orange hover:text-pc_white_white transition-colors duration-200 w-full mt-5"
                >
                  Cancel
                </button>
                <button
                  onClick={savePasswordChanges}
                  className="px-6 py-3 rounded-lg bg-pc_orange text-white hover:shadow-md hover:outline hover:outline-slate-200 transition-shadow duration-150 ease-linear w-full mt-5"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">Saving...</span>
                      <TbRotateClockwise2 className="text-xl animate-spin" />
                    </div>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
              {/* Success message */}
              {isSuccess && (
                <div className="text-green-500 font-gilroy_semibold mt-2">
                  Password successfully updated.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
