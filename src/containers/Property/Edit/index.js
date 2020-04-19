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

import * as propertyActions from "../../../redux/property/actions";
import Room from "./Room";
import { retrieveList } from "../../../redux/rest/actions";
import Payment from "./Payment";
import PropertyDiscount from "./PropertyDiscount";
import RestSelect from "../../../components/RestInput/RestSelect";
import { getResources } from "../../../redux/rest/selectors";
import PaymentProgress from "./PaymentProgress";

const FormItem = Form.Item;
const { Option } = Select;
class EditPropertyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      tags: null,
      city: 1,
      type: 1,
      paymentMethod: 1,
      transactionType: 1,
    };
    const { id } = this.props.match.params;
    this.props.getOneProperty(id);
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
  }

  handleSubmit = async (e) => {
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
          salesPolicies,
          paymentProgress,
          paymentMethods,
          priceList,
          propertyImage,
          productTable,
          location,
          locationDescription,
        } = this.props;

        const medias = [];
        propertyImage.forEach((el) => {
          medias.push({
            type: 2,
            link: el,
          });
        });

        values.transactionType = Number(values.transactionType);
        values = {
          ...values,
          legalRecords,
          paymentMethods,
          sitePlans,
          discounts,
          salesPolicies,
          paymentProgress,

          priceList: priceList !== null ? priceList.link : null,
          medias,
          sections: productTable,
          location: {
            latitude: location[0],
            longitude: location[1],
          },
          locationDescription,
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
      sitePlans,
      discounts,
      createPropertyLoading,
      salesPolicies,
      paymentProgress,
    } = this.props;

    const { getFieldDecorator } = form;

    const legalArea = legalRecords.map((e) => (
      <LegalRecord
        key={e.id}
        id={e.id}
        data={{
          id: e.id, 
          title: e.title, 
          mimeType: e.mimeType, 
          link:  e.link}}
      />
    ));
    const sitePlanArea = sitePlans.map((e) => (
      <SitePlan
        key={e.id}
        id={e.id}
        data={{
        id: e.id, 
        title: e.title, 
        links:  e.links,
      }} />
    ));
    // eslint-disable-next-line no-unused-vars
    const discountArea = discounts.map((e) => (
      <Discount key={e.id} id={e.id} />
    ));

    const salesPoliciesArea = salesPolicies.map((e) => (
      <SalesPolicy
        key={e.id}
        id={e.id}
        data={{
        id: e.id, 
        title: e.title, 
        link:  e.link,
        updatedAt: e.updatedAt,
      }} />
    ));

    const paymentProgressArea = paymentProgress.map((e) => (
      <PaymentProgress key={e.id} id={e.id} />
    ));
    const { currentProperty } = this.props;
    return (
      <StyleWrapper>
        <Layout>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <FormItem>
              <div>
                <label className="propertyNameLabel">Tên dự án</label>
                {getFieldDecorator("name", {
                  initialValue: currentProperty && currentProperty.name,
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
            <Row gutter={16}>
              <Col xs={6}>
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
                    defaultValue={currentProperty && currentProperty.cityId}
                  />
                ) : null}
              </Col>
              <Col xs={6}>
                {/* PROPERTY TYPE */}
                <span className="form-group-title">Loại dự án</span>
                {this.props.propertyTypes ? (
                  <RestSelect
                    form={this.props.form}
                    source="typeId"
                    valueProp="id"
                    titleProp="name"
                    placeholder="Thành phố"
                    resourceData={this.props.propertyTypes.list}
                    defaultValue={currentProperty && currentProperty.typeId}
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
                      initialValue:
                        currentProperty &&
                        currentProperty.openSaleDate &&
                        moment(currentProperty.openSaleDate),
                      rules: [
                        {
                          type: "object",
                          required: true,
                          message: "Vui lòng chọn ngày mở bán",
                          whitespace: true,
                        },
                      ],
                    })(<DatePicker />)}
                  </div>
                </FormItem>
              </Col>
              <Col xs={6}>
                {/*  COMMISSION RATE */}
                <FormItem>
                  <div className="commission">
                    <div className="commissionLabel">
                      <span>Tỉ lệ hoa hồng (%)</span>
                    </div>
                    {getFieldDecorator("commissionRate", {
                      initialValue:
                        currentProperty &&
                        Number(currentProperty.commissionRate),
                    })(
                      <InputNumber
                        placeholder="Tỷ lệ (%)"
                        name="commissionRate"
                        min={0}
                        max={100}
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
                  })(
                    <Editor
                      content={currentProperty && currentProperty.overview}
                      label="Tổng quan dự án"
                    />,
                  )}
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

            {/* LOCATION  */}
            <Location
              description={
                currentProperty && currentProperty.locationDescription
              }
              form={this.props.form}
            />
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
              <Col span={12}>
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
              <Col xs={20}>
                <Row>
                  <Col xs={24}>
                    <div className="form-group-title">
                      <span>Phương thức thanh toán</span>
                    </div>
                  </Col>
                  <Col xs={24}>
                    <Payment />
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
                  <ProductTable retrieveData={this.props.getProductTable} id={this.props.match.params.id} />
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
                          <Option value={1}>Hot</Option>
                          <Option value={2}>New</Option>
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

EditPropertyForm.propTypes = {
  form: PropTypes.object,
};
const mapStateToProps = (state) => {
  const {
    legalRecords,
    sitePlans,
    discounts,
    paymentMethods,
    salesPolicies,
    paymentProgress,
    priceList,
    propertyImage,
    productTable,
    location,
    locationDescription,
    //------------------------
    currentProperty,
  } = state.property;

  const { listCityFailure } = state.city;

  return {
    legalRecords,
    sitePlans,
    discounts,
    salesPolicies,
    paymentProgress,
    priceList,
    paymentMethods,
    propertyImage,
    productTable,
    location,
    locationDescription,
    //---------------------
    propertyTypes: getResources(state, "property-types"),
    cities: getResources(state, "cities"),
    listCityFailure,
    //---------------------
    currentProperty,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  expandLegalRecord: () => {
    dispatch(propertyActions.addNewLegalRecordAction());
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
    dispatch(propertyActions.submitEditPropertyFormAction(payload));
  },

  getOneProperty: (id) => {
    dispatch(propertyActions.getOnePropertyAction(id));
  },

  getProductTable: (id, filterParams) => {
    dispatch(propertyActions.getProductTableAction(id, filterParams));
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(EditPropertyForm));
