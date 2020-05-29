import React, { Component } from "react";
import { Input,InputNumber, Form, message, DatePicker, Row, Col, Button, Switch, Select } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Wrapper from "./styles";
import Editor from "../../../components/common/Editor/index";
import EventImage from "./EventImage";
import { createOneEventAction } from "../../../redux/event/actions";
import { EVENT_TAGS } from '../../../configs/constants';

const { Item } = Form;
const { Option } = Select;
class CreateEventForm extends Component {
  handleSubmit = async () => {
    try {
      const payload = await this.props.form.validateFields();
      if( !this.props.eventImage) {
        message.error("Vui lòng thêm ảnh sự kiện")
      }
      else {
        payload.mainImage = {
          link: this.props.eventImage,
        };
        await this.props.createEvent(payload);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { createEventLoading, createEventSuccess } = this.props;
    if (createEventSuccess === true) {
      return <Redirect to="/events" />;
    }
    return (
      <Wrapper>
        <Form>
          <Item label="Tên sự kiện">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập tên sự kiện",
                },
              ],
            })(<Input placeholder="Tên sự kiện" />)}
          </Item>
          <Row gutter={8}>
            <Col span={6}>
              <Item className="time" label="Thời gian bắt đầu">
                {getFieldDecorator("beganAt", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng chọn ngày bắt đầu",
                    },
                  ],
                })(<DatePicker showTime />)}
              </Item>
            </Col>
            <Col span={6}>
              <Item className="time" label="Thời gian kết thúc">
                {getFieldDecorator("endedAt", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng chọn ngày kết thúc",
                    },
                  ],
                })(<DatePicker showTime />)}
              </Item>
            </Col>
            <Col span={12}>
              <Item label="Địa điểm">
                {getFieldDecorator("locationDescription", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập địa điểm",
                    },
                  ],
                })(<Input placeholder="Địa điểm" />)}
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Item label="Hiển thị">
                {getFieldDecorator("isVisible", {
                  valuePropName: "checked",
                  initialValue: true,
                })(<Switch />)}
              </Item>
            </Col>
            <Col span={6}>
              <Item label="Số lượng người">
                {getFieldDecorator("capacity", {
                  rules: [
                    {
                      type: "number",
                      message: "Vui lòng nhập số lượng",
                    },
                  ],
                })(<InputNumber step={1} />)}
              </Item>
            </Col>
            <Col span={12}>
              <Item label="Tags">
                {getFieldDecorator("tags", {
                      valuePropName: "option",
                      rules: [
                        // {
                        //   required: true,
                        //   message:
                        //     "Vui lòng chọn ít nhất 1 phương thức thanh toán",
                        // },
                      ],
                    })(
                      <Select mode="multiple">
                        {EVENT_TAGS &&
                          EVENT_TAGS.map((e) => (
                            <Option key={e.id} value={e.id}>
                              {e.name}
                            </Option>
                          ))}
                      </Select>,
                    )}
              </Item>
            </Col>
          </Row>
          
          <Item label="Hình ảnh sự kiện">
            {/* {getFieldDecorator("mainImage", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng chọn ảnh sự kiện",
                },
              ],
            })(<EventImage  />)} */}
            <EventImage  />
          </Item>
          <Item className="description" label="Mô tả sự kiên">
            {getFieldDecorator("content", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập thông tin mô tả",
                },
              ],
            })(<Editor  />)}
          </Item>
          {/* <hr style={{marginTop:'20px', marginBottom: '20px'}} /> */}
          <div className="submitButton">
            <Button
              type="primary"
              size="large"
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
  const { eventImage, createEventLoading, createEventSuccess } = state.event;
  return {
    eventImage,
    createEventLoading,
    createEventSuccess,
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
