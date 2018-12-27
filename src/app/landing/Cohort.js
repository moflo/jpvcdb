import React from 'react';
// import DocumentTitle from 'react-document-title';
// import { enquireScreen } from 'enquire-js';
import Header from './Header';
import BannerMin from '../components/BannerMin';
import Page3 from './Page3';
// import Page4 from './Page4';
import Footer from './Footer';
import './static/style';
import styled from 'styled-components';

let isMobile = false;
// enquireScreen((b) => {
//   isMobile = b;
// });

class Cohort extends React.PureComponent {
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

    const batch = this.props.id || 'W17'

    return (
      [
        <Header key="header" isFirstScreen={this.state.isFirstScreen} isMobile={this.state.isMobile} />,
        <BannerMin key="banner" />,
        <Page3 key="page3" isMobile={this.state.isMobile} batch={batch}/>,
        <Footer key="footer" />
      ]
    );
  }
}
export default Cohort;