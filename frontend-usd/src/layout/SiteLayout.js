import React from 'react';
import { Layout } from 'antd';
import SiteHeader from './SiteHeader';
import Sidebar from './Sidebar';
import SiteContent from './SiteContent';

class SiteLayout extends React.Component {

    render() {
        return (
            <Layout >
                <SiteHeader />
                <Layout>
                    <Sidebar />
                    <SiteContent>
                        {this.props.children}
                    </SiteContent>
                </Layout>
            </Layout>
        );
    }
}

export default SiteLayout;