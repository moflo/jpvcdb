import React from 'react';
import PropTypes from 'prop-types';
import Router from "next/router";
import { Card, Row, Col, Avatar, Icon } from 'antd';
import styled from 'styled-components';

const Page1Container = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #f8f9fa;
  .ant-card-head {
    background-color: #d0021b11;
  }
  i {
    margin-left: 80px;
  }
`
const PageHeader = styled.h1`
    text-align: center;
    padding-bottom: 30px;
`


export default function Page1({ isMobile }) {

  const { Meta } = Card;

  const onCardSelect = (e,props) => {
    const target = props.link || "exit"
    console.log("Select Card: ", target)
    Router.push(`/ranking?id=${target}`,`/ranking/${target}`)
  }

  const RankingBox = props => (
  <Card hoverable={true} 
        title={props.title}
        extra={<Icon type={props.icon} theme="twoTone" twoToneColor="#d0021b"></Icon>} 
        onClick={(e) => { onCardSelect(e,props) } }
        >
  {props.info}
  </Card>
  )

  return (
    <Page1Container>
      <PageHeader>Top 100 Ranking</PageHeader> 
      <br />
      <Row gutter={22} type="flex" justify="center" align="top">
        <Col span={4}><RankingBox title="Funding" info="Top 100 companies by funding" link="funding" icon="red-envelope">Funding</RankingBox></Col>
        <Col span={4}><RankingBox title="Exits" info="Top 100 companies by exit" link="exit" icon="rocket">Exit</RankingBox></Col>
        <Col span={4}><RankingBox title="Employees" info="Top 100 companies by employees" link="employees" icon="smile">Employees</RankingBox></Col>
        <Col span={4}><RankingBox title="Alexa Rank" info="Top 100 companies by Alexa rank" link="alexa" icon="compass">Alexa</RankingBox></Col>
      </Row>
      <br />
      <Row gutter={22} type="flex" justify="center" align="top">
      <Col span={4}><RankingBox title="Twitter" info="Top 100 companies by Twitter followers" link="funding" icon="cloud">Funding</RankingBox></Col>
        <Col span={4}><RankingBox title="Tweets" info="Top 100 companies by tweets" link="exit" icon="message">Exit</RankingBox></Col>
        <Col span={4}><RankingBox title="Facebook" info="Top 100 companies by Facebook likes" link="employees" icon="like">Employees</RankingBox></Col>
        <Col span={4}><RankingBox title="Kansai" info="Top 100 companies based in Kansai" link="alexa" icon="environment">Alexa</RankingBox></Col>
      </Row>
    </Page1Container>
    );
}
Page1.propTypes = {
  isMobile: PropTypes.bool,
};