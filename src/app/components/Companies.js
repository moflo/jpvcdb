import * as React from 'react'
import Link from 'next/link'
import { Layout, Breadcrumb, Button, Table, Tabs, Card, Form, Input, Upload, Modal, Select, Icon, Tag, message, notification } from 'antd';
import styled from 'styled-components';
import DBQueryProvider from './DBQueryProvider';
import createCompany from '../lib/createCompany'
import firebaseManager from '../lib/firebaseManager'

const { Content } = Layout;
const FormItem  = Form.Item;
const TabPane = Tabs.TabPane;

class CompanyCreate extends React.Component {
  state = {
    deploying: false,
    menuVisible: false,
    loading: false,
    // Landingpage image upload
    previewVisible: false,
    previewImage: '',
    fileList: [],
    file: null,
    percent: 0,
    // Icon image upload
    previewVisibleIcon: false,
    previewImageIcon: '',
    fileListIcon: [],
    fileIcon: null
  }

  handleOk = () => {
    this.setState({
      menuVisible: false,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {history} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("handleSubmit values:", JSON.stringify(this.state.file))

        let file = this.state.file

        var hide = message.loading(`Loading... ${file.name}`, this.state.percent);

        firebaseManager.sharedInstance.uploadFile(file,'landingpage.png',this.uploadProgress)
        .then((result) => {
          console.log("uploadFile result", result)

          values.landingpage = result

          hide()

          let iconFile = this.state.fileIcon

          hide = message.loading(`Loading icon... ${iconFile.name}`, this.state.percent);

          return firebaseManager.sharedInstance.uploadFile(iconFile,'icon.png',this.uploadProgress)
  
        })
        .then((result) => {
          console.log("uploadFile result", result)

          values.icon = result

          hide()

          return createCompany(values)
        })
        .then( (resp) => {

          if (resp) {
            notification.info({
                message: "Company Created!",
                description: `Thank you ${values.name}. We crteated a new company.`
            })

          this.props.form.resetFields()

          this.setState({
            menuVisible: false
          });

          }
        })
        .catch( err => {
          var errorCode = err.code || 'Sorry, there was a problem.';
          var errorMessage = err.message || 'Please correct the errors and submit again'
  
          notification.error({
            message: errorCode,
            description: errorMessage
          })

        })

      }
      else {
        var errorCode = err.code || 'Sorry, there was a problem.';
        var errorMessage = err.message || 'Please correct the errors and submit again'

        notification.error({
          message: errorCode,
          description: errorMessage
        })
      }
    })
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  uploadProgress = (percent,task) => {
    console.log(`uploadProgress: progress = ${percent}`)
    this.setState({ percent })
  }

