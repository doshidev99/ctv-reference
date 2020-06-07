import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import RestRow from "../../../components/RestLayout/RowLayout";
import RestUpload from "../../../components/RestInput/RestUpload";
import RestEditor from "../../../components/RestInput/RestEditor";
import RestSelect from "../../../components/RestInput/RestSelect";
import RestInputAdditon from "../../../components/RestInput/RestInputAddition";
import RestFormDatePicker from "../../../components/RestInput/RestDatePicker";
import RestSwitch from "../../../components/RestInput/RestSwitch";
import { getListPropertyAction } from "../../../redux/property/actions";

class PartnerEditForm extends Component {
  state = {};

  componentDidMount(){
    this.props.getListProperty()
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

PartnerEditForm.propTypes = {
  form: PropTypes.object,
};

const mapStateToProps = (state) => {
  const {properties} = state.property
  return {
    properties,
  };
};

const mapDispatchToProps = dispatch => ({
  getListProperty: () => {
    dispatch(getListPropertyAction(-1))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PartnerEditForm);
