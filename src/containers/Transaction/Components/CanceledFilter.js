import React, { Component } from "react";
import { connect } from "react-redux";
import RestRow from "../../../components/RestLayout/RowLayout";
import ColLayout from "../../../components/RestLayout/ColLayout";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import  {RestFormDateRangePicker} from "../../../components/RestInput/RestDateTimePicker";
import {
  retrieveList,
} from "../../../redux/rest/actions";

class Filter extends Component {
  componentDidMount(){}

  render() {
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
          <RestFormDateRangePicker
            // source="createdAt.[$gte, $lte]"
            source="createdAt.$range"
          />
        </ColLayout>
        <ColLayout elementProps={elementPropsCol}>
          <RestFormInput source="code.$ilike" placeholder="Mã giao dich" />
        </ColLayout>
        <ColLayout elementProps={elementPropsCol}>
          <RestFormInput source="realtor.fullName.$ilike" placeholder="Tên CTV" />
        </ColLayout>
      </RestRow>
    );
  }
}

const mapStateToProps = () => {
  return {};
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
