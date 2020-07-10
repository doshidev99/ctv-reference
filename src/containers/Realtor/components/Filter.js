import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";

import RestRow from "../../../components/RestLayout/RowLayout";
import ColLayout from "../../../components/RestLayout/ColLayout";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import RestSelect from "../../../components/RestInput/RestSelect";
import {DIGITAL_CONTRACT_STATUS} from "../../../configs/constants"
import  {RestFormDateRangePicker} from "../../../components/RestInput/RestDateTimePicker";

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
          <RestFormInput source="fullName.$ilike" placeholder="Họ và tên" />
        </ColLayout>
        <ColLayout elementProps={elementPropsCol}>
          <RestFormInput source="phone" placeholder="Số điện thoại" />
        </ColLayout>
        {/* <ColLayout  elementProps={elementPropsCol}>
          <RestFormInput source="email" placeholder="Email" />
        </ColLayout> */}
        <ColLayout  elementProps={elementPropsCol}>
          <RestSelect
            source="digitalContractStatus"
            valueProp="id"
            titleProp="text"
            placeholder="Hợp đồng điện tử"
            resourceData={DIGITAL_CONTRACT_STATUS}
            />
        </ColLayout>
        <ColLayout elementProps={elementPropsCol} class="rowDatePick">
          <RestFormDateRangePicker
            // source="createdAt.[$gte, $lte]"
            source="createdAt.$range"
          />
        </ColLayout>
      </RestRow>
    );
  }
}


Filter.propTypes = {};

export default connect()(Filter);
