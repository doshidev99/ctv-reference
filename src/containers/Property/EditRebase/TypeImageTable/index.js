import React, { Component } from "react";
import { Button, Table } from "antd";
import { connect } from "react-redux";
import TypeImageTableWrapper from "./styles";
import Image from "./Image"
import {
  loadTypeImageSuccessAction,
  updateSessionImageAction,
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
          return "Chưa tải ảnh lên!"
        }
        return <img src={e} alt="" />
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

  handleSubmit = async (e) => {
    e.preventDefault();
    const {id} = this.props.currentProperty;
    const payload = this.props.productTable;

    this.props.UpdateSessionImage(id, {
      sections: payload,
    });
  }

  render() {
    const buttonEdit =  (
      <div className="submitButton">
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          onClick={this.handleSubmit}
          // loading={createPropertyLoading}
          >
          {/* {createPropertyLoading ? "" : "Cập nhật thông tin"} */}
          Cập nhật thông tin
        </Button>
      </div>
    )
    return (
      <TypeImageTableWrapper>
        <Table
          columns={this.columnHeaders}
          className="TypeImage"
          dataSource={this.props.typeImageTable}
          pagination
        />
        {buttonEdit}
      </TypeImageTableWrapper>
    );
  }
}

const mapStateToProps = state => ({
  typeImageTable: state.property.typeImageTable,
  currentProperty: state.property.currentProperty,
  productTable: state.property.productTable,
});

const mapDispatchToProps = dispatch => ({
  loadTypeImageSuccess: data => {
    dispatch(loadTypeImageSuccessAction(data));
  },
  UpdateSessionImage: (id, payload) => {
    dispatch(updateSessionImageAction(id, payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(TypeImageTable);
