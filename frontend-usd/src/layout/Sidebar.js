import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  ClockCircleOutlined,
  UnorderedListOutlined,
  BellOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleToggleMenu = () => setIsCollapsed(!isCollapsed);

  const menu = [
    {
      title: "Home",
      path: "/",
      icon: <HomeOutlined />,
    },
    {
      title: "Ostatnio przeglądane",
      path: "/courses/:id",
      icon: <ClockCircleOutlined />,
    },
    {
      title: "Lista zajęć",
      path: "/courses",
      icon: <UnorderedListOutlined />,
    },
    {
      title: "Aktualności",
      path: "/courses/:id",
      icon: <BellOutlined />,
    },
  ];
  const courses = [
    {
      courseName: "Hurtownie danych",
      tag: "HD",
    },
    {
      courseName: "Sztuczna inteligencja",
      tag: "SI",
    },
    {
      courseName: "Programowanie aplikacji multimedialnych",
      tag: "PAM",
    },
  ];

  const mapMenu = (items) => {
    return items.map(({ title, path, icon }) => (
      <Menu.Item key={title} icon={icon}>
        <Link to={path}>{title}</Link>
      </Menu.Item>
    ));
  };

  const mapCourses = (items) => {
    return items.map(({ courseName, tag }) => (
      <Menu.Item key={courseName}>
        <Link to="/courses" className="menu-item-hashtag">
          #{courseName.length < 24 ? courseName : tag}
        </Link>
      </Menu.Item>
    ));
  };

  return (
    <Sider
      collapsible
      collapsed={isCollapsed}
      collapsedWidth={80}
      theme="light"
      width={250}
      className="layout-menu"
      trigger={React.createElement(isCollapsed ? RightOutlined : LeftOutlined, {
        className: "icon-link",
        onClick: handleToggleMenu,
      })}
    >
      <Menu theme="light" mode="inline" defaultSelectedKeys={["Home"]}>
        {mapMenu(menu)}
        <Menu.Divider style={{ margin: "0 24px" }} />
        {mapCourses(courses)}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
