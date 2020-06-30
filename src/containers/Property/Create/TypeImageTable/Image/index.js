import React, { Component } from 'react'
import { Upload, message, Button } from 'antd';
import { connect } from "react-redux";
import ImageWrapper from './styles'
import { uploadTypeImageSuccessAction, removeTypeImageAction } from "../../../../../redux/property/actions";
import { getSignedUrlS3, uploadFile } from "../../../../../utils/uploadFile";

class TypeImage extends Component {
  state = {
    // previewImage: '',
    loading: false,
  };

  handleOnChange = async info => {
    if (info.file.status !== "uploading") {
      // console.log("uploading ..........");
    }
    if (info.file.status === "done") {
      // console.log("[done]");
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
        "TYPE_IMAGE",
      );
      const response = await uploadFile(file, signedUrlS3.url);
      const Proptype = this.props.data;
      await this.props.uploadTypeImageSuccess(Proptype, response.url);
      this.setState({
        loading: false,
      })
      onSuccess("OK");
    } catch (error) {
      message.error("Xảy ra lỗi, vui lòng thử lại");
      onError("Error");
    }
  };

  handleRemove = (e) => {
    this.props.removeImage(e.url)
  }

  render() {
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
      <ImageWrapper>
        <Upload
          listType="picture"
          fileList={fileList}
          onChange={this.handleOnChange}
          customRequest={this.handleUpload}
          onRemove={this.handleRemove}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
      </ImageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  image: state.event.eventImage,
  loading: state.event.loading,
  // productTable: state.property.productTable,
});

const mapDispatchToProps = dispatch => ({
  // uploadTypeImageSuccess: (fileUrl) => {
  //   dispatch(uploadTypeImageSuccessAction(fileUrl, "create"));
  // },
  uploadTypeImageSuccess: (type, fileUrl) => {
    dispatch(uploadTypeImageSuccessAction(type, fileUrl));
  },

  removeImage: url => {
    dispatch(removeTypeImageAction(url));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(TypeImage);
