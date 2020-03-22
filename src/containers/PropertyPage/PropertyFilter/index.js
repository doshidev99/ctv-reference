import React, { Component } from "react";
import { Form, Select, Button, DatePicker, message } from "antd";
import { connect } from "react-redux";
import moment from "moment"
import { getListCityAction } from "../../../redux/city/actions";
import { getListPropertyTypeAction } from "../../../redux/propertyType/actions";
import { getListPropertyAction } from "../../../redux/property/actions";

const { RangePicker } = DatePicker;
const { Item } = Form;

class Filter extends Component {
  componentDidMount() {
    Promise.all([this.props.getListCity(), this.props.getListPropertyType()]);
  }

  handleFilter = async () => {
    const {city, propertyType, date} = await this.props.form.getFieldsValue();
    // eslint-disable-next-line no-console
    const filter = {};
    
    if(city) {
      filter.cityId = city
    }
    
    if(propertyType) {
      filter.typeId = propertyType;
    }
    if(date) {
      const from = moment(date[0]).format();
      const to = moment(date[1]).format();
      const filterDate = {"$lte": to, "$gte":from };
      filter.updatedAt = filterDate;
    }
    
    if(JSON.stringify(filter) !== JSON.stringify({})) {
      this.props.applyFilter(10, 0, JSON.stringify(filter))
    }
    
  };

  handleCancel = () => {
    this.props.form.resetFields();
  };

  render() {
    const {
      cities,
      propertyTypes,
      cityLoading,
      propertyTypeLoading,
      listCityFailure,
      listPropertyTypeFailure,
    } = this.props;
    const { getFieldDecorator } = this.props.form;

    if (listCityFailure || listPropertyTypeFailure) {
      message.error("Lỗi khi tải thông tin");
      return <div className="filterForm" />;
    }
    return (
      <Form className="filterForm">
        <div className="filterGroup">
          <Item className="cityFilter">
            {getFieldDecorator("city", {
              valuePropName: 'value',
            })(
              <Select allowClear placeholder="Thành phố" loading={cityLoading}>
                {cities.map(e => (
                  <Select.Option key={e.id} value={e.id}>
                    {e.name}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Item>
          <Item className="sortFilter">
            {getFieldDecorator("propertyType",{
              valuePropName: 'value',
            })(
              <Select allowClear placeholder="Loại dự án" loading={propertyTypeLoading}>
                {propertyTypes.map(e => (
                  <Select.Option key={e.id} value={e.id}>
                    {e.name}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Item>
          <Item className="dateFilter">
            {
              getFieldDecorator("date", {
                valuePropName: 'value',
              }) (
                <RangePicker />,
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

const mapStateToProps = state => {
  const { cities, listCityFailure } = state.city;

  const cityLoading = state.city.loading;
  const propertyTypeLoading = state.propertyType.loading;

  const { propertyTypes, listPropertyTypeFailure } = state.propertyType;
  return {
    propertyTypes,
    cityLoading,
    propertyTypeLoading,
    cities,
    listCityFailure,
    listPropertyTypeFailure,
  };
};

const mapDispatchToProps = dispatch => ({
  getListCity: () => {
    dispatch(getListCityAction());
  },
  getListPropertyType: () => {
    dispatch(getListPropertyTypeAction());
  },
  applyFilter: (limit, offset, filter, orderBy) => {
    dispatch(getListPropertyAction(limit, offset, filter, orderBy))
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(Filter));
