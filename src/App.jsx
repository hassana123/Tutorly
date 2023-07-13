import Register from "./Routes/register/Register";
import { Routes, Route } from "react-router-dom";
import Layouts from "./components/layouts/Layouts";
import Login from "./Routes/login/Login";
import Home from "./Routes/Home/Home";
import User from "./Routes/user/User";
import Missing from "./Routes/missing/Missing";
import Unauthorized from "./Routes/unauthorized/Unauthorized";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        {/* Public Routes*/}
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="user" element={<User />} />

        {/* missing Route */}
        <Route path="*" element={<Missing />} />

        {/* unauthorized Route */}
        <Route path="401" element={<Unauthorized />} />
      </Route>
    </Routes>
  );
}

export default App;
