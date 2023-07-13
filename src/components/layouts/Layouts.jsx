import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import "./layouts.css";
import Home from "../../Routes/Home/Home";

const Layouts = () => {
  return (
    <main className="app">
      <Header />
      <Outlet />
    </main>
  );
};

export default Layouts;
