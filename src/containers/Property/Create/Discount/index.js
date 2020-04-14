import React, { Component } from "react";
import { Input, Button, Form, message, InputNumber } from "antd";
import { connect } from "react-redux";
import DiscountWrapper from "./styles";
import {
  // onChangeDiscountAction,
  removeDiscountAction,
} from "../../../../redux/property/actions";

const FormItem = Form.Item;
class Discount extends Component {
  handleChange = async () => {
    try {
      const vals = await this.props.form.getFieldsValue();

      const { name, proportion } = vals;
      // các giá trị bị chậm 1 kí tự
      this.props.onChange(this.props.id, name, proportion);
    } catch (error) {
      // console.log(error);
      message.error("Có lỗi xảy ra");
    }
  };

  handleRemove = () => {
    this.props.handleRemove(this.props.id);
  };

  render() {
    return (
      <DiscountWrapper>
        <FormItem className="formItem" style={{width: '75%'}}>
          {this.props.form.getFieldDecorator("name", {
            rules: [
              {
                required: false,
              },
            ],
          })(
            <div className="title">
              <Input name="name" placeholder="Tiêu đề" onChange={this.handleChange} />
            </div>,
          )}
        </FormItem>
        <FormItem>
          {this.props.form.getFieldDecorator(
            "proportion",
            {},
          )(
            <div className="proportion">
              <InputNumber
                placeholder="Tỷ lệ (%)"
                name="proportion"
                min={0}
                max={100}
                onChange={this.handleChange}
              />
            </div>,
          )}
        </FormItem>
        <Button icon="delete" onClick={this.handleRemove} />
      </DiscountWrapper>
    );
  }
}
const mapStateToProps = state => ({
  discounts: state.property.discounts,
});

const mapDispatchToProps = dispatch => ({
  handleRemove: id => {
    dispatch(removeDiscountAction(id));
  },
  // onChange: (id, name, value) => {
  //   dispatch(onChangeDiscountAction(id, name, value));
  // },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(Discount));
