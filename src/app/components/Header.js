import * as React from 'react'
import Link from 'next/link'
import { Layout, Menu, Divider, Avatar, Modal, Table } from 'antd';
import styled from 'styled-components';
import firebaseManager from '../lib/firebaseManager'
import redirect from "../lib/redirect";


const { Header } = Layout;

const UserName = styled.span`
  margin-left: 8px;
`

const AvatarWithIcon = styled(Avatar)`
  .anticon {
    margin-right: 0 !important;
  }
`

export default class MFHeader extends React.Component {
  state = {
    visible: false,
    user: firebaseManager.sharedInstance.getUserDetails(),
    deploying: false,
    isMoblie: false
  }

headerMenuOnClick = (menuItem) => {
  const {history} = this.props;
  if(menuItem.key === 'logout') {
    redirect('/');
  } else if(menuItem.key === "overview") {
    this.setState({
      visible: true
    });
  }
}

hideOverview = () => {
  this.setState({
    visible: false,
  });
}


render() {
  const {visible, user, deploying, isMoblie} = this.state;

  const menuMode = isMoblie ? 'inline' : 'horizontal';
  
  const username = user ? user.name || user.email : 'loading...';

  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: 'Avatar URL',
    dataIndex: 'avatarURL',
    key: 'avatarURL',
    render: ((text) => <Avatar src={text} alt="User Avatar" />),
  }];


  return (
    <Header style={{ background: '#fff', padding: 0, paddingRight: 20, height: 80 }}>
        <Menu mode={menuMode} defaultSelectedKeys={['help']} id="nav" key="nav" onClick={this.headerMenuOnClick} >
            <Menu.Item key="home">
            <Link href='/'> Help </Link>
            </Menu.Item>
            <Menu.SubMenu title={<span>
              {user ? <AvatarWithIcon src={user.avatarURL} />
              : <AvatarWithIcon style={{color: '#f56a00', backgroundColor: '#fde3cf'}} icon="user" />
              }
              <UserName>{username}</UserName>
              </span>}>
              <Menu.Item key="overview">Overview</Menu.Item>
              <Menu.Item key="logout">Log out</Menu.Item>
            </Menu.SubMenu>
          </Menu>
          <Modal
          width={"80%"}
          title="Account Overview"
          visible={this.state.visible}
          onCancel={this.hideOverview}
          footer={null}
        >
          <Table columns={columns} rowKey="uid" dataSource={[user]} pagination={false} />
        </Modal>
        </Header>
      )

    }

}