import React, { Component } from "react";
import { Input, Button, Form } from "antd";
import { connect } from "react-redux"
import DiscountWrapper from "./styles";
import {
  onChangeDiscountAction,removeDiscountAction,
} from "../../../../redux/property/actions";

const FormItem = Form.Item
class Discount extends Component {
  handleChange = async () => {
    const vals = await this.props.form.getFieldsValue();
    const {title, proportion} = vals
    
    this.props.onChange(this.props.id, title, proportion)
  };

  handleRemove = () => {
    this.props.handleRemove(this.props.id)
  }

  render() {
    return (
      <DiscountWrapper>
        <FormItem className="formItem">
          {this.props.form.getFieldDecorator("title")(
            <div className="title">
              <label>Tiêu đề</label>
              <Input onChange={this.handleChange}  />
            </div>,
        )}
        </FormItem>
        <FormItem>
          {this.props.form.getFieldDecorator("proportion", {
               
              })(
                <div className="proportion">
                  <label>Tỷ lệ (%)</label>
                  <Input onChange={this.handleChange}  />
                </div>,
              )}
        </FormItem>
        <Button icon="minus" shape="circle" onClick={this.handleRemove} />

       
      </DiscountWrapper>
    );
  }
}
const mapStateToProps = state => ({
  discounts: state.property.discounts,
});

const mapDispatchToProps = dispatch => ({
 
  handleRemove: (id) => {
    dispatch(removeDiscountAction(id));
  },
  onChange: (id, title, url) => {
    dispatch(onChangeDiscountAction(id, title, url));
  },
  
 
});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Discount));
