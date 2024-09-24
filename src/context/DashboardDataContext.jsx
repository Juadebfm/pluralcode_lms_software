import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const DashboardDataContext = createContext();

export const DashboardDataProvider = ({ children }) => {
  const { userData } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
          redirect: "follow",
        };

        const response = await fetch(
          "https://backend.pluralcode.institute/student/dashboard-api",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const result = await response.json();
        setDashboardData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userData && userData.token) {
      fetchDashboardData();
    }
  }, [userData]);

  return (
    <DashboardDataContext.Provider value={{ dashboardData, loading, error }}>
      {children}
    </DashboardDataContext.Provider>
  );
};
