import React from "react";
import { Outlet } from "react-router-dom";
import UserNav from "../UserNav";
const UserLayout = () => {
  return (
    <main className="">
      <UserNav />
      <Outlet />
    </main>
  );
};

export default UserLayout;
