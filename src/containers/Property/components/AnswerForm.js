import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import {RestFormDateTimePicker} from "../../../components/RestInput/RestDateTimePicker";
import RestRow from "../../../components/RestLayout/RowLayout";
import RestEditor from "../../../components/RestInput/RestEditor";
import RestSwitch from "../../../components/RestInput/RestSwitch";

class FAQsAnswerForm extends Component {
  componentDidMount(){

  }

  render() {
    const today = new Date();
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
        <RestFormInput
          required
          source="staffId"
          title="Ctv id"
          defaultValue={localStorage.getItem('id')}
          disabled
        />
        <p style={{"marginTop": "1em"}}>Thời gian trả lời</p>
        <RestFormDateTimePicker
          source="answerAt"
          defaultValue={today}
        />
        <RestSwitch
          source="isVisible"
          title="Trạng thái"
        />
      </RestRow>
    );
  }
}

FAQsAnswerForm.propTypes = {
  form: PropTypes.object,
};

export default connect()(FAQsAnswerForm);
