import React from 'react';
import PropTypes from 'prop-types';



class BannerMin extends React.PureComponent {
  static propTypes = {
    onEnterChange: PropTypes.func,
  }
  state = {
    onEnterChange: this.props.onEnterChange,
    isMobile: false,
  };


  render() {

  return (
    <section className="page banner-wrapper" style={{height: 40}}>
        <div className="banner-text-wrapper" >
          <h2>JP.VC.DB</h2>
        </div>
    </section>
  );

  }
}

export default BannerMin;