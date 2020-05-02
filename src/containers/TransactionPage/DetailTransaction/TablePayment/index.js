// /* eslint-disable jsx-a11y/anchor-is-valid */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable max-classes-per-file */
// import React, { Component } from "react";
// import PropTypes from "prop-types";
// // import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import {
//   Table,
//   Popconfirm,
//   Form,
//   message,
//   Switch,
//   Row,
//   Col,
//   Pagination,
//   Button,
//   Modal,
//   Input,
//   Icon,
// } from "antd";

// import {
//   EditableCell,
//   EditableContext,
// } from "../../../../components/RestLayout/EditableLayout";
// import {
//   getTablePaymentAction,
//   // updateOnePropertyTypeAction,
//   // createOnePropertyTypeAction,
// } from "../../../../redux/transaction/actions";
// import Wrapper from "./styles";

// const { Item } = Form;
// class PaymentTable extends Component {
//   state = {
//     editingKey: "",
//     visible: false,
//   };

//   columnHeaders = [
//     {
//       title: "Thời gian",
//       dataIndex: "date",
//       key: "name",
//       editable: false,
//     },
//     {
//       title: "Số tiền",
//       dataIndex: "amount",
//       key: "amount",
//       editable: true,
//     },
//     {
//       title: "Trạng thái",
//       dataIndex: "isSent",
//       key: "isSent",
//       width: "20%",
//       editable: true,
//       render: (text, record) => {
//         const editable = this.isEditing(record);
//         return editable ? "" : <Switch checked={record.isSent} disabled />;
//       },
//     },
//     {
//       title: "Tình trạng",
//       dataIndex: "realtorReceived",
//       key:'realtorReceived',
//       editable: false,
//     },
//     {
//       title: "Tùy chọn",
//       width: "20%",
//       dataIndex: "operation",
//       render: (text, record) => {
//         const { editingKey } = this.state;
//         const editable = this.isEditing(record);
//         return editable ? (
//           <span>
//             <EditableContext.Consumer>
//               {form => (
//                 <a
//                   onClick={() => this.save(form, record.id)}
//                   style={{ marginRight: 8 }}
//                 >
//                   Lưu
//                 </a>
//               )}
//             </EditableContext.Consumer>
//             <Popconfirm
//               title="Sure to cancel?"
//               onConfirm={() => this.cancel(record.id)}
//             >
//               <a>Hủy bỏ</a>
//             </Popconfirm>
//           </span>
//         ) : (
//           <a disabled={editingKey !== ""} onClick={() => this.edit(record.id)}>
//             <Icon type="edit" />
//             Sửa
//           </a>
//         );
//       },
//     },
//   ];

//   orderBy = "-updatedAt";

//   fields = ["id", "amount", "isSend", "updatedAt", "realtorReceived", "type"];

//   componentDidMount() {
//     try {
//       this.props.getTablePayment(this.props.id)
//     } catch (error) {
//       message.error("Có lỗi xảy ra")
//     }
//   }

//   isEditing = record => record.key === this.state.editingKey;

//   cancel = () => {
//     this.setState({ editingKey: "" });
//   };

//   save = async (form, key) => {
//     try {
//       // const row = await form.validateFields();
//       // // await this.props.updateOnePropertyTypes(key, row);
//       // await this.props.getTablePayment(this.props.id);
//       this.setState({ editingKey: "" });
//     } catch (error) {
//       message.error("Có lỗi xảy ra");
//     }
//   };

//   edit = key => {
//     this.setState({ editingKey: key });
//   };

//   // onChangePage = (page, limit) => {
//   //   const offset = (page - 1) * limit;
//   //   this.props.getListPropertyTypes(
//   //     limit,
//   //     offset,
//   //     null,
//   //     this.orderBy,
//   //     JSON.stringify(this.fields),
//   //   );
//   // };

//   showModal = () => {
//     this.setState({
//       visible: true,
//     });
//   };

//   handleOk = async () => {
//    const {validateFields} = this.props.form;
//    try {
//      const payload = await validateFields();
//      await this.props.addPayment(payload);
//      this.props.getTablePayment(this.props.id)
//      this.setState({
//       visible: false,
//     });
//    } catch (error) {
//      message.error("Có lỗi xảy ra")
//      this.setState({
//       visible: false,
//     });
//    }
//   };

//   handleCancel = () => {
//     this.setState({
//       visible: false,
//     });
//   };

//   render() {
//     const {
//       payment,
//       listPaymentFailure,
//       isLoadingTable,
//     } = this.props;
//     const { getFieldDecorator } = this.props.form;
//     const components = {
//       body: {
//         cell: EditableCell,
//       },
//     };

