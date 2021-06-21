import React, { useEffect, useState } from "react";
import { PageHeader, Divider, Layout, Typography, Avatar } from "antd";
import CourseActivity from "../components/CourseActivity";
import "../styles/course.less";
import { useHistory } from "react-router-dom";
import CourseService from "../services/CourseService";

const { Content, Sider } = Layout;
const { Text, Title, Link } = Typography;

const ContentPart = ({ children, title }) => (
  <div className="content-part">
    <Title level={5}>{title}</Title>
    <Text>{children}</Text>
  </div>
);

const SiderPart = ({ children, title }) => (
  <div>
    <Text className="sider-title">{title}</Text>
    <Text className="sider-text"> {children}</Text>
  </div>
);

const Course = ({ match }) => {
  const [course, setCourse] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [comments2, setComments] = useState([]);

  useEffect(() => {
    try {
      if ("userData" in localStorage && "jwtToken" in localStorage) {
        const userData = JSON.parse(localStorage.getItem("userData"));
        CourseService.get(match.params.id).then((res) => {
          console.log(res.data);
          setCourse(res.data);
          CourseService.getTeacher(res.data.teacher).then((res2) => {
            setTeacher(res2.data);
            console.log(res2.data);
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  // const course = {
  //   courseName: "Sztuczna inteligencja",
  //   lessonType: "laboratorium",
  //   teacher: {
  //     teacherName: "Jan Kowalski",
  //     officeDays: "13:00 - 15:00 poniedziałek",
  //     contact: "jankowalski@pwr.edu.pl",
  //   },
  //   link: "https://pwr-edu.zoom.us/j/92500313824?pwd=KzNWcmdYV2pabVYzWTh1enEzS003QT09",
  //   code: "Z00-00x",
  //   info: [
  //     {
  //       title: "Zasady zaliczania",
  //       body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
  //               - aute irure dolor in reprehenderit \
  //               - in voluptate velit esse cillum \
  //               - dolore eu fugiat nulla pariatur \
  //               Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     },
  //     {
  //       title: "Plan",
  //       body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
  //               - aute irure dolor in reprehenderit \
  //               - in voluptate velit esse cillum \
  //               - dolore eu fugiat nulla pariatur \
  //               Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     },
  //   ],
  // };
  const comments = [
    {
      account: {
        login: "login",
        avatarPath: "https://picsum.photos/100",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "10.03.2021",
    },
    {
      account: {
        login: "login",
        avatarPath: "https://picsum.photos/100",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "10.03.2021",
    },
  ];

  return (
    <PageHeader
      className="site-page-header-responsive site-layout-background"
      onBack={() => window.history.back()}
      title={course.name}
      subTitle={course.lesson_type}
      extra={course.id}
    >
      <Divider />
      <Layout className="site-layout">
        <Content>
          <ContentPart title="Informacje">{course.info}</ContentPart>
          <ContentPart title="Ostatnia aktywność">
            <CourseActivity comments={comments} />
          </ContentPart>
        </Content>
        <Sider className="site-layout">
          <SiderPart title="prowadzący">{course.teacher.teacherName}</SiderPart>
          <SiderPart title="konsultacje">
            <div>{course.teacher.officeDays}</div>
          </SiderPart>
          <SiderPart title="kontakt">{course.teacher.contact}</SiderPart>
          <SiderPart title="uczestnicy">
            <div>
              <Avatar.Group>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
                <Avatar style={{ backgroundColor: "#fab" }}>M</Avatar>
                <Avatar style={{ backgroundColor: "#32bda1" }}>K</Avatar>
                <Avatar style={{ backgroundColor: "#1890ff" }}>+12</Avatar>
              </Avatar.Group>
            </div>
          </SiderPart>
          <SiderPart title="link do zajęć">
            <div>
              <Link href={course.link}>zoom</Link>
            </div>
          </SiderPart>
        </Sider>
      </Layout>
    </PageHeader>
  );
};

export default Course;
