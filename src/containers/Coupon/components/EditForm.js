import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import {RestFormDateTimePicker} from "../../../components/RestInput/RestDateTimePicker";
import RestSwitch from "../../../components/RestInput/RestSwitch";
import RestEditor from "../../../components/RestInput/RestEditor";
import RestUpload from "../../../components/RestInput/RestUpload";
import RestRow from "../../../components/RestLayout/RowLayout";

class CouponForm extends Component{
  componentDidMount(){}

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
        <RestUpload
          source="mainImage.link"
          folderPrefix="COUPON_IMAGE"
          title="Banner ưu đãi"
        />
        <RestEditor
          source="content"
          label="Nội dung"
        />
        <p style={{"marginTop": "1em"}}>Thời gian bắt đầu</p>
        <RestFormDateTimePicker
          source="beganAt"
        />
        <p style={{"marginTop": "1em"}}>Thời gian kết thúc</p>
        <RestFormDateTimePicker
          source="endedAt"
        />
        <RestSwitch
          source="isVisible"
          title="Trạng thái"
        />
      </RestRow>
    );
  }
 
};
CouponForm.propTypes = {
  form: PropTypes.object,
};

export default connect()(CouponForm);
