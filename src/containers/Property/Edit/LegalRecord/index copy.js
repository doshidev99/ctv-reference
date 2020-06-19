import React, { Component } from "react";
import {
  Input,
  Button,
  Upload,
  message,
  Form,
  DatePicker,
  Row,
  Col,
} from "antd";
import { connect } from "react-redux";
import LegalRecordWrapper from "./styles";

import {
  uploadFileSuccessAction,
  addNewLegalRecordSuccessAction,
  removeOneLegalRecordAction,
} from "../../../../redux/property/actions";
import { getSignedUrlS3, uploadFile } from "../../../../utils/uploadFile";

const FormItem = Form.Item;

class LegalRecord extends Component {
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
      const values = await this.props.form.validateFields((err, val) => {
        if (err) {
          onError("Error cmnr =)))");
          return false;
        }
        return val;
      });

      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "LEGAL_RECORD",
      );
      const response = await uploadFile(file, signedUrlS3.url);
      this.props.uploadFileSuccess(response.url);
      const payload = {
        id: this.props.id,
        ...values,
        link: response.url,
        mimeType: file.type,
      };
      this.props.addLegalRecordSuccess(payload);
      onSuccess("OK");
    } catch (error) {
      message.error("Xảy ra lỗi, vui lòng thử lại");
      onError("Error cmnr =)))");
    }
  };

  handleRemove = () => {
    this.props.handleRemoveLegalRecord(this.props.id);
  };

  render() {
    const {idx} = this.props;
    const fileList = [];
    if (this.props.data && this.props.data.link) {
      fileList.push({
        uid: "1",
        status: "done",
        url: this.props.data.link,
        name: this.props.data.title,
      });
    }
    
    return (
      <LegalRecordWrapper>
        <Row gutter={[16]}>
          <Col xs={10}>
            <div className="title">
              <FormItem>
                <div>
                  {this.props.form.getFieldDecorator(`title[${idx}]`, {
                    rules: [
                      {
                        required: true,
                        message: "Tiêu đề ko đc để trống",
                      },
                    ],
                    initialValue: this.props.data && this.props.data.title,
                  })(
                    <Input
                      className="legalRecords"
                      placeholder="Tiêu đề"
                      // readOnly
                      readOnly={this.props.data.readOnly && !!this.props.data.readOnly}
                    />,
                  )}
                </div>
              </FormItem>
            </div>
          </Col>
          <Col xs={8}>
            <div>
              <FormItem>
                {this.props.form.getFieldDecorator(`updatedAt[${idx}]`, {
                  initialValue: this.props.data && this.props.data.updatedAt,
                })(<DatePicker placeholder="Thời điểm cập nhât" />)}
              </FormItem>
            </div>
          </Col>
          <Col xs={6}>
            <div className="files">
              <Upload
                className="upload"
                onChange={this.handleOnChange}
                customRequest={this.handleUpload}
                defaultFileList={fileList}
              >
                <Button shape="round" icon="upload" />
              </Upload>
              <Button icon="minus" shape="round" onClick={this.handleRemove} />
            </div>
          </Col>
        </Row>
      </LegalRecordWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  file: state.property.fileUrl,
});

const mapDispatchToProps = (dispatch) => ({
  uploadFileSuccess: (fileUrl) => {
    dispatch(uploadFileSuccessAction(fileUrl, "create"));
  },
  addLegalRecordSuccess: (payload) => {
    dispatch(addNewLegalRecordSuccessAction(payload));
  },
  handleRemoveLegalRecord: (id) => {
    dispatch(removeOneLegalRecordAction(id));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(LegalRecord));
