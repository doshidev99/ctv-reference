import React, { Component } from "react";
import { Form, Button, message, Input,DatePicker } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { getListEventAction } from "../../../redux/event/actions";

const { RangePicker } = DatePicker;
const { Item } = Form;

class Filter extends Component {
  orderBy="happenAt";


  fields=["id", "name","happenAt","locationDescription"]


  handleFilter = async () => {
    try {
      const {name, locationDescription, happenAt} = await this.props.form.getFieldsValue();
      const filter = {};
    
      if(name) {
        filter.name = {
          "$like":name,
        }
      }
      
      if(locationDescription) {
        filter.locationDescription = {
          "$like": locationDescription,
        }
      }

      if(happenAt) {
        const from = moment(happenAt[0]).format();
        const to = moment(happenAt[1]).format();
        const filterDate = {"$lte": to, "$gte":from };
        filter.happenAt = filterDate;
      }   
      this.props.applyFilter(10, 0, JSON.stringify(filter), this.orderBy, JSON.stringify(this.fields));
      
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

    // if (listCityFailure || listEventFailure) {
    //   message.error("Lỗi khi tải thông tin");
    //   return <div className="filterForm" />;
    // }
    return (
      <Form className="filterForm">
        <div className="filterGroup">
          <Item className="filterName">
            {getFieldDecorator("name")(<Input placeholder="Tên sự kiện" />)}
          </Item>
          <Item className="filterPlace">
            {getFieldDecorator("locationDescription")(<Input placeholder="Địa điểm" />)}
          </Item>
          <Item className="filterDate">
            {
              getFieldDecorator("happenAt", {
                valuePropName: 'value',
              }) (
                <RangePicker 
                  // onChange={this.handleChangeCalendar} 
                  showTime={false} 
                  allowEmpty={[true, true]}
                />,
              )
            }
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
  applyFilter: (limit, offset, filter, orderBy, fields) => {
    dispatch(getListEventAction(limit, offset, filter, orderBy, fields));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(Filter));
