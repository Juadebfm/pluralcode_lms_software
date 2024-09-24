import React, { useState, useContext, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";

import { IoMdSearch } from "react-icons/io";
import { IoChevronDownSharp } from "react-icons/io5";
import { IoChevronUpSharp } from "react-icons/io5";
import Pluralcode from "../assets/PluralCode.png";
import Plc from "../assets/plc.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { BsWalletFill } from "react-icons/bs";
import { TbCurrencyNaira } from "react-icons/tb";
import { PiBookOpenTextFill } from "react-icons/pi";
import { HiChevronRight, HiUser } from "react-icons/hi2";
import { HiChevronDown } from "react-icons/hi2";
import { IoIosArrowRoundForward } from "react-icons/io";
import { TfiHelpAlt } from "react-icons/tfi";
import LoadingModal from "./LoadingModal";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false); // State to track visibility of the div
  const [isNavScrolled, setIsNavScrolled] = useState(false); // State to track if the main content is scrolled
  const [activeTab, setActiveTab] = useState("courses");

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext); // Access user data

  const [isFAQVisible, setIsFAQVisible] = useState(false);

  const toggleFAQVisibility = () => {
    setIsFAQVisible((prev) => !prev);
  };

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

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const toggleDetailsVisibility = () => {
    setIsDetailsVisible((prev) => !prev);
  };

  const { enrolledcourses, message, token, totalbalance, user } = userData;

  const [certificates, setCertificates] = useState([]);

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

  // Capitalize the first letter of the email
  const capitalizedEmail = email.charAt(0).toUpperCase() + email.slice(1);

  const userDetails = enrolledcourses[1];

  // Determine the number of courses
  const numberOfCourses = enrolledcourses.reduce((count, element) => {
    if (typeof element === "object" && element.teachable_course_id) {
      // If the element is an object with teachable_course_id, count it
      if (Array.isArray(element.teachable_course_id)) {
        return count + element.teachable_course_id.length;
      } else {
        return count + 1;
      }
    }
    return count;
  }, 0);

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

  const courseDescription = [
    {
      courseName: "Product Design",
      description:
        "Learn UI/UX from scratch without writing a single code. Master how to design high fidelity interfaces with FIGMA, design journey mapping, and empathize with users.",
    },
    {
      courseName: "Product Management",
      description:
        "Become a professional product manager in 8 weeks. Learn how to gather user data, identify their needs, and understand how it benefits them.",
    },
    {
      courseName: "Data Analytics",
      description:
        "Master data analytics and become proficient in analyzing data to make informed decisions. Learn how to use tools like Excel, SQL, and Tableau for data visualization and insights.",
    },
    {
      courseName: "Cyber Security",
      description:
        "Learn the fundamentals of cybersecurity, including threat analysis, risk management, and how to protect systems and networks from cyber attacks. Gain practical skills in ethical hacking and penetration testing.",
    },
    {
      courseName: "Project Management",
      description:
        "Become an expert in project management. Learn the essential skills to plan, execute, and deliver projects successfully using methodologies like Agile, Scrum, and Waterfall.",
    },
    {
      courseName: "Cloud Computing",
      description:
        "Understand the principles of cloud computing and how to deploy and manage applications in the cloud. Gain hands-on experience with platforms like AWS, Azure, and Google Cloud.",
    },
    {
      courseName: "Business Analytics",
      description:
        "Learn to analyze business data and gain insights to drive strategic decision-making. Become proficient in using analytical tools and techniques to improve business performance.",
    },
    {
      courseName: "Content Creation & Digital Growth",
      description:
        "Develop your skills in content creation and learn strategies to grow digital presence. Master various content formats, SEO, social media marketing, and analytics to engage and expand your audience.",
    },
    {
      courseName: "Full-Stack Software Development",
      description:
        "Become proficient in both front-end and back-end development. Learn popular technologies and frameworks such as React.js, Node.js, ExpressJS, MongoDB.",
    },
  ];

  const handleCourseClick = async (course) => {
    if (
      !course ||
      !course.teachable_course_id ||
      !Array.isArray(course.course_module)
    ) {
      console.error("Invalid course data:", course);
      return;
    }

    const { teachable_course_id, course_name, course_module } = course;

    // Store clicked course data in local storage
    localStorage.setItem("clickedCourse", JSON.stringify(course));

    // Check if study materials for the course are already stored
    const storedData = localStorage.getItem("groupedStudyMaterials");
    if (storedData) {
      console.log("Using cached study materials data from localStorage");
      const groupedData = JSON.parse(storedData);

      // Check if the clicked course data exists in stored data
      const courseData = groupedData.courseModules.find(
        (module) => module.courseId === teachable_course_id
      );

      if (courseData) {
        navigate(`/courses/${teachable_course_id}`);
        return;
      }
    }

    // If no stored data or course data is not found, fetch new data
    setLoading(true);

    // Prepare an array to store promises of study material requests
    const studyMaterialPromises = [];

    // Iterate over each module in course_module
    course_module.forEach((module) => {
      if (module.lectures && Array.isArray(module.lectures)) {
        const lectures = module.lectures.map((lecture) => ({
          id: lecture.id,
          position: lecture.position,
        }));

        const requestBody = {
          course_id: teachable_course_id,
          lectures: lectures,
        };

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(requestBody),
          redirect: "follow",
        };

        studyMaterialPromises.push(
          fetch(
            "https://backend.pluralcode.institute/student/study-materials",
            requestOptions
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((result) => ({
              module: module,
              studyMaterials: result,
            }))
            .catch((error) => {
              console.error(
                `Error fetching study materials for module ${module.id}:`,
                error
              );
              return { module: module, studyMaterials: [] };
            })
        );
      }
    });

    try {
      const moduleStudyMaterials = await Promise.all(studyMaterialPromises);

      const groupedData = {
        courseName: course_name,
        courseModules: moduleStudyMaterials.map(
          ({ module, studyMaterials }) => ({
            courseId: teachable_course_id, // Added courseId to match the check above
            moduleId: module.id,
            moduleName: module.name,
            studyMaterials: studyMaterials,
          })
        ),
      };

      localStorage.setItem(
        "groupedStudyMaterials",
        JSON.stringify(groupedData)
      );

      setLoading(false); // Hide loading modal

      navigate(`/courses/${teachable_course_id}`);
    } catch (error) {
      console.error("Error fetching study materials:", error);
      setLoading(false); // Hide loading modal on error
    }
  };

  const studentId = student_id_number;

  const fetchCertificates = async () => {
    try {
      const response = await fetch(
        `https://pluralcode.net/apis/v1/list_certificates.php?student_id=${studentId}`
      );
      const data = await response.json();
      setCertificates(data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "certificates") {
      fetchCertificates();
    }
  }, [activeTab]);

  return (
    <div className="flex h-screen overflow-x-hidden">
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
      <div className="flex flex-col flex-1 bg-pc_bg">
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
        <div className="w-full lg:hidden bg-pc_white_white py-6 flex items-center justify-center">
          <h1 className="font-gilroy text-[20px] w-full text-center">
            My Courses
          </h1>
        </div>
        {/* Main Content */}
        <div
          className="flex-1 p-6 md:p-8 bg-pc_bg overflow-y-auto"
          id="main-content"
        >
          {/* Information Tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-8 bg-transparent">
            <div className="w-full bg-white rounded-xl py-10 px-[20px] lg:px-14 flex items-center justify-start gap-5">
              <div className="w-[60px] h-[60px] flex items-center justify-center bg-pc_blue/10 rounded-full">
                <BsWalletFill size={25} className="text-pc_blue" />
              </div>
              <div>
                <h1 className="text-[21px] lg:text-[24px] font-gilroy_semibold leading-none">
                  My Balance
                </h1>
                <div className="flex items-center mt-1 lg:mt-2 justify-center">
                  <span className="font-gilroy text-sm md:text-base">
                    Outstanding Balance:
                  </span>
                  <span className="flex items-center justify-center text-pc_orange">
                    <TbCurrencyNaira className="leading-none font-gilroy text-sm md:text-base" />
                    <span className="font-gilroy_semibold text-md md:text-base leading-none pt-1">
                      {userDetails.balance}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full hidden bg-white rounded-xl py-10 px-[20px] lg:px-14 md:flex items-center justify-start gap-5">
              <div className="w-[60px] h-[60px] flex items-center justify-center bg-pc_orange/10 rounded-full">
                <PiBookOpenTextFill size={28} className="text-pc_orange" />
              </div>
              <div>
                <h1 className="text-[21px] lg:text-[24px] font-gilroy_semibold leading-none">
                  My Courses
                </h1>
                <div className="flex items-center mt-1 lg:mt-2 justify-center font-gilroy">
                  <span className="font-semibold mr-1">{numberOfCourses}</span>
                  Registered course{numberOfCourses !== 1 && "s"}
                </div>
              </div>
            </div>
            <div></div>
          </div>
          {/* Course and cetificate toggle buttons */}
          <div className="bg-white px-[20px] lg:px-14 md:pt-10 py-4 md:py-0 w-full rounded-xl mt-8 flex justify-center lg:justify-start lg:items-center gap-6 font-gilroy">
            <button
              onClick={() => setActiveTab("courses")}
              className={`${
                activeTab === "courses"
                  ? "bg-pc_blue lg:bg-transparent lg:border-b-2 border-pc_orange px-6 py-3 lg:pb-0 font-gilroy_semibold text-pc_white_white lg:text-pc_orange"
                  : "text-pc_black bg-pc_bg lg:bg-transparent px-6 py-3 lg:pb-0"
              }`}
            >
              <span>My Courses</span>
            </button>
            <button
              onClick={() => setActiveTab("certificates")}
              className={`${
                activeTab === "certificates"
                  ? "bg-pc_blue lg:bg-transparent lg:border-b-2 border-pc_orange px-6 py-3 lg:pb-0 font-gilroy_semibold text-pc_white_white lg:text-pc_orange"
                  : "text-pc_black bg-pc_bg lg:bg-transparent px-6 py-3 lg:pb-0"
              }`}
            >
              Certificates
            </button>
          </div>

          {/* Certificate and courses sessions and toggle */}
          <div className="bg-white px-[20px] lg:px-14 py-16 mt-8 rounded-lg">
            <div className="">
              {activeTab === "courses" && (
                <div className="flex items-center justify-center flex-wrap gap-14">
                  {enrolledcourses
                    .filter(
                      (course) =>
                        typeof course === "object" && !Array.isArray(course)
                    )
                    .map((course, index) => (
                      <div
                        key={index}
                        className="p-4 md:p-6 bg-pc_bg rounded-tl-3xl rounded-br-3xl w-full md:w-[350px] h-[470px] relative"
                      >
                        <img
                          src={course.course_image_url}
                          alt={course.course_name}
                          className="w-full"
                        />
                        <h2 className="mt-8 font-gilroy_bold text-[18px] leading-tight font-bold text-pc_blue">
                          {course.course_name}
                        </h2>
                        {courseDescription.map((desc) => {
                          if (desc.courseName === course.course_name) {
                            return (
                              <p
                                key={desc.courseName}
                                className="mt-2 font-gilroy_thin text-pc_black text-[14px] line-clamp-4"
                              >
                                {desc.description}
                              </p>
                            );
                          }
                          return null;
                        })}

                        <button
                          className="mt-5 flex items-center justify-center gap-1 leading-none cursor-pointer text-pc_orange"
                          onClick={() => handleCourseClick(course)}
                        >
                          <span>Start Learning</span>
                          <span>
                            <IoIosArrowRoundForward />
                          </span>
                        </button>

                        <div
                          className={`bg-pc_orange text-white w-max text-[10px] font-gilroy_bold rounded-t-md py-1 absolute bottom-0 right-8 px-2 ${
                            course.enrollment_source === "admission_form"
                              ? "instructor-led"
                              : "self-paced"
                          }`}
                        >
                          {course.enrollment_source === "admission_form"
                            ? "Instructor-led"
                            : "Self-Paced"}
                        </div>
                      </div>
                    ))}
                </div>
              )}
              {activeTab === "certificates" && (
                <div className="font-gilroy_semibold text-lg">
                  {certificates.length > 0 ? (
                    certificates.map((certificate, index) => (
                      <div key={index} className="certificate-item">
                        {/* Display certificate details here */}
                        <p>{certificate.name}</p>
                        <p>{certificate.date}</p>
                        {/* Add more fields as needed */}
                      </div>
                    ))
                  ) : (
                    <p className="text-center lg:text-start">
                      No certificates found.
                    </p>
                  )}
                </div>
              )}
            </div>
            {activeTab === "courses" && (
              <div
                id="faq"
                className="FAQ shadow-lg bg-white mt-16 py-7 px-[20px] lg:px-14 rounded-lg w-full lg:w-[80%] mx-auto cursor-pointer relative"
                onClick={toggleFAQVisibility}
              >
                <div className="flex items-center justify-between w-full cursor-pointer">
                  <div className="w-[24px] h-[24px] bg-pc_blue rounded-full hidden lg:block"></div>
                  <h3 className="font-gilroy_thin text-sm md:text-base text-black">
                    Difference between instructor-led vs self-paced courses
                  </h3>
                  {isFAQVisible ? (
                    <HiChevronDown className="text-[24px]" />
                  ) : (
                    <HiChevronRight className="text-[24px]" />
                  )}
                </div>
                {isFAQVisible && (
                  <p className="font-gilroy_thin mt-10 border-t pt-8 border-pc_bg para">
                    You can access the recorded materials for both your
                    self-paced and instructor-led courses right here. <br />
                    <br />
                    However, while Self-Paced (LooP) courses allow you to
                    progress through the modules at your own time and pace,
                    instructor-led programs are designed so that the modules are
                    unlocked often weekly in accordance with the progress of the
                    class in general.
                  </p>
                )}
              </div>
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

      {loading && <LoadingModal />}
    </div>
  );
};

export default Dashboard;
