import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import RestFormDateTimePicker from "../../../components/RestInput/RestDateTimePicker";
import RestSwitch from "../../../components/RestInput/RestSwitch";
import RestSelectMulti from "../../../components/RestInput/RestSelectMulti";
// import RestAvatarInput from "../../../components/RestInput/RestAvatarInput";
import RestRow from "../../../components/RestLayout/RowLayout";

import { EVENT_TAGS } from "../../../configs/constants";

class EventForm extends Component{
  componentDidMount(){}

  render() {
    return (
      <RestRow {...this.props}>
        <RestFormInput
          required
          source="name"
          title="Tên sự kiện"
          placeholder="Tên sự kiện"
          requiredMessage="Vui lòng nhập tên sự kiện"
        />
        <p style={{"margin-top": "1em"}}>Thời gian bắt đầu</p>
        <RestFormDateTimePicker
          source="beganAt"
        />
        <p style={{"margin-top": "1em"}}>Thời gian kết thúc</p>
        <RestFormDateTimePicker
          source="endedAt"
        />
        <RestFormInput
          required
          source="locationDescription"
          title="Địa điểm"
          placeholder="Địa điểm"
          requiredMessage="Vui lòng nhập địa điểm tổ chức"
        />
        <RestFormInput
          source="capacity"
          title="Số lượng tham gia"
          placeholder="Số lượng tham gia"
        />
        <RestSwitch
          source="isVisible"
          title="Trạng thái"
        />
        <RestSelectMulti
          source="tags"
          title="Tags"
          valueProp="id"
          titleProp="name"
          resourceData={EVENT_TAGS}
        />
        {/* <RestAvatarInput 
          source="mainImage.link"
        /> */}
      </RestRow>
    );
  }
 
};
EventForm.propTypes = {
  form: PropTypes.object,
};

export default connect()(EventForm);
