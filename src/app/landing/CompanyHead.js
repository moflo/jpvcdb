import React from 'react';
import PropTypes from 'prop-types';
import Router from "next/router";
import { Card, Row, Col, Avatar, Button, Icon } from 'antd';
import CompanyAnalysis from './CompanyAnalysis';
import styled from 'styled-components';

const Page1Container = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #f8f9fa;
`
const PageHeader = styled.h1`
    text-align: center;
    padding-bottom: 30px;
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


export default function CompanyHead({ isMobile }) {

  const { Meta } = Card;

  const onCardSelect = (e,props) => {
    const target = props.link || "exit"
    console.log("Select Card: ", target)
    // Router.push(`/ranking?id=${target}`,`/ranking/${target}`)
  }

  const Screenshot = props => (
    <Outerbox>
      <OuterboxImg src="/static/laptop.svg" />
      <InnerBox>
        <InnerBoxImg src={props.image || "https://via.placeholder.com/900x563"}  />
      </InnerBox>
    </Outerbox>
  )

  return (
    <Page1Container>
      <PageHeader>Company Header</PageHeader> 
      <Row align="top" style={{ paddingBottom: 30 }}>
        <Col span={2} offset={2}>
            <Avatar shape="square" size={128}/>
        </Col>
        <Col span={12} >
            <h2>Company Name</h2>
            <br/>
            <p>Detailed description of the company should be listed here with some basic data.</p>
        </Col>
      </Row>
      <Row gutter={20} >
        <Col span={12} offset={2} >
            <Screenshot image="https://fillmurray.com/900/563" />
            <CompanyAnalysis key="testing-page1" />,
        </Col>
        <Col span={8} offset={1}>
        <Button type="primary" icon="link">Open the Company Website</Button>
        <br />
        <br />

        <h2>Contact</h2>
        <div style={{ margin: 10, paddingLeft: 20 }}>
            <Button shape="circle" icon="twitter" />
            <Button shape="circle" icon="facebook" />
        </div>

        <br />
        <br />
        <h2>Address</h2>
        <div style={{ margin: 10, paddingLeft: 20 }}>
            <p>Shibuya, Tokyo</p>
            <p>Japan</p>
        </div>
        
        <br />
        <br />
        <h2>Location</h2>
        <div style={{ margin: 10, paddingLeft: 20 }}>
            <img src="https://via.placeholder.com/300" />
        </div>

        </Col>
      </Row>
    </Page1Container>
    );
}
CompanyHead.propTypes = {
  isMobile: PropTypes.bool,
};