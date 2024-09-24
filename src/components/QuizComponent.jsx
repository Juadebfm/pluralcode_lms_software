import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowRoundBack, IoMdSearch } from "react-icons/io";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import Pluralcode from "../assets/PluralCode.png";
import Plc from "../assets/plc.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { HiUser } from "react-icons/hi2";
import { AuthContext } from "../context/AuthContext";
import { TfiHelpAlt } from "react-icons/tfi";
import { StudyMaterialsContext } from "../context/StudyMaterialsContext";
import { DashboardDataContext } from "../context/DashboardDataContext";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiSlackLine } from "react-icons/ri";
import CourseModuleContainer from "./CourseModuleContainer";
import { CgMenuRight } from "react-icons/cg";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const QuizComponent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeSection, setActiveSection] = useState("courseModules");

  const [quizData, setQuizData] = useState(null); // New state for quiz data

  const quizSelectionKey =
    quizData && quizData.quiz ? `quizSelections_${quizData.quiz.id}` : null;
  const [userSelections, setUserSelections] = useState(() => {
    const savedSelections = localStorage.getItem(quizSelectionKey);
    return savedSelections ? JSON.parse(savedSelections) : {};
  });
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false); // Track if all questions are answered

  const [showQuestions, setShowQuestions] = useState(true);
  const [userScore, setUserScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isRetry, setIsRetry] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { userData } = useContext(AuthContext);
  const { dashboardData } = useContext(DashboardDataContext);

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
  } = user;

  const capitalizedEmail = email.charAt(0).toUpperCase() + email.slice(1);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileSidebar = () =>
    setIsMobileSidebarOpen(!isMobileSidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleGoBack = () => navigate(-1);

  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    const handleScroll = () => setIsNavScrolled(mainContent.scrollTop > 0);

    mainContent.addEventListener("scroll", handleScroll);
    return () => mainContent.removeEventListener("scroll", handleScroll);
  }, []);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  const toggleDetailsVisibility = () => setIsDetailsVisible((prev) => !prev);

  useEffect(() => {
    const courseId = location.state?.courseId;
    if (courseId && dashboardData) {
      const course = dashboardData.find((course) => course.id === courseId);
      setSelectedCourse(course);
    }
  }, [location.state, dashboardData]);

  useEffect(() => {
    const quizFromLocalStorage = JSON.parse(
      localStorage.getItem("currentQuizData")
    );
    if (quizFromLocalStorage && quizFromLocalStorage.quiz) {
      setQuizData(quizFromLocalStorage);

      // Load saved selections
      const savedSelections = localStorage.getItem(
        `quizSelections_${quizFromLocalStorage.quiz.id}`
      );
      if (savedSelections) {
        setUserSelections(JSON.parse(savedSelections));
      }
    } else {
      console.error("No valid quiz data found in local storage");
    }
  }, []);

  useEffect(() => {
    if (quizData && quizData.quiz) {
      localStorage.setItem(
        `quizSelections_${quizData.quiz.id}`,
        JSON.stringify(userSelections)
      );
    }
  }, [userSelections, quizData]);

  const handleAnswerChange = (e, questionIndex) => {
    setUserSelections((prev) => ({
      ...prev,
      [questionIndex]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    let score = 0;
    quizData.quiz.questions.forEach((question, index) => {
      if (userSelections[index] === question.correct_answers[0]) {
        score++;
      }
    });
    const percentage = (score / quizData.quiz.questions.length) * 100;
    setUserScore(percentage);
    setShowQuestions(false);
    localStorage.setItem(
      `quizScore_${quizData.quiz.id}`,
      percentage.toString()
    );
  };

  const handleTryAgain = () => {
    setIsRetry(true);
    setShowQuestions(true);
    setUserScore(null);
    localStorage.removeItem(`quizScore_${quizData.quiz.id}`);
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

        <div
          className="flex-1 p-4 md:p-8 bg-pc_bg font-gilroy overflow-y-auto w-[100vw] lg:w-auto"
          id="main-content"
        >
          <div className="flex flex-col lg:flex-row items-start md:items-center justify-between w-full md:w-auto">
            <div className="flex items-center justify-center gap-2 cursor-pointer font-inter">
              <IoIosArrowRoundBack size={20} />

              <button onClick={handleGoBack} className="text-[18px]">
                Go Back
              </button>
            </div>
            {selectedCourse ? (
              <div className="w-full md:w-auto">
                <button
                  className="mb-4 rounded-lg mt-3 w-full md:w-[312px] h-[50px] bg-pc_orange text-white hover:shadow-md hover:outline hover:outline-slate-200 transition-shadow duration-150 ease-linear flex items-center justify-center gap-2 text-[17px] font-inter"
                  onClick={() =>
                    window.open(selectedCourse.course_community_link, "_blank")
                  }
                >
                  <RiSlackLine size={20} />
                  Cohort Community
                </button>
              </div>
            ) : (
              <p></p>
            )}
          </div>

          <h1 className="bg-pc_white_white lg:bg-transparent text-center lg:text-start py-4 lg:py-0 font-gilroy_semibold text-pc_blue text-[32px] mt-4 lg:mt-10">
            Assessments
          </h1>

          {showQuestions ? (
            <>
              {quizData && quizData.quiz && quizData.quiz.questions ? (
                quizData.quiz.questions.map((question, index) => (
                  <div key={index} className="my-2 lg:my-6 p-6 lg:p-0">
                    <h3 className="text-xl font-medium mb-2">{`${index + 1}. ${
                      question.question
                    }`}</h3>
                    {question.answers.map((answer, answerIndex) => (
                      <div
                        key={answerIndex}
                        className="flex items-center mb-0 lg:mb-2"
                      >
                        <input
                          type="radio"
                          id={`q${index}a${answerIndex}`}
                          name={`question${index}`}
                          value={answer}
                          onChange={(e) => handleAnswerChange(e, index)}
                          checked={userSelections[index] === answer}
                          className="mr-2"
                        />
                        <label
                          htmlFor={`q${index}a${answerIndex}`}
                          className="cursor-pointer"
                        >
                          {answer}
                        </label>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <p>No quiz data available</p>
              )}

              <div className="p-6 lg:p-0">
                <button
                  onClick={handleSubmit}
                  disabled={
                    Object.keys(userSelections).length !==
                    quizData?.quiz.questions.length
                  }
                  className={`mt-4 px-8 lg:px-4 py-2 text-white font-semibold rounded ${
                    Object.keys(userSelections).length ===
                    quizData?.quiz.questions.length
                      ? "w-full lg:w-[200px] h-[51px] bg-pc_orange"
                      : "bg-gray-500 w-full lg:w-[200px] h-[51px]"
                  }`}
                >
                  Submit
                </button>
              </div>
            </>
          ) : (
            <div className="my-3">
              <div className="flex items-end justify-between">
                <div className="text-xl font-bold flex flex-col lg:flex-row items-center justify-start lg:justify-between gap-3 bg-pc_white_white lg:bg-transparent w-full p-10 lg:p-0 border-b lg:border-b-0 border-b-slate-400 rounded-lg">
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-green-500">
                      <IoCheckmarkCircleSharp />
                    </span>
                    <span>Your Quiz Has Been Submitted</span>
                  </span>

                  {!showResults && (
                    <button
                      onClick={() => setShowResults(true)}
                      className="mt-4 lg:mt-0 w-[200px] h-[51px] px-4 py-2 text-base text-white font-gilroy_semibold rounded bg-pc_orange hover:bg-pc_orange/90 transition-all duration-150 ease-linear"
                    >
                      Show Result
                    </button>
                  )}
                </div>
              </div>

              {showResults && (
                <div className="mt-4 p-6 bg-white rounded-lg shadow">
                  <span className="text-xl flex flex-col items-center justify-center border-b border-slate-400 pb-10">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-green-500">
                        <IoCheckmarkCircleSharp />
                      </span>
                      <span>Passing Grade</span>
                    </div>
                    <div className="text-base mt-3">
                      To Pass <i>80% or Higher</i>
                    </div>
                  </span>
                  <p className="text-xl flex items-center justify-center flex-col py-10">
                    Your Score:
                    <span
                      className={
                        userScore < 80 ? "text-red-500" : "text-green-500"
                      }
                    >
                      {userScore.toFixed(2)}%
                    </span>
                  </p>
                  {userScore >= 80 ? (
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => {
                          /* Handle next module navigation */
                        }}
                        className="mt-4 w-[200px] h-[51px] px-4 py-2 text-base text-white font-gilroy_semibold rounded bg-pc_orange hover:bg-pc_orange/90 transition-all duration-150 ease-linear"
                      >
                        Next Module
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <button
                        onClick={handleTryAgain}
                        className="w-[200px] h-[51px] px-4 py-2 text-pc_orange font-semibold rounded bg-transparent mb-4 hover:text-pc_white_white border border-pc_orange hover:bg-pc_orange duration-150 ease-linear transition-all"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
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

export default QuizComponent;