//     const columnHeaders = this.columnHeaders.map(col => {
//       if (!col.editable) {
//         return col;
//       }
//       return {
//         ...col,
//         onCell: record => ({
//           record,
//           inputType: col.dataIndex === "isSent" ? "switch" : "text",
//           dataIndex: col.dataIndex,
//           title: col.title,
//           editing: this.isEditing(record),
//         }),
//       };
//     });
//     if (listPaymentFailure) {
//       return (
//         <Wrapper>
//           <Table
//             columns={this.columnHeaders}
//             dataSource={[]}
//             pagination={false}
//           />
//           <Row type="flex" justify="center">
//             <Col xs={24} sm={20} md={12} className="pagination">
//               <Pagination defaultCurrent={1} />
//             </Col>
//           </Row>
//         </Wrapper>
//       );
//     }
//     return (
//       <Wrapper>
//         <EditableContext.Provider value={this.props.form}>
//           <Row>
//             <Col xs={6} className="createButton">
//               <Button type="primary" icon="plus" onClick={this.showModal}>
//                 Thêm đợt tạm ứng
//               </Button>
//             </Col>
//             {/* <Col xs={18} className="pagination">
//               <Pagination
//                 showTotal={(totalItem, range) =>
//                   `${range[0]}-${range[1]} of ${totalItem} items`}
//                 onChange={this.onChangePage}
//                 defaultCurrent={1}
//                 current={page}
//                 total={total}
//                 pageSize={limit}
//               />
//             </Col> */}
//           </Row>
//           <Table
//             columns={columnHeaders}
//             dataSource={payment}
//             components={components}
//             pagination
//             loading={isLoadingTable}
//           />
//           <Modal
//             title="Thêm đợt thanh toán"
//             visible={this.state.visible}
//             onOk={this.handleOk}
//             onCancel={this.handleCancel}
//           >
//             <Form className="form-view">
//               <Item>
//                 <div
//                   className="title"
//                   style={{
//                     lineHeight: "initial",
//                   }}
//                 >
//                   <span>Số tiền</span>
//                 </div>
//                 {getFieldDecorator("amount", {
//                   rules: [
//                     {
//                       required: true,
//                       message: "Vui lòng điền số tiền",
//                     },
//                   ],
//                 })(<Input />)}
//               </Item>
//               <Item>
//                 <div
//                   className="title"
//                   style={{
//                     lineHeight: "initial",
//                   }}
//                 >
//                   <span>Đã gửi</span>
//                 </div>
//                 {getFieldDecorator("isSend", {
//                   valuePropName: "checked",
//                   initialValue:true,
//                 })(<Switch  />)}
//               </Item>
              
//             </Form>
//           </Modal>
//         </EditableContext.Provider>
//       </Wrapper>
//     );
//   }
// }

// PaymentTable.propTypes = {
//   payment: PropTypes.array,
//   listPaymentFailure: PropTypes.bool,
// };

// const mapStateToProps = state => {
//   const {
//     payment,
//     listPaymentFailure,
//     isLoadingTable,
//   } = state.transaction;
//   return {
//     payment,
//     listPaymentFailure,
//     isLoadingTable,
//   };
// };
// const mapDispatchToProps = dispatch => ({
//   // getListPropertyTypes: (limit, offset, filter, orderBy, fields) => {
//   //   dispatch(getListPropertyTypeAction(limit, offset, filter, orderBy, fields));
//   // },

//   // updateOnePropertyTypes: (id, payload) => {
//   //   dispatch(updateOnePropertyTypeAction(id, payload));
//   // },
//   // createOnePropertyTypes: (payload) => {
//   //   dispatch(createOnePropertyTypeAction(payload))
//   // },

//   getTablePayment: (id) => {
//     dispatch(getTablePaymentAction(id))
//   },
// });
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Form.create()(PaymentTable));


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'antd'
import Label from '../../../../components/RestField/Label';
import RestList from '../../../rest/List';
import ActionGroup from "../../../../components/RestActions/ActionGroup";
import EditButton from "../../../../components/RestActions/EditButton";

import Wrapper from './styles';

class PaymentTable extends Component {
  componentDidMount() {}

  render() {
    const apiUrl = `transactions/${this.props.id}/payments`
    return (
      <Wrapper>
        <RestList
          resource={apiUrl}
          initialFilter={{ limit: 10, skip: 0, filter: {} }}
          hasCreate={false}
          {...this.props}
        >
          <Label source="updatedAt" title="Time" />
          <Label
            source="amount"
            title="Amount" />
          <Label
            source="isSent"
            title="Đã gửi"
            render={record => <Switch checked={record.isSent} disabled />}
          />
          <Label
            source="realtorReceived"
            title="Tình trạng"
            render={record => record.realtorReceived === true ? 'Đã rút': 'Chưa rút'}
           />
          <ActionGroup>
            <EditButton resource="transaction-payments" record={record => record.id} />
          </ActionGroup>
        </RestList>
      </Wrapper>
    );
  }
}

PaymentTable.propTypes = {
  onChange: PropTypes.func,
};

export default PaymentTable;
