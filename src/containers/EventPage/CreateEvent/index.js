import React, { Component } from "react";
import { Input, Form, message, DatePicker, Row, Col, Button, Switch } from "antd";
import { connect } from "react-redux";
import Wrapper from "./styles";
import Editor from "../../../components/common/Editor/index";
import EventImage from "./EventImage";
import { createOneEventAction } from "../../../redux/event/actions";

const { Item } = Form;
class CreateEventForm extends Component {
  handleSubmit = async () => {
    try {
      const payload = await this.props.form.validateFields();
      payload.mainImage = {
        link: this.props.eventImage,
      };
      this.props.createEvent(payload);
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { createEventLoading } = this.props;
    return (
      <Wrapper>
        <Form>
          <Item>
            <div className="label">
              <span>Tên sự kiện</span>
            </div>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập tên sự kiện",
                },
              ],
            })(<Input />)}
          </Item>
          <Row gutter={8}>
            <Col xs={24} md={8}>
              <Item className="time">
                <div className="label">
                  <span>Thời gian</span>
                </div>
                {getFieldDecorator("happenAt", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng chọn ngày",
                    },
                  ],
                })(<DatePicker />)}
              </Item>
            </Col>
            <Col xs={20} lg={12}>
              <Item>
                <div className="label">
                  <span>Địa điểm</span>
                </div>
                {getFieldDecorator("locationDescription", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập địa điểm",
                    },
                  ],
                })(<Input />)}
              </Item>
            </Col>
            <Col xs={4}>
              <Item>
                <div className="label">
                  <span>Hiển thị</span>
                </div>
                {getFieldDecorator("isVisible", {
                  valuePropName: "checked",
                  initialValue: true,
                })(<Switch />)}
              </Item>
            </Col>
          </Row>
          <Item>
            <EventImage />
          </Item>
          <Item className="description">
            {getFieldDecorator("content", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập thông tin mô tả",
                },
              ],
            })(<Editor label="Mô tả sự kiên" />)}
          </Item>
          <div className="submitButton">
            <Button
              type="primary"
              onClick={this.handleSubmit}
              loading={createEventLoading}
            >
              {createEventLoading ? "" : "Thêm sự kiện"}
            </Button>
          </div>
        </Form>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  const { eventImage, createEventLoading } = state.event;
  return {
    eventImage,
    createEventLoading,
  };
};
const mapDispatchToProps = dispatch => ({
  createEvent: payload => {
    dispatch(createOneEventAction(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(CreateEventForm));
