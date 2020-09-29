import React, { Component } from 'react'
import { Upload, Button, message } from 'antd'
import { connect } from "react-redux";
import AttachmentFileWrapper from './styles'
import { getSignedUrlS3, uploadFile } from '../../../../utils/uploadFile';
import {uploadFileSuccessAction, removeFileAction  } from "../../../../redux/training/actions";

class AttachmentFile extends Component {
  handleOnChange = async info => {
    if (info.file.status !== "uploading") {
      
    }
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

  handleRemove = () => {
    this.props.removeFile()
  };

  handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "TRAINING_VIDEO",
      );
      const response = await uploadFile(file, signedUrlS3.url);
      this.props.uploadFileSuccess(response.url);
      onSuccess("OK");
    } catch (error) {
      message.error("Xảy ra lỗi, vui lòng thử lại");
      onError("Error cmnr =)))");
    }
  };

  render() {
    let files = [];
    if(this.props.file) {
      files = [{
        uid: 1,
        name: this.props.file,
        url: this.props.file,
        status: 'done',
      }]
    }
    return (
      <AttachmentFileWrapper>
        <div className="title">
          <span>
            File đính kèm
          </span>
        </div>
        <div className="files">
          <Upload
            className="upload"
            onChange={this.handleOnChange}
            onRemove={this.handleRemove}
            fileList={files}
            customRequest={this.handleUpload}
            >
            <Button shape="circle" icon="upload" />
          </Upload>
        </div>
      </AttachmentFileWrapper>
    )
  }
}


const mapStateToProps = state => ({
  file: state.training.fileUrl,
})

const mapDispatchToProps = dispatch => ({
  uploadFileSuccess: fileUrl => {
    dispatch(uploadFileSuccessAction(fileUrl, "create"));
  },
  removeFile: () => {
    dispatch(removeFileAction());
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(AttachmentFile);
