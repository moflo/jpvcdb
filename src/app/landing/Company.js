import React from 'react';
// import DocumentTitle from 'react-document-title';
// import { enquireScreen } from 'enquire-js';
import Header from './Header';
import BannerMin from '../components/BannerMin';
import CompanyDetails from '../components/CompanyDetails';
import Footer from './Footer';
import './static/style';
import styled from 'styled-components';


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
        <BannerMin key="banner" />,
        <CompanyDetails companyID={this.state.id} key="companyhead" />,
        <Footer key="footer" />
      ]
    );
  }
}
export default Company;