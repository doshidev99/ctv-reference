import React, { Component } from "react";
import { Input, Button, Upload, message, Form } from "antd";
import { connect } from "react-redux";
import LegacyInfoWrapper from "./styles";

import { uploadFileSuccessAction } from "../../../../redux/property/actions";
import { getSignedUrlS3, uploadFile } from "../../../../utils/uploadFile";

const FormItem = Form.Item;

class LegacyInfo extends Component {
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
      <LegacyInfoWrapper>
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
                <label>Hồ sơ pháp lý</label>
                <Input
                  className="legacyInfo"
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
              customRequest={this.handleUpload}
            >
              <Button shape="circle" icon="upload" />
            </Upload>
          </div>
        </div>
        <div className="actionGroup">
          <Button type="primary" onClick={this.props.handleExpandLegacy}>
          Thêm
          </Button>
          <Button type="danger" onClick={this.props.handleRemoveLegacy}>
          Hủy
          </Button>
        </div>
      </LegacyInfoWrapper>
    );
  }
}

const mapStateToProps = state => ({
  file: state.property.fileUrl,
});

const mapDispatchToProps = dispatch => ({
  uploadFileSuccess: fileUrl => {
    dispatch(uploadFileSuccessAction(fileUrl, "create"));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(LegacyInfo);
