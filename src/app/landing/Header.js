import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { Menu, Row, Col, Icon, Button, Popover, Select } from 'antd';
import Link from 'next/link'


const searchEngine = 'Google';

export default class Header extends React.Component {
  static propTypes = {
    isFirstScreen: PropTypes.bool,
    isMoblie: PropTypes.bool,
  }
  state = {
    menuVisible: false,
    selectedMenu: this.props.selectedMenu || "home"
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

  handleSelectFilter = (value, option) => {
    const optionValue = option.props['data-label'];
    return optionValue === searchEngine ||
      optionValue.indexOf(value.toLowerCase()) > -1;
  }

  render() {
    const { isFirstScreen, isMoblie } = this.props;
    const { menuVisible, selectedMenu } = this.state;
    const menuMode = isMoblie ? 'inline' : 'horizontal';
    // const headerClassName = classNames({
    //   clearfix: true,
    //   'home-nav-white': !isFirstScreen,
    // });

    const menu = [
      <Button className="header-lang-button" ghost size="small" key="lang">
        English
      </Button>,
      <Menu mode={menuMode} defaultSelectedKeys={[selectedMenu]} id="nav" key="nav">
        <Menu.Item key="home">
            <Col span={4}>
              <Icon type="search" />
              <Select
              showSearch
              placeholder="Search companies"
              showArrow={false}
              filterOption={false}
              // onSearch={this.handleSearch}
              // onChange={this.handleChange}
              notFoundContent={null}
              style={{ width: 200 }}
              >
            </Select>
          </Col>
        </Menu.Item>
      </Menu>,
    ];

    return (
      <header id="header" className="clearfix:true; home-nav-white: true;">
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
              <span>JP.VC.DB</span>
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