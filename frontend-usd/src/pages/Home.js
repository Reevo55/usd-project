import React from 'react';
import { PageHeader, Divider, Layout } from 'antd';
const { Content } = Layout;


class Home extends React.Component {

    title = "Tydzień";
    weekType = "nieparzysty";
    dates = "10-14 maja";

    render() {
        return (
            <PageHeader
                className="site-page-header-responsive site-layout-background"
                onBack={() => window.history.back()}
                title={this.title}
                subTitle={this.weekType}
                extra={this.dates}>
                <Divider />
                <Layout>
                    <Content></Content>
                </Layout>
            </PageHeader>
        );
    }
}

export default Home;