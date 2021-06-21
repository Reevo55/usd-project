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
  const [comments, setComments] = useState([]);

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
        CourseService.getComments(match.params.id).then((res) => {
          setComments(res.data);
          console.log(res.data);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

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
          <SiderPart title="prowadzący">{teacher.title} {teacher.name}</SiderPart>
          <SiderPart title="konsultacje">
            <div>{teacher.office_days}</div>
          </SiderPart>
          <SiderPart title="kontakt">{teacher.contact}</SiderPart>
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
