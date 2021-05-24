import React from "react";
import { PageHeader, Layout, Divider, Typography } from "antd";
import "../styles/course.less";

const { Content } = Layout;
const { Link, Text } = Typography;

const mapCourses = (courses) =>
  courses.map(({ code, time, weekDay, teacher, lessonType, link }) => (
    <div className="course-list-item">
      <Text className="course-code">{code}</Text>
      <Text>{time}</Text>
      <Text className="long">{weekDay}</Text>
      <Text className="longer">
        {teacher.title} {teacher.teacherName}
      </Text>
      <Text className="long" style={{ fontWeight: "600" }}>
        {lessonType}
      </Text>
      <Text>
        <Link to={link}>link</Link>
      </Text>
    </div>
  ));

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
          <Content>{mapCourses(this.courses)}</Content>
        </Layout>
      </PageHeader>
    );
  }
}

export default CoursesList;
