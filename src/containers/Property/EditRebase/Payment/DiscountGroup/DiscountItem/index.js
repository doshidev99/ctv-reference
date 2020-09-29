import React, { Component } from "react";
import {
  Input,
  Button,
  Form,
  message,
  InputNumber,
  DatePicker,
  Row,
  Col,
  Select,
} from "antd";
// import DateRangePicker from "../../../../../../components/form/FormDateRangePicker";
import Wrapper from "./styles";

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
class DiscountItem extends Component {
  state = {
    name: null,
    value: null,
    type: (this.props.data && this.props.data.type) || 1,
    time: null,
  };

  handleChange2 = async () => {
    try {
      const payload = await this.props.form.getFieldsValue();
      payload.groupId = this.props.groupId;
      // các giá trị bị chậm 1 kí tự
      this.props.onChange(this.props.data.id, payload);
    } catch (error) {
      
      message.error("Có lỗi xảy ra");
    }
  };

  handleChangeEvent = async (e) => {
    try {
      await this.setState({
        [e.target.name]: e.target.value,
      });

      const payload = {
        groupId: this.props.groupId,
        ...this.state,
      };
      this.props.onChange(this.props.data.id, payload);
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  handleChangeValue = async (value) => {
    try {
      if (typeof value === typeof []) {
        await this.setState({
          time: value,
        });
      } else if (Number(this.state.type) === 1 && value > 100) {
        await this.props.form.setFields({
          value: {
            value: this.state.value,
            errors: [new Error("Tỉ lệ ko được vượt quá 100%")],
          },
        });
      } else {
        await this.setState({
          value,
        });
      }
      const payload = {
        groupId: this.props.groupId,
        ...this.state,
      };
      this.props.onChange(this.props.data.id, payload);
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  handleRemove = () => {
    this.props.handleRemove(this.props.data.id, this.props.groupId);
  };

  onChangeSelect = async (type) => {
    if (Number(type) === 1 && this.state.value > 100) {
      await this.props.form.setFields({
        value: {
          value: this.state.value,
          errors: [new Error("Tỉ lệ ko được vượt quá 100%")],
        },
      });
    } else {
      await this.setState({
        type: Number(type),
      });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // const {data} = this.props
    return (
      <Wrapper>
        <Row gutter={16} type="flex" justify="space-around">
          {/* {getFieldDecorator("id",{
            initialValue: data.id,
          })(
            <Input type="hidden" />,
          )} */}
          <Col xs={9}>
            <FormItem className="formItem">
              <div className="title">
                {getFieldDecorator(`name`, {
                  rules: [
                    {
                      required: true,
                      message: "Tên không được trống",
                    },
                  ],
                  initialValue: this.props.data && this.props.data.name,

                })(
                  <Input
                    name="name"
                    placeholder="Tên chiết khấu"
                    onChange={this.handleChangeEvent}
                  />,
                )}
              </div>
            </FormItem>
          </Col>
          <Col xs={3}>
            <FormItem>
              <div className="value">
                {getFieldDecorator(`value`, {
                  rules: [
                    {
                      required: true,
                      message: "Giá trị không được trống",
                    },
                  ],
                  initialValue: this.props.data && this.props.data.value,
                })(
                  <InputNumber
                    placeholder="giá trị"
                    name="value"
                    min={0}
                    onChange={this.handleChangeValue}
                  />,
                )}
              </div>
            </FormItem>
          </Col>
          <Col xs={2}>
            <FormItem valuepropname="option">
              <div className="type">
                {getFieldDecorator(`type`, {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                  valuePropName: "option",
                  initialValue: this.state.type,
                })(
                  <Select
                    onChange={this.onChangeSelect}
                    defaultValue={this.state.type}
                  >
                    <Select.Option value={1}>%</Select.Option>
                    <Select.Option value={2}>VND</Select.Option>
                  </Select>,
                )}
              </div>
            </FormItem>
          </Col>
          <Col xs={8}>
            <FormItem>
              {getFieldDecorator(`time`, {
                initialValue: this.props.data && this.props.data.time,
              })(<RangePicker onChange={this.handleChangeValue} />)}
            </FormItem>
          </Col>
          <Col xs={2}>
            <Button icon="delete" onClick={this.handleRemove} />
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default Form.create()(DiscountItem);
