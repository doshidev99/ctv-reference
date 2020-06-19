import React, { Component } from "react";
import { Form, Input, Icon, Button, Row, Col,Typography, DatePicker, Upload, message } from 'antd';
import { connect } from "react-redux";
import moment from 'moment'
import { mongoObjectId } from "../../../../utils/textProcessor";
import Wrapper from "./styles";
import PropertyImage from "../PropertyImage";
import {
  submitEditChildrenProperty,
  uploadFileSuccessAction,
  removePriceListAction,
  addPriceListAction,
} from "../../../../redux/property/actions";
import { getSignedUrlS3, uploadFile } from "../../../../utils/uploadFile";

const files = [];


class SalePolicy extends Component {
  state={
    loadingPrice: false,
  }

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    // can use data-binding to set
    // this.props.salesPolicies.splice(k, 1);
    // files.splice(k, 1);
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const id = this.props.salesPolicies.length;
    const nextKeys = keys.concat(id);
    // can use data-binding to set
    // important! notify form to detect changes
    this.props.salesPolicies.push({
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
      const values = await form.validateFields((err, val) => {
        if (err) {
          return false;
        }
        return val;
      });
      const salesPolicies = values.keys.map((k) =>({
        title: values.title[k],
        mimeType: files[k].fileList[0].mimeType || "image/jpeg",
        link: files[k].fileList[0].url,
        updatedAt: values.updatedAt[k],
      }))
      const medias = this.props.medias.map((idx) => {
        if (typeof idx.id !== "number") {
          const { link, mimeType, name, type } = idx;
          return {
            link,
            mimeType,
            name,
            type,
          };
        }
        return idx;
      })
      await this.props.submitEdit(this.props.id, {
        salesPolicies,
        priceList: this.props.priceList,
        medias,
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

  handleUploadPrice = async ({ file, onSuccess, onError }) => {
    try {
      this.setState({
        loadingPrice: true,
      })
      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "PRICE_LIST",
      );
      const response = await uploadFile(file, signedUrlS3.url);
      this.props.uploadFileSuccess(response.url);
      const payload = {
        title: file.name,
        link: response.url,
        mimeType: file.type,
        updatedAt:  moment().toDate(),
      }
      await this.props.addPriceList(payload);
      this.setState({
        loadingPrice: false,
      })
      onSuccess("OK");
      message.success(`${file.name} file uploaded successfully`);
    } catch (error) {
      message.error("Xảy ra lỗi, vui lòng thử lại");
      onError("Error cmnr =)))");
    }
  };

  handleRemovePrice = () => {
    this.props.removePriceList()
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { salesPolicies, priceList  } = this.props;
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

    if(salesPolicies && salesPolicies.length > files.length) {
      salesPolicies.map((e) => {
        files.push({
          fileList: [
            {uid: "1",
            status: "done",
            url: e.link,
            name: e.title,
            mimeType: e.mimeType,
          },
          ],
        })
        return 1;
      })
    }
    let fileList = [];
    if (priceList) {
      fileList = [{
        status: 'done',
        uid: '1',
        url:  priceList.link,
        name: priceList.title,
      }]
    }
    const buttonEdit =  (
      <div className="submitButton">
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          >
          {/* {createPropertyLoading ? "" : "Cập nhật thông tin"} */}
          Cập nhật thông tin
        </Button>
      </div>
    )
    const initialKeys =  salesPolicies.map((x,idx) => idx )
    
    getFieldDecorator('keys', { initialValue: initialKeys});
    const keys = getFieldValue('keys');

    

    return (
      <Wrapper>
        <Form onSubmit={this.handleSubmit} style={{width: '100%'}}>
          <Row>
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
                        initialValue: salesPolicies.length > 0 ? salesPolicies[k].title : '',
                      })(<Input placeholder="Tiêu đề" />)}
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...formItemLayout}
                      required={false}
                    >
                      {getFieldDecorator(`updatedAt[${k}]`, {
                        initialValue: salesPolicies.length > 0 && moment(salesPolicies[k].updatedAt),
                      })(<DatePicker placeholder="Thời điểm cập nhât" />)}
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item className="files">
                      <Upload
                        className="upload"
                        onChange={this.handleOnChange}
                        customRequest={( action ) => this.handleUpload(k, action)}
                        defaultFileList={files[k].fileList.length > 0 && files[k].fileList}
                      >
                        <Button shape="round" icon="upload">Upload</Button>
                      </Upload>
                    </Form.Item>
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
            <Col
              xs={12}
              lg={16}
              xl={4}
              style={{ paddingLeft: "8px", paddingRight: "8px" }}
            >
              <Typography.Title level={4}>Bảng giá</Typography.Title>
              <Upload
                className="upload"
                onChange={this.handleOnChange}
                onRemove={this.handleRemovePrice}
                customRequest={this.handleUploadPrice}
                fileList={fileList}
              >
                <Button loading={this.state.loadingPrice} icon="upload" className="uploadPriceButton" />
              </Upload>
            </Col>
            <Col
              xs={12}
              lg={16}
              xl={8}
              style={{ paddingLeft: "8px", paddingRight: "8px" }}
            >
              <Typography.Title level={4}>Hình ảnh dự án</Typography.Title>
              <PropertyImage />
            </Col>
          </Row>
          {buttonEdit}
        </Form>
        
      </Wrapper>
      
    );
  }
}

const mapStateToProps = (state) => {
  const { currentProperty, salesPolicies, fileUrl, priceList, medias } = state.property;
  return {
    currentProperty,
    salesPolicies,
    file: fileUrl,
    priceList,
    medias,
  };
};
const mapDispatchToProps = (dispatch) => ({
  uploadFileSuccess: (fileUrl) => {
    dispatch(uploadFileSuccessAction(fileUrl, "create"));
  },
  submitEdit: (idProperty, values) => {
    dispatch(submitEditChildrenProperty(idProperty, values))
  },
  removePriceList: () => {
    dispatch(removePriceListAction());
  },
  addPriceList: (payload) => {
    dispatch(addPriceListAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(SalePolicy));
