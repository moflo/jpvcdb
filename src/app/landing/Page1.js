import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'antd';
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


export default function Page1({ isMobile }) {

  const DemoBox = props => <Card title={`Card: ${props.value}`} style={{height: `${props.value}`}}>{props.children}</Card>;

  return (
    <Page1Container>
      <PageHeader>Page One</PageHeader> 
      <Row type="flex" justify="space-around" align="middle">
        <Col span={4}><DemoBox value={300}>col-4</DemoBox></Col>
        <Col span={4}><DemoBox value={250}>col-4</DemoBox></Col>
        <Col span={4}><DemoBox value={420}>col-4</DemoBox></Col>
        <Col span={4}><DemoBox value={180}>col-4</DemoBox></Col>
      </Row>
      <br />
      <Row type="flex" justify="space-around" align="middle">
        <Col span={4}><DemoBox value={100}>col-4</DemoBox></Col>
        <Col span={4}><DemoBox value={50}>col-4</DemoBox></Col>
        <Col span={4}><DemoBox value={120}>col-4</DemoBox></Col>
        <Col span={4}><DemoBox value={80}>col-4</DemoBox></Col>
      </Row>
      <br />
      <Row type="flex" justify="space-around" align="middle">
        <Col span={4}><DemoBox value={100}>col-4</DemoBox></Col>
        <Col span={4}><DemoBox value={50}>col-4</DemoBox></Col>
        <Col span={4}><DemoBox value={120}>col-4</DemoBox></Col>
        <Col span={4}><DemoBox value={80}>col-4</DemoBox></Col>
      </Row>
      <br />
      <Row type="flex" justify="space-around" align="middle">
        <Col span={4}><DemoBox value={100}>col-4</DemoBox></Col>
        <Col span={4}><DemoBox value={50}>col-4</DemoBox></Col>
        <Col span={4}><DemoBox value={120}>col-4</DemoBox></Col>
        <Col span={4}><DemoBox value={80}>col-4</DemoBox></Col>
      </Row>
    </Page1Container>
    );
}
Page1.propTypes = {
  isMobile: PropTypes.bool,
};