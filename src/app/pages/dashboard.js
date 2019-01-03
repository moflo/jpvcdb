import * as React from 'react'
import App from '../components/App'
import { Menu, Icon, Layout, Breadcrumb, Skeleton} from 'antd';
import styled from 'styled-components';
import { redirectIfNotAuthenticated } from "../lib/auth";
import MFHeader from '../admin/Header';
import MFUsers from '../admin/Users';
import MFMessages from '../admin/Messages';
import MFCompanies from '../admin/Companies';

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
                        <Menu.Item key="3">
                        <Icon type="home" />
                        <span>Companies</span>
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
                    <MFCompanies />
                    :
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Welcome</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Skeleton />
                        </div>
                    </Content>
                    }

                    <Footer style={{ textAlign: 'center' }}>
                         ©2018-2019 Mobile Flow LLC
                    </Footer>
                    </Layout>
                </Layout>

            </App>        
        )
    }

}

const LogoContainer = styled.div`
    height: 80px;
    background: url("/static/logo-clear.png") no-repeat center;
    background-color: #002140;
    margin: 0px;
`

export default Dashboard
