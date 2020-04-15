import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestFormDateTimePicker from "../../../components/RestInput/RestDateTimePicker";
import RestSelect from "../../../components/RestInput/RestSelect";
import RestRow from "../../../components/RestLayout/RowLayout";
import {REGISTRATION_STATUS} from "../../../configs/constants";

class ServiceRegistForm extends Component{
  componentDidMount(){}

  render() {
    return (
      <RestRow {...this.props}>
        <RestFormDateTimePicker
          title="Thời gian đăng kí"
          source="happenAt"
        />
        {/* <RestSelect
          required
          header="Trạng thái đăng kí"
          source="status"
          valueProp="id"
          titleProp="text"
          resourceData={REGISTRATION_STATUS}
        /> */}
      </RestRow>
    );
  }
 
};

// const mapStateToProps = (state) => {
//   return {
//     roleData: retrieveOneRecord(state, "roles"),
//   };
// };
ServiceRegistForm.propTypes = {
  form: PropTypes.object,
};

export default connect()(ServiceRegistForm);
