import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestFormInput from "../../../../../components/RestInput/RestFormInput";
import RestRow from "../../../../../components/RestLayout/RowLayout";
// import RestSwitch from "../../../../../components/RestField/Switch";
import RestSwitch from "../../../../../components/RestInput/RestSwitch"
import { retrieveOneRecord } from "../../../../../redux/rest/actions"

class PaymentEditForm extends Component {
  state={
    switchValue: undefined,
  }

  componentDidMount(){
    this.props.getTransaction(this.props.record.transactionId);
  }

  compareAmount = (rule, value, callback) => {
    const id = this.props.record.transactionId;
    const {actualCommissionAmount, withdrawnAmount} = this.props.transactions.list[id];
    const amount = actualCommissionAmount - withdrawnAmount;
    if (value && value > amount) {
      callback(`Số tiền cần nhập phải nhỏ hơn ${amount} VND `);
    }
    callback();
  };
  
  render() {
    // const { roleData } = this.props;
    return (
      <RestRow {...this.props}>
        <RestFormInput
          required
          source="amount"
          title="Số tiền (VND)"
          placeholder="Số tiền"
          requiredMessage="Vui lòng nhập số tiền (đơn vị VND)"
          rules={[{ validator: this.compareAmount }]}
          />
        <RestSwitch
          source="isSent"
          label="Trạng thái gửi:"
          icon="check"
        />
      </RestRow>
    );
  }
}

PaymentEditForm.propTypes = {
  form: PropTypes.object,
};

const mapStateToProps = state => {
  const {transactions} = state.rest;
  return {
    transactions,
  };
};

const mapDispatchToProps = dispatch => ({
  getTransaction: id => {
    dispatch(retrieveOneRecord('transactions',id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentEditForm);
