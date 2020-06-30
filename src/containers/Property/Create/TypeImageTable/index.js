import React, { Component } from "react";
import { Table } from "antd";
import { connect } from "react-redux";
import TypeImageTableWrapper from "./styles";
import Image from "./Image"
import {
  loadTypeImageSuccessAction,
} from "../../../../redux/property/actions";

class TypeImageTable extends Component {
  state = {
    editingKey: "",
    visible: false,
  };

  columnHeaders = [
    {
      title: "Loại căn hộ",
      dataIndex:"type",
      key: "type",
      width: '10%',
    },
    {
      title: "Ảnh",
      dataIndex: "linkImage",
      key: "linkImage",
      render: (e) => {
        if (e === null){
          return "Chưa tải ảnh lên!!!"
        }
        return <img src={e} alt="Apartment type" width="100" height="80" />
      },
    },
    {
      title: "Option",
      render: (record) => {
        return <Image data={record.type} />;
      },
    },
  ];

  data = [];

  render() {
    return (
      <TypeImageTableWrapper>
        <Table
          columns={this.columnHeaders}
          className="TypeImage"
          dataSource={this.props.typeImageTable}
          pagination
        />
      </TypeImageTableWrapper>
    );
  }
}

const mapStateToProps = state => ({
  typeImageTable: state.property.typeImageTable,
});

const mapDispatchToProps = dispatch => ({
  loadTypeImageSuccess: data => {
    dispatch(loadTypeImageSuccessAction(data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(TypeImageTable);
