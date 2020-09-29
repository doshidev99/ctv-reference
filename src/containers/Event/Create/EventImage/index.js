import React, { Component } from 'react'
import { Upload, Modal, message, Button } from 'antd';
import { connect } from "react-redux";
import EventImageWrapper from './styles'

import { uploadImageSuccessAction, removeImageAction } from "../../../../redux/event/actions";
import { getSignedUrlS3, uploadFile } from "../../../../utils/uploadFile";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class EventImage extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    loading: false,
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
        "EVENT_IMAGE",
      );
      const response = await uploadFile(file, signedUrlS3.url);
      await this.props.uploadImageSuccess(response.url);
      this.setState({
        loading: false,
      })
      onSuccess("OK");
    } catch (error) {
      message.error("Xảy ra lỗi, vui lòng thử lại");
      onError("Error cmnr =)))");
    }
  };

  handleRemove = (e) => {
    this.props.removeImage(e.url)
  }

  render() {
    const { previewVisible, previewImage } = this.state;
    const {image} = this.props;
    let fileList =[];
    if(image) {
      fileList = [{
        url: image,
        status: 'done',
        uid: "1",
      }]
    }

    const uploadButton = (
      <div>
        <Button icon="plus" loading={this.state.loading} className="buttonUpload">
          Upload
        </Button>
      </div>
    );
    return (
      <EventImageWrapper>
        <Upload
          listType="picture"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleOnChange}
          customRequest={this.handleUpload}
          onRemove={this.handleRemove}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} width="60%" footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </EventImageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  image: state.event.eventImage,
  loading: state.event.loading,
});

const mapDispatchToProps = dispatch => ({
  uploadImageSuccess: fileUrl => {
    dispatch(uploadImageSuccessAction(fileUrl, "create"));
  },

  removeImage: url => {
    dispatch(removeImageAction(url));
  },

});
export default connect(mapStateToProps, mapDispatchToProps)(EventImage);
