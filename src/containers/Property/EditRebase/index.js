import React, { Component } from "react";
import i18n from "i18next";
import {
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
  Typography,
  
} from "antd";
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

// import Editor from "../../../components/common/Editor/index";
import StyleWrapper from "./styles";
import Location from "./Location";
import SitePlan from "./SitePlan";
import SalesPolicy from "./SalesPolicy"
import Discount from "./Discount";
import ProductTable2 from "./ProductTable/index2"
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
import PaymentMethod from "./PaymentMethod";
import MainImage from "./MainImage";
import Overview from "./Overview";
import PropertyProgress from "./PropertyProgress"

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
        locationProperty,
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
          latitude: locationProperty[0],
          longitude: locationProperty[1],
        },
      };
      // eslint-disable-next-line no-console
      const { id } = this.props.match.params;

      this.props.submitForm(id, payload);
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  handleSubmitGeneral = async (e) => {
    e.preventDefault();
    try {
      this.props.form.validateFields(async (err, payload) => {
        if (!err) {
          // console.log('Received values of form: ', payload);
          payload.openSaleDate = payload.openSaleDate
            ? payload.openSaleDate.format()
            : null;
          const {id} = this.props.match.params;
          const {name, staffId, cityId, typeId, openSaleDate, commissionRate, vatRate } = payload;
          const values = {
            name,
            staffId,
            cityId,
            typeId,
            openSaleDate,
            commissionRate,
            vatRate,
          }
          await this.props.submitGeneralInfo(id, values)
        }
        else{
          message.error("Có lỗi xảy ra");
        }
      });
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  }

  handleSubmitOthers = async (e) => {
    e.preventDefault();
    try {
      const payload = this.props.form.getFieldsValue([
        'isVisible',
        'transactionType',
        'tags',
      ]);
      const {id} = this.props.match.params;
      await this.props.submitGeneralInfo(id, payload)
      
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  }

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

  // onChangeType = (type) => {
  //   this.setState({
  //     type: Number(type),
  //   });
  // };

  render() {
    const {
      form,
      discounts,
      createPropertyLoading,
      paymentMethodOptions,
      loading,
    } = this.props;
    const { getFieldDecorator } = form;
    const buttonEdit =  (
      <div className="submitButton">
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          // onClick={this.handleSubmit}
          loading={createPropertyLoading}
          >
          {createPropertyLoading ? "" : "Cập nhật thông tin"}
        </Button>
      </div>
    )
    // eslint-disable-next-line no-unused-vars
    const discountArea = discounts.map((e) => (
      <Discount key={e.id} id={e.id} />
    ));

    const { currentProperty } = this.props;
    return (
      <StyleWrapper>
        <Spin spinning={loading}>
          {/* ----------------------------------Thông tin chung--------------------------------------- */}
          <div className="blockEdit generalInfo">
            <Form layout="vertical" onSubmit={this.handleSubmitGeneral}>
              <Typography.Title level={4}> Thông tin chung </Typography.Title>
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
              {buttonEdit}
            </Form>
          </div>

          {/* ----------------------------------Tổng quan dự án------------------------------------- */}
          <div className="blockEdit">
            <Overview id={this.props.match.params.id} />
          </div>

          {/* -------------------------------------Tiến độ dự án---------------------------------------- */}
          <div className="blockEdit">
            <PropertyProgress />
          </div>
          {/* MAIN IMAGE */}
          <div className="blockEdit">
            <MainImage id={this.props.match.params.id} />
          </div>
          {/* LOCATION  */}
          <div className="blockEdit">
            <Location
              address={currentProperty && currentProperty.address}
              description={
                  currentProperty && currentProperty.locationDescription
                }
              id={this.props.match.params.id}
              form={this.props.form}
              />
          </div>

          <div className="blockEdit">
            <SitePlan id={this.props.match.params.id} />
          </div>

          {/* SALE POLICES, PRICE LÍST AND  PROPERTY IMAGE */}
          <div className="blockEdit">
            <SalesPolicy id={this.props.match.params.id} />
          </div>
          
          {/* PAYMENT METHODS AND PAYMENT PROGRESS */}
          <div className="blockEdit">
            <PaymentMethod id={this.props.match.params.id} paymentMethodOptions={paymentMethodOptions} />
          </div>
          
          <div className="blockEdit">
            <Row gutter={[16, 24]}>
              {/* DISCOUNT */}
              <Col xs={24}>
                <Row>
                  <Col xs={24}>
                    <Typography.Title level={4}> Chiết khấu </Typography.Title>
                  </Col>
                  <Col xs={24}>
                    <PropertyDiscount
                      retrieveRefferences={this.props.retrieveRefferences}
                      idProperty={this.props.match.params.id}
                      form={this.props.form}
                      />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          {/* PRODUCT TABLE */}
          <div className="blockEdit">
            <Row>
              <Col xs={24}>
                <div className="productTable">
                  <Typography.Title level={4}> Bảng hàng </Typography.Title>
                  {/* <ProductTable
                    retrieveData={this.props.getProductTable}
                    id={this.props.match.params.id}
                    /> */}
                  <ProductTable2 {...this.props} />
                </div>
              </Col>
            </Row>
          </div>
          

          {/* OTHERS */}
          <div className="others blockEdit">
            <Typography.Title level={4}> Khác </Typography.Title>
            <Form onSubmit={this.handleSubmitOthers}>
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
                            <Option value={1}>New</Option>
                            <Option value={2}>Hot</Option>
                          </Select>,
                        )}
                    </div>
                  </FormItem>
                </Col>
              </Row>
              {buttonEdit}
            </Form>
          </div>
        </Spin>
      </StyleWrapper>
    );
  }
}

EditPropertyForm.propTypes = {
  form: PropTypes.object,
};
const mapStateToProps = (state) => {
  const {
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
    sitePlans,
    discounts,
    salesPolicies,
    paymentProgress,
    priceList,
    paymentMethods,
    propertyImage,
    productTable,
    locationProperty: location,
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

  submitGeneralInfo: (id, values) => {
    dispatch(propertyActions.submitEditChildrenProperty(id, values))
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
