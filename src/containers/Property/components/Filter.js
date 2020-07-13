import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";

// import moment from "moment";
import RestRow from "../../../components/RestLayout/RowLayout";
import ColLayout from "../../../components/RestLayout/ColLayout";
// import RestFormInput from "../../../components/RestInput/RestFormInput";
import RestSelect from "../../../components/RestInput/RestSelect";
import  {RestFormDateRangePicker} from "../../../components/RestInput/RestDateTimePicker";
// import { ADMIN_ROLES } from "../../../configs/constants";
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
    this.props.retrieveRefferences(
      "cities",
      initialFilter || { limit: 20, skip: 0, filter: {} },
      true,
    );
    this.props.retrieveRefferences(
      "property-types",
      initialFilter || { limit: 20, skip: 0, filter: {} },
      true,
    );
  }

  render() {
    const { citiesData, propertyTypesData } = this.props;
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
          {citiesData ? (
            <RestSelect
              source="cityId"
              valueProp="id"
              titleProp="name"
              placeholder="Thành phố"
              resourceData={citiesData.list}
            />
          ) : (
            null
          )}
        </ColLayout>
        <ColLayout elementProps={elementPropsCol}>
          {propertyTypesData ? (
            <RestSelect
              source="typeId"
              valueProp="id"
              titleProp="name"
              placeholder="Loại dự án"
              resourceData={propertyTypesData.list}
            />
          ) : (
            null
          )}
        </ColLayout>
        <ColLayout elementProps={elementPropsCol}>
          <RestFormDateRangePicker
            // source="createdAt.[$gte, $lte]"
            source="createdAt.$range"
          />
        </ColLayout>
      </RestRow>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    citiesData: getResources(state, "cities"),
    propertyTypesData: getResources(state, "property-types"),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    retrieveRefferences: (resource, filter, isRefresh) => {
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
