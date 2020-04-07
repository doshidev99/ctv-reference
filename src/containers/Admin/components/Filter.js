import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";

import RestRow from "../../../components/RestLayout/RowLayout";
import ColLayout from "../../../components/RestLayout/ColLayout";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import RestSelect from "../../../components/RestInput/RestSelect";
import { ADMIN_ROLES } from "../../../configs/constants";
import { getResources } from "../../../redux/rest/selectors";
import {
  retrieveList,
  // editRecord,
  // deleteRecord,
  // customQuery,
  // setCurrentDataShow,
  // exportExcelAction,
} from "../../../redux/rest/actions";

class Filter extends Component {
  constructor(props) {
    super(props);
    const initialFilter = { limit: 50, skip: 0, order: "id", filter: {} };
    this.props.retrieveRoles(
      "roles",
      initialFilter || { limit: 20, skip: 0, filter: {} },
      true,
    );
  }

  render() {
    const { roleData } = this.props;
    const elementPropsRow = { gutter: 10, align: "middle", justify: "start" };
    const elementPropsCol = {
      lg: 8,
      md: 8,
      sm: 8,
      xs: 24,
    };
    return (
      <RestRow {...this.props} elementProps={elementPropsRow}>
        <ColLayout elementProps={elementPropsCol}>
          <RestFormInput source="fullName.$ilike" placeholder="Họ và tên" />
        </ColLayout>
        <ColLayout elementProps={elementPropsCol}>
          <RestFormInput source="phone" placeholder="Số điện thoại" />
        </ColLayout>
        <ColLayout elementProps={elementPropsCol}>
          {roleData ? (
            <RestSelect
              source="roleId"
              valueProp="id"
              titleProp="name"
              placeholder="Vai trò"
              resourceData={roleData.list}
            />
          ) : (
            <RestSelect
              source="roleId"
              valueProp="id"
              titleProp="titleProp"
              placeholder="Vai trò"
              resourceData={ADMIN_ROLES}
            />
          )}
        </ColLayout>
      </RestRow>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    roleData: getResources(state, "roles"),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    retrieveRoles: (resource, filter, isRefresh) => {
      return dispatch(
        retrieveList(
          resource,
          {
            ...props.initialFilter,
            ...filter,
          },
          isRefresh,
        ),
      );
    },
  };
};
Filter.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
