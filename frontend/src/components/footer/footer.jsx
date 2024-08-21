import "./footer.css";
import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

const PageFooter = () => (
  <div className="layout">
    <div className="footer_container">
      <Footer className="footer">
        &copy; {new Date().getFullYear()} Kadishes Yoel KJ. All Rights Reserved.
      </Footer>
    </div>
  </div>
);
export default PageFooter;
