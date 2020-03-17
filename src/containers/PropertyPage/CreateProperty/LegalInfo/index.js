import React, { Component } from "react";
import { Input, Button, Upload, message, Form } from "antd";
import { connect } from "react-redux";
import LegalInfoWrapper from "./styles";

import {
  uploadFileSuccessAction,
  addNewLegalInfoSuccessAction,
  removeOneLegalInfoAction,
} from "../../../../redux/property/actions";
import { getSignedUrlS3, uploadFile } from "../../../../utils/uploadFile";

const FormItem = Form.Item;

class LegalInfo extends Component {
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


  handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const title = await this.props.form.validateFields((err,val) => {
        if (err) {
          onError("Error cmnr =)))");
          return false;
        }
        return val
      });

      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "policyInformation",
      );
      uploadFile(file, signedUrlS3.url).then(response => {
        this.props.uploadFileSuccess(response.url);
        this.props.addNewLegalInfoSuccess(this.props.id, title.legalInfo, response.url);

        onSuccess("OK");
      });
    } catch (error) {
      onError("Error cmnr =)))");
    }
  };

  
  handleRemove = () => {
    this.props.handleRemoveLegalInfo(this.props.id)
  }

  render() {
    return (
      <LegalInfoWrapper>
        <div className="title">
          <FormItem>
            {this.props.form.getFieldDecorator("legalInfo", {
              rules: [
                {
                  required: true,
                  message: "Tiêu đề ko đc để trống",
                },
              ],
            })(
              <div>
                <Input className="legalInfo" placeholder="Tiêu đề" />
              </div>,
            )}
          </FormItem>
        </div>

        <div className="files">
          <Upload
            className="upload"
            onChange={this.handleOnChange}
            customRequest={this.handleUpload}
          >
            <Button shape="circle" icon="upload" />
          </Upload>
          <Button
            icon="minus"
            shape="circle"
            onClick={this.handleRemove}
          />
        </div>
      </LegalInfoWrapper>
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
  addNewLegalInfoSuccess: (id, title, url) => {
    dispatch(addNewLegalInfoSuccessAction(id, title, url));
  },
  handleRemoveLegalInfo: id => {
    dispatch(removeOneLegalInfoAction(id));
  },
 
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(LegalInfo));
