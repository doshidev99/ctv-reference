import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Pagination, Row, Col, message } from "antd";
import { Link } from "react-router-dom";

import { getListRealtorAction } from "../../../redux/realtor/actions";
import RealtorTableWrapper from "./styles";

class RealtorTable extends Component {
  columnHeaders = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (e, record) => (
        <Link to={`/realtors/${record.id}`}>{record.id}</Link>
      ),
    },
    {
      title: "Họ và tên",
      key: "fullName",
      dataIndex: "fullName",
      render: (e, record) => (
        <Link to={`/realtors/${record.id}`}>{record.fullName}</Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
  ];

  orderBy = "id";

  componentDidMount() {
    this.props.getListRealtor(5, 0, null, this.orderBy);
  }

  handleDelete = e => {
    this.props.deleteOne(e.key);
    this.props.getListRealtor(
      this.props.limit,
      this.props.offset,
      null,
      this.orderBy,
    );
  };

  onChangePage = (page, limit) => {
    const offset = (page - 1) * limit;
    this.props.getListRealtor(limit, offset, null, this.orderBy);
  };

  render() {
    const {
      realtors,
      offset, // offset = (page - 1) * limit;
      limit,
      total,
      loading,
      listRealtorFailure,
    } = this.props;
    const page = offset / limit + 1;
    if (listRealtorFailure) {
      message.error("Lỗi khi tải thông tin");
      return (
        <RealtorTableWrapper>
          <Table
            columns={this.columnHeaders}
            dataSource={[]}
            pagination={false}
          />
          <Row type="flex" justify="center">
            <Col xs={24} sm={20} md={12} className="pagination">
              <Pagination defaultCurrent={1} />
            </Col>
          </Row>
        </RealtorTableWrapper>
      );
    }
    return (
      <RealtorTableWrapper>
        <Table
          columns={this.columnHeaders}
          dataSource={realtors}
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
      </RealtorTableWrapper>
    );
  }
}
RealtorTable.propTypes = {
  realtors: PropTypes.array,
  offset: PropTypes.number, // offset = (page - 1) * limit;
  limit: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
};

const mapStateToProps = state => {
  const {
    realtors,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    listRealtorFailure,
  } = state.realtor;
  return {
    realtors,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    listRealtorFailure,
  };
};
const mapDispatchToProps = dispatch => ({
  getListRealtor: (limit, offset, filter, orderBy) => {
    dispatch(getListRealtorAction(limit, offset, filter, orderBy));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(RealtorTable);
