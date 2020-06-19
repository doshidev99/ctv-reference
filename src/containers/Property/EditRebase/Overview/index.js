import React, { Component } from "react";
import { Form, Input, Icon, Button, Row, Col,Typography, DatePicker, Upload, message } from 'antd';
import { connect } from "react-redux";
// import { object } from "prop-types";
import moment from 'moment'
import { mongoObjectId } from "../../../../utils/textProcessor";
import Editor from "../../../../components/common/Editor/index";
import Wrapper from "./styles";
import {
  submitEditChildrenProperty,
  uploadFileSuccessAction,
  addNewLegalRecordSuccessAction,
  addNewLegalRecordAction,
} from "../../../../redux/property/actions";
import { getSignedUrlS3, uploadFile } from "../../../../utils/uploadFile";

const files = [];


class Overview extends Component {

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    // this.props.legalRecords.splice(k, 1);
    // files.splice(k, 1);
    
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;

    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const id = this.props.legalRecords.length;
    
    const nextKeys = keys.concat(id);
    // can use data-binding to set
    // important! notify form to detect changes
    this.props.legalRecords.push({
      title: '',
      mineType: '',
      updatedAt: moment(),
      link: '',
      id: mongoObjectId(),
    });
    files.push({
      fileList: [],
    })
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { form } = this.props;
      // const payload = form.getFieldsValue(['overview', 'title', 'updatedAt']);
      const values = await form.validateFields((err, val) => {
        if (err) {
          return false;
        }
        return val;
      });
      const legalRecords = values.keys.map((k) =>({
        title: values.title[k],
        mimeType: files[k].fileList[0].mimeType || "image/jpeg",
        link: files[k].fileList[0].url,
        updatedAt: values.updatedAt[k],
      }))
      
      await this.props.submitEdit(this.props.id, {
        overview: values.overview,
        legalRecords,
      })
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
    
  }

  handleOnChange = async (info) => {
    if (info.file.status !== "uploading") {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      let newFileName = this.props.file;
      newFileName = newFileName.substring(newFileName.lastIndexOf("/") + 1);
      // eslint-disable-next-line no-param-reassign
      info.file.name = newFileName;
      // eslint-disable-next-line no-param-reassign
      // info.file.originFileObj.name = newFileName
      // console.log(info.file, info.fileList);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  handleUpload = async (k, action) => {
    const {file, onError, onSuccess} = action;
    try {
      // const values = await this.props.form.validateFields((err, val) => {
      //   if (err) {
      //     onError("Error cmnr");
      //     return false;
      //   }
      //   return val;
      // });
      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "LEGAL_RECORD",
      );
      const response = await uploadFile(file, signedUrlS3.url);
      this.props.uploadFileSuccess(response.url);
      files[k].fileList[0] = {
        name: file.name,
        status: "done",
        uid: '1',
        url: response.url,
        mineType: file.type,
      }
      onSuccess('OK')
    } catch (error) {
      message.error("Xảy ra lỗi, vui lòng thử lại");
      onError("Error");
    }
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const {currentProperty, legalRecords} = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    if(this.props.legalRecords.length >0 && this.props.legalRecords.length !== files.length) {
      
      this.props.legalRecords.map((e) => {
        files.push({
          fileList: [
            {uid: "1",
            status: "",
            url: e.link,
            name: e.title,
            mimeType: e.mimeType,
          },
          ],
        })
        return 1;
      })
    }
    const buttonEdit =  (
      <div className="submitButton">
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          // onClick={this.handleSubmit}
          // loading={createPropertyLoading}
          >
          {/* {createPropertyLoading ? "" : "Cập nhật thông tin"} */}
          Cập nhật thông tin
        </Button>
      </div>
    )
    const initialKeys =  legalRecords.map((x,idx) => idx )
    
    getFieldDecorator('keys', { initialValue: initialKeys});
    const keys = getFieldValue('keys');

    

    return (
      <Wrapper>
        <Form onSubmit={this.handleSubmit}>
          {/* OVERVIEW */}
          
          <Row>
            <Col xs={24} lg={16} xl={12} style={{ paddingRight: "8px" }}>
              <Typography.Title level={4}>Tổng quan dự án</Typography.Title>

              <Form.Item className="overview">
                {getFieldDecorator("overview", {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng nhập thông tin tổng quan dự án",
                  },
                ],
              })(
                <Editor
                  content={currentProperty.overview}
                />,
              )}
              </Form.Item>
            </Col>
            <Col
              xs={24}
              lg={16}
              xl={12}
              style={{ paddingLeft: "8px", paddingRight: "8px" }}
            >
              
              <Typography.Title level={4}>Hồ sơ pháp lý</Typography.Title>

              {keys.map((k) => (
                <Row key={k}>
                  <Col span={8}>
                    <Form.Item
                      {...formItemLayout}
                      required={false}
                    >
                      {getFieldDecorator(`title[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                          {
                            required: true,
                            whitespace: true,
                            message: "Tiêu đề ko đc để trống",
                          },
                        ],
                        initialValue: legalRecords.length > 0 ? legalRecords[k].title : '',
                      })(<Input placeholder="Tiêu đề" />)}
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...formItemLayout}
                      required={false}
                    >
                      {getFieldDecorator(`updatedAt[${k}]`, {
                        initialValue: legalRecords.length > 0 && moment(legalRecords[k].updatedAt),
                      })(<DatePicker placeholder="Thời điểm cập nhât" />)}
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <div className="files">
                      <Upload
                        className="upload"
                        onChange={this.handleOnChange}
                        customRequest={( action ) => this.handleUpload(k, action)}
                        defaultFileList={files[k].fileList.length > 0 && files[k].fileList}
                      >
                        <Button shape="round" icon="upload">Upload</Button>
                      </Upload>
                      {/* <Button icon="minus" shape="round" onClick={this.handleRemove} /> */}
                    </div>
                  </Col>
                  <Col span={2}>
                    {keys.length > 1 ? (
                      <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                      />
                    ) : null}
                  </Col>
        
                </Row>
                ))}
              <Form.Item>
                <Button type="dashed" onClick={this.add} style={{ width: '30%' }}>
                  <Icon type="plus" />
                  {' '}
                  Thêm hồ sơ
                </Button>
              </Form.Item>
            </Col>
          </Row>
          {buttonEdit}
        </Form>
        
      </Wrapper>
      
    );
  }
}

const mapStateToProps = (state) => {
  const { currentProperty, legalRecords, fileUrl } = state.property;
  return {
    currentProperty,
    legalRecords,
    file: fileUrl,
  };
};
const mapDispatchToProps = (dispatch) => ({
  addLegalRecord: () => {
    dispatch(addNewLegalRecordAction());
  },
  addLegalRecordSuccess: (payload) => {
    dispatch(addNewLegalRecordSuccessAction(payload));
  },
  uploadFileSuccess: (fileUrl) => {
    dispatch(uploadFileSuccessAction(fileUrl, "create"));
  },
  submitEdit: (idProperty, values) => {
    dispatch(submitEditChildrenProperty(idProperty, values))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Overview));
