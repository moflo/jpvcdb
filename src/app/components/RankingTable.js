import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import { Tabs, Row, Col, Table, Tag, Icon, Select } from 'antd';
import FirebaseProvider from '../lib/FirebaseProvider';
import styled from 'styled-components';

const RankingTableContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: #f8f9fa;
`
const PageHeader = styled.h1`
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
  `

const Option = Select.Option;
const TabPane = Tabs.TabPane



class RankingTable extends React.PureComponent {
    static propTypes = {
        sort: PropTypes.string,
        isMoblie: PropTypes.bool,
      }
    state = {
        sort: this.props.sort || 'funding',
        isMobile: this.props.isMobile || false
    };
    
      
    handleMenuChange = value => {
        // console.log("Select option ", value)
        this.setState({
            sort: value.key
        })
      }
    
    onRowSelect = record => {
        console.log("Select record ", record)
      }
    
    render() {

        const colorForStatus = status => {
            if (status.match(/live/i)) return "#ffc108" // yellow
            if (status.match(/dead/i)) return "#dc3545" // red
            if (status.match(/exit/i)) return "#28a745"  // green
            return "gray"
        }

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 1
        });
        
        //   formatter.format(2500); /* $2,500.0 */
        
        const buildColumns = () => {
            const name_col = {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: ((text,record) => <Link href={`/company?id=`+record.id} as={`/company/`+record.id}><a>{text}</a></Link>),
            }

            const funding_col = {
                title: 'Funding',
                dataIndex: 'funding',
                key: 'funding',
                render: ((millions) => formatter.format(millions)+"MM"),
                align: 'right'
            }

            const exit_col = {
                title: 'Exit',
                dataIndex: 'exit',
                key: 'exit',
                render: ((millions) => formatter.format(millions)+"MM"),
                align: 'right'
            }

            const employee_col = {
                title: 'Employees',
                dataIndex: 'employees',
                key: 'employees',
                align: 'right'
            }
            const alexa_col = {
                title: 'Alexa',
                dataIndex: 'alexa',
                key: 'alexa',
                align: 'right'
            }

            const twitter_col = {
                title: 'Twitter Followers',
                dataIndex: 'twitter',
                key: 'twitter',
                align: 'right'
            }

            const tweets_col = {
                title: 'Total Tweets',
                dataIndex: 'tweets',
                key: 'tweets',
                align: 'right'
            }

            const facebook_col = {
                title: 'Facebook Posts',
                dataIndex: 'facebook',
                key: 'facebook',
                align: 'right'
            }

            const batch_col = {
                title: 'Batch',
                dataIndex: 'batch',
                key: 'batch'
            }
            const desc_col = {
                title: 'Description',
                dataIndex: 'description',
                key: 'description'
            }

            const cat_col = {
                title: 'Category',
                dataIndex: 'category',
                key: 'category'
            }

            const status_col = {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: ((tag) => <Tag color={colorForStatus(tag)} key={tag} >{tag.toUpperCase()}</Tag>)
            }

            if (this.state.sort == 'funding') {
                return ([ name_col, funding_col, batch_col, desc_col, cat_col, status_col ])
            }
            if (this.state.sort == 'exit') {
                return ([ name_col, exit_col, batch_col, desc_col, cat_col, status_col ])
            }
            if (this.state.sort == 'employees') {
                return ([ name_col, employee_col, batch_col, desc_col, cat_col, status_col ])
            }
            if (this.state.sort == 'alexa') {
                return ([ name_col, alexa_col, batch_col, desc_col, cat_col, status_col ])
            }
            if (this.state.sort == 'twitter') {
                return ([ name_col, twitter_col, batch_col, desc_col, cat_col, status_col ])
            }
            if (this.state.sort == 'tweets') {
                return ([ name_col, tweets_col, batch_col, desc_col, cat_col, status_col ])
            }
            if (this.state.sort == 'facebook') {
                return ([ name_col, facebook_col, batch_col, desc_col, cat_col, status_col ])
            }

            return ([
                name_col,
                funding_col,
                batch_col,
                desc_col,
                cat_col,
                status_col
            ])

        }
    
        const sorttype = this.state.sort || 'funding'

        const QueryFilterTable = category => {
            var categoryFilter = null
            if (category != "All") {
                categoryFilter = [['category', '==', category]]
            }
            var order = 'desc'
            // if (sorttype == 'alexa') { order = 'asc' }
            // if (sorttype == 'exit') { order = 'asc' }
            if (sorttype == 'exit') {
                if (categoryFilter != null) {
                    categoryFilter.push(['status','==','Exited'])
                } else {
                    categoryFilter = [['status','==','Exited']]
                }
            }

            return (
            <FirebaseProvider path={'companies'} limit={100} filter={categoryFilter} sort={`${sorttype}:${order}`}>

            { ({error, isLoading, data}) => {

            if (error) { console.error("Error loading users ", error)}

            return(
                <Table 
                columns={buildColumns()} 
                dataSource={data} 
                rowKey={record => record.id}
                onRow={(record) => ({
                    onClick: () => { this.onRowSelect(record); }
                })}
                loading={isLoading} 
                pagination={true} />
            )
            }}

            </FirebaseProvider>
            )
        }

    return (
        <RankingTableContainer>
        <PageHeader>
            <span>Top 100 Companies By </span>
            <Select labelInValue defaultValue={{ key: sorttype }} style={{ width: 220 }} onChange={this.handleMenuChange}>
                <Option value="funding"><Icon type="red-envelope" />  Funding</Option>
                <Option value="exit"><Icon type="rocket" />  Exit Value</Option>
                <Option value="employees"><Icon type="smile" />  Employee Count</Option>
                <Option value="alexa"><Icon type="compass" />  Alexa Rank</Option>
                <Option value="twitter"><Icon type="twitter" />  Twitter Followers</Option>
                <Option value="tweets"><Icon type="message" />  Twitter Posts</Option>
                <Option value="facebook"><Icon type="facebook" />  Facebook Posts</Option>
            </Select>
        </PageHeader> 
        <Row type="flex" justify="space-around" align="middle">
            <Col span={18}>

            <Tabs
            defaultActiveKey="1"
            tabPosition="left"
            tabBarStyle={{ color: "#00f", backgroundColor: "#fff", paddingTop: 0, paddingBottom: 0 }}
            //   style={{ height: 220 }}
            size="small"
            >
            <TabPane tab={<span><Icon type="home" />All</span>} key="1">
                {QueryFilterTable("All")}
                </TabPane>

                <TabPane tab={<span><Icon type="rocket" />Aerospace</span>} key="2">
                {QueryFilterTable("Aerospace")}
                </TabPane>

                <TabPane tab={<span><Icon type="compass" />Agriculture</span>} key="3">
                {QueryFilterTable("Agriculture")}
                </TabPane>

                <TabPane tab={<span><Icon type="setting" />AI and ML</span>} key="4">
                {QueryFilterTable("AI and ML")}
                </TabPane>

                <TabPane tab={<span><Icon type="link" />Blockchain</span>} key="5">
                {QueryFilterTable("Blockchain")}
                </TabPane>

                <TabPane tab={<span><Icon type="user" />Consumer</span>} key="6">
                {QueryFilterTable("Consumer")}
                </TabPane>

                <TabPane tab={<span><Icon type="tool" />Dev Tools</span>} key="7">
                {QueryFilterTable("Dev Tools")}
                </TabPane>

                <TabPane tab={<span><Icon type="edit" />Education</span>} key="8">
                {QueryFilterTable("Education")}
                </TabPane>

                <TabPane tab={<span><Icon type="video-camera" />Entertainment</span>} key="9">
                {QueryFilterTable("Entertainment")}
                </TabPane>

                <TabPane tab={<span><Icon type="bank" />Fintech</span>} key="10">
                {QueryFilterTable("Fintech")}
                </TabPane>

                <TabPane tab={<span><Icon type="pound" />Government</span>} key="11">
                {QueryFilterTable("Government")}
                </TabPane>

                <TabPane tab={<span><Icon type="medicine-box" />Healthcare</span>} key="12">
                {QueryFilterTable("Healthcare")}
                </TabPane>

                <TabPane tab={<span><Icon type="experiment" />Industrial</span>} key="13">
                {QueryFilterTable("Industrial")}
                </TabPane>

                <TabPane tab={<span><Icon type="shop" />Real Estate</span>} key="14">
                {QueryFilterTable("Real Estate")}
                </TabPane>

                <TabPane tab={<span><Icon type="crown" />Resources</span>} key="15">
                {QueryFilterTable("Resources")}
                </TabPane>

                <TabPane tab={<span><Icon type="car" />Transport</span>} key="16">
                {QueryFilterTable("Transport")}
                </TabPane>

                <TabPane tab={<span><Icon type="cloud" />Other SaaS</span>} key="17">
                {QueryFilterTable("Other SaaS")}
                </TabPane>

                <TabPane tab={<span><Icon type="team" />Nonprofit</span>} key="18">
                {QueryFilterTable("Nonprofit")}
                </TabPane>

                </Tabs>
                
            </Col>
        </Row>
        </RankingTableContainer>
        );
    }
}

export default RankingTable;