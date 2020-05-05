import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import RestRow from "../../../components/RestLayout/RowLayout";
import ColLayout from "../../../components/RestLayout/ColLayout";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import RestSelect from "../../../components/RestInput/RestSelect";

class Filter extends Component {
  componentDidMount(){}

  render() {
    const elementPropsRow = { gutter: 10, align: "middle", justify: "start" };
    const elementPropsCol = {
      lg: 12,
      md: 12,
      sm: 12,
      xs: 24,
    };
    const STATUS = [
      {
        id: 0,
        name: "Không hiển thị",
      },
      {
        id: 1,
        name: "Hiển thị",
      },
    ]
    return (
      <RestRow {...this.props} elementProps={elementPropsRow}>
        <ColLayout elementProps={elementPropsCol}>
          <RestFormInput source="title.$ilike" placeholder="Tên ưu đãi" />
        </ColLayout>
        <ColLayout elementProps={elementPropsCol}>
          <RestSelect
            source="isVisible"
            valueProp="id"
            titleProp="name"
            placeholder="Trạng thái"
            resourceData={STATUS}
            />
        </ColLayout>
      </RestRow>
    );
  }
}

Filter.propTypes = {};

export default connect()(Filter);
