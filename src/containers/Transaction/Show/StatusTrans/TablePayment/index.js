// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import moment from 'moment';
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { Table, Pagination, Row, Col, message, Popconfirm, Switch, Icon } from "antd";
// // import { getListEventAction, updateOneEventAction } from "../../../redux/event/actions";
// import TableWrapper from "./styles";

// class PaymentTable extends Component{
//   columnHeaders = [
//     {
//       title: "Thời gian",
//       dataIndex: "createdAt",
//       key: "createdAt",
//       render: (value) => moment(value).format('DD-MM-YYYY HH:mm')
//     },
//     {
//       title: "Số tiền",
//       dataIndex: "amount",
//       key: "amount",
//     },
//     {
//       title: "Trạng thái",
//       dataIndex: "isSent",
//       key: "isSent",
//       render: (value) => (<Switch checked={value} disabled />)
//     },
//     {
//       title: "Tùy chọn",
//       key: "option",
//       render: (e, record) => (
//         <div className="option">
//           <span className="btnOption">
//             <Icon type="edit" onClick={() => this.showModal(record.id)} />
//           </span>
//         </div>
//       ),
//     },
//   ];

//   orderBy = "-createdAt";

//   fields = ["id", "amount", "isSend", "createdAt"];

//   componentDidMount() {
//     try {
//       this.props.getTablePayment(this.props.id)
//     } catch (error) {
//       message.error("Có lỗi xảy ra")
//     }
//   }

//   render() {
//     const {
//       getFieldDecorator,
//     } = this.props.form

//     return (
//       <TableWrapper>
//         <Table
//           columns={this.columnHeaders}
//           dataSource={partners}
//           loading={loading}
//           pagination={false}
//         />
//         <Row type="flex" justify="center">
//           <Col xs={24} sm={20} md={12} className="pagination">
//             <Pagination
//               showTotal={(totalItem, range) =>
//                 `${range[0]}-${range[1]} of ${totalItem} items`}
//               onChange={this.onChangePage}
//               defaultCurrent={1}
//               current={page}
//               total={total}
//               pageSize={limit}
//             />
//           </Col>
//           {/* <Modal
//             title="Thêm partner"
//             visible={this.state.visible}
//             onOk={this.handleOk}
//             onCancel={this.handleCancel}
//           >
//             {userInfo}
//           </Modal> */}
//         </Row>
//       </TableWrapper>
//     )

//   }
// }

// PaymentTable.propTypes = {
//   payments: PropTypes.array,
//   offset: PropTypes.number, // offset = (page - 1) * limit;
//   limit: PropTypes.number,
//   total: PropTypes.number,
//   loading: PropTypes.bool,
// };

// const mapStateToProps = state => {
//   const {
//     events,
//     offset, // offset = (page - 1) * limit;
//     limit,
//     total,
//     loading,
//     listEventFailure,
//   } = state.event;
//   return {
//     events,
//     offset, // offset = (page - 1) * limit;
//     limit,
//     total,
//     loading,
//     listEventFailure,
//   };
// };
// const mapDispatchToProps = dispatch => ({
//   getListEvent: (limit, offset, filter,  orderBy, fields) => {
//     dispatch(getListEventAction(limit, offset, filter, orderBy, fields));
//   },
//   updateEvent: (id, payload) => {
//     dispatch(updateOneEventAction(id, payload));
//   },

// });
// export default connect(mapStateToProps, mapDispatchToProps)(PaymentTable);

