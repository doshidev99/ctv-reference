import React, { Component } from "react";
import i18n from "i18next";
import {
  Layout,
  Form,
  Input,
  Button,
  Switch,
  Select,
  Row,
  Col,
  DatePicker,
  message,
} from "antd";
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import Editor from "../../../components/common/Editor/index";
import StyleWrapper from "./styles";
import LegalRecord from "./LegalRecord";
import Location from "./Location";
import SitePlan from "./SitePlan";
import SalesPolicy from "./SalesPolicy";
import PriceList from "./PriceList";
import PropertyImage from "./PropertyImage";
import Discount from "./Discount";
import ProductTable from "./ProductTable";
import {
  addNewLegalRecordAction,
  addNewSitePlanAction,
  addNewDiscountAction,
  submitCreatePropertyFormAction,
} from "../../../redux/property/actions";
import Room from "./Room";
import { getListCityAction } from "../../../redux/city/actions";
import { getListPropertyTypeAction } from "../../../redux/propertyType/actions";

const FormItem = Form.Item;
const { Option } = Select;
class CreatePropertyForm extends Component {
  state = {
    isActive: true,
    status: 0,
    city: 1,
    type: 1,
  };

  componentDidMount() {
    if (this.props.cities.length === 0) {
      this.props.getListCity();
    }
    if (this.props.propertyTypes.length === 0) {
      this.props.getListPropertyType();
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.openSaleDate = values.openSaleDate
          ? values.openSaleDate.format()
          : null;
        const {
          legalRecords,
          sitePlans,
          discounts,
          salesPolicy,
          priceList,
          propertyImage,
          productTable,
          location,
          locationDescription,
        } = this.props;

        const medias = [];
        propertyImage.forEach(el => {
          medias.push({
            type: 2,
            link: el,
          });
        });
        values = {
          ...values,
          legalRecords,
          sitePlans,
          discounts,
          salesPolicy: salesPolicy === null ? salesPolicy.link : null,
          priceList: priceList === null ? priceList.link : null,
          medias,
          sections: productTable,
          location: {
            latitude: location[0],
            longitude: location[1],
          },
          locationDescription,
        };
        // eslint-disable-next-line no-console
        console.log(values);

        this.props.submitForm(values);
      } else {
        message.error("Có lỗi xảy ra");
      }
    });
  };

  onChangeSwitch = checked => {
    this.setState({
      isActive: checked,
    });
  };

  onChangeStatus = status => {
    this.setState({
      status: Number(status),
    });
  };

  onChangeCity = city => {
    this.setState({
      city: Number(city),
    });
  };

  onChangeType = type => {
    this.setState({
      type: Number(type),
    });
  };

  render() {
    const {
      form,
      legalRecords,
      sitePlans,
      discounts,
      createPropertyLoading,
    } = this.props;

    const { getFieldDecorator } = form;

    const legalArea = legalRecords.map(e => (
      <LegalRecord key={e.id} id={e.id} />
    ));
    const sitePlanArea = sitePlans.map(e => (
      <SitePlan key={e.id} id={e.id} links={e.links} />
    ));
    // eslint-disable-next-line no-unused-vars
    const discountArea = discounts.map(e => <Discount key={e.id} id={e.id} />);
    return (
      <StyleWrapper>
        <Layout>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: i18n.t("input.propertyName.validateMsg.required"),
                  },
                ],
              })(
                <div>
                  <label className="propertyNameLabel">Tên dự án</label>
                  <Input />
                </div>,
              )}
            </FormItem>
            <Row gutter={16}>
              <Col xs={6}>
                <FormItem>
                  {getFieldDecorator("cityId", {
                    initialValue: this.state.city,
                    valuePropName: "option",
                  })(
                    <div className="city">
                      <label className="cityLabel">Thành phố</label>
                      <Select
                        defaultValue={this.state.city}
                        onChange={this.onChangeCity}
                      >
                        {this.props.cities.map(e => (
                          <Option value={e.id} key={e.id}>
                            {e.name}
                          </Option>
                        ))}
                      </Select>
                    </div>,
                  )}
                </FormItem>
              </Col>
              <Col xs={6}>
                <FormItem>
                  {getFieldDecorator("typeId", {
                    initialValue: this.state.type,
                    valuePropName: "option",
                  })(
                    <div className="type">
                      <label className="typeLabel">Loại dự án</label>
                      <Select
                        defaultValue={this.state.type}
                        onChange={this.onChangeType}
                      >
                        {this.props.propertyTypes.map(e => (
                          <Option value={e.id} key={e.id}>
                            {e.name}
                          </Option>
                        ))}
                      </Select>
                    </div>,
                  )}
                </FormItem>
              </Col>
              <Col xs={6}>
                <FormItem>
                  <div className="openSaleDate">
                    <label className="openSaleDateLabel">
                      Thời gian mở bán
                    </label>
                    {getFieldDecorator("openSaleDate", {
                      initialValue: moment(),
                      rules: [
                        {
                          type: "object",
                          required: true,
                          message: "Vui lòng chọn ngày mở bán",
                          whitespace: true,
                        },
                      ],
                    })(
                      <DatePicker
                        defaultPickerValue={moment()}
                        // onChange={this.onChangeDatePicker}
                      />,
                    )}
                  </div>
                </FormItem>
              </Col>
              <Col xs={6}>
                <FormItem>
                  {getFieldDecorator(
                    "paymentMethod",
                    {},
                  )(
                    <div>
                      <label className="paymentMethodLabel">
                        Phương thức thanh toán
                      </label>
                      <Input />
                    </div>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <FormItem className="overview">
              {getFieldDecorator("overview", {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng nhập thông tin tổng quan dự án",
                  },
                ],
              })(<Editor label="Tổng quan dự án" />)}
            </FormItem>

            <Row>
              <Col xs={24} lg={16} xl={12}>
                <div className="legalArea">
                  <div className="legalTitle">
                    <span>Hồ sơ pháp lý</span>
                  </div>
                  {legalArea}
                  <div className="actionGroup">
                    <Button
                      type="primary"
                      onClick={this.props.expandLegalRecord}
                    >
                      Thêm
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Location />

            {/*  Chưa validate */}
            <Row>
              <Col xs={24}>
                <div className="sitePlanArea">
                  <div className="sitePlanTitle">
                    <span>Mặt bằng</span>
                  </div>
                  {sitePlanArea}
                  <div className="actionGroup">
                    <Button type="primary" onClick={this.props.expandSitePlan}>
                      Thêm
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>

            <SalesPolicy />
            <PriceList />
            <PropertyImage />
            <Row>
              <Col>
                <FormItem>
                  {getFieldDecorator("commissionRate")(
                    <div className="commission">
                      <label className="commissionLabel">
                        Tỉ lệ hoa hồng (%)
                      </label>
                      <Input />
                    </div>,
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col xs={24} lg={20} xl={12}>
                <div className="discountArea">
                  <div className="discountTitle">
                    <span>Tỷ lệ chiết khấu</span>
                  </div>
                  {discountArea}
                  <div className="actionGroup">
                    <Button type="primary" onClick={this.props.expandDiscount}>
                      Thêm
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>

            <div className="productTable">
              <div className="productTableTitle">
                <span>Bảng hàng</span>
              </div>
              <ProductTable />
            </div>
            <div className="others">
              <div className="othersTitle">
                <span>Khác</span>
              </div>
              <Row>
                <Col offset={8} xs={3}>
                  <FormItem>
                    {getFieldDecorator("isActive", {
                      valuePropName: "checked",
                      initialValue: this.state.isActive,
                    })(
                      <div className="display">
                        <label>Hiển thị</label>
                        <Switch defaultChecked onChange={this.onChangeSwitch} />
                      </div>,
                    )}
                  </FormItem>
                </Col>
                <Col offset={3} xs={6}>
                  <FormItem valuepropname="option">
                    {getFieldDecorator("tag", {
                      initialValue: this.state.status,
                      valuePropName: "option",
                    })(
                      <div className="status">
                        <label>Tình trạng</label>
                        <Select
                          defaultValue={this.state.status}
                          onChange={this.onChangeStatus}
                        >
                          <Option value={0}>Bình thường</Option>
                          <Option value={1}>Hot</Option>
                          <Option value={2}>New</Option>
                        </Select>
                      </div>,
                    )}
                  </FormItem>
                </Col>
              </Row>
            </div>

            <div className="submitButton">
              <Button
                type="primary"
                onClick={this.handleSubmit}
                loading={createPropertyLoading}
              >
                {createPropertyLoading ? "" : "Thêm dự án"}
              </Button>
            </div>
          </Form>
          <Room />
        </Layout>
      </StyleWrapper>
    );
  }
}

