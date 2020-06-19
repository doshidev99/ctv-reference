import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import RestRow from "../../../components/RestLayout/RowLayout";
import RestEditor from "../../../components/RestInput/RestEditor";
import RestSwitch from "../../../components/RestInput/RestSwitch";

class FAQsEditForm extends Component {
  state = {};

  componentDidMount(){

  }

  render() {
    return (
      <RestRow {...this.props}>
        <RestFormInput
          required
          source="title"
          title="Tiêu đề"
          placeholder="Tiêu đề"
          requiredMessage="Vui lòng nhập tiêu đề"
        />
        <RestEditor
          required
          source="content"
          label="Nội dung"
          requiredMessage="Vui lòng nhập nội dung"
        />
        <RestSwitch
          source="isVisible"
          title="Trạng thái"
        />
      </RestRow>
    );
  }
}

FAQsEditForm.propTypes = {
  form: PropTypes.object,
};

export default connect()(FAQsEditForm);
