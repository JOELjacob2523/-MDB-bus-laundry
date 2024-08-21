import "./sidebar.css";
import React, { useState } from "react";
import items from "./sideBarItems";
import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const onItemClick = (key) => {
    setSelectedItem(key);
  };

  return (
    <div className="sider_container">
      <Sider className="sider">
        <Menu
          className="sidebar_menu"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={({ key }) => onItemClick(key)}
        >
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <NavLink to={item.path} style={{ textDecoration: "none" }}>
                {item.label}
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      {selectedItem &&
        items.find((item) => item.key === selectedItem)?.component}
    </div>
  );
};

export default Sidebar;
