import React, { Component } from "react";
import { Input, Button, message, Form, Upload } from "antd";
import Scrollbar from "react-smooth-scrollbar";
import { connect } from "react-redux";
import MailComposerWrapper from "./styles";
import Editor from "../../../components/common/Editor";
import { getSignedUrlS3, uploadFile } from "../../../utils/uploadFile";
import {
  uploadFileSuccessAction,
  removeFileAction,
  sendMailAction,
} from "../../../redux/mail/actions";

const { Item } = Form;

class CreateMailForm extends Component {
  handleSubmit = async () => {
    this.props.form.validateFields((err, values) => {
      const attachmentLink = this.props.file ? this.props.file : "";
      values = {
        ...values,
        attachmentLink,
      };
      this.props.sendMail(values);
    });
  };

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
      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "mailAttachment",
      );
      uploadFile(file, signedUrlS3.url).then(response => {
        // this.props.uploadFileSuccess(response.url);
        // this.props.addNewLegalRecordSuccess(this.props.id, title.legalRecords, response.url);
        this.props.uploadFileSuccess(response.url);
        onSuccess("OK");
      });
    } catch (error) {
      onError("Error cmnr =)))");
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;

    return (
      <Scrollbar className="singleMailScroll" continuousScrolling>
        <MailComposerWrapper>
          <Item>
            {getFieldDecorator("recipient", {
              initialValue: "",
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập email người nhận",
                },
              ],
            })(<Input placeholder="To" className="inputBox" />)}
          </Item>
          {/* <Item>
            {getFieldDecorator("CC")(
              <Input placeholder="CC" className="inputBox" />,
            )}
          </Item> */}
          <Item>
            {getFieldDecorator("title", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập tiêu đề mail",
                },
              ],
            })(<Input placeholder="Subject" className="inputBox" />)}
          </Item>
          <Item>
            {getFieldDecorator("content", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập nội dung mail",
                },
              ],
            })(<Editor placeholder="Write something" className="mailEditor" />)}
          </Item>
          <Item>
            <Upload
              className="upload"
              onChange={this.handleOnChange}
              customRequest={this.handleUpload}
              onRemove={this.props.removeFileUpload}
            >
              <Button shape="circle" icon="upload" />
            </Upload>
          </Item>
          <div className="composeMailBtnWrapper">
            <Button
              type="primary"
              onClick={this.handleSubmit}
              className="sendMailBtn"
              loading={loading}
            >
              {loading ? "Sending" : "Send"}
            </Button>
          </div>
        </MailComposerWrapper>
      </Scrollbar>
    );
  }
}

const mapStateToProps = state => {
  const { fileUrl, sendMailLoading } = state.mail;
  return {
    file: fileUrl,
    loading: sendMailLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  uploadFileSuccess: fileUrl => {
    dispatch(uploadFileSuccessAction(fileUrl));
  },

  removeFileUpload: () => {
    dispatch(removeFileAction());
  },

  sendMail: payload => {
    dispatch(sendMailAction(payload));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(CreateMailForm));
