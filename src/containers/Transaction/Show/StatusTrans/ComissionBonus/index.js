import React, { Component } from "react";
import { Input, Button, Form, Row, Col } from "antd";
import { connect } from "react-redux";
import BonusWrapper from "./styles";
import {
  onChangeBonusAction,removeBonusAction,
} from "../../../../../redux/transaction/actions";

const FormItem = Form.Item;

class Bonus extends Component {
  handleChange = async () => {
    const vals = await this.props.form.getFieldsValue();
    const {name, value} = vals
    
    this.props.onChange(this.props.id, name, value)
  };

  handleRemove = () => {
    this.props.handleRemove(this.props.id)
  }

  render() {
    return (
      <BonusWrapper>
        <Row className="formContainer">
          <Col span={14}>
            <FormItem className="formItem">
              {this.props.form.getFieldDecorator("name")(
                <div className="name">
                  <Input onChange={this.handleChange} placeholder="Tên khoảng thưởng" />
                </div>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem>
              {this.props.form.getFieldDecorator("value", {
                rules: [
                  // { type: 'number', message: 'Vui lòng nhập số tiền!' },
                ],
              })(
                <div className="value">
                  <Input onChange={this.handleChange} placeholder="Số tiền"  />
                </div>,
              )}
            </FormItem>
          </Col>
          <Col span={2}>
            <Button className="minusButton" icon="minus" type="dashed" shape="circle" onClick={this.handleRemove} />
          </Col>
        </Row>
      </BonusWrapper>
    )
  }
}

const mapStateToProps = state => ({
  bonus: state.transaction.bonus,
});

const mapDispatchToProps = dispatch => ({
  handleRemove: (id) => {
    dispatch(removeBonusAction(id));
  },
  onChange: (id, name, value) => {
    dispatch(onChangeBonusAction(id, name, value));
  },
  
 
});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Bonus));