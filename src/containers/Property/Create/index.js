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
  Radio,
  InputNumber,
  notification,
} from "antd";
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
// import RestSelect from "../../../components/RestInput/RestSelect";
import Editor from "../../../components/common/Editor/index";
import StyleWrapper from "./styles";
import LegalRecord from "./LegalRecord";
import BrokeragePolicy  from "./BrokeragePolicy";
import Location from "./Location";
import SitePlan from "./SitePlan";
import SalesPolicy from "./SalesPolicy";
import PriceList from "./PriceList";
import PropertyImage from "./PropertyImage";
import Discount from "./Discount";
import ProductTable from "./ProductTable";
import TypeImageTable from "./TypeImageTable";
// import { PROPERTY_TAGS } from "../../../configs/constants";

// import {
//   addNewLegalRecordAction,
//   addNewSitePlanAction,
//   addNewDiscountAction,
//   submitCreatePropertyFormAction,
// } from "../../../redux/property/actions";
import * as propertyActions from "../../../redux/property/actions";
import Room from "./Room";
import { getListCityAction } from "../../../redux/city/actions";
import { getListPropertyTypeAction } from "../../../redux/propertyType/actions";
import { retrieveList } from "../../../redux/rest/actions";
// import Payment from "./Payment";
import PropertyDiscount from "./PropertyDiscount";
import RestSelect from "../../../components/RestInput/RestSelect";
import {
  getResources,
  getListResourceData,
} from "../../../redux/rest/selectors";
import PaymentProgress from "./PaymentProgress";
import MainImage from "./MainImage";

