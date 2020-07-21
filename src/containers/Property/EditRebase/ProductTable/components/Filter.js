import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";

import RestRow from "../../../../../components/RestLayout/RowLayout";
import ColLayout from "../../../../../components/RestLayout/ColLayout";
import RestFormInput from "../../../../../components/RestInput/RestFormInput";
import { getResources } from "../../../../../redux/rest/selectors";
import {
  retrieveList,
  // editRecord,
  // deleteRecord,
  // customQuery,
  // setCurrentDataShow,
  // exportExcelAction,
} from "../../../../../redux/rest/actions";

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
    // const { roleData } = this.props;
    const elementPropsRow = { gutter: 10, align: "middle", justify: "start" };
    const elementPropsCol = {
      lg: 6,
      md: 6,
      sm: 6,
      xs: 24,
    };
    return (
      <RestRow {...this.props} elementProps={elementPropsRow}>
        <ColLayout elementProps={elementPropsCol}>
          <RestFormInput source="productCode.$ilike" placeholder="Mã sản phẩm" />
        </ColLayout>
        <ColLayout elementProps={elementPropsCol}>
          <RestFormInput source="floor.$ilike" placeholder="Tầng" />
        </ColLayout>
        <ColLayout elementProps={elementPropsCol}>
          <RestFormInput source="code.$ilike" placeholder="Mã căn" />
        </ColLayout>
        <ColLayout elementProps={elementPropsCol}>
          <RestFormInput source="type.$ilike" placeholder="Loại căn hộ" />
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
