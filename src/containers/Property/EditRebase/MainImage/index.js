import React, { Component } from "react";
import { Upload, Button, message, Row, Col, Form, Typography } from "antd";
import { connect } from "react-redux";
import Wrapper from "./styles";

import {
  uploadFileSuccessAction,
  addPropertyMediaAction,
  removePropertyMediaAction,
  submitEditChildrenProperty,
} from "../../../../redux/property/actions";
import { getSignedUrlS3, uploadFile } from "../../../../utils/uploadFile";

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// }

class PropertyMainImage extends Component {
  state ={
    loading: false,
  }
  
  handleOnChange = async (info) => {
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

  handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      this.setState({
        loading: true,
      })
      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "PROPERTY_IMAGE",
      );
      const response = await uploadFile(file, signedUrlS3.url);
      this.props.uploadImageSuccess(response.url);
      const payload = {
        mimeType: file.type,
        link: response.url,
        type: 1,
      };
      this.props.addPropertyMainImage(payload);
      onSuccess("Upload success");
      this.setState({
        loading: false,
      })
    } catch (error) {
      message.error("Xảy ra lỗi, vui lòng thử lại");
      onError("Error");
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(this.props.medias.length === 0) {
        message.error("Vui lòng upload ảnh chính");
      }
      const { id } = this.props;
      const medias = this.props.medias.map((k) => ({
        link: k.link,
        mimeType: k.mimeType,
        type: k.type,
      }))
      await this.props.submitMainImage(id, {medias})
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  }

  handleRemove = (e) => {
    this.props.removeImage(e.id);
  };

  render() {
    const { medias, createPropertyLoading } = this.props;
    let fileList = [...medias] || [];

    if (fileList.length > 0) {
      fileList = fileList.filter((e) => e.type === 1);
      fileList = fileList.map((e) => ({
        key: e.id,
        name: e.link,
        uid: e.id,
        id: e.id,
        status: "done",
        link: e.link,
      }));
    }
    const uploadButton = (
      <Button icon="upload" loading={this.state.loading}>
        Upload
      </Button>
    );

    const buttonEdit =  (
      <div className="submitButton">
        <Button
          type="primary"
          size="large"
          onClick={this.handleSubmit}
          loading={createPropertyLoading}
          >
          {createPropertyLoading ? "" : "Cập nhật thông tin"}
        </Button>
      </div>
    )
    return (
      <Wrapper>
        <Typography.Title level={4}>Ảnh chính</Typography.Title>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Upload
            // listType="picture"
            fileList={fileList}
          // onPreview={this.handlePreview}
            onChange={this.handleOnChange}
            customRequest={this.handleUpload}
            onRemove={() => this.handleRemove(fileList.length && fileList[0])}
            className="upload-main-image"
        >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Row>
            <Col>
              <div className="main-image">
                {fileList.length > 0 && (
                <img src={fileList.length > 0 && fileList[0].link} alt="main" />
              )}
              </div>
            </Col>
          </Row>
          {buttonEdit}
        </Form>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  file: state.property.fileUrl,
  // images: state.property.PropertyMainImage,
  medias: state.property.medias,
  createPropertyLoading: state.property.createPropertyLoading,
});

const mapDispatchToProps = (dispatch) => ({
  uploadImageSuccess: (fileUrl) => {
    dispatch(uploadFileSuccessAction(fileUrl, "create"));
  },

  addPropertyMainImage: (payload) => {
    dispatch(addPropertyMediaAction(payload));
  },

  removeImage: (id) => {
    dispatch(removePropertyMediaAction(id));
  },

  submitMainImage: (id, payload) => {
    dispatch(submitEditChildrenProperty(id, payload))
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(PropertyMainImage));
