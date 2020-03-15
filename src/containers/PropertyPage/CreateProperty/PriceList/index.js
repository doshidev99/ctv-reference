import React, { Component } from 'react'
import { Upload, Button, message } from 'antd'
import PriceListWrapper from './styles'
import { getSignedUrlS3, uploadFile } from '../../../../utils/uploadFile';

export default class SalePolicy extends Component {
  handleOnChange = async info => {
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

  handleRemove = () => {
    console.log("Handle remove here");

  };

  handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "policyInformation",
      );

      uploadFile(file, signedUrlS3.url).then(response => {
        this.props.uploadFileSuccess(response.url);
        onSuccess("OK");
      });
    } catch (error) {
      onError("Error cmnr =)))");
    }
  };

  render() {
    return (
      <PriceListWrapper>
        <div className="title">
          <span>
            Bảng giá
          </span>
        </div>
        <div className="files">
          <Upload
            className="upload"
            onChange={this.handleOnChange}
            onRemove={this.handleRemove}
            customRequest={this.handleUpload}
            >
            <Button shape="circle" icon="upload" />
          </Upload>
        </div>
      </PriceListWrapper>
    )
  }
}
