import React from 'react';
import PropTypes from 'prop-types';
import Router from "next/router";
import { Card, Row, Col, Avatar, Button, Icon } from 'antd';
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
  width: 84%;
  opacity: 1;
  top: 4%;
  left: 8%;
  position: absolute;
  padding: 0;
`

const InnerBoxImg = styled.img`
  height: 100%;
  width: 100%;
`


export default function CompanyHead({ isMobile, companyID }) {

  const { Meta } = Card;

  const onCardSelect = (e,props) => {
    const target = props.link || "exit"
    console.log("Select Card: ", target)
    // Router.push(`/ranking?id=${target}`,`/ranking/${target}`)
  }

  const Screenshot = props => (
    <Outerbox>
      <OuterboxImg src="/static/laptop2.svg" />
      <InnerBox>
        <InnerBoxImg src={props.image || "https://via.placeholder.com/900x563"}  />
      </InnerBox>
    </Outerbox>
  )

  const Listing = props => (
    <div>
    <Col span={2} offset={2}>
    <Avatar shape="square" size={128}/>
    </Col>
    <Col span={12} >
    <h2>Company Name</h2>
    <br/>
    <p>Detailed description of the company should be listed here with some basic data.</p>
    </Col>
    </div>
  )
  
  return (
    <Page1Container>
      <Listing />
      <Row gutter={20} >
        <Col span={12} offset={2} >
            <Screenshot image="https://fillmurray.com/900/563" />
        </Col>
      </Row>
    </Page1Container>
    );
}
CompanyHead.propTypes = {
  isMobile: PropTypes.bool,
};