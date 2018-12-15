import React from 'react';
import PropTypes from 'prop-types';
import Router from "next/router";
import { Card, Row, Col, Avatar, Icon } from 'antd';
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
      <Row gutter={12} >
        <Col span={12} offset={2} ><Screenshot image="https://fillmurray.com/900/563" /></Col>
        <Col span={8} ><span>Top 100 companies by Alexa rank</span></Col>
      </Row>
    </Page1Container>
    );
}
CompanyHead.propTypes = {
  isMobile: PropTypes.bool,
};