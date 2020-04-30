import React, { Component } from "react";
import PropTypes from "prop-types";
import RestFormInput from "../../../../../components/RestInput/RestFormInput";
import RestRow from "../../../../../components/RestLayout/RowLayout";
// import RestSwitch from "../../../../../components/RestField/Switch";
import RestSwitch from "../../../../../components/RestInput/RestSwitch"

class PaymentEditForm extends Component {
  state={
    switchValue: undefined,
  }

  componentDidMount() {}

  handeOnChange = (e) => {
    this.setState({
      switchValue: e,
    })
    
  }

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
          />
        {/* <RestSwitch 
          source="isSent"
          placeholder="Trạng thái gửi"
          value={this.state.switchValue}
          onChange={this.handeOnChange}
        /> */}
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

export default (PaymentEditForm);
