import React from 'react';
// import DocumentTitle from 'react-document-title';
// import { enquireScreen } from 'enquire-js';
import { Layout, Menu, Icon, Card } from 'antd';
import Header from '../components/Header';
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
                    <p>
                    We are a group of tech executives based in Silicon Valley who are interested in investing in Japanese startups. 
                    We are also, in parallel, planning a small venture capital fund called “Namaiki Ventures” which we hope to 
                    launch in early 2020. We plan to use the “JPVCDB” website to both learn about the Japanese venture market, to 
                    meet other interested investors, and to keep meeting with entrepreneurs in Japan.
                    </p>
                    <p>
                      This website is an open source clone the very popular <a target="_blank" rel="noopener noreferrer" href="https://ycdb.co">ycdb</a> website and extends it
                      for use by other organizations or, in this case, whole countries. SEO optimized, performant, opinionated 
                      React/Next/AntDesign/Firebase template  app with fast loading landing page with lazy-loading of Firebase data 
                      using a simple provider class.
                    </p>
                    <p>
                      You can learn more about this website by contacting the developers, here: <a target="_blank" rel="noopener noreferrer" href="https://github.com/moflo">Github/moflo</a>
                    </p>
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