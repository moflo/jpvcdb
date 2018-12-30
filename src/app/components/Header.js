import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { Menu, Row, Col, Icon, Spin, Popover, Select } from 'antd';
import Link from 'next/link'
import Router from "next/router";
import algoliasearch from 'algoliasearch';
const algoliaAccount = require('../credentials/algoliaAccountKey.json')
var client = algoliasearch(algoliaAccount.app_id, algoliaAccount.api_key);
var algolia = client.initIndex('companies');
import styled from 'styled-components';

const Option = Select.Option;


export default class Header extends React.Component {
  static propTypes = {
    isFirstScreen: PropTypes.bool,
    isMoblie: PropTypes.bool,
  }
  state = {
    menuVisible: false,
    selectedMenu: this.props.selectedMenu || "home",
    data: [],
    fetching: false
  };

  onMenuVisibleChange = (visible) => {
    this.setState({
      menuVisible: visible,
    });
  }
  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    });
  }

  handleHideMenu = () => {
    this.setState({
      menuVisible: false,
    });
  }


  searchDone = (err, content) => {
    if (err) console.log('searchDone, error: '+ err )

    const data = content.hits.map( co => ({
      name: `${co.name} - ${co.description}`,
      key: co.objectID,
    }));

    this.setState({ data, fetching: false });
  }

  handleSearch = (value) => {
    console.log('fetching company', value);
    this.setState({ data: [], fetching: true });
    algolia.search({
      query: value,
      hitsPerPage: 10
    }, 
      this.searchDone
    )
  }

  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }

  onSelect = (value) => {
    console.log(value)
    Router.push('/company?id='+value,'/company/'+value)
  }

  render() {
    const { isFirstScreen, isMoblie } = this.props;
    const { menuVisible, selectedMenu } = this.state;
    const { fetching, data, value } = this.state;

    const menuMode = isMoblie ? 'inline' : 'horizontal';
    // const headerClassName = classNames({
    //   clearfix: true,
    //   'home-nav-white': !isFirstScreen,
    // });

    const menu = [
      <a className="header-lang-button" ghost="true" size="small" key="lang">
        🇯🇵
      </a>,
      <Menu mode={menuMode} defaultSelectedKeys={[selectedMenu]} id="nav" key="nav">
        <Menu.Item key="home">
            <Col span={4}>
              <Select className="header-search-select"
              showSearch
              placeholder="Seach companies"
              showArrow={false}
              defaultOpen={false}
              filterOption={false}
              onSearch={this.handleSearch}
              onChange={this.handleChange}
              onSelect={this.onSelect}
              notFoundContent={fetching ? <Spin size="small" /> : null}
              style={{ height: 40 }}
            >
              {data.map(d => <Option key={d.key}><Link href={`/company?id=`+d.key} as={`/company/`+d.key}><a>{d.name}</a></Link></Option>)}
            </Select>
            <Icon className="header-search-icon" type="search" />
          </Col>
        </Menu.Item>
      </Menu>,
    ];

    return (
      <header id="header" className="home-nav-white clearfix:true; home-nav-white: true;">
        {menuMode === 'inline' ? (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.onMenuVisibleChange}
          >
            <Icon
              className="nav-phone-icon"
              type="menu"
              onClick={this.handleShowMenu}
            />
          </Popover>
        ) : null}
        <Row>
          <Col lg={4} md={5} sm={24} xs={24}>
            <a id="logo" href="/">
              <img alt="logo" src="/static/logo-white.png" />
            </a>
          </Col>
          <Col lg={20} md={19} sm={0} xs={0}>
            {menuMode === 'horizontal' ? menu : null}
          </Col>
        </Row>
      </header>
    );
  }
}