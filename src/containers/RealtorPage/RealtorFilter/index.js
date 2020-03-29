import React, { Component } from "react";
import { Form, Button, message, Input } from "antd";
import { connect } from "react-redux";
// import moment from "moment";
import { getListRealtorAction } from "../../../redux/realtor/actions";
// import { getListRealtorAction } from "../../../redux/propertyType/actions";
// import { getListRealtorAction } from "../../../redux/property/actions";

// const { RangePicker } = DatePicker;
const { Item } = Form;

class Filter extends Component {
  orderBy="id"

  handleFilter = async () => {
    try {
      const { fullName, email, phone} = await this.props.form.getFieldsValue();
      const filter = {};

      if(fullName) {
        filter.fullName = {
          "$like":fullName,
        }
        console.log(fullName);

      }

      if(email) {
        filter.email = {
          "$like": email,
        }
      }
      if(phone) {
        filter.phone = {
          "$like": phone,
        }
      }
      this.props.applyFilter(10, 0, JSON.stringify(filter), this.orderBy);

    } catch (error) {
      message.error("Có lỗi xảy ra")
    }
  };

  handleCancel = () => {
    this.props.form.resetFields();
  };

  render() {
    // const {} = this.props;
    const { getFieldDecorator } = this.props.form;

    // if (listCityFailure || listRealtorFailure) {
    //   message.error("Lỗi khi tải thông tin");
    //   return <div className="filterForm" />;
    // }
    return (
      <Form className="filterForm">
        <div className="filterGroup">
          <Item className="filterName">
            {getFieldDecorator("fullName")(<Input placeholder="Họ tên" />)}
          </Item>
          <Item className="filterEmail">
            {getFieldDecorator("email")(<Input placeholder="Email" />)}
          </Item>
          <Item className="filterPhone">
            {getFieldDecorator("phone")(<Input placeholder="Số điện thoại" />)}
          </Item>
        </div>
        <div className="btnGroup">
          <Button
            className="filterBtn"
            shape="round"
            onClick={this.handleFilter}
          >
            Lọc
          </Button>
          <Button
            className="cancelFilterBtn"
            shape="round"
            onClick={this.handleCancel}
          >
            Hủy Lọc
          </Button>
        </div>
      </Form>
    );
  }
}

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  applyFilter: (limit, offset, filter, orderBy) => {
    dispatch(getListRealtorAction(limit, offset, filter, orderBy));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(Filter));
