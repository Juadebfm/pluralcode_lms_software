import React, { createContext, useState, useEffect } from "react";

export const StudyMaterialsContext = createContext();

export const StudyMaterialsProvider = ({ children }) => {
  const [groupedStudyMaterials, setGroupedStudyMaterials] = useState(null);

  useEffect(() => {
    // Load data from local storage on component mount
    const storedData = localStorage.getItem("groupedStudyMaterials");
    if (storedData) {
      setGroupedStudyMaterials(JSON.parse(storedData));
    }
  }, []);

  return (
    <StudyMaterialsContext.Provider
      value={{ groupedStudyMaterials, setGroupedStudyMaterials }}
    >
      {children}
    </StudyMaterialsContext.Provider>
  );
};
