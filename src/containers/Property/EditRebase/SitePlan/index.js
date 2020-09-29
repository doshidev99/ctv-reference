import React, { Component } from "react";
import { Form, Input, Icon, Button, Row, Col,Typography, Modal, Upload, message } from 'antd';
import { connect } from "react-redux";
import { mongoObjectId } from "../../../../utils/textProcessor";
import Wrapper from "./styles";
import {
  submitEditChildrenProperty,
  uploadFileSuccessAction,
  addNewSitePlanSuccessAction,
  removeSitePlanImageAction,
} from "../../../../redux/property/actions";
import { getSignedUrlS3, uploadFile } from "../../../../utils/uploadFile";

let files = [];

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}


class SitePlan extends Component {
  state = {
    loading: [],
    previewVisible: false,
    previewImage: "",
  };

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    // this.props.sitePlans.splice(k, 1);
    // files.splice(k, 1);

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;

    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const id = this.props.sitePlans.length;

    const nextKeys = keys.concat(id);
    // can use data-binding to set
    // important! notify form to detect changes
    this.props.sitePlans.push({
      title: '',
      links: [],
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
      const sitePlans = values.keys.map((k) =>({
        title: values.sitePlanTitle[k],
        links: files[k].fileList.map((i) => i.url),
      }))
      await this.props.submitEdit(this.props.id, {sitePlans})
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }

  }

  handleChange = async (k, info) => {
    files[k].fileList = [...info.fileList];
    if (info.file.status === "done") {
      let newFileName = this.props.file;
      newFileName = newFileName.substring(newFileName.lastIndexOf("/") + 1);
      // eslint-disable-next-line no-param-reassign
      info.file.name = newFileName;
      // eslint-disable-next-line no-param-reassign
      // info.file.originFileObj.name = newFileName
      
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  handleUpload = async (k, action) => {
    const {file, onSuccess, onError} = action;
    try {
      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "sitePlanImage",
      );
      const response = await uploadFile(file, signedUrlS3.url);
      this.props.sitePlans[k].links.push(response.url);
      this.props.uploadFileSuccess(response.url);
      onSuccess('OK')
    } catch (error) {
      message.error("Xảy ra lỗi, vui lòng thử lại");
      onError("Error");
    }
  };

  removeImage = async (k, e) => {
    this.props.removeImage(this.props.sitePlans[k].id, e.url)
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { previewVisible, previewImage } = this.state;
    const {sitePlans} = this.props;


    if(this.props.sitePlans.length >0 ) {
      files = sitePlans.map((e) => ({
        fileList: e.links.map((k, index) => ({
          url: k,
          status: "done",
          uid: index,
          name: 'image.png',
        })),
      }))
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
    );

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const initialKeys =  sitePlans.map((x,idx) => idx )

    getFieldDecorator('keys', { initialValue: initialKeys});
    const keys = getFieldValue('keys');



    return (
      <Wrapper>
        <Form onSubmit={this.handleSubmit}>
          <Typography.Title level={4}>Mặt bằng dự án</Typography.Title>
          {keys.map((k) => (
            <Row className="site-row" key={k}>
              <Col span={22}>
                <div className="title">
                  <div>
                    <Form.Item>
                      {getFieldDecorator(`sitePlanTitle[${k}]`, {
                    rules: [
                      {
                        required: true,
                        message: "Tiêu đề ko đc đê trống",
                      },
                    ],
                    initialValue: sitePlans.length > 0 && sitePlans[k].title,
                  })(
                    <Input
                      className="sitePlanLabel"
                      placeholder="Tiêu đề"
                    />,
                  )}
                    </Form.Item>
                  </div>
                </div>
                <div className="uploadImage">
                  <Upload
                    onChange={(info) => this.handleChange(k,info)}
                    listType="picture-card"
                    fileList={files[k].fileList.length > 0 && files[k].fileList}
                    customRequest={( action ) => this.handleUpload(k, action)}
                    onPreview={this.handlePreview}
                    onRemove={( e ) => this.removeImage(k, e)}
              >
                    {uploadButton}
                  </Upload>
                  <Modal
                    visible={previewVisible}
                    width="70%"
                    footer={null}
                    onCancel={this.handleCancel}
              >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                />
                  </Modal>
                </div>
              </Col>
              <Col span={2}>
                <Button
                  icon="delete"
                  className="deleteSiteButton"
                  onClick={() => this.remove(k)}
                  style={{color: 'red'}}
            />
              </Col>

            </Row>
          ))}
          <Button type="dashed" onClick={this.add} style={{ width: '30%' }}>
            <Icon type="plus" />
            {' '}
                  Thêm hồ sơ
          </Button>
          {buttonEdit}
        </Form>

      </Wrapper>

    );
  }
}

const mapStateToProps = (state) => {
  const { sitePlans, fileUrl } = state.property;
  return {
    sitePlans,
    file: fileUrl,
  };
};
const mapDispatchToProps = (dispatch) => ({
  uploadFileSuccess: (fileUrl) => {
    dispatch(uploadFileSuccessAction(fileUrl, "create"));
  },
  removeImage: (id, url) => {
    dispatch(removeSitePlanImageAction(id, url))
  },
  submitEdit: (idProperty, values) => {
    dispatch(submitEditChildrenProperty(idProperty, values))
  },
  addNewSitePlanSuccess: (id, title, url) => {
    dispatch(addNewSitePlanSuccessAction(id, title, url));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(SitePlan));
