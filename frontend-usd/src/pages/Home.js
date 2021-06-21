import React from "react";
import { PageHeader, Divider, Layout } from "antd";
import MyCalendar from "../components/MyCalendar.js";
const { Content } = Layout;

class Home extends React.Component {
  title = "Panel użytkownika";
  weekType = "nieparzysty";
  dates = new Date().getDate();

  getWeekNum = () => {
    const todaydate = new Date();
    let oneJan = new Date(todaydate.getFullYear(), 0, 1);
    let numberOfDays = Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000));
    let result = Math.ceil((todaydate.getDay() + 1 + numberOfDays) / 7);
    return result % 2 === 1 ? "nieparzysty" : "parzysty";
  };

  render() {
    return (
      <PageHeader
        className="site-page-header-responsive site-layout-background"
        onBack={() => window.history.back()}
        title={this.title}
        subTitle={this.weekType}
        extra={this.dates}
      >
        <Divider />
        <Layout>
          <Content>
            <MyCalendar />
          </Content>
        </Layout>
      </PageHeader>
    );
  }
}

export default Home;
