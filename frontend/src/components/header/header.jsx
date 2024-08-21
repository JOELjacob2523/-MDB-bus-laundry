import "./header.css";
import KYSymbol from "../../images/KYSymbol.png";
import items from "./headerItems";
import React from "react";
import HebrewDate from "../hebrewDate/hebrewDate";
import { Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";

const PageHeader = () => (
  <div className="header_container">
    <div className="KY_symbol_container">
      <a href="http://localhost:3000/" className="KY_symbol_container">
        <img className="KY_symbol_img" alt="KYSymbol" src={KYSymbol} />
      </a>
    </div>
    <div className="hebrew_date">
      <HebrewDate />
    </div>
    <div className="profile_container">
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
        className="dropdown"
      >
        <Avatar size={48} icon={<UserOutlined />} className="profile" />
      </Dropdown>
    </div>
  </div>
);
export default PageHeader;
