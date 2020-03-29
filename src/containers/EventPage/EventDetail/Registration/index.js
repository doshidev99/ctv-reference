import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Row, Col, Pagination, message } from "antd";
// import { Link } from "react-router-dom";
import Wrapper from "./styles";
import { getRegistrationsByEventAction } from "../../../../redux/event/actions";

class Registration extends Component {
  columnHeaders = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: "100px",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  orderBy = "id";

  fields = ["id"];

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getRegistrationsInfo(
      id,
      5,
      0,
      null,
      this.orderBy,
      JSON.stringify(this.fields),
    );
  }

  onChangePage = (page, limit) => {
    const offset = (page - 1) * limit;
    const { id } = this.props.match.params;
    this.props.getRegistrationsInfo(
      id,
      limit,
      offset,
      null,
      this.orderBy,
      JSON.stringify(this.fields),
    );
  };

  render() {
    const {
      registrations,
      offset, // offset = (page - 1) * limit;
      limit,
      total,
      loading,
      listEventFailure,
    } = this.props;
    const page = offset / limit + 1;
    if (listEventFailure) {
      message.error("Lỗi khi tải thông tin");
      return (
        <Wrapper>
          <div className="section-header">
            <span>Giao dịch</span>
          </div>
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
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        <div className="section-header">
          <span>Danh sách đăng kí</span>
        </div>
        <Table
          columns={this.columnHeaders}
          dataSource={registrations}
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
      </Wrapper>
    );
  }
}

//       <Wrapper>
//         <div className="section-header">
//           <span>Giao dich</span>
//         </div>
//         <Table columns={this.columnHeaders} />
//       </Wrapper>

const mapStateToProps = state => {
  const { registrations, total, limit, offset, loading } = state.event;
  return { registrations, total, limit, offset, loading };
};

const mapDispatchToProps = dispatch => ({
  getRegistrationsInfo: (id, limit, offset, filter, fields) => {
    dispatch(getRegistrationsByEventAction(id, limit, offset, filter, fields));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
