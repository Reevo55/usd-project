import React from "react";
import { PageHeader, Layout, Divider, Typography } from "antd";
import CoursesGroup from "../components/CoursesGroup";
import "../styles/course.less";

const { Content } = Layout;

class CoursesList extends React.Component {
  courses = [
    {
      courseName: "Sztuczna inteligencja",
      lessonType: "laboratorium",
      teacher: {
        title: "mgr inz.",
        teacherName: "Jan Kowalski",
      },
      time: "15:15",
      weekDay: "poniedziałek",
      link: "https://pwr-edu.zoom.us/j/92500313824?pwd=KzNWcmdYV2pabVYzWTh1enEzS003QT09",
      code: "Z00-00x",
    },
    {
      courseName: "Sztuczna inteligencja",
      lessonType: "laboratorium",
      teacher: {
        title: "mgr inz.",
        teacherName: "Jan Kowalski",
      },
      time: "15:15",
      weekDay: "poniedziałek",
      link: "https://pwr-edu.zoom.us/j/92500313824?pwd=KzNWcmdYV2pabVYzWTh1enEzS003QT09",
      code: "Z00-00x",
    },
    {
      courseName: "Sztuczna inteligencja",
      lessonType: "laboratorium",
      teacher: {
        title: "mgr inz.",
        teacherName: "Jan Kowalski",
      },
      time: "15:15",
      weekDay: "poniedziałek",
      link: "https://pwr-edu.zoom.us/j/92500313824?pwd=KzNWcmdYV2pabVYzWTh1enEzS003QT09",
      code: "Z00-00x",
    },
  ];

  render() {
    return (
      <PageHeader
        className="site-page-header-responsive site-layout-background"
        onBack={() => window.history.back()}
        title="Moje grupy"
      >
        <Divider />
        <Layout className="site-layout">
          <Content>
            <CoursesGroup title="Sztuczna inteligencja" courses={this.courses} />
            <CoursesGroup title="Hurtownie danych" courses={this.courses} />
          </Content>
        </Layout>
      </PageHeader>
    );
  }
}

export default CoursesList;
