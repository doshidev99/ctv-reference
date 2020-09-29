import React, { Component } from "react";
import { Input, Button, Upload, message, Form, Icon, Modal, Row, Col } from "antd";
import { connect } from "react-redux";
import SitePlanWrapper from "./styles";

import { uploadFileSuccessAction, removeOneSitePlanAction, addNewSitePlanSuccessAction, removeSitePlanImageAction } from "../../../../redux/property/actions";
import { getSignedUrlS3, uploadFile } from "../../../../utils/uploadFile";

const FormItem = Form.Item;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class SitePlan extends Component {
  state = {
    loading: false,
    previewVisible: false,
    previewImage: '',
  };


  handleOnChange = async info => {
    if (info.file.status !== "uploading") {
    }
    if (info.file.status === "done") {
      let newFileName = this.props.file;
      newFileName = newFileName.substring(newFileName.lastIndexOf("/") + 1);
      info.file.name = newFileName;
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const title = await this.props.form.validateFields((err, val) => {
        if (err) {
          onError("Error cmnr =)))");
          return false;
        }
        return val;
      });

      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "sitePlanImage",
      );

      uploadFile(file, signedUrlS3.url).then(response => {
        this.props.uploadImageSuccess(response.url);
        this.props.addNewSitePlanSuccess(this.props.id, title.sitePlanTitle, response.url);
        onSuccess("OK");
      });
    } catch (error) {
      onError("Error cmnr =)))");
    }
  };



  handleRemove = () => {
    this.props.handleRemoveSitePlan(this.props.id)
  };

  removeImage = (e) => {
    this.props.removeImage(this.props.id, e.url)
  }

  // Preview
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
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
    const { previewVisible, previewImage } = this.state;
    const {links} = this.props;
    let fileList = links || []

    fileList = fileList.map((e, index) => ({
      url: e,
      status: 'done',
      uid: index,
    }))
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    // const {imageUrl} = this.props
    return (
      <SitePlanWrapper>
        <Row className="site-row">
          <Col span={22}>
            <div className="title">
              <FormItem>
                {this.props.form.getFieldDecorator("sitePlanTitle", {
              rules: [
                {
                  required: true,
                  message: "Tiêu đề ko đc đê trống",
                },
              ],
            })(
              <div>
                <Input
                  className="sitePlanLabel"
                  name={this.props.name}
                  placeholder="Tiêu đề"
                />
              </div>,
            )}
              </FormItem>
            </div>
            <div className="uploadImage">
              <Upload
                onChange={this.handleOnChange}
                listType="picture-card"
                fileList={fileList}
                customRequest={this.handleUpload}
                onPreview={this.handlePreview}
                onRemove={this.removeImage}
                >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
          </Col>
          <Col span={2}>
            <Button icon="delete" className="deleteSiteButton" onClick={this.handleRemove} />
          </Col>
        </Row>
      </SitePlanWrapper>
    );
  }
}

const mapStateToProps = state => ({
  file: state.property.fileUrl,
});

const mapDispatchToProps = dispatch => ({
  uploadImageSuccess: fileUrl => {
    dispatch(uploadFileSuccessAction(fileUrl, "create"));
  },

  addNewSitePlanSuccess :(id, title, url) => {
    dispatch(addNewSitePlanSuccessAction(id, title, url));
  },

  handleRemoveSitePlan: id => {
    dispatch(removeOneSitePlanAction(id));
  },

  removeImage: (id, url) => {
    dispatch(removeSitePlanImageAction(id, url))
  },

});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(SitePlan));
