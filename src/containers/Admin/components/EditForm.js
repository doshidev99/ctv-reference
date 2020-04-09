import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import RestRow from "../../../components/RestLayout/RowLayout";
import RestSelect from "../../../components/RestInput/RestSelect";
// import { ADMIN_ROLES } from "../../../configs/constants";
import { getResources } from "../../../redux/rest/selectors";

class AdminForm extends Component{
  componentDidMount(){}

  render() {
    const { roleData } = this.props;
    return (
      <RestRow {...this.props}>
        <RestFormInput
          required
          disabled
          source="fullName"
          title="Họ và tên"
          placeholder="Họ và tên"
          requiredMessage="Please input fullname"
      />
        {roleData ? (
          <RestSelect
            required
            header="Quyền quản trị"
            source="roleId"
            valueProp="id"
            titleProp="name"
            placeholder="Vai trò"
            defaultValue={roleData.list[1].id}
            resourceData={roleData.list}
        />
      ) : (
       null
      )}
      </RestRow>
    );
  }
 
};

const mapStateToProps = (state) => {
  return {
    roleData: getResources(state, "roles"),
  };
};

AdminForm.propTypes = {
  form: PropTypes.object,
};

export default connect(mapStateToProps, {})(AdminForm);
