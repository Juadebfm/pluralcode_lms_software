import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowRoundBack, IoMdSearch } from "react-icons/io";
import { IoChevronUpSharp, IoChevronDownSharp } from "react-icons/io5";
import Pluralcode from "../assets/PluralCode.png";
import Plc from "../assets/plc.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { FaSlack } from "react-icons/fa";
import { TfiHelpAlt } from "react-icons/tfi";
import { HiUser } from "react-icons/hi2";
import { CgMenuRight } from "react-icons/cg";

const HelpCenter = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNavScrolled, setIsNavScrolled] = useState(false); // State to track if the main content is scrolled
  const [isDetailsVisible, setIsDetailsVisible] = useState(false); // State to track visibility of the div

  const location = useLocation();
  const navigate = useNavigate();

  const { userData } = useContext(AuthContext); // Access user data

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "bg-pc_bg text-pc_orange border-l-4 border-pc_orange"
      : "text-pc_black";
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleGoBack = () => {
    navigate(-1); // This will take the user back to the previous page
  };

  const { enrolledcourses, message, token, totalbalance, user } = userData;

  const [course, setCourse] = useState(null);

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
  } = user;

  useEffect(() => {
    // Retrieve course information from local storage
    const storedCourse = localStorage.getItem("selectedCourse");
    if (storedCourse) {
      setCourse(JSON.parse(storedCourse));
    }
  }, []);

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

  const getLinkClasses2 = (path) => {
    return location.pathname === path
      ? "bg-white text-pc_orange border-l-4 border-pc_orange"
      : "text-pc_black";
  };

  // Function to get initials from the user's name
  const getInitials = (name) => {
    const nameArray = name.split(" ");
    const initials = nameArray.map((n) => n[0]).join("");
    return initials;
  };

  const toggleDetailsVisibility = () => {
    setIsDetailsVisible((prev) => !prev);
  };
  // Capitalize the first letter of the email
  const capitalizedEmail = email.charAt(0).toUpperCase() + email.slice(1);

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
                  <div className="absolute top-10 font-gilroy_light p-6 right-0 flex flex-col mt-2 bg-white shadow-lg rounded-lg">
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
        <div className="flex-1 p-8 bg-pc_bg font-gilroy" id="main-content">
          <div className="flex flex-col items-center justify-start w-full lg:w-[70%] mx-auto">
            <h1 className="font-gilroy_semibold text-[40px] text-pc_blue mt-8">
              Student Help Desk
            </h1>
            <p className="text-center mb-5">
              Welcome to the Student Help Desk! We're here to assist you with
              any questions or issues you may have during your academic journey
              using our Lms platform. we're here to provide guidance and
              support. <br />
              We can assist you with the Learning Management Systems (LMS)
              through:
            </p>
            <ul className="list-decimal space-y-2 pl-4 lg:pl-0">
              <li>
                Navigating through your institution's learning management
                system.
              </li>
              <li>
                Providing guidance on accessing course materials, assignments,
                and grades.
              </li>
              <li>
                Assisting with LMS features such as discussion boards, quizzes,
                and forums.
              </li>
              <li> Troubleshooting LMS-related problems and errors.</li>
            </ul>
            <a
              href="mailto:pluralcodeacademy102@gmail.com"
              className=" rounded-lg  px-10 py-3 w-full md:w-auto  bg-pc_orange text-white font-gilroy hover:shadow-md hover:outline hover:outline-slate-200 transition-shadow duration-150 ease-linear capitalize flex items-center justify-center gap-2 mt-8"
            >
              send a message
            </a>
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
    </div>
  );
};

export default HelpCenter;
