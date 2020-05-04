import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import RestRow from "../../../components/RestLayout/RowLayout";
import ColLayout from "../../../components/RestLayout/ColLayout";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import RestSelectMulti from "../../../components/RestInput/RestSelectMulti";
import { EVENT_TAGS } from "../../../configs/constants";

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
          <RestFormInput source="name.$ilike" placeholder="Tên sự kiện" />
        </ColLayout>
        <ColLayout elementProps={elementPropsCol}>
          <RestSelectMulti
            source="tags.$containAll"
            valueProp="id"
            titleProp="name"
            placeholder="Tags"
            resourceData={EVENT_TAGS}
            />
        </ColLayout>
      </RestRow>
    );
  }
}

Filter.propTypes = {};

export default connect()(Filter);
