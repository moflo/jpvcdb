import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Avatar, Tag } from 'antd';
import styled from 'styled-components';

const Page1Container = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #f8f9fa;
`

const Outerbox = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  opacity: 1;
`

const OuterboxImg = styled.img`
  width: 100%;
  height: 100%;
`

const InnerBox = styled.div`
  height: auto;
  width: 64%; /* 84% */
  opacity: 1;
  top: 5%;  /* 4% */
  left: 17%; /* 8% */
  position: absolute;
  padding: 0;
`

const InnerBoxImg = styled.img`
  height: 100%;
  width: 100%;
`


export default function CompanyHead({ isMobile, isLoading, data }) {

  const Screenshot = props => (
    <Outerbox>
      <OuterboxImg src="/static/laptop2.svg" />
      <InnerBox>
        <InnerBoxImg src={props.image || "https://via.placeholder.com/900x563"}  />
      </InnerBox>
    </Outerbox>
  )
  
  
  const name = isLoading ? 'Loading Company...' : data.name
  const avatarURL = isLoading ? '' : data.logo
  const avatar = avatarURL == '' ? name : null
  const description = isLoading ? 'Loading company description...' : data.description
  const landingURL = isLoading ? 'https://via.placeholder.com/900x563' : (data.landingpage == '' ? 'https://fillmurray.com/900/563' : data.landingpage)

  const tag = isLoading ? 'Unknown' : data.status == '' ? 'Unknown' : data.status
  const colorForStatus = status => {
    if (!status) return "gray"
    if (status.match(/live/i)) return "#ffc108" // yellow
    if (status.match(/dead/i)) return "#dc3545" // red
    if (status.match(/exit/i)) return "#28a745"  // green
    return "gray"
}


  return (
    <Page1Container>
    <Row>
      <Col span={2} offset={2}>
        <Avatar src={avatarURL} shape="square" size={75}>{avatar}</Avatar>
      </Col>
      <Col span={14} offset={2}>
        <h2>{name}</h2>
        <br/>
        <p>{description} <Tag color={colorForStatus(tag)} key={tag} >{tag.toUpperCase()}</Tag></p>
        <br />
      </Col>
    </Row>
      <Row gutter={20} >
        <Col offset={2} >
            <Screenshot image={landingURL} />
        </Col>
      </Row>
    </Page1Container>
    );
}
CompanyHead.propTypes = {
  isMobile: PropTypes.bool,
  isLoading: PropTypes.bool,
  data: PropTypes.object,
};