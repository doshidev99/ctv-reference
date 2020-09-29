import React, { Component } from "react";
import { Upload, Icon, Button, message, Row, Col } from "antd";
import { connect } from "react-redux";
import Wrapper from "./styles";

import {
  uploadFileSuccessAction,
  addPropertyMediaAction,
  removePropertyMediaAction,
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
  handleOnChange = async (info) => {
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
      onSuccess("OK");
    } catch (error) {
      message.error("Xảy ra lỗi, vui lòng thử lại");
      onError("Error cmnr =)))");
    }
  };

  handleRemove = (e) => {
    this.props.removeImage(e.id);
  };

  render() {
    const { medias } = this.props;
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
      <Button>
        <Icon type="upload" />
        Upload
      </Button>
    );
    return (
      <Wrapper>
        <Row>
          <div className="title">
            <p>Ảnh chính</p>
          </div>
        </Row>

        <Upload
          onChange={this.handleOnChange}
          customRequest={this.handleUpload}
          onRemove={()=> this.handleRemove(fileList.length && fileList[0])}
          className="upload-main-image"
            >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Row>
          <Col>
            <div className="main-image">
              {fileList.length > 0 && (<img src={fileList.length > 0 && fileList[0].link} alt="main" />)}
            </div>
           
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  file: state.property.fileUrl,
  // images: state.property.PropertyMainImage,
  medias: state.property.medias,
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
});
export default connect(mapStateToProps, mapDispatchToProps)(PropertyMainImage);
