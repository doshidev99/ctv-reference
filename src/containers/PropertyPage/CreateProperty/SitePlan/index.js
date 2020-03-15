import React, { Component } from "react";
import { Input, Button, Upload, message, Form, Icon, Modal } from "antd";
import { connect } from "react-redux";
import SitePlanWrapper from "./styles";

import { uploadFileSuccessAction } from "../../../../redux/property/actions";
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
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'error',
      },
    ],
  };


  handleOnChange = async info => {
    if (info.file.status !== "uploading") {
      // console.log(info.file, info.fileList);
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

  handleRemove = () => {
    console.log("Handle remove here");
  };

  handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "sitePlanImage",
      );

      uploadFile(file, signedUrlS3.url).then(response => {
        this.props.uploadFileSuccess(response.url);
        onSuccess("OK");
      });
    } catch (error) {
      onError("Error cmnr =)))");
    }
  };

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
    const { previewVisible, previewImage, fileList } = this.state;
    
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    // const {imageUrl} = this.props
    return (
      <SitePlanWrapper>
        <div className="inputArea">
          <div className="title">
            <FormItem>
              {this.props.getFieldDecorator(this.props.name, {
              rules: [
                {
                  required: true,
                  message: "Tiêu đề ko đc đê trống",
                },
              ],
            })(
              <div>
                <label>Mặt bằng</label>
                <Input
                  className="sitePlanLabel"
                  name={this.props.name}
                  placeholder="Tiêu đề"
                />
              </div>,
            )}
            </FormItem>
           
          </div>
          <div className="files">
            <Upload
              className="upload"
              onChange={this.handleOnChange}
              onRemove={this.handleRemove}
              listType="picture-card"
              fileList={fileList}
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              // customRequest={this.handleUpload}
              onPreview={this.handlePreview}
            >
              {fileList.length >= 8 ? null : uploadButton}
              {/* <Button shape="circle" icon="upload" /> */}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </div>
        <div className="actionGroup">
          <Button type="primary" onClick={this.props.handleExpandSitePlan}>
          Thêm
          </Button>
          <Button type="danger" onClick={this.props.handleRemoveSitePlan}>
          Hủy
          </Button>
        </div>
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
});
export default connect(mapStateToProps, mapDispatchToProps)(SitePlan);
