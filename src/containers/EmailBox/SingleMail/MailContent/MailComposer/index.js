import React, { Component } from "react";
import { Input, Button, Form, message, Upload } from "antd";
import { connect } from "react-redux";
import MailComposerWrapper from "./styles";
import Editor from "../../../../../components/common/Editor";
import { getSignedUrlS3, uploadFile } from "../../../../../utils/uploadFile";
import {
  uploadFileSuccessAction,
  removeFileAction,
  sendMailAction,
} from "../../../../../redux/mail/actions";

const { Item } = Form;
class MailComposer extends Component {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      const attachments = this.props.files ? this.props.files : "";
      attachments.forEach(e => {
        delete e.id
      })
      values = {
        parentId:this.props.currentMail.id,
        ...values,
        attachments,
      };
      this.props.sendMail(values);
    });
  };

  handleOnChange = async (info) => {
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
        "MAIL_ATTACHMENT",
      );
      const response = await uploadFile(file, signedUrlS3.url);
      const payload = {
        name: file.name,
        mimeType: file.type,
        link: response.url,
      };
      this.props.uploadFileSuccess(payload);
      onSuccess("OK");
    } catch (error) {
      onError("Error cmnr =)))");
    }
  };

  handleRemove = (e) => {
    this.props.removeFileUpload(e.id)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { currentMail, loading, files } = this.props;
    let fileList = [...files] || []
    fileList = fileList.map((e, index)=> ({
      id: e.id,
      name: e.name,
      url: e.link,
      status: 'done',
      uid: index,
    }))
   
    return (
      <MailComposerWrapper>
        <Form>
          <Item>
            {getFieldDecorator("recipient", {
              initialValue: currentMail.email,
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập email người nhận",
                },
              ],
            })(
              <Input
                placeholder="To"
                className="inputBox"
                disabled
                // defaultValue={currentMail.email}
              />,
            )}
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
              fileList={fileList}
              className="upload"
              onChange={this.handleOnChange}
              customRequest={this.handleUpload}
              onRemove={this.handleRemove}
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
        </Form>
      </MailComposerWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { currentMail, fileUrl, sendMailLoading, files } = state.mail;
  return {
    currentMail,
    file: fileUrl,
    files,
    loading: sendMailLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  uploadFileSuccess: (payload) => {
    dispatch(uploadFileSuccessAction(payload));
  },

  removeFileUpload: (id) => {
    dispatch(removeFileAction(id));
  },

  sendMail: (payload) => {
    dispatch(sendMailAction(payload));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(MailComposer));
