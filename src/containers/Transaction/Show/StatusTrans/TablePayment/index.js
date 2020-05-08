/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-classes-per-file */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Table,
  Form,
  message,
  Row,
  Col,
  Icon,
  Pagination,
  Button,
  Modal,
  Input,
  Switch,
} from "antd";
import {
  getTablePaymentAction,
  addPaymentAction,
  getOnePaymentAction,
  updateOnePaymentAction,
  getDetailTransactionAction,
} from "../../../../../redux/transaction/actions";
import Wrapper from "./styles";

const { Item } = Form;
class TransactionPaymentTable extends Component {
  state = {
    editingKey: "",
    visible: false,
    editVisible: false,
  };

  columnHeaders = [
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Trạng thái gửi",
      dataIndex: "isSent",
      key: "isSent",
      render: (value) => <Switch checked={value} disabled />,
    },
    {
      title: "Tùy chọn",
      width: "20%",
      dataIndex: "operation",
      render: (text, record) => (
        <div className="option">
          <a className="btnOption" onClick={() => this.showEditModal(record.key)}>
            <Icon type="edit"  />
            {' '}
            Sửa
          </a>
          
        </div>
      ),
    },
  ];

  orderBy = "-createdAt";

  fields = ["id", "createdAt", "amount", "isSent"];

  currentPage = 1;

  componentDidMount() {
    try {
      this.props.getListPayment(
        this.props.match.params.id,
        5,
        0,
        null,
        this.orderBy,
        JSON.stringify(this.fields),
      );
    } catch (error) {
      message.error("Có lỗi xảy ra")
    }
  }

  handleEditOk = async (id) => {
    const { validateFields } = this.props.form;
    try {
      const payload = await validateFields();
      await this.props.updateOnePayment(id, payload);
      this.handleCancel();
      if( this.props.transaction.actualCommissionAmount - this.props.transaction.withdrawnAmount <= 0 ) {
        await this.props.reloadStatus(this.props.match.params.id)
      }
      
    } catch (error) {
      message.error("Có lỗi xảy ra");
      this.setState({
        visible: false,
        editVisible: false,
      });
    }
  };

  onChangePage = (page, limit) => {
    const offset = (page - 1) * limit;
    this.props.getListPayment(
      this.props.match.params.id,
      limit,
      offset,
      null,
      this.orderBy,
      JSON.stringify(this.fields),
    );
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  showEditModal = async id => {
    await this.props.getOnePayment(id);
    this.setState({
      editVisible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      editVisible: false,
    });
  };

  handleSubmitCommission = e => {
    e.preventDefault();
    this.props.form.validateFields( async (err, values) => {
      if (!err) {
        // values.type = 1;
        await this.props.addPayment(this.props.match.params.id,values);
        this.handleCancel();
      }
    });
  }

  render() {
    const {
      payments,
      offset, // offset = (page - 1) * limit;
      limit,
      total,
      loading,
      listPaymentFailure,
      isLoadingTable,
      currentPayment,
      transaction,
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    const page = offset / limit + 1;
    this.currentPage = page;

    if (listPaymentFailure) {
      return (
        <Wrapper>
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
        <Row type="flex" justify="end">
          <Col className="createButton">
            { transaction.status === 3 && (
              <Button type="primary" icon="plus" onClick={this.showModal} size="large">
              Thêm đợt thanh toán
              </Button>
            )}
            
          </Col>
        </Row>
        <Table
          columns={this.columnHeaders}
          dataSource={payments}
          pagination={false}
          loading={isLoadingTable}
        />
        <Row>
          <Pagination
            className="pagination"
            showTotal={(totalItem, range) =>
                `${range[0]}-${range[1]} of ${totalItem} items`}
            onChange={this.onChangePage}
            defaultCurrent={1}
            current={page}
            total={total}
            pageSize={limit}
            />
        </Row>
        <Modal
          title="Thêm đợt thanh toán"
          visible={this.state.visible}
          onOk={this.handleSubmitCommission}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmitCommission}>
          Xác nhận
            </Button>,
        ]}
        >
          <Row>
            <Col span={12}>
              <p>Tổng tiền hoa hồng chưa thanh toán:</p>
            </Col>
            <Col span={12}>
              {this.props.transaction.actualCommissionAmount && this.props.transaction.withdrawnAmount !== null ? this.props.transaction.actualCommissionAmount - this.props.transaction.withdrawnAmount : ''}
              {' VND'}
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <p>Số tiền thanh toán:</p>
            </Col>
            <Col span={12}>
              <Form layout="vertical" onSubmit={this.handleSubmitCommission}>
                <Form.Item>
                  {this.props.form.getFieldDecorator("amount", {
                  rules: [{ required: true, message: 'Vui lòng nhập giá trị!'}],
                })(
                  <div className="payAmount">
                    <Input placeholder="Tiền hoa hồng" />
                  </div>,
                )}
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Modal>

        {/* --------------------------- */}
        <Modal
          title="Chỉnh sửa thanh toán hoa hồng"
          visible={this.state.editVisible}
          onOk={() => this.handleEditOk(currentPayment.id)}
          onCancel={this.handleCancel}
        >
          <Form className="form-view">
            <Item>
              <div
                className="title"
                style={{
                  lineHeight: "initial",
                }}
              >
                <span>Số tiền (VND)</span>
              </div>
              {getFieldDecorator("amount", {
                initialValue: currentPayment.amount || '',
                rules: [
                  {
                    required: true,
                    message: "Vui lòng nhập số tiền",
                  },
                ],
              })(<Input />)}
            </Item>
            <Item>
              <div
                className="title"
                style={{
                  lineHeight: "initial",
                }}
              >
                <span>Trạng thái gửi</span>
              </div>
              {getFieldDecorator("isSent", {
                valuePropName: "checked",
                initialValue: currentPayment.isSent,
              })(<Switch  />)}
            </Item>
          </Form>
        </Modal>
      </Wrapper>
    );
  }
}

TransactionPaymentTable.propTypes = {
  payments: PropTypes.array,
  offset: PropTypes.number, // offset = (page - 1) * limit;
  limit: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
};

const mapStateToProps = state => {
  const {
    payments,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    currentPayment,
    updatePaymentSuccess,
  } = state.transaction.transactionPayments;
  const {isLoadingTable, listPaymentFailure, transaction} = state.transaction
  return {
    payments,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    listPaymentFailure,
    isLoadingTable,
    currentPayment,
    updatePaymentSuccess,
    transaction,
  };
};
const mapDispatchToProps = dispatch => ({
  getListPayment: (id, limit, offset, filter, orderBy, fields) => {
    dispatch(getTablePaymentAction(id, limit, offset, filter, orderBy, fields));
  },
  addPayment: (id, payload) => {
    dispatch(addPaymentAction(id, payload));
  },
  getOnePayment: (id) => {
    dispatch(getOnePaymentAction(id));
  },
  updateOnePayment: (id, payload) => {
    dispatch(updateOnePaymentAction(id, payload))
  },
  reloadStatus: (id) => {
    dispatch(getDetailTransactionAction(id));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(TransactionPaymentTable));