const FormItem = Form.Item;
const { Option } = Select;
class CreatePropertyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      tags: [],
      city: 1,
      type: 1,
      // paymentMethod: 1,
      transactionType: 1,
    };
    const initialFilter = { limit: 50, skip: 0, order: "id", filter: {} };
    if (!this.props.cities) {
      this.props.retrieveRefferences(
        "cities",
        initialFilter || { limit: 20, skip: 0, filter: {} },
        true,
      );
    }
    if (!this.props.propertyTypes) {
      this.props.retrieveRefferences(
        "property-types",
        initialFilter || { limit: 20, skip: 0, filter: {} },
        true,
      );
    }

    if (!this.props.paymentMethodOptions) {
      this.props.retrieveRefferences(
        "payment-methods",
        { limit: 50, skip: 0, order: "id", filter: {} },
        true,
      );
    }

    if (!this.props.staffs || this.props.staffs.length === 0) {
      this.props.retrieveRefferences(
        "staffs",
        { limit: 100, skip: 0, order: "id", filter: {} },
        true,
      );
    }

    this.props.clearFields();
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const test = await this.props.form.getFieldsValue();
    // eslint-disable-next-line no-console
    console.log(test);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.openSaleDate = values.openSaleDate
          ? values.openSaleDate.format()
          : null;

        const {
          legalRecords,
          brokeragePolicies,
          sitePlans,
          discounts,
          salesPolicies,
          paymentProgress,
          // paymentMethods,
          priceList,
          // propertyImage,
          medias,
          productTable,
          location,
        } = this.props;

        if (location.length === 0) {
          notification.error({
            message: i18n.t("error.title"),
            description: "Vui lòng chọn vị trí dự án trên bản đồ",
          });
          return;
        }

        values.transactionType = Number(values.transactionType);
        values = {
          ...values,
          legalRecords,
          brokeragePolicies,
          // paymentMethods,
          sitePlans,
          discounts,
          salesPolicies,
          paymentProgress,
          priceList: priceList || null,
          medias,
          sections: productTable,
          location: {
            latitude: location[0],
            longitude: location[1],
          },
        };
        // eslint-disable-next-line no-console

        this.props.submitForm(values);
      } else {
        message.error("Có lỗi xảy ra");
      }
    });
  };

  onChangeSwitch = (checked) => {
    this.setState({
      isVisible: checked,
    });
  };

  onChangeTags = (tags) => {
    this.setState({
      tags,
    });
  };

  onChangeCity = (city) => {
    this.setState({
      city: Number(city),
    });
  };

  onChangeType = (type) => {
    this.setState({
      type: Number(type),
    });
  };

  render() {
    const {
      form,
      legalRecords,
      brokeragePolicies,
      sitePlans,
      discounts,
      createPropertyLoading,
      paymentMethodOptions,
      salesPolicies,
      paymentProgress,
    } = this.props;
    const userId = Number(localStorage.getItem("id"));
    const { getFieldDecorator } = form;
    const legalArea = legalRecords.map((e) => (
      <LegalRecord key={e.id} id={e.id} />
    ));
    const brokerageArea = brokeragePolicies.map((e) => (
      <BrokeragePolicy key={e.id} id={e.id} />
    ));
    const sitePlanArea = sitePlans.map((e) => (
      <SitePlan key={e.id} id={e.id} links={e.links} />
    ));
    // eslint-disable-next-line no-unused-vars
    const discountArea = discounts.map((e) => (
      <Discount key={e.id} id={e.id} />
    ));

    const salesPoliciesArea = salesPolicies.map((e) => (
      <SalesPolicy key={e.id} id={e.id} />
    ));

    const paymentProgressArea = paymentProgress.map((e) => (
      <PaymentProgress key={e.id} id={e.id} />
    ));

    return (
      <StyleWrapper>
        <Layout>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col xs={24} md={18}>
                <FormItem>
                  <div>
                    <label className="propertyNameLabel">Tên dự án</label>
                    {getFieldDecorator("name", {
                      rules: [
                        {
                          required: true,
                          message: i18n.t(
                            "input.propertyName.validateMsg.required",
                          ),
                        },
                      ],
                    })(<Input />)}
                  </div>
                </FormItem>
              </Col>
              <Col xs={24} md={6}>
                <FormItem>
                  <div>
                    <label className="form-group-title">Người phụ trách</label>
                    <RestSelect
                      form={this.props.form}
                      source="staffId"
                      defaultValue={this.props.staffs && userId}
                      valueProp="id"
                      titleProp="fullName"
                      required
                      requiredMessage="Vui lòng chọn người phụ trách"
                      placeholder="Người phụ trách"
                      resourceData={this.props.staffs}
                    />
                  </div>
                </FormItem>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={4}>
                {/* CITY */}
                <span className="form-group-title">Thành phố</span>
                {this.props.cities ? (
                  <RestSelect
                    form={this.props.form}
                    source="cityId"
                    valueProp="id"
                    titleProp="name"
                    placeholder="Thành phố"
                    resourceData={this.props.cities.list}
                  />
                ) : null}
              </Col>
              <Col xs={4}>
                {/* PROPERTY TYPE */}
                <span className="form-group-title">Loại dự án</span>
                {this.props.propertyTypes ? (
                  <RestSelect
                    form={this.props.form}
                    source="typeId"
                    valueProp="id"
                    titleProp="name"
                    placeholder="Loại dự án"
                    resourceData={this.props.propertyTypes.list}
                  />
                ) : null}
              </Col>
              <Col xs={6}>
                {/* OPEN SALES DATE */}
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
                          required: false,
                          // message: "Vui lòng chọn ngày mở bán",
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
              <Col xs={5}>
                {/*  COMMISSION RATE */}
                <FormItem>
                  <div className="commission">
                    <div className="commissionLabel">
                      <span>Tỉ lệ hoa hồng (%)</span>
                    </div>
                    {getFieldDecorator("commissionRate", {
                      rules: [
                        {
                          required: true,
                          message: "Hãy chọn phần trăm chiết khấu",
                        },
                      ],
                    })(
                      <InputNumber
                        placeholder="Tỷ lệ (%)"
                        name="commissionRate"
                        min={0}
                        max={100}
                        // onChange={this.handleChange}
                      />,
                    )}
                  </div>
                </FormItem>
              </Col>
              <Col xs={5}>
                {/*  VAT RATE */}
                <FormItem>
                  <div className="vatRate">
                    <div className="form-group-title">
                      <span>Tỉ lệ VAT (%)</span>
                    </div>
                    {getFieldDecorator("vatRate", {
                      rules: [
                        {
                          required: true,
                          message: "Hãy chọn phần trăm VAT",
                        },
                      ],
                    })(
                      <InputNumber
                        placeholder="Tỷ lệ (%)"
                        name="vatRate"
                        min={0}
                        max={100}
                        // onChange={this.handleChange}
                      />,
                    )}
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col xs={24} lg={16} xl={12} style={{ paddingRight: "8px" }}>
                {/* OVERVIEW */}
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
              </Col>
              <Col
                xs={24}
                lg={16}
                xl={12}
                style={{ paddingLeft: "8px", paddingRight: "8px" }}
              >
                {/* LEGAL RECORD */}
                <div className="legalArea">
                  <div className="legalTitle">
                    <span>Hồ sơ pháp lý</span>
                  </div>
                  {legalArea}
                  <div className="actionGroup">
                    <Button
                      type="primary"
                      icon="plus"
                      onClick={this.props.expandLegalRecord}
                    >
                      Thêm hồ sơ
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={24} lg={16} xl={12} style={{ paddingRight: "8px" }}>
                {/* constructionProgress */}
                <FormItem className="constructionProgress">
                  {getFieldDecorator("constructionProgress", {
                    rules: [
                      {
                        required: true,
                        message: "Vui lòng nhập thông tin tiến độ dự án",
                      },
                    ],
                  })(<Editor label="Tiến độ dự án" />)}
                </FormItem>
              </Col>
              <Col
                xs={24}
                lg={16}
                xl={12}
                style={{ paddingLeft: "8px", paddingRight: "8px" }}
              >
                {/* brokeragePolicies */}
                <div className="brokerageArea">
                  <div className="legalTitle">
                    <span>Chính sách môi giới</span>
                  </div>
                  {brokerageArea}
                  <div className="actionGroup">
                    <Button
                      type="primary"
                      icon="plus"
                      onClick={this.props.expandbrokeragePolicies}
                    >
                      Thêm chính sách
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>

            {/* MAIN IMAGE */}
            <Row>
              <Col>
                <MainImage />
              </Col>
            </Row>

            {/* LOCATION  */}
            <Location form={this.props.form} />

            {/*  Chưa validate */}
            <Row>
              {/* SITE PLAN */}
              <Col xs={24}>
                <div className="sitePlanArea">
                  <div className="sitePlanTitle">
                    <span>Mặt bằng dự án</span>
                  </div>
                  {sitePlanArea}
                  <div className="actionGroup">
                    <Button
                      type="primary"
                      icon="plus"
                      onClick={this.props.expandSitePlan}
                    >
                      Thêm mặt bằng dự án
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>

            <Row gutter={[8, 24]}>
              {/* SALES POLICIES */}
              <Col span={12}>
                <div className="salesPolicyArea">
                  <Row>
                    <div className="salesPolicyTitle">
                      <p>Chính sách bán hàng</p>
                    </div>
                  </Row>
                  <Row>{salesPoliciesArea}</Row>
                  <div className="actionGroup">
                    <Button
                      type="primary"
                      icon="plus"
                      onClick={this.props.expandSalesPolicy}
                    >
                      Thêm hồ sơ
                    </Button>
                  </div>
                </div>
              </Col>
              <Col span={4}>
                {/* PRICE LIST */}
                <PriceList />
              </Col>
              <Col span={8}>
                {/* PROPERTY IMAGE */}
                <PropertyImage />
              </Col>
            </Row>
            <Row gutter={[8, 24]}>
              <Col xs={24} md={12}>
                <Row>
                  <div className="form-group-title">
                    <p>Phương thức thanh toán</p>
                  </div>
                </Row>
                <Row>
                  <FormItem>
                    {getFieldDecorator("paymentMethodIds", {
                      valuePropName: "option",
                      rules: [
                        {
                          required: true,
                          message:
                            "Vui lòng chọn ít nhất 1 phương thức thanh toán",
                        },
                      ],
                    })(
                      <Select mode="multiple">
                        {paymentMethodOptions &&
                          paymentMethodOptions.list &&
                          paymentMethodOptions.list.map((e) => (
                            <Option key={e.id} value={e.id}>
                              {e.name}
                            </Option>
                          ))}
                      </Select>,
                    )}
                  </FormItem>
                </Row>
              </Col>
              <Col xs={24} md={12}>
                <div className="paymentProgress">
                  <Row>
                    <div className="form-group-title">
                      <p>Tiến độ thanh toán</p>
                    </div>
                  </Row>
                  <Row>{paymentProgressArea}</Row>
                  <div className="actionGroup">
                    <Button
                      type="primary"
                      icon="plus"
                      onClick={this.props.expandPaymentProgress}
                    >
                      Thêm hồ sơ
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>

            <Row gutter={[16, 24]}>
              {/* DISCOUNT */}
              <Col xs={20}>
                <Row>
                  <Col xs={24}>
                    <div className="salesPolicyTitle">
                      <span>Chiết khấu</span>
                    </div>
                  </Col>
                  <Col xs={24}>
                    <PropertyDiscount
                      retrieveRefferences={this.props.retrieveRefferences}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* PRODUCT TABLE */}
            <Row>
              <Col xs={24}>
                <div className="productTable">
                  <div className="productTableTitle">
                    <span>Bảng hàng</span>
                  </div>
                  <ProductTable />
                </div>
              </Col>
            </Row>

            {/* TYPE IMAGE TABLE */}
            <Row>
              <Col xs={24}>
                <div className="productTable">
                  <div className="productTableTitle">
                    <span>Chỉnh sửa ảnh loại căn hộ</span>
                  </div>
                  <TypeImageTable />
                </div>
              </Col>
            </Row>

            {/* OTHERS */}
            <div className="others">
              <div className="othersTitle">
                <span>Khác</span>
              </div>
              <Row>
                <Col offset={2} xs={3}>
                  <FormItem>
                    {getFieldDecorator("isVisible", {
                      valuePropName: "checked",
                      initialValue: this.state.isVisible,
                    })(
                      <div className="display">
                        <label>Hiển thị</label>
                        <Switch defaultChecked onChange={this.onChangeSwitch} />
                      </div>,
                    )}
                  </FormItem>
                </Col>
                <Col offset={2} xs={3}>
                  <FormItem>
                    {getFieldDecorator("transactionType", {
                      initialValue: 1,
                    })(
                      <div className="transactionType">
                        <label>Loại giao dịch</label>
                        <Radio.Group name="radiogroup" initialValue={1}>
                          <Radio value={1}>Đặt cọc</Radio>
                          <Radio value={2}>Đặt chỗ</Radio>
                        </Radio.Group>
                      </div>,
                    )}
                  </FormItem>
                </Col>
                <Col offset={3} xs={6}>
                  <FormItem valuepropname="option">
                    {getFieldDecorator("tags", {
                      initialValue: this.state.tags,
                      valuePropName: "option",
                    })(
                      <div className="status">
                        <label>Tình trạng</label>
                        <Select
                          mode="multiple"
                          initialValue={this.state.tags}
                          onChange={this.onChangeTags}
                        >
                          <Option value={1}>New</Option>
                          <Option value={2}>Hot</Option>
                        </Select>
                      </div>,
                    )}
                  </FormItem>
                </Col>
              </Row>
            </div>
            <hr />
            <div className="submitButton">
              <Button
                type="primary"
                size="large"
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
const mapStateToProps = (state) => {
  const {
    legalRecords,
    brokeragePolicies,
    sitePlans,
    discounts,
    // paymentMethods,
    salesPolicies,
    paymentProgress,
    priceList,
    propertyImage,
    productTable,
    location,
    locationDescription,
    //------------------------
    medias,
    createPropertyLoading,
  } = state.property;
  // const { propertyTypes, listPropertyTypeFailure } = state.propertyType;

  const { listCityFailure } = state.city;

  return {
    legalRecords,
    brokeragePolicies,
    sitePlans,
    discounts,
    salesPolicies,
    paymentProgress,
    priceList,
    propertyImage,
    productTable,
    location,
    locationDescription,
    medias,

    //---------------------
    paymentMethodOptions: getResources(state, "payment-methods"),
    propertyTypes: getResources(state, "property-types"),
    cities: getResources(state, "cities"),
    staffs: getListResourceData(state, "staffs"),
    listCityFailure,
    //---------------------
    createPropertyLoading,

    // --Discount group--
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  expandLegalRecord: () => {
    dispatch(propertyActions.addNewLegalRecordAction());
  },

  expandbrokeragePolicies: () => {
    dispatch(propertyActions.addNewBrokeragePolicyAction());
  },

  expandSalesPolicy: () => {
    dispatch(propertyActions.addSalesPolicyAction());
  },
  expandPaymentProgress: () => {
    dispatch(propertyActions.addPaymentProgressAction());
  },

  expandSitePlan: () => {
    dispatch(propertyActions.addNewSitePlanAction());
  },

  expandDiscount: () => {
    dispatch(propertyActions.addNewDiscountAction());
  },

  submitForm: (payload) => {
    dispatch(propertyActions.submitCreatePropertyFormAction(payload));
  },

  getListCity: () => {
    dispatch(getListCityAction());
  },

  getListPropertyType: () => {
    dispatch(getListPropertyTypeAction());
  },

  retrieveRefferences: (resource, filter, isRefresh) => {
    return dispatch(
      retrieveList(
        resource,
        {
          ...props.initialFilter,
          ...filter,
        },
        isRefresh,
      ),
    );
  },

  clearFields: () => {
    dispatch(propertyActions.clearAction());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(CreatePropertyForm));
