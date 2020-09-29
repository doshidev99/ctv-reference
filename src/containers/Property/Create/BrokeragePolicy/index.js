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
import Wrapper from "./styles";

import {
  uploadFileSuccessAction,
  addNewBrokeragePolicySuccessAction,
  removeOneBrokeragePolicyAction,
} from "../../../../redux/property/actions";
import { getSignedUrlS3, uploadFile } from "../../../../utils/uploadFile";

const FormItem = Form.Item;

class BrokeragePolicy extends Component {
  handleOnChange = async (info) => {
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

  handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const values = await this.props.form.validateFields((err, val) => {
        if (err) {
          onError("Error");
          return false;
        }
        return val;
      });

      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "BROKERAGE_POLICY",
      );
      const response = await uploadFile(file, signedUrlS3.url);
      this.props.uploadFileSuccess(response.url);
      const payload = {
        id: this.props.id,
        ...values,
        link: response.url,
        mimeType: file.type,
      };
      
      this.props.addBrokeragePolicySuccess(payload);
      onSuccess("OK");
    } catch (error) {
      message.error("Xảy ra lỗi, vui lòng thử lại");
      onError("Error");
    }
  };

  handleRemove = () => {
    this.props.handleRemoveBrokeragePolicy(this.props.id);
  };

  render() {
    return (
      <Wrapper>
        <Row gutter={[16]}>
          <Col xs={10}>
            <div className="title">
              <FormItem>
                {this.props.form.getFieldDecorator("title", {
                  rules: [
                    {
                      required: true,
                      message: "Tiêu đề ko đc để trống",
                    },
                  ],
                })(
                  <div>
                    <Input placeholder="Tiêu đề" />
                  </div>,
                )}
              </FormItem>
            </div>
          </Col>
          <Col xs={8}>
            <div>
              <FormItem>
                {this.props.form.getFieldDecorator(
                  `updatedAt`,
                )(<DatePicker placeholder="Thời gian cập nhật" />)}
              </FormItem>
            </div>
          </Col>
          <Col xs={6}>
            <div className="files">
              <Upload
                className="upload"
                onChange={this.handleOnChange}
                customRequest={this.handleUpload}
              >
                <Button shape="round" icon="upload" />
              </Upload>
              <Button icon="minus" shape="round" onClick={this.handleRemove} />
            </div>
          </Col>
        </Row>
      </Wrapper>
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
  addBrokeragePolicySuccess: (payload) => {
    dispatch(addNewBrokeragePolicySuccessAction(payload));
  },
  handleRemoveBrokeragePolicy: (id) => {
    dispatch(removeOneBrokeragePolicyAction(id));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(BrokeragePolicy));
