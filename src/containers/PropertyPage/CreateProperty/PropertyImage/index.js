import React, { Component } from 'react'
import { Upload, Icon, Modal, message } from 'antd';
import { connect } from "react-redux";
import PropertyImageWrapper from './styles'

import { uploadFileSuccessAction, removePropertyImagetAction, addPropertyImageAction } from "../../../../redux/property/actions";
import { getSignedUrlS3, uploadFile } from "../../../../utils/uploadFile";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PropertyImage extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
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

  handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "sitePlanImage",
      );

      uploadFile(file, signedUrlS3.url).then(response => {
        this.props.uploadImageSuccess(response.url);
        this.props.addPropertyImage(response.url);
        onSuccess("OK");
      });
    } catch (error) {
      onError("Error cmnr =)))");
    }
  };

  handleRemove = (e) => {
    this.props.removeImage(e.url)
  }

  render() {
    const { previewVisible, previewImage } = this.state;
    const {images} = this.props;
    let fileList = images || []

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
    return (
      <PropertyImageWrapper>
        <div className="title">
          <span>
            Hình ảnh dự án
          </span>
        </div>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleOnChange}
          customRequest={this.handleUpload}
          onRemove={this.handleRemove}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </PropertyImageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  file: state.property.fileUrl,
  images: state.property.propertyImage,
});

const mapDispatchToProps = dispatch => ({
  uploadImageSuccess: fileUrl => {
    dispatch(uploadFileSuccessAction(fileUrl, "create"));
  },

  addPropertyImage :(url) => {
    dispatch(addPropertyImageAction(url));
  },

  removeImage: url => {
    dispatch(removePropertyImagetAction(url));
  },

});
export default connect(mapStateToProps, mapDispatchToProps)(PropertyImage);
