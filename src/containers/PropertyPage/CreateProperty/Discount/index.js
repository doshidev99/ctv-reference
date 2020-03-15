import React, { Component } from "react";
import { Input, Button } from "antd";
import DiscountWrapper from "./styles";

export default class Discount extends Component {
  handleChange = () => {};

  render() {
    return (
      <DiscountWrapper>
        <div className="inputArea">
          <div className="title">
            <label>Tiêu đề</label>
            <Input />
          </div>
          <div className="proportion">
            <label>Tỷ lệ (%)</label>
            <Input />
          </div>
        </div>
        <div className="actionGroup">
          <Button type="primary" onClick={this.props.handleExpandDiscount}>
              Thêm
          </Button>
          <Button type="danger" onClick={this.props.handleRemoveDiscount}>
              Hủy
          </Button>
        </div>
      </DiscountWrapper>
    );
  }
}
