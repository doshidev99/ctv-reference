import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import RestFormInputNumber from "../../../components/RestInput/RestFormInputNumber";
import {RestFormDateTimePicker} from "../../../components/RestInput/RestDateTimePicker";
import RestSwitch from "../../../components/RestInput/RestSwitch";
import RestSelectMulti from "../../../components/RestInput/RestSelectMulti";
import RestEditor from "../../../components/RestInput/RestEditor";
// import RestAvatarInput from "../../../components/RestInput/RestAvatarInput";
import RestUpload from "../../../components/RestInput/RestUpload";
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
        <p style={{"marginTop": "1em"}}>Thời gian bắt đầu</p>
        <RestFormDateTimePicker
          source="beganAt"
        />
        <p style={{"marginTop": "1em"}}>Thời gian kết thúc</p>
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
        <RestFormInputNumber
          source="capacity"
          title="Số lượng tham gia"
          placeholder="vd: 100"
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
        <RestUpload
          source="mainImage.link"
          folderPrefix="EVENT_IMAGE"
          title="Ảnh sự kiện"
        />
        <RestEditor
          source="content"
          label="Nội dung"
        />
      </RestRow>
    );
  }

};
EventForm.propTypes = {
  form: PropTypes.object,
};

export default connect()(EventForm);
