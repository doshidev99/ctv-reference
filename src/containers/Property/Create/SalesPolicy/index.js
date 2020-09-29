import React, { Component } from "react";
import {
  Upload,
  Button,
  message,
  Form,
  Input,
  DatePicker,
  Col,
  Row,
} from "antd";
import { connect } from "react-redux";
import SalesPolicyWrapper from "./styles";
import { getSignedUrlS3, uploadFile } from "../../../../utils/uploadFile";
import {
  addSalesPolicySuccessAction,
  uploadFileSuccessAction,
  removeSalesPolicyAction,
} from "../../../../redux/property/actions";

const FormItem = Form.Item;
class SalesPolicy extends Component {
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

  handleRemove = () => {
    this.props.removeSalesPolicy(this.props.id);
  };

  handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const result = await this.props.form.validateFields((err, val) => {
        if (err) {
          onError("Error cmnr =)))");
          return false;
        }
        return val;
      });

      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "SALES_POLICY",
      );
      const response = await uploadFile(file, signedUrlS3.url);
      this.props.uploadFileSuccess(response.url);
      const payload = {
        link: response.url,
        ...result,
      };
      this.props.addSalesPolicySuccess(this.props.id, payload);
      onSuccess("OK");
    } catch (error) {
      message.error("Xảy ra lỗi, vui lòng thử lại");
      onError("Error cmnr =)))");
    }
  };

  render() {
    return (
      <SalesPolicyWrapper>
        <Row>
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
                    <Input className="salesPolicyInput" placeholder="Tiêu đề" />
                  </div>,
                )}
              </FormItem>
            </div>
          </Col>
          <Col xs={8}>
            <div className="time">
              <FormItem>
                {this.props.form.getFieldDecorator(`updatedAt`, {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng chọn ngày",
                    },
                  ],
                })(<DatePicker placeholder="Thời điểm cập nhât" />)}
              </FormItem>
            </div>
          </Col>
          <Col xs={5}>
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
      </SalesPolicyWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  salesPolicies: state.property.salesPolicies,
  file: state.property.fileUrl,
});

const mapDispatchToProps = (dispatch) => ({
  uploadFileSuccess: (fileUrl) => {
    dispatch(uploadFileSuccessAction(fileUrl, "create"));
  },
  addSalesPolicySuccess: (id, payload) => {
    dispatch(addSalesPolicySuccessAction(id, payload));
  },
  removeSalesPolicy: (id) => {
    dispatch(removeSalesPolicyAction(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(SalesPolicy));
