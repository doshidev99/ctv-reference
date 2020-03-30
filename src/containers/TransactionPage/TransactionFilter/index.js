import React, { Component } from "react"
import { Form, Select, Button, DatePicker, Input, Row, Col, message } from "antd"
import { connect } from "react-redux";
import moment from "moment"
import TransactionLayoutWrapper from './style';
import { getListTransactionAction} from "../../../redux/transaction/actions"

const { RangePicker } = DatePicker;
const {Item} = Form;
class Filter extends Component {
  orderBy="id"

  handleFilter = async () => {
    try {
      const { date, code, fullName, status } = await this.props.form.getFieldsValue();
      const filter = {};

      if(code) {
        filter.code = {
          "$like": code,
        }
      }
      if(fullName) {
        filter["realtor.fullName"] = {
          "$ilike": `%${fullName}%`,
        }
      }
      if(status) {
        filter.status = {
          "$equals": status,
        };
      }
      if(date){
        const from = moment(date[0]).format();
        const to = moment(date[1]).format();
        const filterDate = {"$gte": from, "$lte":to };
        filter.updatedAt = filterDate;
      }
      this.props.applyFilter(10, 0, filter, this.orderBy);
    } catch (error) {
      message.error("Có lỗi xảy ra")
    }
  }

  handleCancel = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <TransactionLayoutWrapper>
        <Form className="filterForm">
          <div className="filterGroup">
            <Row>
              <Col span={6}>
                <Item className="dateFilter">
                  {getFieldDecorator("date")(<RangePicker />)}
                </Item>
              </Col>
              <Col span={3} offset={1}>
                <Item className="filterCode">
                  {getFieldDecorator("code")(<Input placeholder="Mã giao dịch" />)}
                </Item>
              </Col>
              <Col span={4} offset={1}>
                <Item className="filterRealtor">
                  {getFieldDecorator("fullName")(<Input placeholder="Tên CTV" />)}
                </Item>
              </Col>
              <Col span={4} offset={1}>
                <Item className="status">
                  {getFieldDecorator("status")(
                    <Select placeholder="Tình trạng" allowClear>
                      <Select.Option value="1">Đang xử lý</Select.Option>
                      <Select.Option value="2">Chờ xác nhận đặt cọc</Select.Option>
                      <Select.Option value="3">Đã cọc</Select.Option>
                      <Select.Option value="4">Thanh toán hoa hồng</Select.Option>
                      <Select.Option value="5">Thanh toán xong</Select.Option>
                      <Select.Option value="6">Hủy bỏ</Select.Option>
                    </Select>,
                  )}
                </Item>
              </Col>
              <Col span={2}>
                <div className="btnGroup">
                  <Button
                    className="filterBtn"
                    shape="round"
                    onClick={this.handleFilter}
                  >
                    Lọc
                  </Button>
                </div>
              </Col>
              <Col span={2}>
                <div className="btnGroup">
                  <Button
                    className="cancelFilterBtn"
                    shape="round"
                    onClick={this.handleCancel}
                  >
                    Hủy Lọc
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Form>
      </TransactionLayoutWrapper>
    )
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  applyFilter: (limit, offset, filter, orderBy) => {
    dispatch(getListTransactionAction(limit, offset, filter, orderBy));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(Filter));
