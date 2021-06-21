import React from "react";
import { Layout, Input, Avatar, Menu, Dropdown, Typography } from "antd";
import { SettingOutlined } from "@ant-design/icons";
const { Text, Title, Link } = Typography;
const { Header } = Layout;
const { Search } = Input;

class SiteHeader extends React.Component {
  siteTitle = "Planner studenta PWR";
  avatarSize = 36;
  avatarPath =
    "https://dona.pwr.edu.pl/szukaj/img/logo_PWr_kolor_poziom_bez_tla.png";

  menu = (
    <Menu>
      <Menu.Item>
        <Link to="#">Konto</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="#">Link</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link to="#">
          <Text type="danger">Wyloguj się</Text>
        </Link>
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <Header className="layout-menu flex" style={{ zIndex: "10" }}>
        <div className="flex">
          <div className="logo" />
          <Title level={2} style={{ margin: 0 }}>
            {this.siteTitle}
          </Title>
        </div>
        <div className="flex">
          <Search placeholder="search" style={{ maxWidth: "250px" }} />
          <Link to="#">
            <SettingOutlined className="icon-link" />
          </Link>

          <Dropdown overlay={this.menu} placement="bottomRight" arrow>
            <Avatar
              src={this.avatarPath}
              size={this.avatarSize}
              style={{ minWidth: `${this.avatarSize}px` }}
            />
          </Dropdown>
        </div>
      </Header>
    );
  }
}

export default SiteHeader;
