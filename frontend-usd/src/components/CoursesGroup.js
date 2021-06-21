import React from "react";
import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";
import "../styles/course.less";

const { Text } = Typography;

const mapCourses = (course) => {
  console.log("[COURSE]", course);
  console.log("[LESSONS]", Object.keys(course));

  console.log(Object.keys(course));
  for (let key in course) {
    console.log(key, course[key]);
  }

  return course.lessons.map(
    ({ building, end_time, id, room, start_time, when }) => (
      <Link className="courses-group-item" to={`/courses/${id}`}>
        <Text className="course-code">{id}</Text>
        <Text>
          {start_time} - {end_time}
        </Text>
        <Text className="long">{when}</Text>
        <Text className="long">
          Building: {building}, room: {room}
        </Text>
        {/* <Text className="longer">
        {course.teacher.title} {teacher.teacherName}
      </Text> */}
        <Text className="long" style={{ fontWeight: "600" }}>
          {course.lesson_type}
        </Text>
        <Text>
          <Link to={course.lesson_link}>link</Link>
        </Text>
      </Link>
    )
  );
};

const CoursesGroup = ({ title, course }) => {
  return (
    <Layout className="site-layout courses-group">
      <Text className="courses-group-title">{title}</Text>
      {mapCourses(course)}
    </Layout>
  );
};

export default CoursesGroup;