CreatePropertyForm.propTypes = {
  form: PropTypes.object,
};
const mapStateToProps = state => {
  const {
    legalRecords,
    sitePlans,
    discounts,
    salesPolicy,
    priceList,
    propertyImage,
    productTable,
    location,
    locationDescription,
    //------------------------
    createPropertyLoading,
  } = state.property;
  const { propertyTypes, listPropertyTypeFailure } = state.propertyType;
  const { cities, listCityFailure } = state.city;
  const cityLoading = state.city.loading;
  const propertyTypeLoading = state.propertyType.loading;
  return {
    legalRecords,
    sitePlans,
    discounts,
    salesPolicy,
    priceList,
    propertyImage,
    productTable,
    location,
    locationDescription,
    //---------------------
    propertyTypes,
    cityLoading,
    propertyTypeLoading,
    cities,
    listCityFailure,
    listPropertyTypeFailure,
    //---------------------
    createPropertyLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  expandLegalRecord: () => {
    dispatch(addNewLegalRecordAction());
  },

  expandSitePlan: () => {
    dispatch(addNewSitePlanAction());
  },

  expandDiscount: () => {
    dispatch(addNewDiscountAction());
  },

  getListCity: () => {
    dispatch(getListCityAction());
  },
  getListPropertyType: () => {
    dispatch(getListPropertyTypeAction());
  },

  submitForm: payload => {
    dispatch(submitCreatePropertyFormAction(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(CreatePropertyForm));
