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
        // console.log(data);

        const { id, ...payload } = data;
        // console.log(id);
        // console.log(payload);

        if (
          Number(data[`type_${id}`]) === 1 &&
          Number(data[`value_${id}`]) > 100
        ) {
          // console.log("error");

          const temp = {};
          temp[`value_${id}`] = {
            value: data.value,
            errors: [new Error("Tỉ lệ ko được vượt quá 100%")],
          };
          // console.log(temp);

          await this.props.form.setFields(temp);
        } else {
          // console.log("OK");
          // const { id, ...payload } = data;
          // console.log(payload);

          payload.groupId = this.props.data.id;
          await this.props.addNewDiscountSuccess(id, payload);
          // console.log(this.props.data);

          await this.props.addNewDiscount(this.props.data.id);
        }
      }
    } catch (error) {
      // console.log(error);

      message.error("Xuất hiện lỗi");
    }
  };
// Testing

  handleExpand = () => {
    this.props.addNewDiscount(this.props.data.id);
  }

  render() {
    const { data } = this.props;
    // console.log("ITEM>>", data);
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
  addNewDiscount: (groupId) => {
    dispatch(addNewDiscountAction(groupId));
  },
  removeDiscount: (id) => {
    dispatch(removeDiscountAction(id));
  },
  addNewDiscountSuccess: (id, payload) => {
    dispatch(addNewDiscountSuccessAction(id, payload));
  },
  onChangeText: (id, payload) => {
    dispatch(onChangeDiscountAction(id, payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(DiscountGroup);
