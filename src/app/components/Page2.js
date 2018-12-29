import React from 'react';
import PropTypes from 'prop-types';
import Router from "next/router";
import { Card, Row, Col, Table, Tag } from 'antd';
import FirebaseProvider from '../lib/FirebaseProvider';
import styled from 'styled-components';
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('./Map.js'), {
  ssr: false
});

const Page2Container = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;

  .batch-data-table {
    width: 90%;
    background: #fff;
    margin: 10px;
    border-color: #fff;
    -webkit-box-shadow: 10px 10px 28px 1px rgba(0,0,0,0.35);
    -moz-box-shadow: 10px 10px 28px 1px rgba(0,0,0,0.35);
    box-shadow: 0 2px 35px 0 rgba(0,0,0,0.04), 0 2px 4px 0 rgba(0,0,0,0.02), 0 27px 24px 0 rgba(0,0,0,0.04);
    background: #FFFFFF;

      tr:hover {
        background-color: #f5f5f5;
      }

    }

  .batch-data-table-row {
    height: 18px;
    background: #fff;
    padding: 0px;
    border-color: #fff;
    border-bottom-color: #f00;

    th, td {
      padding-top: 2px;
      padding-left: 15px;
      text-align: left;
    }
    
  }

  .map-box {
    height: 600px;
  }
  
  .map-box .mapboxgl-map {
    -webkit-box-shadow: 10px 10px 28px 1px rgba(0,0,0,0.35);
    -moz-box-shadow: 10px 10px 28px 1px rgba(0,0,0,0.35);
    box-shadow: 10px 10px 28px 1px rgba(0,0,0,0.35);
  }
`

const PageHeader = styled.h1`
    text-align: center;
