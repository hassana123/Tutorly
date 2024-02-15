import Register from "./Routes/register/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import Layouts from "./components/layouts/Layouts";
import UserLayout from "./Routes/user/layout/UserLayout";
import Login from "./Routes/login/Login";
import UpdateProfile from "./Routes/user/UpdateProfile";
import Home from "./Routes/Home/Home";
import User from "./Routes/user/User";
import Missing from "./Routes/missing/Missing";
import Unauthorized from "./Routes/unauthorized/Unauthorized";
import StudentSignUp from "./Routes/register/studentSignUp/StudentSignUp";
import TutorSignUp from "./Routes/register/tutorSignUp/TutorSignUp";
import StudentLogin from "./Routes/login/studentLogin/StudentLogin";
import Tutors from "./Routes/Tutors/Tutors";
import TutorProfile from "./Routes/user/TutorProfile";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
function App() {
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  //localStorage.clear();

  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        {/* Public Routes*/}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/register/user" element={<StudentSignUp />} />
        <Route path="/register/tutor" element={<TutorSignUp />} />
        <Route path="/login/user" element={<StudentLogin />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <UserLayout />
          </RequireAuth>
        }
      >
        <Route
          path="userdashboard"
          element={
            <RequireAuth>
              <User />
            </RequireAuth>
          }
        />
        <Route
          path="updateprofile"
          element={
            <RequireAuth>
              <UpdateProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/user/tutorprofile/:id"
          element={
            <RequireAuth>
              <TutorProfile />
            </RequireAuth>
          }
        />
      </Route>
      <Route
        path="tutordashboard"
        element={
          <RequireAuth>
            <Tutors />
          </RequireAuth>
        }
      />

      {/* missing Route */}
      <Route path="*" element={<Missing />} />

      {/* unauthorized Route */}
      <Route path="401" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;
