import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Row, Col, Pagination, message } from "antd";
import { Link } from "react-router-dom";
import Wrapper from "./styles";
import { getTransactionsByRealtorAction } from "../../../../redux/realtor/actions";

class Transaction extends Component {
  columnHeaders = [
    {
      title: "Mã giao dịch",
      dataIndex: "code",
      key: "code",
      width: 200,
      render: (e, record) => <Link to={`/transactions/${record.id}`}>{record.code}</Link>,
    },
    {
      title: "Mã sản phẩm",
      key: "productCode",
      dataIndex: "productCode",
    },
    {
      title: "Dự án",
      dataIndex: "propertyName",
      key: "propertyName",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Hoa hồng",
      dataIndex: "commission",
      key: "commission",
    },
  ];

  orderBy = "-updatedAt";

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getTransactionsInfo(id, 5, 0, null, this.orderBy);
  }

  onChangePage = (page, limit) => {
    const offset = (page - 1) * limit;
    const { id } = this.props.match.params;
    this.props.getTransactionsInfo(id, limit, offset, null, this.orderBy);
  };

  render() {
    const {
      transactions,
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
          <span>Giao dịch</span>
        </div>
        <Table
          columns={this.columnHeaders}
          dataSource={transactions}
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
  const { transactions, total, limit, offset, loading } = state.realtor;
  return { transactions, total, limit, offset, loading };
};

const mapDispatchToProps = dispatch => ({
  getTransactionsInfo: (id, limit, offset) => {
    dispatch(getTransactionsByRealtorAction(id, limit, offset));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
