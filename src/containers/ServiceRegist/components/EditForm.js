import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestFormDateTimePicker from "../../../components/RestInput/RestDateTimePicker";
import RestRow from "../../../components/RestLayout/RowLayout";

class ServiceRegistForm extends Component{
  componentDidMount(){}

  render() {
    return (
      <RestRow {...this.props}>
        <RestFormDateTimePicker
          title="Thời gian đăng kí"
          source="happenAt"
        />
      </RestRow>
    );
  }
 
};
ServiceRegistForm.propTypes = {
  form: PropTypes.object,
};

export default connect()(ServiceRegistForm);
