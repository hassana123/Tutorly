import { useState } from "react";
import "./login.css";
import StudentLogin from "./studentLogin/StudentLogin";
//import TutorLogIn from "./tutorLogin/TutorLogin";
import { useNavigate, Link, Outlet } from "react-router-dom";
const Login = () => {
  const handleStudentLogin = () => {
    // Pass 'student' as a parameter to indicate student sign-up
    navigate("/login/user", { state: { userType: "student" } });
  };

  const handleTutorLogin = () => {
    // Pass 'tutor' as a parameter to indicate tutor sign-up
    navigate("/login/user", { state: { userType: "tutor" } });
  };
  const navigate = useNavigate();
  return (
    <section className="grid login-section">
      <div className="student">
        <h1>Student</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          obcaecati praesentium, accusantium expedita voluptates vitae
          exercitationem quidem nulla tenetur deleniti?
        </p>
        <button onClick={handleStudentLogin}>Sign-In</button>
      </div>
      <div className="tutor">
        <h1>Tutor</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          obcaecati praesentium, accusantium expedita voluptates vitae
          exercitationem quidem nulla tenetur deleniti?
        </p>
        <button onClick={handleTutorLogin}>Sign-In</button>
      </div>
    </section>
  );
};

export default Login;
