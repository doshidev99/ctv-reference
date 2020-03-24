import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Pagination, Row, Col } from "antd";
import { getListTransactionAction } from "../../../redux/transaction/actions";
import TransactionTableWrapper from './style';

class TransactionTable extends Component {
  filter = {
    status: 0,
  }

  componentDidMount() {
    this.props.getListTransaction(10, 0, this.filter);
  }

  onChangePage = (page, limit) => {
    const offset = (page - 1) * limit;
    this.props.getListTransaction(limit, offset, this.filter);
  };

  render() {
    // console.log(this.props.transaction);
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
    return (
      <TransactionTableWrapper>
        {/* <Table columns={columns} dataSource={this.props.data} rowKey="date"/> */}
        <Table dataSource={transactions} loading={loading} rowKey="id" pagination={false}>
          <columns title="Thời gian" dataIndex="createdAt" key="createdAt" />
          <columns title="Mã giao dịch" dataIndex="code" key="code" />
          <columns title="Loại giao dịch" dataIndex="type" key="type" />
          {/* <columns title="Mã hợp đồng" dataIndex="Contractcode" key="contract" /> */}
          <columns title="Dự án" dataIndex="property.name" key="name" />
          <columns title="Tên KH" dataIndex="customerId" key="customer" />
          <columns title="Tên CTV" dataIndex="realtorId" key="collaborator" />
          <columns title="Tình trạng" dataIndex="status" key="status" />
        </Table>
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
