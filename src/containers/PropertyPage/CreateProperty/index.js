import React, { Component } from "react";
import i18n from "i18next";
import { Layout, Form, Input, Button, Switch, Select, Row, Col } from "antd";
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
} from "../../../redux/property/actions";
import Room from "./Room";

const FormItem = Form.Item;
const { Option } = Select;
class CreatePropertyForm extends Component {
  state = {
    isActive: true,
    status: "0",
    city: "0",
    type: "0",
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const {
        legalRecords,
        sitePlans,
        // discounts,
        salesPolicy,
        priceList,
        propertyImage,
        productTable,
        location,
        locationDescription,
      } = this.props;
      values = {
        ...values,
        legalRecords,
        sitePlans,
        // discounts,
        salesPolicy,
        priceList,
        propertyImage,
        productTable,
        location: {
          latitude: location[0],
          longitude: location[1],
        },
        locationDescription,
      };
      // eslint-disable-next-line no-console
      console.log(values);

      if (!err) {
        // console.log("Error cmnr =))");
      }
    });
  };

  onChangeSwitch = checked => {
    this.setState({
      isActive: checked,
    })
  };

  onChangeStatus = status => {
    this.setState({
      status: Number(status),
    })
  }

  onChangeCity = city => {
    this.setState({
      city: Number(city),
    })
  }

  onChangeType = type => {
    this.setState({
      type: Number(type),
    })
  }

  render() {
    const { form, legalRecords, sitePlans, discounts } = this.props;

    const { getFieldDecorator } = form;

    const legalArea = legalRecords.map(e => <LegalRecord key={e.id} id={e.id} />);
    const sitePlanArea = sitePlans.map(e => (
      <SitePlan key={e.id} id={e.id} link={e.link} />
    ));
    const discountArea = discounts.map(e => <Discount key={e.id} id={e.id} />);
    return (
      <StyleWrapper>
        <Layout>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator("propertyName", {
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
                  {getFieldDecorator("city", {
                      initialValue: this.state.status,
                      valuePropName: "option",
                    })(
                      <div className="city">
                        <label className="cityLabel">Thành phố</label>
                        <Select defaultValue={this.state.city} onChange={this.onChangeCity}>
                          <Option value="0">Đà Nẵng</Option>
                          <Option value="1">Hội An</Option>
                          <Option value="2">Hà Nội</Option>
                        </Select>
                      </div>,
                    )}
                </FormItem>
              </Col>
              <Col xs={6}>
                <FormItem>
                  {getFieldDecorator("type", {
                      initialValue: this.state.type,
                      valuePropName: "option",
                    })(
                      <div className="type">
                        <label className="typeLabel">Loại dự án</label>
                        <Select defaultValue={this.state.status} onChange={this.onChangeType}>
                          <Option value="0">Hotel</Option>
                          <Option value="1">Shop House</Option>
                          <Option value="2">Resort</Option>
                        </Select>
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
                    <Button type="primary" onClick={this.props.expandLegalRecord}>
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
                  {getFieldDecorator("commission")(
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
                    {getFieldDecorator("status", {
                      initialValue: this.state.status,
                      valuePropName: "option",
                    })(
                      <div className="status">
                        <label>Tình trạng</label>
                        <Select defaultValue={this.state.status} onChange={this.onChangeStatus}>
                          <Option value="0">Bình thường</Option>
                          <Option value="1">Hot</Option>
                          <Option value="2">New</Option>
                        </Select>
                      </div>,
                    )}
                    
                  </FormItem>
                </Col>
              </Row>
            </div>

            <div className="submitButton">
              <Button type="primary" onClick={this.handleSubmit}>
                Thêm dự án
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
  } = state.property;
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(CreatePropertyForm));
