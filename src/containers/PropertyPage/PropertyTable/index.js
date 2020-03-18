import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Icon, Pagination, Row, Col, message } from "antd";
import { getListPropertyAction } from "../../../redux/property/actions";

import PropertyTableWrapper from "./styles";

const columnHeaders = [
  {
    title: "Tên dự án",
    dataIndex: "name",
    key: "name",
    width: 400,
    render: text => <Link to={text}>{text}</Link>,
  },
  {
    title: "Loại dự án",
    key: "type",
    dataIndex: "type",
  },
  {
    title: "Tỉnh thành",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Ngày đăng",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Tùy chọn",
    key: "option",
    render: () => (
      <div className="option">
        <span className="btnOption">
          <Icon type="edit" />
        </span>
        <span className="btnOption">
          <Icon type="delete" />
        </span>
      </div>
    ),
  },
];

class PropertyTable extends Component {
  componentDidMount() {
    this.props.getListProperty();
  }

  onChangePage = (page, limit) => {
    const offset = (page - 1) * limit;
    this.props.getListProperty(limit, offset);
  };

  render() {
    const {
      properties,
      offset, // offset = (page - 1) * limit;
      limit,
      total,
      loading,
      listPropertyFailure,
    } = this.props;
    const page = offset / limit + 1;
    if (listPropertyFailure) {
      message.error("Lỗi khi tải thông tin");
      return (
        <PropertyTableWrapper>
          <Table columns={columnHeaders} dataSource={[]} pagination={false} />
          <Row type="flex" justify="center">
            <Col xs={24} sm={20} md={12} className="pagination">
              <Pagination defaultCurrent={1} />
            </Col>
          </Row>
        </PropertyTableWrapper>
      );
    }
    return (
      <PropertyTableWrapper>
        <Table
          columns={columnHeaders}
          dataSource={properties}
          loading={loading}
          pagination={false}
        />
        <Row type="flex" justify="center">
          <Col xs={24} sm={20} md={12} className="pagination">
            <Pagination
              showTotal={(totalItem, range) => 
                `${range[0]}-${range[1]} of ${totalItem} items`}
              onChange={this.onChangePage}
              defaultCurrent={1}
              current={page}
              total={total}
              pageSize={limit}
            />
          </Col>
        </Row>
      </PropertyTableWrapper>
    );
  }
}
PropertyTable.propTypes = {
  properties: PropTypes.array,
  offset: PropTypes.number, // offset = (page - 1) * limit;
  limit: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
};

const mapStateToProps = state => {
  const {
    properties,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    listPropertyFailure,
  } = state.property;
  return {
    properties,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    listPropertyFailure,
  };
};

const mapDispatchToProps = dispatch => ({
  getListProperty: (limit, offset) => {
    dispatch(getListPropertyAction(limit, offset));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(PropertyTable);
