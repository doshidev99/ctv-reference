import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Tag } from "antd";
import { getListTransactionAction } from "../../../redux/transaction/actions";


const columns = [
  {
    title: "Thời gian",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Mã giao dịch",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Mã hợp đồng",
    dataIndex: "contract",
    key: "contract",
  },
  {
    title: "Dự án",
    dataIndex: "name",
    key: "name",
    width: 350,
    render: text => <Link to={text}>{text}</Link>,
  },
  {
    title: "Tên KH",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Tên CTV",
    dataIndex: "collaborator",
    key: "collaborator",
  },
  {
    title: 'Tình trạng',
    key: 'status',
    dataIndex: 'status',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? "geekblue" : "green";
          switch (tag.key) {
            case "done":
              color = "green";
              break;
            case "terminated":
              color ="volcano";
              break;
            case "postpond":
              color ="gold";
              break;
            default:
              color ="geekblue";
              break;
          }
          return (
            <Tag color={color} key={tag}>
              {tag.text.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
];



class TransactionTable extends Component {
  componentDidMount() {
    this.props.getListTransaction();
  }

  render() {
    // console.log(this.props.data);
    const result = this.props.data;
    const newDate = result.map(e => {
      return new Date(e.createdAt).toISOString().split('T')[0];
    });
    for (let i = 0; i < result.length; i+=1) {
      result[i].createdAt = newDate[i];
    }
    for (let i = 0; i < result.length; i+=1) {
      if (result[i].status === 0 ) {
        result[i].status = "Đang xử lý"
      }
      else if (result[i].status === 1 ) {
        result[i].status = "Đã cọc"
      }
      else if (result[i].status === 2 ) {
        result[i].status = "Hoàn Thành"
      }
      else if (result[i].status === 3 ) {
        result[i].status = "Hủy bỏ"
      }
      // result[i].status = newDate[i];
    }
    return (
      <div>
        {/* <Table columns={columns} dataSource={this.props.data} rowKey="date"/> */}
        <Table dataSource={this.props.data} colums={columns} rowKey="id">
          <columns title="Thời gian" dataIndex="createdAt" key="createdAt" />
          <columns title="Mã giao dịch" dataIndex="code" key="code" />
          <columns title="Mã hợp đồng" dataIndex="code" key="contract" />
          <columns title="Dự án" dataIndex="propertyName" key="name" />
          <columns title="Tên KH" dataIndex="customerId" key="customer" />
          <columns title="Tên CTV" dataIndex="realtorId" key="collaborator" />
          <columns title="Tình trạng" dataIndex="status" key="status" />
        </Table>
      </div>
    )
  }
}
TransactionTable.propTypes = {
  data: PropTypes.array,
};

const mapStateToProps = state => ({
  data: state.transaction.transactions,
})

const mapDispatchToProps = dispatch => ({
  getListTransaction: () => {
    dispatch(getListTransactionAction())
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(TransactionTable)