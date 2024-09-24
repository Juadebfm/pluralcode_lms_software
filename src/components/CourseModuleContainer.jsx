import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModuleImage from "../assets/moduleimage.png";
import ModuleImageLg from "../assets/moduleImgLg.png";
import { FaLaptop } from "react-icons/fa";

const CourseModuleContainer = () => {
  const [courseName, setCourseName] = useState("");
  const [courseModules, setCourseModules] = useState([]);
  const [visitedModules, setVisitedModules] = useState([]);
  const [currentModuleId, setCurrentModuleId] = useState(null);
  const [nextLecture, setNextLecture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("groupedStudyMaterials")
    );

    if (storedData) {
      setCourseName(storedData.courseName || "Course Name Not Available");
      setCourseModules(storedData.courseModules || []);
    }

    const storedVisitedModules =
      JSON.parse(localStorage.getItem("visitedModules")) || [];
    setVisitedModules(storedVisitedModules);
  }, []);

  useEffect(() => {
    if (currentModuleId) {
      const module = courseModules.find((m) => m.moduleId === currentModuleId);
      if (module) {
        const lectures = module.studyMaterials.finalResult;
        const visitedLectureIds = new Set(
          visitedModules.map((v) => v.lectureId)
        );

        // Find the next lecture that hasn't been visited
        const nextLecture =
          lectures.find((l) => !visitedLectureIds.has(l.lecture.id)) ||
          lectures[0];

        setNextLecture(nextLecture);
      }
    }
  }, [currentModuleId, visitedModules, courseModules]);

  const countStudyMaterials = (studyMaterials) => {
    let videos = 0;
    let pdfs = 0;
    let quizzes = 0;

    if (studyMaterials && studyMaterials.finalResult) {
      studyMaterials.finalResult.forEach((item) => {
        if (item.lecture && item.lecture.attachments) {
          item.lecture.attachments.forEach((attachment) => {
            if (attachment.kind === "video") {
              videos += 1;
            } else if (attachment.kind === "pdf_embed") {
              pdfs += 1;
            } else if (attachment.kind === "quiz") {
              quizzes += 1;
            }
          });
        }
      });
    }

    return { videos, pdfs, quizzes };
  };

  const handleModuleClick = (moduleId) => {
    const updatedVisitedModules = [
      ...visitedModules,
      { moduleId, lectureId: null },
    ];
    setVisitedModules(updatedVisitedModules);
    localStorage.setItem(
      "visitedModules",
      JSON.stringify(updatedVisitedModules)
    );

    // Find the selected module and store its study materials in local storage
    const selectedModule = courseModules.find(
      (module) => module.moduleId === moduleId
    );
    if (selectedModule) {
      localStorage.setItem(
        "currentModuleStudyMaterials",
        JSON.stringify(selectedModule.studyMaterials)
      );
    }

    setCurrentModuleId(moduleId);
    navigate(`/module/${moduleId}`);
  };

  return (
    <div className="p-0 lg:p-4">
      <div>
        {courseModules.map((module) => {
          const { videos, pdfs, quizzes } = countStudyMaterials(
            module.studyMaterials
          );
          const isVisited = visitedModules.some(
            (v) => v.moduleId === module.moduleId
          );

          return (
            <div
              key={module.moduleId}
              className="h-max lg:h-[194px] shadow-lg px-5 py-7 rounded-tl-2xl rounded-br-2xl mt-6 flex flex-col lg:flex-row items-center justify-center gap-4 cursor-pointer"
              onClick={() => handleModuleClick(module.moduleId)}
            >
              <div className="flex flex-col lg:flex-row items-start justify-start gap-5 w-full lg:w-[70%]">
                <img
                  className="hidden lg:block"
                  src={ModuleImage}
                  alt=""
                  width={133}
                  height={133}
                />
                <img src={ModuleImageLg} alt="" className="block lg:hidden" />
                <div className="font-gilroy_semibold space-y-1">
                  <div className="font-gilroy_thin font-bold">Course | {courseName}</div>
                  <div className="font-gilroy_semibold text-[24px] leading-tight capitalize">
                    {module.moduleName}
                  </div>
                  <div className="font-gilroy_thin font-bold flex items-center justify-start text-[10.3px] gap-2">
                    <FaLaptop />
                    <div className="leading-none">
                      {videos} Lessons & {quizzes} Assessments & {pdfs} PDFs
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-l-0 lg:border-t-0 lg:border-l pt-2 lg:pt-0 border-pc_light_gray h-full w-full lg:w-[30%]">
                <button className="mt-2 p-2 border rounded w-[210px] mx-auto text-white font-gilroy_semibold text-[12px] bg-pc_blue flex flex-col items-center justify-between">
                  {isVisited ? "Continue Module" : "View Module"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {nextLecture && currentModuleId && (
        <div className="mt-6 p-4 border rounded-lg shadow-md">
          <div className="text-lg font-gilroy_semibold mb-2">Next Up</div>
          <div className="flex items-start gap-4">
            <img src={ModuleImage} alt="" width={100} height={100} />
            <div>
              <div className="text-lg font-gilroy_semibold">
                {nextLecture.lecture.name}
              </div>
              <div className="text-sm font-gilroy_thin">
                {`Lesson ${nextLecture.lecture.position} of ${
                  courseModules.find((m) => m.moduleId === currentModuleId)
                    .studyMaterials.finalResult.length
                }`}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseModuleContainer;
