import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const UserNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="/userdashboard" className="text-white font-bold text-xl">
          tutorly
        </NavLink>

        {/* Hamburger Menu Button (visible on small screens) */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6h16M4 12h16m-7 6h7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        {menuOpen && (
          <div className="bg-gray-800 lg:hidden top-[9.9%] py-5 border-t-[1px] py-10 left-0 px-5 w-[50%] flex flex-col mt-4 space-y-4 absolute">
            <NavLink
              to="/userdashboard"
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/session-history"
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Session History
            </NavLink>
            <NavLink
              to="/notifications"
              activeClassName="text-blue-500"
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Notifications
            </NavLink>
            <NavLink
              to="/chatbox"
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Chatbox
            </NavLink>
            <NavLink
              to="/updateprofile"
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Update Profile
            </NavLink>
          </div>
        )}
        {/* Navigation Links (visible on large screens) */}
        <div
          className={`hidden lg:flex space-x-4 ${menuOpen ? "flex-col" : ""}`}
        >
          <NavLink
            to="/userdashboard"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/session-history"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Session History
          </NavLink>
          <NavLink
            to="/notifications"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Notifications
          </NavLink>
          <NavLink
            to="/chatbox"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Chatbox
          </NavLink>
          <NavLink
            to="/updateprofile"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Update Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default UserNav;
