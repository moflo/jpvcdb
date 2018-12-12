import React from 'react';
import PropTypes from 'prop-types';
// import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
// import GitHubButton from 'react-github-button';
import { Icon, Select } from 'antd';
// import QueueAnim from 'rc-queue-anim';

export default function Banner({ onEnterChange }) {
  return (
    <section className="page banner-wrapper">
        <div className="banner-text-wrapper" >
          <h2>JPVCDB</h2>
          <div key="button1" className="start-buttonXXX clearfix">
            <a>
              Search for a Company
            </a>
            <br />
            <a>
              Take me to a Random Company
            </a>
          </div>
        </div>
    </section>
  );
}
Banner.propTypes = {
  onEnterChange: PropTypes.func,
};