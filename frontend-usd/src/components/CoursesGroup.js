import React from "react";
import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";
import "../styles/course.less";

const { Text } = Typography;

const mapCourses = (courses) =>
  courses.map(({ code, time, weekDay, teacher, lessonType, link }) => (
    <Link className="courses-group-item" to={`/courses/${code}`}>
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
    </Link>
  ));

const CoursesGroup = ({ title, courses }) => {
  return (
    <Layout className="site-layout courses-group">
        <Text className="courses-group-title">{title}</Text>
        {mapCourses(courses)}
    </Layout>
  );
};

export default CoursesGroup;
