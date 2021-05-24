import React from 'react';
import { PageHeader, Divider, Layout, Typography, Avatar } from 'antd';
import CourseActivity from '../components/CourseActivity';
import '../styles/course.less';

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

const fetchData = async (path) => {
    const fetchedData = await fetch(`http://url/${path}`);
    return await fetchedData.json();
}

class Course extends React.Component {

    constructor({ match }) {
        super({ match });
        // this.course = fetchCourse(match.url);
        // this.comments = fetchCourse(`${match.url}/comments`);
        // const { courseName, lessonType, code, info, teacher, officeDays, link } = this.course
    }

    course = {
        courseName: 'Sztuczna inteligencja',
        lessonType: 'laboratorium',
        teacher: {
            teacherName: 'Jan Kowalski',
            officeDays: '13:00 - 15:00 poniedziałek',
            contact: 'jankowalski@pwr.edu.pl',
        },
        link: 'https://pwr-edu.zoom.us/j/92500313824?pwd=KzNWcmdYV2pabVYzWTh1enEzS003QT09',
        code: 'Z00-00x',
        info: [{
            title: 'Zasady zaliczania',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
                - aute irure dolor in reprehenderit \
                - in voluptate velit esse cillum \
                - dolore eu fugiat nulla pariatur \
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            title: 'Plan',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
                - aute irure dolor in reprehenderit \
                - in voluptate velit esse cillum \
                - dolore eu fugiat nulla pariatur \
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        ]
    };
    comments = [{
        account: {
            login: 'login',
            avatarPath: 'https://picsum.photos/100'
        },
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '10.03.2021'
    },
    {
        account: {
            login: 'login',
            avatarPath: 'https://picsum.photos/100'
        },
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '10.03.2021'
    },
    ];

    render() {
        return (
            <PageHeader
                className="site-page-header-responsive site-layout-background"
                onBack={() => window.history.back()}
                title={this.course.courseName}
                subTitle={this.course.lessonType}
                extra={this.course.code}>
                <Divider />
                <Layout className="site-layout">
                    <Content>
                        {this.course.info.map(({ title, body }) => (<ContentPart title={title}>{body}</ContentPart>))}
                        <ContentPart title='Ostatnia aktywność'>
                            <CourseActivity comments={this.comments} />
                        </ContentPart>
                    </Content>
                    <Sider className="site-layout">
                        <SiderPart title="prowadzący">{this.course.teacher.teacherName}</SiderPart>
                        <SiderPart title="konsultacje"><div>{this.course.teacher.officeDays}</div></SiderPart>
                        <SiderPart title="kontakt">{this.course.teacher.contact}</SiderPart>
                        <SiderPart title="uczestnicy">
                            <div>
                                <Avatar.Group>
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                                    <Avatar style={{ backgroundColor: '#fab' }}>M</Avatar>
                                    <Avatar style={{ backgroundColor: '#32bda1' }}>K</Avatar>
                                    <Avatar style={{ backgroundColor: '#1890ff' }} >+12</Avatar>
                                </Avatar.Group>
                            </div>
                        </SiderPart>
                        <SiderPart title="link do zajęć"><div><Link href={this.course.link}>zoom</Link></div></SiderPart>
                    </Sider>
                </Layout>
            </PageHeader>
        );
    }
}

export default Course;