  beforeUpload = (file) => {
    this.setState({ file })
    return true
  }
  beforeUploadIcon = (file) => {
    this.setState({ fileIcon: file })
    return true
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handlePreviewIcon = (file) => {
    this.setState({
      previewImageIcon: file.url || file.thumbUrl,
      previewVisibleIcon: true,
    });
  }

  handleCancelPreview = () => this.setState({ previewVisible: false })
  handleCancelPreviewIcon = () => this.setState({ previewVisibleIcon: false })

  handleChange = ({ fileList }) => this.setState({ fileList })
  handleChangeIcon = ({ fileList }) => this.setState({ fileListIcon: fileList })

  render() {
    const { getFieldDecorator } = this.props.form;
    const { deploying, loading } = this.state;
    const { previewVisible, previewImage, fileList } = this.state;
    const { previewVisibleIcon, previewImageIcon, fileListIcon } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Content>
        <Button key="back" size="large" icon="arrow-left" onClick={this.props.cancelCallback} style={{ marginBottom: 16}} >Cancel</Button>

        <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
        <Card title="New Company" bordered={false} style={{ width: "100%"}} loading={false} >
            <Form onSubmit={this.handleSubmit}>
            <Tabs defaultActiveKey="1" >
                    <TabPane tab="Info" key="1">

                        <FormItem label="Name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input a name!' }],
                        })(
                            <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder=" New Company" />
                        )}
                        </FormItem>

                        <FormItem label="Description">
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: 'Please input your description!' }],
                        })(
                            <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder=" Description..." />
                        )}
                        </FormItem>

                        <FormItem label="Batch">
                        {getFieldDecorator('batch', {
                            rules: [{ required: true, message: 'Please input your batch!' }],
                        })(
                            <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder=" Batch" />
                        )}
                        </FormItem>

                        <FormItem label="Category">
                        {getFieldDecorator('category', {
                            rules: [{ required: true, message: 'Please input your category!' }],
                            initialValue: 'Other SaaS',

                        })(
                          <Select style={{ width: 150 }}>
                            <Option value="Aerospace" icon="rocket" >Aerospace</Option>
                            <Option value="Agriculture" icon="compass" >Agriculture</Option>
                            <Option value="AI and ML" icon="setting" >AI and ML</Option>
                            <Option value="Blockchain" icon="link" >Blockchain</Option>
                            <Option value="Consumer" icon="user" >Consumer</Option>
                            <Option value="Dev Tools" icon="tool" >Dev Tools</Option>
                            <Option value="Education" icon="edit" >Education</Option>
                            <Option value="Entertainment" icon="video-camera" >Entertainment</Option>
                            <Option value="Fintech" icon="bank" >Fintech</Option>
                            <Option value="Government" icon="pound" >Government</Option>
                            <Option value="Healthcare" icon="medicine-box" >Healthcare</Option>
                            <Option value="Industrial" icon="experiment" >Industrial</Option>
                            <Option value="Real Estate" icon="shop" >Real Estate</Option>
                            <Option value="Resources" icon="crown" >Resources</Option>
                            <Option value="Transport" icon="car" >Transport</Option>
                            <Option value="Other SaaS" icon="cloud" >Other SaaS</Option>
                            <Option value="Nonprofit" icon="team" >Nonprofit</Option>                          
                          </Select>

                        )}
                        </FormItem>


                        <FormItem label="Status">
                        {getFieldDecorator('status', {
                            rules: [{ required: true, message: 'Please input company status!' }],
                            initialValue: 'Live',

                        })(
                          <Select style={{ width: 150 }}>
                            <Option value="Live" icon="rocket" >Live</Option>
                            <Option value="Dead" icon="compass" >Dead</Option>
                            <Option value="Exited" icon="setting" >Exited</Option>                          
                          </Select>

                        )}
                        </FormItem>


                    </TabPane>
                    <TabPane tab="Performance" key="2">


                        <FormItem label="Funding">
                        {getFieldDecorator('funding', {
                              initialValue: 0
                          })(
                            <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder=" Funding" />
                        )}
                        </FormItem>

                        <FormItem label="Exit">
                        {getFieldDecorator('exit', {
                              initialValue: 0
                          })(
                            <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder=" Exit" />
                        )}
                        </FormItem>

                        <FormItem label="Employees">
                        {getFieldDecorator('employees', {
                              initialValue: 1
                          })(
                            <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder=" Employees" />
                        )}
                        </FormItem>

                    </TabPane>
                    <TabPane tab="Address" key="3">


                        <FormItem label="Address">
                        {getFieldDecorator('address', {
                              initialValue: ""
                          })(
                            <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder=" Address" />
                        )}
                        </FormItem>

                        <FormItem label="Website">
                        {getFieldDecorator('www', {
                              initialValue: 'http://'
                          })(
                            <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder=" Website" />
                        )}
                        </FormItem>

                        <FormItem label="HQ Location">
                        {getFieldDecorator('hqLocation', {
                              initialValue: ''
                          })(
                            <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="  Location" />
                        )}
                        </FormItem>

                    </TabPane>

                    <TabPane tab="Design" key="4">


                        <FormItem label="Landingpage">

                          {getFieldDecorator('landingpage', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                          })(

                              <div>
                              <Upload
                              listType="picture-card"
                              fileList={fileList}
                              onPreview={this.handlePreview}
                              onChange={this.handleChange}
                              beforeUpload={this.beforeUpload}
                              >
                              {fileList.length >= 1 ? null : uploadButton}
                              </Upload>
                              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelPreview}>
                              <img alt="example" style={{ width: '100%' }} src={previewImage} />
                              </Modal>
                              </div>

                          )}
                        </FormItem>

                        <FormItem label="Icon">

                          {getFieldDecorator('icon', {
                            valuePropName: 'fileListIcon',
                            getValueFromEvent: this.normFile,
                          })(

                              <div>
                              <Upload
                              listType="picture-card"
                              fileList={fileListIcon}
                              onPreview={this.handlePreviewIcon}
                              onChange={this.handleChangeIcon}
                              beforeUpload={this.beforeUploadIcon}
                              >
                              {fileListIcon.length >= 1 ? null : uploadButton}
                              </Upload>
                              <Modal visible={previewVisibleIcon} footer={null} onCancel={this.handleCancelPreviewIcon}>
                              <img alt="example" style={{ width: '100%' }} src={previewImageIcon} />
                              </Modal>
                              </div>

                          )}
                        </FormItem>

                    </TabPane>
                  </Tabs>

                <FormItem>
                    <Button type="primary" htmlType="submit" style={{ marginTop: 16}} >
                    Save
                    </Button>
                </FormItem>
                
              </Form>
          </Card>
        </div>
      </Content>
      )
  }
}

