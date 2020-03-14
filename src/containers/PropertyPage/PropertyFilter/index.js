import React, { Component } from "react"
import { Form, Select, Button, DatePicker } from "antd"
import FilterWrapper from "./styles"

const { RangePicker } = DatePicker;
const {Item} = Form
export default class Filter extends Component {
  search = () => {
    console.log('search');
  }

  render() {
    return (
      <FilterWrapper>
        <Form className="filterForm">
          <div className="filterGroup">
            <Item className="cityFilter">
              <Select placeholder="Thành phố">
                <Select.Option value="1">Thành phố 1</Select.Option>
                <Select.Option value="2">Thành phố 2</Select.Option>
                <Select.Option value="3">Thành phố 3</Select.Option>
                <Select.Option value="4">Thành phố 4</Select.Option>
              </Select>
            </Item>
            <Item className="sortFilter">
              <Select placeholder="Trạng thái">
                <Select.Option value="1">Chờ phê duyệt</Select.Option>
                <Select.Option value="2">Đã bàn giao</Select.Option>
                <Select.Option value="3">Đã hủy</Select.Option>
                <Select.Option value="4">Tạm ngưng</Select.Option>
              </Select>
            </Item>
            <Item className="dateFilter">
              <RangePicker />
            </Item>

          </div>
          <div className="btnGroup">
            <Button className="filterBtn" shape="round">Lọc</Button>
            <Button className="cancelFilterBtn" shape="round">Hủy Lọc</Button>
          </div>
        </Form>
      </FilterWrapper>
    )
  }
}
