import React from "react";
import { Layout, Breadcrumb, Typography } from "antd";
const { Content, Footer } = Layout;
const { Link } = Typography;

class SiteContent extends React.Component {
  render() {
    return (
      <Content className="site-layout" style={{ padding: "0 30px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        {this.props.children}
        <Footer
          className="site-layout"
          style={{ margin: "24px", textAlign: "center" }}
        >
          Copyright ©2021
          <Link to="https://github.com/Reevo55">Reevo55</Link> &
          <Link to="https://github.com/MrMijagi"> MrMijagi</Link> &
          <Link to="https://github.com/limisie"> limisie</Link>
        </Footer>
      </Content>
    );
  }
}

export default SiteContent;
