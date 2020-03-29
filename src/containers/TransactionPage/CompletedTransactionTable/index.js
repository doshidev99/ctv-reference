import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Pagination, Row, Col } from "antd";
import { getListTransactionAction } from "../../../redux/transaction/actions";
import TransactionTableWrapper from './style';

class TransactionTable extends Component {
  columnHeaders = [
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Mã giao dịch",
      dataIndex: "code",
      key: "code",
      render: (e, record) => (
        <Link to={`/transactions/${record.id}/show`}>{record.code}</Link>
      ),
    },
    {
      title: "Mã hợp đồng",
      dataIndex: "Contractcode",
      key: "contContractcoderact",
    },
    {
      title: "Dự án",
      dataIndex: "property.name",
      key: "property.name",
      width: 350,
    },
    {
      title: "Tên CTV",
      dataIndex: "realtorId",
      key: "realtorId",
    },
    {
      title: "Tên KH",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: 'Tình trạng',
      key: 'status',
      dataIndex: 'status',
    },
  ];

  filter = {
    status: {"$in": [3,4]},
  }

  componentDidMount() {
    this.props.getListTransaction(10, 0, this.filter);
  }

  onChangePage = (page, limit) => {
    const offset = (page - 1) * limit;
    this.props.getListTransaction(limit, offset, this.filter);
  };

  render() {
    const {
      transactions,
      offset,
      limit,
      total,
      loading,
    } = this.props;
    const page = offset / limit + 1;
    const result = this.props.transactions;
    const newDate = result.map(e => {
      return new Date(e.createdAt).toLocaleDateString();
    });
    for (let i = 0; i < result.length; i+=1) {
      result[i].createdAt = newDate[i];
    }
    for (let i = 0; i < result.length; i+=1) {
      if (result[i].status === 3 ) {
        result[i].status = "Thanh toán hoa hồng"
      }
      else if (result[i].status === 4 ) {
        result[i].status = "Đã hoàn thành"
      }
    }
    return (
      <TransactionTableWrapper>
        <Table
          columns={this.columnHeaders}
          dataSource={transactions}
          pagination={false}
          loading={loading}
          rowKey="code"
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
            />
          </Col>
        </Row>
      </TransactionTableWrapper>
    )
  }
}
TransactionTable.propTypes = {
  transactions: PropTypes.array,
  offset: PropTypes.number, // offset = (page - 1) * limit;
  limit: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
};

const mapStateToProps = state => {
  const {
    transactions,
    offset,
    limit,
    total,
    loading,
    listTransactionFailure,
  } = state.transaction;
  return {
    transactions,
    offset,
    limit,
    total,
    loading,
    listTransactionFailure,
  }
}

const mapDispatchToProps = dispatch => ({
  getListTransaction: (limit, offset, filter) => {
    dispatch(getListTransactionAction(limit, offset, filter))
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(TransactionTable)
