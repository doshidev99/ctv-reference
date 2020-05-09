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
  Spin,
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
// import Room from "./Room";
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
class EditPropertyForm extends Component {
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

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getOneProperty(id);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        legalRecords,
        sitePlans,
        discounts,
        salesPolicies,
        paymentProgress,
        // paymentMethods,
        priceList,
        medias,
        productTable,
        location,
        // locationDescription,
      } = this.props;
      // return
      // // eslint-disable-next-line no-console
      let payload = await this.props.form.validateFields();
      payload.openSaleDate = payload.openSaleDate
        ? payload.openSaleDate.format()
        : null;

      payload.transactionType = Number(payload.transactionType);
      payload = {
        ...payload,
        legalRecords,
        sitePlans,
        discounts,
        salesPolicies,
        paymentProgress,
        medias,
        priceList: priceList || null,
        sections: productTable.length > 0 ? productTable : undefined,
        location: {
          latitude: location[0],
          longitude: location[1],
        },
      };
      // eslint-disable-next-line no-console
      const { id } = this.props.match.params;

      this.props.submitForm(id, payload);
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
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
      paymentMethodOptions,
      salesPolicies,
      paymentProgress,
      loading,
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
          link: e.link,
          updatedAt: moment(e.updatedAt),
          readOnly: e.readOnly,
        }}
      />
    ));
    const sitePlanArea = sitePlans.map((e) => (
      <SitePlan
        key={e.id}
        id={e.id}
        data={{
          id: e.id,
          title: e.title,
          links: e.links,
        }}
      />
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
          link: e.link,
          updatedAt: moment(e.updatedAt),
        }}
      />
    ));

    const paymentProgressArea = paymentProgress.map((e) => (
      <PaymentProgress
        key={e.id}
        id={e.id}
        data={{
          id: e.id,
          title: e.title,
          link: e.link,
          updatedAt: moment(e.updatedAt),
          readOnly: e.readOnly,
        }}
      />
    ));
    const { currentProperty } = this.props;
    return (
      <StyleWrapper>
        <Layout>
          <Spin spinning={loading}>
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
                        initialValue: currentProperty && currentProperty.name,
                      })(<Input />)}
                    </div>
                  </FormItem>
                </Col>
                <Col xs={24} md={6}>
                  <FormItem>
                    <div>
                      <label className="form-group-title">
                        Người phụ trách
                      </label>
                      <RestSelect
                        form={this.props.form}
                        source="staffId"
                        defaultValue={currentProperty.staffId}
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
                      defaultValue={currentProperty && currentProperty.cityId}
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
                            required: false,
                            // message: "Vui lòng chọn ngày mở bán",
                            whitespace: true,
                          },
                        ],
                      })(<DatePicker />)}
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
                        initialValue:
                          (currentProperty &&
                            Number(currentProperty.commissionRate)) ||
                          0,
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
                        initialValue:
                          (currentProperty &&
                            Number(currentProperty.vatRate)) ||
                          null,
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
                    })(
                      <Editor
                        content={currentProperty.overview}
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
              {/* MAIN IMAGE */}
              <Row>
                <Col>
                  <MainImage />
                </Col>
              </Row>
              {/* LOCATION  */}
              <Location
                address={currentProperty && currentProperty.address}
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
                <Col xs={24} md={12}>
                  <Row>
                    <div className="form-group-title">
                      <p>Phương thức thanh toán</p>
                    </div>
                  </Row>
                  <Row>
                    <FormItem>
                      {getFieldDecorator("paymentMethodIds", {
                        initialValue:
                          currentProperty && currentProperty.paymentMethodIds,
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

                          {/* <Option value={2}>New</Option> */}
                        </Select>,
                      )}
                    </FormItem>
                  </Row>
                </Col>

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
              </Row>

              {/* PRODUCT TABLE */}
              <Row>
                <Col xs={24}>
                  <div className="productTable">
                    <div className="productTableTitle">
                      <span>Bảng hàng</span>
                    </div>
                    <ProductTable
                      retrieveData={this.props.getProductTable}
                      id={this.props.match.params.id}
                    />
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
                      <div className="display">
                        <label>Hiển thị</label>
                        {getFieldDecorator("isVisible", {
                          valuePropName: "checked",
                          initialValue:
                            currentProperty && currentProperty.isVisible,
                        })(<Switch onChange={this.onChangeSwitch} />)}
                      </div>
                      ,
                    </FormItem>
                  </Col>
                  <Col offset={2} xs={3}>
                    <FormItem>
                      <div className="transactionType">
                        <label>Loại giao dịch</label>
                        {getFieldDecorator("transactionType", {
                          initialValue:
                            currentProperty && currentProperty.transactionType,
                        })(
                          <Radio.Group name="radiogroup">
                            <Radio value={1}>Đặt cọc</Radio>
                            <Radio value={2}>Đặt chỗ</Radio>
                          </Radio.Group>,
                        )}
                      </div>
                    </FormItem>
                  </Col>
                  <Col offset={3} xs={6}>
                    <FormItem valuepropname="option">
                      <div className="status">
                        <label>Tình trạng</label>
                        {getFieldDecorator("tags", {
                          // valuePropName: "option",
                          initialValue: currentProperty && currentProperty.tags,
                        })(
                          <Select
                            mode="multiple"
                            // initialValue={currentProperty && currentProperty.tags}
                            onChange={this.onChangeTags}
                          >
                            <Option value={1}>Hot</Option>
                            <Option value={2}>New</Option>
                          </Select>,
                        )}
                      </div>
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
                  {createPropertyLoading ? "" : "Cập nhật thông tin"}
                </Button>
              </div>
            </Form>
          </Spin>
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
    getOnePropertyLoading,
    medias,
    //------------------------
    currentProperty,
  } = state.property;
  const { listCityFailure } = state.city;

  return {
    medias,
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
    paymentMethodOptions: getResources(state, "payment-methods"),
    propertyTypes: getResources(state, "property-types"),
    cities: getResources(state, "cities"),
    staffs: getListResourceData(state, "staffs"),
    listCityFailure,
    //---------------------
    currentProperty,
    loading: getOnePropertyLoading,
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

  submitForm: (id, payload) => {
    dispatch(propertyActions.submitEditPropertyFormAction(id, payload));
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
  clearFields: () => {
    dispatch(propertyActions.clearAction());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(EditPropertyForm));
