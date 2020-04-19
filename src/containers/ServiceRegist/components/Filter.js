import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";

import RestRow from "../../../components/RestLayout/RowLayout";
import ColLayout from "../../../components/RestLayout/ColLayout";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import RestSelect from "../../../components/RestInput/RestSelect";
import { REGISTRATION_STATUS } from "../../../configs/constants";

class Filter extends Component {
  componentDidMount() {}

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
          <RestFormInput source="realtor.fullName.$ilike" placeholder="Họ và tên CTV" />
        </ColLayout>
        <ColLayout elementProps={elementPropsCol}>
          <RestFormInput source="transaction.code" placeholder="Mã giao dịch" />
        </ColLayout>
        <ColLayout elementProps={elementPropsCol}>
          <RestSelect
            source="status"
            valueProp="id"
            titleProp="text"
            placeholder="Trạng thái"
            resourceData={REGISTRATION_STATUS}
            />
        </ColLayout>
      </RestRow>
    );
  }
}
Filter.propTypes = {};

export default connect()(Filter);
