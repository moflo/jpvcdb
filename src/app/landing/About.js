import React from 'react';
// import DocumentTitle from 'react-document-title';
// import { enquireScreen } from 'enquire-js';
import { Layout, Menu, Icon, Card } from 'antd';
import Header from './Header';
import './static/style';


const { Content, Footer, Sider } = Layout;

let isMobile = false;
// enquireScreen((b) => {
//   isMobile = b;
// });

class AboutText extends React.Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
            <Sider style={{ background: '#aaa' }}>
            <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" onClick={this.headerMenuOnClick} >
                <Menu.Item key="1">
                <Icon type="info-circle" />
                <span>About</span>
                </Menu.Item>
            </Menu>
            </Sider>
            <Layout>

            <Content style={{ margin: '20px 16px' }}>

                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Card title="About" bordered={false} style={{ width: "100%"}} loading={false} >
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Card>
                </div>
            </Content>


            <Footer style={{ textAlign: 'center' }}>
                 ©2018 Mobile Flow LLC
            </Footer>
            </Layout>
        </Layout>
        )
    }
}

class About extends React.PureComponent {
  state = {
    isFirstScreen: true,
    isMobile,
  };

  componentDidMount() {
    // enquireScreen((b) => {
    //   this.setState({
    //     isMobile: !!b,
    //   });
    // });
  }

  onEnterChange = (mode) => {
    this.setState({
      isFirstScreen: mode === 'enter',
    });
  }
  render() {
    return (
      [
        <Header key="header" isFirstScreen={this.state.isFirstScreen} isMobile={this.state.isMobile} selectedMenu="about" />,
        <div key="banner" style={{ padding: 0, background: '#aaa', minHeight: 80 }} />,
        <AboutText key="about" />
        ]
    );
  }
}
export default About;