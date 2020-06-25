import React, { Component } from "react";
import { Upload, Table } from "antd";
import { connect } from "react-redux";
import TypeImageTableWrapper from "./styles";
import _ from 'lodash';
import Image from "./Image"
// import Floor from "./Floor";
import {
  loadTypeImageSuccessAction,
} from "../../../../redux/property/actions";
// import { handleXLSX } from "../../../../utils/uploadFile";

class TypeImageTable extends Component {
  columnHeaders = [
    {
      title: "Loại căn hộ",
      dataIndex:"type",
      key: "type",
    },
    {
      title: "ảnh",
      dataIndex: "Image",
      key: "image",
      render: (e, record) => {
        console.log(record);
        if (e === undefined) {
          return <Image image={record.linkImage}/>;
        }
        return "";
      },
    },
  ];

  data = [];

  render() {
    console.log('[this.props]', this.props);
    console.log(_.uniq(_.map(this.props.TypeImageTable,'type')));

    const result = _.uniq(_.map(this.props.TypeImageTable,'type'));
    const results = _.map(result, function(a) {return {type: a, linkImage: null}});
    console.log('[results]', results);

    this.props.loadTypeImageSuccess(results);
    return (
      <TypeImageTableWrapper>
        <Table
          columns={this.columnHeaders}
          className="TypeImage"
          dataSource={this.props.TypeImageTable}
          pagination
        />
      </TypeImageTableWrapper>
    );
  }
}

const mapStateToProps = state => ({
  TypeImageTable: state.property.productTable,
});

const mapDispatchToProps = dispatch => ({
  loadTypeImageSuccess: data => {
    dispatch(loadTypeImageSuccessAction(data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(TypeImageTable);
