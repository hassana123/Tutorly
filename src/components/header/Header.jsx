import "./header.css";
import Image from "../../assets/rand1.jpg";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [menu, setmenu] = useState(false);
  window.addEventListener("resize", () => {
    setmenu(false);
  });
  return (
    <header>
      <div className="logo">
        <h1>
          <small>t</small>
          <small>u</small>
          <small>t</small>
          <small>o</small>
          <small>r</small>
          <small>l</small>
          <small>y</small>
        </h1>
      </div>
      <nav className={menu ? "nav-menu" : "navigations"}>
        <div className="links">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/tutors"
          >
            find a tutor
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/about"
          >
            About Us
          </NavLink>
        </div>
        <div className="sign-in-up">
          <NavLink
            className={({ isActive }) => (isActive ? "active login" : "login")}
            to="login"
          >
            login
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active sign-up" : "sign-up"
            }
            to="register"
          >
            sign up
          </NavLink>
        </div>
      </nav>
      <div
        className={`${menu ? "hamburger-btn active" : "hamburger-btn"}`}
        onClick={() => setmenu(!menu)}
      >
        <span className="line" />
        <span className="line" />
        <span className="line" />
      </div>
      <div className="blob one"></div>
      <div className="blob two"></div>
      <div className="blob three"></div>

      {/* <div className="searchbar">
        <input type="text" placeholder="search for a course" />
      </div> */}
    </header>
  );
};

export default Header;
