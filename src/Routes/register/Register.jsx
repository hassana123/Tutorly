import { useState } from "react";
import "./register.css";
import TutorSignUp from "./tutorSignUp/TutorSignUp";
import StudentSignUp from "./studentSignUp/StudentSignUp";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const handleStudentSignUp = () => {
    // Pass 'student' as a parameter to indicate student sign-up
    navigate("/register/user", { state: { userType: "student" } });
  };

  const handleTutorSignUp = () => {
    // Pass 'tutor' as a parameter to indicate tutor sign-up
    navigate("/register/user", { state: { userType: "tutor" } });
  };
  return (
    <section className="grid register-section">
      <div className="student">
        <h1>Student</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          obcaecati praesentium, accusantium expedita voluptates vitae
          exercitationem quidem nulla tenetur deleniti?
        </p>
        <button onClick={handleStudentSignUp}>Sign-Up</button>
      </div>
      <div className="tutor">
        <h1>Tutor</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          obcaecati praesentium, accusantium expedita voluptates vitae
          exercitationem quidem nulla tenetur deleniti?
        </p>

        <button onClick={handleTutorSignUp}>Sign-Up</button>
      </div>
    </section>
  );
};

export default Register;
