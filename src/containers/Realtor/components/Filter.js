import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";

import RestRow from "../../../components/RestLayout/RowLayout";
import ColLayout from "../../../components/RestLayout/ColLayout";
import RestFormInput from "../../../components/RestInput/RestFormInput";

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
          <RestFormInput source="fullName.$ilike" placeholder="Họ và tên" />
        </ColLayout>
        <ColLayout elementProps={elementPropsCol}>
          <RestFormInput source="phone" placeholder="Số điện thoại" />
        </ColLayout>
        <ColLayout elementProps={elementPropsCol}>
          <RestFormInput source="email" placeholder="Email" />
        </ColLayout>
      </RestRow>
    );
  }
}


Filter.propTypes = {};

export default connect()(Filter);
