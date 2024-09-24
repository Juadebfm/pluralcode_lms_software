import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import ForgotPassword from "./components/ForgotPassword";
import Profile from "./components/Profile";
import CourseModulesPage from "./components/CourseModule";
import HelpCenter from "./components/HelpCenter";
import ModuleVideoPage from "./components/ModuleVideoPage";
import QuizComponent from "./components/QuizComponent";
import VerificationCode from "./components/VerificationCode";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verifycode" element={<VerificationCode />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoutes element={<Dashboard />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoutes element={<Profile />} />}
        />
        <Route
          path="/courses/:courseId"
          element={<ProtectedRoutes element={<CourseModulesPage />} />}
        />
        <Route
          path="/help_center"
          element={<ProtectedRoutes element={<HelpCenter />} />}
        />

        <Route
          path="/module/:moduleId"
          element={<ProtectedRoutes element={<ModuleVideoPage />} />}
        />

        <Route
          path="/quiz/:quizId"
          element={<ProtectedRoutes element={<QuizComponent />} />}
        />

        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
