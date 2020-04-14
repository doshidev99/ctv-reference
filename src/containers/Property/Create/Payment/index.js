import React, { Component } from "react";
import {
  // Row,
  //  Col,
  // Button,
  Input,
  Tabs,
  Modal,
  Form,
} from "antd";
import { connect } from "react-redux";
import DiscountGroup from "./DiscountGroup";
import Wrapper from "./styles";
import {
  addNewPaymentMethodSuccessAction,
  removePaymentMethodAction,
} from "../../../../redux/property/actions";

class Payment extends Component {
  state = {
    showModal: false,
  };

  onEdit = (targetKey, action) => {
    if (action === "remove") {
      this.props.removePaymentMethod(targetKey);
    }
    if (action === "add") {
      this.setState({
        showModal: true,
      });
    }
  };

  handleOk = async () => {
    await this.setState({
      showModal: false,
    });
    const groupName = await this.props.form.getFieldValue("groupName");
    if (groupName) {
      this.props.addNewPaymentMethod(groupName);
    }
  };

  handleCancel = async () => {
    await this.props.form.resetFields(["groupName"]);
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { paymentMethods } = this.props;

    return (
      <Wrapper>
        <Tabs type="editable-card" onEdit={this.onEdit}>
          {paymentMethods.map((paymentItem) => {
            return (
              <Tabs.TabPane key={paymentItem.id} tab={paymentItem.name}>
                <DiscountGroup data={paymentItem} form={this.props.form} />
              </Tabs.TabPane>
            );
          })}
        </Tabs>
        <Modal
          title="Thêm phương thức thanh toán"
          visible={this.state.showModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {getFieldDecorator("groupName")(<Input />)}
        </Modal>
      </Wrapper>
    );
  }
}
const mapStateToProps = (state) => {
  const { paymentMethods } = state.property;
  return {
    paymentMethods,
  };
};
const mapDispatchToProps = (dispatch) => ({
  addNewPaymentMethod: (name) => {
    dispatch(addNewPaymentMethodSuccessAction(name));
  },
  removePaymentMethod: (id) => {
    dispatch(removePaymentMethodAction(id));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(Payment));
