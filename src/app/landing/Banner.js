import React from 'react';
import PropTypes from 'prop-types';
// import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
// import GitHubButton from 'react-github-button';
import { Icon, Select, Button } from 'antd';
// import QueueAnim from 'rc-queue-anim';
import Link from 'next/link'

export default function Banner({ onEnterChange }) {
  return (
    <section className="page banner-wrapper">
        <div className="banner-text-wrapper" >
          <h2>JP.VC.DB</h2>
          <div key="button1" className="start-buttonXXX clearfix">
            <Select
              showSearch
              placeholder="Search companies"
              showArrow={false}
              filterOption={false}
              // onSearch={this.handleSearch}
              // onChange={this.handleChange}
              notFoundContent={null}
              style={{ width: 400 }}
            >
            </Select>
            <br />
            <Button type="primary"><Link href='/'>Take me to a Random Company</Link></Button>
            <Link href='/'><Button type="dange">Suggest a New Company</Button></Link>
          </div>
        </div>
    </section>
  );
}
Banner.propTypes = {
  onEnterChange: PropTypes.func,
};