`

export default function Page2({ isMobile }) {

  const MapBox = props => <div className="map-box"><h2>{props.title}</h2>{props.children}</div>;


  const onRowSelect = record => {
    // console.log("Select record ", record)
    // redirect('/cohort/testing','/cohort?id=testing')
    Router.push(`/cohort?id=${record.batch}`,`/cohort/${record.batch}`)
  }


  const tableCount = data => {
    const tableItems = data.map((record) =>
      <tr className="batch-data-table-row" key={record.batch} onClick={ () => { onRowSelect(record) } }>
      <td style={{ width: "20%"}}>
        {record.batch}
      </td>
      <td style={{ width: "80%"}}>
      <Tag color={'#f06633'} key='c' style={{width: record.percent+"%"}}>{record.count}</Tag>
      </td>
    </tr>
  );
    return (
      <table className="batch-data-table"><tbody>{tableItems}</tbody></table>
    )
  }

  const tableStatus = data => {
    const tableItems = data.map((record) =>
    <tr className="batch-data-table-row" key={record.batch} onClick={ () => { onRowSelect(record) } }>
    <td style={{ width: "20%"}}>
        {record.batch}
      </td>
      <td style={{ width: "80%"}}>
      <Tag color={'#007bff'} key={1} style={{width: (66*record.exited/record.count)+"%"}}>{record.exited}</Tag>
        <Tag color={'#b8daff'} key={2} style={{width: (66*record.live/record.count)+"%"}}>{record.live}</Tag>
        <Tag color={'#f06633'} key={3} style={{width: (66*record.dead/record.count)+"%"}}>{record.dead}</Tag>
      </td>
    </tr>
  );
    return (
      <table className="batch-data-table"><tbody>{tableItems}</tbody></table>
    )
  }


  const tableFunding = data => {
    const tableItems = data.map((record) =>
    <tr className="batch-data-table-row" key={record.batch} onClick={ () => { onRowSelect(record) } }>
    <td style={{ width: "20%"}}>
        {record.batch}
      </td>
      <td style={{ width: "80%"}}>
        <Tag color={'#007bff'} key={1} style={{width: (55*record.mega/record.count)+"%"}}>{record.mega}</Tag>
        <Tag color={'#b8daff'} key={2} style={{width: (55*record.mini/record.count)+"%"}}>{record.mini}</Tag>
        <Tag color={'#f06633'} key={3} style={{width: (55*record.seed/record.count)+"%"}}>{record.seed}</Tag>
        <Tag color={'#eeeee'} key={4} style={{width: (55*record.none/record.count)+"%"}}>{record.none}</Tag>
      </td>
    </tr>
  );
    return (
      <table className="batch-data-table"><tbody>{tableItems}</tbody></table>
    )
  }

  // Generated from /scripts/generateAnalytics

  const batchData = [{"batch":"S06","count":3,"percent":2.158273381294964,"exited":2,"live":1,"dead":0,"mega":3,"mini":0,"seed":0,"none":0},{"batch":"W06","count":5,"percent":3.597122302158273,"exited":5,"live":0,"dead":0,"mega":1,"mini":0,"seed":1,"none":3},{"batch":"S07","count":9,"percent":6.474820143884892,"exited":7,"live":2,"dead":0,"mega":4,"mini":0,"seed":3,"none":2},{"batch":"W07","count":8,"percent":5.755395683453238,"exited":6,"live":2,"dead":0,"mega":2,"mini":0,"seed":4,"none":2},{"batch":"W08","count":8,"percent":5.755395683453238,"exited":4,"live":4,"dead":0,"mega":2,"mini":0,"seed":2,"none":4},{"batch":"S08","count":6,"percent":4.316546762589928,"exited":5,"live":1,"dead":0,"mega":2,"mini":0,"seed":2,"none":2},{"batch":"W09","count":9,"percent":6.474820143884892,"exited":5,"live":4,"dead":0,"mega":1,"mini":1,"seed":2,"none":5},{"batch":"S09","count":13,"percent":9.352517985611511,"exited":7,"live":6,"dead":0,"mega":5,"mini":0,"seed":2,"none":6},{"batch":"W10","count":16,"percent":11.510791366906476,"exited":13,"live":3,"dead":0,"mega":2,"mini":2,"seed":8,"none":4},{"batch":"S10","count":25,"percent":17.985611510791365,"exited":16,"live":9,"dead":0,"mega":9,"mini":1,"seed":7,"none":8},{"batch":"W11","count":30,"percent":21.58273381294964,"exited":10,"live":20,"dead":0,"mega":11,"mini":0,"seed":10,"none":9},{"batch":"S11","count":43,"percent":30.935251798561154,"exited":19,"live":24,"dead":0,"mega":17,"mini":2,"seed":14,"none":10},{"batch":"S12","count":52,"percent":37.410071942446045,"exited":17,"live":35,"dead":0,"mega":14,"mini":3,"seed":17,"none":18},{"batch":"W12","count":46,"percent":33.093525179856115,"exited":21,"live":25,"dead":0,"mega":17,"mini":4,"seed":13,"none":12},{"batch":"W13","count":35,"percent":25.179856115107913,"exited":8,"live":27,"dead":0,"mega":11,"mini":5,"seed":15,"none":4},{"batch":"S13","count":32,"percent":23.021582733812952,"exited":12,"live":20,"dead":0,"mega":12,"mini":3,"seed":15,"none":2},{"batch":"S14","count":61,"percent":43.884892086330936,"exited":8,"live":53,"dead":0,"mega":14,"mini":3,"seed":37,"none":7},{"batch":"W14","count":63,"percent":45.32374100719424,"exited":13,"live":50,"dead":0,"mega":17,"mini":5,"seed":34,"none":7},{"batch":"W15","count":97,"percent":69.7841726618705,"exited":19,"live":78,"dead":0,"mega":27,"mini":7,"seed":52,"none":11},{"batch":"S15","count":90,"percent":64.74820143884892,"exited":8,"live":82,"dead":0,"mega":22,"mini":6,"seed":53,"none":9},{"batch":"W16","count":114,"percent":82.01438848920863,"exited":3,"live":111,"dead":0,"mega":19,"mini":15,"seed":70,"none":10},{"batch":"S16","count":97,"percent":69.7841726618705,"exited":4,"live":93,"dead":0,"mega":16,"mini":7,"seed":60,"none":14},{"batch":"S17","count":112,"percent":80.57553956834532,"exited":5,"live":107,"dead":0,"mega":7,"mini":3,"seed":88,"none":14},{"batch":"W17","count":110,"percent":79.13669064748201,"exited":3,"live":107,"dead":0,"mega":7,"mini":12,"seed":67,"none":24},{"batch":"S18","count":91,"percent":65.46762589928058,"exited":0,"live":91,"dead":0,"mega":2,"mini":3,"seed":12,"none":74},{"batch":"W18","count":139,"percent":100,"exited":0,"live":139,"dead":0,"mega":1,"mini":5,"seed":103,"none":30}]



  return (
    <Page2Container>
      <PageHeader>Cohort Analysis</PageHeader> 

              <Row type="flex" justify="space-around" align="top">
                <Col span={7}>
                  <h2>Companies by Cohort</h2>
                  {tableCount(batchData)}
                </Col>
                <Col span={7}>
                    <h2>Status Outcome by Cohort</h2>
                    {tableStatus(batchData)}
                </Col>
                <Col span={7}>
                  {/* <MapBox title="HQ Location">
                    <Map />
                  </MapBox> */}
                  <h2>Funding by Cohort</h2>
                  {tableFunding(batchData)}
                </Col>
              </Row>

    </Page2Container>
    );
}
Page2.propTypes = {
  isMobile: PropTypes.bool,
};