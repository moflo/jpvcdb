import * as React from 'react'
import App from '../components/App'
import { Menu, Icon, Card, Layout, Breadcrumb, Divider} from 'antd';
import styled from 'styled-components';
import { redirectIfNotAuthenticated } from "../lib/auth";
import MFHeader from '../components/Header';
import MFUsers from '../components/Users';
import MFMessages from '../components/Messages';
import MFPosts from '../components/Posts';
import MFPages from '../components/Pages';

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;
  
class Dashboard extends React.Component {
    state = {
        mode: 'inline',
        theme: 'light',
        collapsed: false,
        selectedMenu: '1'
    }
    
    // static async getInitialProps(ctx) {
    static getInitialProps(ctx) {
            if (redirectIfNotAuthenticated(ctx)) {
            return {};
        }

        return {};
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
      }
    
    headerMenuOnClick = (menuItem) => {
        this.setState({
            selectedMenu: menuItem.key
        });
    }
    

    render() {
        // const panelArray = [ <MFUsers />, <MFMessages /> ]

        return (
            <App>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                    >
                    <LogoContainer className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.headerMenuOnClick} >
                        <Menu.Item key="1">
                        <Icon type="user" />
                        <span>Users</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                        <Icon type="inbox" />
                        <span>Messages</span>
                        </Menu.Item>
                        <SubMenu
                        key="sub1"
                        title={<span><Icon type="folder" /><span>Blog</span></span>}
                        >
                        <Menu.Item key="3">Posts</Menu.Item>
                        <Menu.Item key="4">Pages</Menu.Item>
                        <Menu.Item key="5">Categories</Menu.Item>
                        </SubMenu>
                        <SubMenu
                        key="sub2"
                        title={<span><Icon type="team" /><span>Team</span></span>}
                        >
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Divider dashed={true} />
                        <Menu.Item key="9">
                        <Icon type="file" />
                        <span>File</span>
                        </Menu.Item>
                    </Menu>
                    </Sider>
                    <Layout>
                    <MFHeader />

                    {this.state.selectedMenu == "1" ?
                    <MFUsers />
                    : this.state.selectedMenu == "2" ?
                    <MFMessages />
                    : this.state.selectedMenu == "3" ?
                    <MFPosts />
                    : this.state.selectedMenu == "4" ?
                    <MFPages />
                    :
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Loading...</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Card title="Loading..." bordered={false} style={{ width: "100%"}} loading={true} >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                        </div>
                    </Content>
                    }

                    <Footer style={{ textAlign: 'center' }}>
                         ©2018 Mobile Flow LLC
                    </Footer>
                    </Layout>
                </Layout>

            </App>        
        )
    }

}

const LogoContainer = styled.div`
    height: 80px;
    background: url("/static/logo-word-white.png") no-repeat center;
    background-color: #002140;
    margin: 0px;
`

export default Dashboard
