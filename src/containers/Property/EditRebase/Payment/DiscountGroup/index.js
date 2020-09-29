import React, { Component } from "react";
import { Row, Col, Button, message } from "antd";
import { connect } from "react-redux";
import Wrapper from "./styles";
import DiscountItem from "./DiscountItem";
import {
  addNewDiscountAction,
  removeDiscountAction,
  addNewDiscountSuccessAction,
  onChangeDiscountAction,
} from "../../../../../redux/property/actions";

class DiscountGroup extends Component {
  // Testing
  handleExpand2 = async () => {
    try {
      if (this.props.data.discounts.length === 0) {
        this.props.addNewDiscount(this.props.data.id);
      } else {
        const data = await this.props.form.validateFields();

        const { id, ...payload } = data;

        if (
          Number(data[`type_${id}`]) === 1 &&
          Number(data[`value_${id}`]) > 100
        ) {

          const temp = {};
          temp[`value_${id}`] = {
            value: data.value,
            errors: [new Error("Tỉ lệ ko được vượt quá 100%")],
          };

          await this.props.form.setFields(temp);
        } else {
          

          payload.groupId = this.props.data.id;
          await this.props.addNewDiscountSuccess(id, payload);

          await this.props.addNewDiscount(this.props.data.id);
        }
      }
    } catch (error) {
      

      message.error("Xuất hiện lỗi");
    }
  };
  // Testing

  handleExpand = () => {
    const mode = "payment";
    this.props.addNewDiscount(this.props.data.id, mode);
  };

  render() {
    const { data } = this.props;

    let discounts = [];
    if (data.discounts) {
      discounts = data.discounts.map((e) => (
        <Row key={e.id}>
          <Col xs={24}>
            <DiscountItem
              data={e}
              groupId={data.id}
              handleRemove={this.props.removeDiscount}
              // form={this.props.form}
              onChange={this.props.onChangeText}
            />
          </Col>
        </Row>
      ));
    }
    return (
      <Wrapper>
        <Row>
          <Col xs={24}>{discounts}</Col>
          <Col xs={4}>
            <Button type="primary" icon="plus" onClick={this.handleExpand}>
              Thêm chiết khấu
            </Button>
          </Col>
        </Row>
      </Wrapper>
    );
  }
}
// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  addNewDiscount: (groupId, mode) => {
    dispatch(addNewDiscountAction(groupId, mode));
  },
  removeDiscount: (id, groupId, mode='payment') => {
    dispatch(removeDiscountAction(id, groupId, mode));
  },
  addNewDiscountSuccess: (id, payload) => {
    dispatch(addNewDiscountSuccessAction(id, payload));
  },
  onChangeText: (id, payload, mode='payment') => {
    dispatch(onChangeDiscountAction(id, payload, mode));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(DiscountGroup);
