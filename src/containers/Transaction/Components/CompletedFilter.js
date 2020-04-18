import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";

// import moment from "moment";
import RestRow from "../../../components/RestLayout/RowLayout";
import ColLayout from "../../../components/RestLayout/ColLayout";
// import RestFormInput from "../../../components/RestInput/RestFormInput";
import RestSelect from "../../../components/RestInput/RestSelect";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import  {RestFormDateRangePicker} from "../../../components/RestInput/RestDateTimePicker";
import { COMPLETED_STATUS } from "../../../configs/constants";
// import { getResources } from "../../../redux/rest/selectors";
import {
  retrieveList,
} from "../../../redux/rest/actions";

class Filter extends Component {
  componentDidMount(){}

  render() {
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
        <ColLayout elementProps={elementPropsCol}>
          <RestSelect
            source="transaction.status"
            // valueProp="id"
            // titleProp="titleProp"
            placeholder="Tình trạng"
            resourceData={COMPLETED_STATUS}
          />
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
