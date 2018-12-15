import React from 'react';
// import DocumentTitle from 'react-document-title';
// import { enquireScreen } from 'enquire-js';
import Header from './Header';
import Banner from './Banner';
import CompanyHead from './CompanyHead';
// import Page4 from './Page4';
import Footer from './Footer';
import './static/style';
import styled from 'styled-components';

const DebugTitle = styled.h1`
  text-align: center;
  margin: 30px;
  height: 200px;
`

let isMobile = false;
// enquireScreen((b) => {
//   isMobile = b;
// });


class Company extends React.PureComponent {
  state = {
    id: this.props.id,
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
        <Header key="header" isFirstScreen={this.state.isFirstScreen} isMobile={this.state.isMobile} />,
        <Banner key="banner" />,
        <DebugTitle key="title" >Company Page {this.state.id}</DebugTitle>,
        <CompanyHead key="companyhead" />,
        <Footer key="footer" />
      ]
    );
  }
}
export default Company;