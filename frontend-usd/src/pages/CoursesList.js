import React, { useEffect, useState } from "react";
import { PageHeader, Layout, Divider } from "antd";
import CoursesGroup from "../components/CoursesGroup";
import AccountService from "../services/AccountService";
import "../styles/course.less";
import { useHistory } from "react-router-dom";

const { Content } = Layout;

function CoursesList() {
  const [courses, setCourses] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if ("userData" in localStorage && "jwtToken" in localStorage) {
      const userData = JSON.parse(localStorage.getItem("userData"));

      AccountService.getCourses(userData.account_id)
        .then((res) => {
          console.log("[FETCHED COURSES]", res);
          setCourses(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      history.push("/login");
    }
  }, []);

  const mockCourses = [
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

  return (
    <PageHeader
      className="site-page-header-responsive site-layout-background"
      onBack={() => window.history.back()}
      title="Moje grupy"
    >
      <Divider />
      <Layout className="site-layout">
        <Content>
          <CoursesGroup title="Sztuczna inteligencja" courses={mockCourses} />
          <CoursesGroup title="Hurtownie danych" courses={mockCourses} />
        </Content>
      </Layout>
    </PageHeader>
  );
}

export default CoursesList;
