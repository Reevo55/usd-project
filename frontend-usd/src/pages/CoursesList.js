import React, { useEffect, useState } from "react";
import { PageHeader, Layout, Divider } from "antd";
import { useHistory } from "react-router-dom";
import CoursesGroup from "../components/CoursesGroup";
import AccountService from "../services/AccountService";
import CourseService from "../services/CourseService";
import "../styles/course.less";

const { Content } = Layout;

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getData = async () => {
    if ("userData" in localStorage && "jwtToken" in localStorage) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const accCourses = await AccountService.getCourses(userData.account_id);
      const coursesToAdd = accCourses.data;

      coursesToAdd.forEach(async (course) => {
        const lessons = await CourseService.getLessons(course.id);
        course.lessons = [0, 1, 2];
      });

      setCourses(coursesToAdd);
    } else {
      history.push("/login");
    }
  };

  const mapCourses = (courses) => {
    if (courses.length > 0) {
      console.log("[MAP COURSES]", courses);
      return courses.map((course) => (
        <CoursesGroup title={course.name} course={course} key={course.id} />
      ));
    } else return null;
  };

  return (
    <PageHeader
      className="site-page-header-responsive site-layout-background"
      onBack={() => window.history.back()}
      title="Moje grupy"
    >
      <Divider />
      <Layout className="site-layout">
        {/* <Content>{mapCourses(courses)}</Content> */}
      </Layout>
    </PageHeader>
  );
};

export default CoursesList;
