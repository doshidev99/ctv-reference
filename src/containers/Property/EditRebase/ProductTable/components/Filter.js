import React, { Component } from "react";
import { connect } from "react-redux";

import RestRow from "../../../../../components/RestLayout/RowLayout";
import ColLayout from "../../../../../components/RestLayout/ColLayout";
import RestFormInput from "../../../../../components/RestInput/RestFormInput";

class Filter extends Component {
  componentDidMount(){}

  render() {
    // const { roleData } = this.props;
    const elementPropsRow = { gutter: 15, align: "middle", justify: "start" };
    const elementPropsCol = {
      lg: 6,
      md: 6,
      sm: 6,
      xs: 24,
    };
    // console.log('[this.props]', this.props.record.propertyId);
    const id = this.props.record.propertyId;
    return (
      <RestRow
        {...this.props}
        elementProps={elementPropsRow}
        >
        <ColLayout elementProps={elementPropsCol}>
          {/* <RestFormInput source="productCode.$ilike" placeholder="Mã sản phẩm" /> */}
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
        <ColLayout elementProps={elementPropsCol}>
          <RestFormInput source="propertyId" placeholder="Id dự án" defaultValue={id} disabled />
        </ColLayout>
      </RestRow>
    );
  }
}

Filter.propTypes = {};

export default connect()(Filter);
