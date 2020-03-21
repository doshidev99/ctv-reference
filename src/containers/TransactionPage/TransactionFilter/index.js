import React, { Component } from "react"
import { Form, Select, Button, DatePicker, Input, Row, Col } from "antd"
import TransactionLayoutWrapper from './style';

const { RangePicker } = DatePicker;
const {Item} = Form
export default class Filter extends Component {
  // search = () => {
  //   console.log('search');
  // }
  constructor(props) {
    super(props);
    this.props = props;
 }

  render() {
    return (
      <TransactionLayoutWrapper>
        <Form className="filterForm">
          <div className="filterGroup">
            <Row>
              <Col span={7}>
                <Item className="dateFilter">
                  <RangePicker />
                </Item>
              </Col>
              <Col span={4} offset={1}>
                <Item className="code">
                  <Input placeholder="Mã giao dịch" id="filterCode" />
                </Item>
              </Col>
              <Col span={4} offset={1}>
                <Item className="collaborator">
                  <Input placeholder="Tên CTV" id="filterCTV" />
                </Item>
              </Col>
              <Col span={4} offset={1}>
                <Item className="status">
                  <Select placeholder="Tình trạng">
                    <Select.Option value="1">Đang xử lý</Select.Option>
                    <Select.Option value="2">Đã cọc</Select.Option>
                    <Select.Option value="3">Hoàn thành</Select.Option>
                    <Select.Option value="4">Hủy bỏ</Select.Option>
                  </Select>
                </Item>
              </Col>
              <Col span={2}>
                <div className="btnGroup">
                  <Button className="filterBtn" shape="round" width={100}>Lọc</Button>
                </div>
              </Col>
            </Row>
          </div>
        </Form>
      </TransactionLayoutWrapper>
    )
  }
}
