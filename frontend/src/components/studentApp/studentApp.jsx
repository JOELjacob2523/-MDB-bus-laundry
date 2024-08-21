import "./studentApp.css";
import React from "react";
import { Outlet } from "react-router-dom";
import PageHeader from "../header/header";
import Sidebar from "../sidebar/sidebar";
import PageFooter from "../footer/footer";

const StudentApp = () => {
  return (
    <div className="main_root_container">
      <div className="page_header">
        <PageHeader />
      </div>
      <div className="sidebar">
        <Sidebar />
        <div className="main_page_container">
          <Outlet />
        </div>
      </div>

      <div className="footer">
        <PageFooter />
      </div>
    </div>
  );
};

export default StudentApp;