export default class MFCompanies extends React.Component {
  state = {
    deploying: false,
    menuVisible: false,
    loading: false
  }

  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    });
  }

  handleHideMenu = () => {
    this.setState({
      menuVisible: false,
    });
  }

  handleOk = () => {
    this.setState({
      menuVisible: false,
    });
  }


  onRowSelect = record => {
    console.log("Select record ", record)
  }

  render() {
    const { deploying, loading } = this.state;
    const WrappedCompanyCreate = Form.create()(CompanyCreate);

    const colorForStatus = status => {
      if (status.match(/live/i)) return "#ffc108" // yellow
      if (status.match(/dead/i)) return "#dc3545" // red
      if (status.match(/exit/i)) return "#28a745"  // green
      return "gray"
  }

    const columns = [{
      title: 'Name',
      dataIndex: 'id',
      key: 'id',
      render: ((text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>),
    }, {
      title: 'Batch',
      dataIndex: 'batch',
      key: 'batch',
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: ((tag) => <Tag color={colorForStatus(tag)} key={tag} >{tag.toUpperCase()}</Tag>)
    }, {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    }, {
      title: 'Actions',
      // dataIndex: 'databaseURL',
      key: 'edit',
      render: ((text,record) => <Button.Group type="small" ><Button icon="edit" /><Button icon="delete" /></Button.Group> ),
  }];

    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Company</Breadcrumb.Item>
        </Breadcrumb>
        {this.state.menuVisible ?
         <WrappedCompanyCreate cancelCallback={this.handleHideMenu} />
        :
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        
          <div style={{textAlign: 'right'}} >
          <Button type="secondary" size="large" icon="plus" onClick={this.handleShowMenu}> New Company </Button>
          </div>
          
          <DBQueryProvider path={'companies'} limit={10} >

          { ({error, isLoading, data}) => {
          
            if (error) { console.error("Error loading users ", error)}

            return(
                <Table 
                columns={columns} 
                dataSource={data} 
                rowKey={record => record.id}
                onRow={(record) => ({
                  onClick: () => { this.onRowSelect(record); }
                })}
                loading={isLoading} 
                pagination={true} />
            )
          }}

          </DBQueryProvider>
          
        </div>
        }
      </Content>
      )

  }

}