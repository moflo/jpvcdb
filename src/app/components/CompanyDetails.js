import React from 'react';
import PropTypes from 'prop-types';
import Router from "next/router";
import { Card, Row, Col, Avatar, Button, Icon } from 'antd';
import FirebaseProvider from '../lib/FirebaseProvider';
import CompanyAnalysis from './CompanyAnalysis';
import CompanyFeedback from './Feedback';
import CompanyHead from './Masthead';
import CompanyContact from './Contact';
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


export default function CompanyDetails({ isMobile, companyID }) {

  const { Meta } = Card;

  const onCardSelect = (e,props) => {
    const target = props.link || "exit"
    console.log("Select Card: ", target)
    // Router.push(`/ranking?id=${target}`,`/ranking/${target}`)
  }


  return (
          <FirebaseProvider path={'messages'} >

            { ({error, isLoading, data}) => {

              if (error) { console.error("Error loading users ", error)}
              
              return(
                <Page1Container>
                <PageHeader>Company {companyID}</PageHeader> 
                  <Row gutter={20} align="top" style={{ paddingBottom: 30 }}>
                    <Col span={12} offset={2} >
                        <CompanyHead icon="https://via.placeholder/com/128x128" />
                        <CompanyAnalysis key="analysis" />
                        <CompanyFeedback companyID={companyID} key="feedback" />
                    </Col>
                    <Col span={8} offset={1}>
                        <CompanyContact />
                    </Col>
                  </Row>
                  </Page1Container>
              )
            }}

            </FirebaseProvider>

    );
}
CompanyDetails.propTypes = {
  isMobile: PropTypes.bool,
};