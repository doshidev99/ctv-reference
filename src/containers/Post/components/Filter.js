import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";

import RestRow from "../../../components/RestLayout/RowLayout";
import ColLayout from "../../../components/RestLayout/ColLayout";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import  {RestFormDateRangePicker} from "../../../components/RestInput/RestDateTimePicker";
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
    // const { roleData } = this.props;
    const elementPropsRow = { gutter: 10, align: "middle", justify: "start" };
    const elementPropsCol = {
      lg: 12,
      md: 12,
      sm: 12,
      xs: 24,
    };
    return (
      <RestRow {...this.props} elementProps={elementPropsRow}>
        <ColLayout elementProps={elementPropsCol}>
          <RestFormDateRangePicker
            // source="createdAt.[$gte, $lte]"
            source="createdAt.$range"
          />
        </ColLayout>
        <ColLayout elementProps={elementPropsCol}>
          <RestFormInput source="title.$ilike" placeholder="Tiêu đề" />
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
