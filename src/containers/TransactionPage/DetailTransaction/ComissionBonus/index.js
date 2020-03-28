import React, { Component } from "react";
import { Input, Button, Form, Row, Col } from "antd";
import { connect } from "react-redux";
import BonusWrapper from "./styles";
import {
  onChangeBonusAction,removeBonusAction,
} from "../../../../redux/transaction/actions";

const FormItem = Form.Item;

class Bonus extends Component {
  handleChange = async () => {
    const vals = await this.props.form.getFieldsValue();
    const {title, amount} = vals
    
    this.props.onChange(this.props.id, title, amount)
  };

  handleRemove = () => {
    this.props.handleRemove(this.props.id)
  }

  render() {
    return (
      <BonusWrapper>
        <Row>
          <Col span={10}>
            <FormItem className="formItem">
              {this.props.form.getFieldDecorator("title")(
                <div className="title">
                  <label>Tên khoảng thưởng:</label>
                  <Input onChange={this.handleChange}  />
                </div>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem>
              {this.props.form.getFieldDecorator("amount", {
                rules: [
                  // { type: 'number', message: 'Vui lòng nhập số tiền!' },
                ],
              })(
                <div className="amount">
                  <label>Số tiền</label>
                  <Input onChange={this.handleChange}  />
                </div>,
              )}
            </FormItem>
          </Col>
          <Col span={4}>
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
  onChange: (id, title, url) => {
    dispatch(onChangeBonusAction(id, title, url));
  },
  
 
});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Bonus));