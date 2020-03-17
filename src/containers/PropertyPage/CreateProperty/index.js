import React, { Component } from "react";
import i18n from "i18next";
import { Layout, Form, Input, Button, Switch, Select, Row, Col } from "antd";
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Editor from "../../../components/common/Editor/index";
import StyleWrapper from "./styles";
import LegalInfo from "./LegalInfo";
import Postion from "./Position";
import SitePlan from "./SitePlan";
import SalePolicy from "./SalePolicy";
import PriceList from "./PriceList";
import PropertyImage from "./PropertyImage";
import Discount from "./Discount";
import ProductTable from "./ProductTable";
import {
  addNewLegalInfoAction,
  addNewSitePlanAction,
  addNewDiscountAction,
} from "../../../redux/property/actions";

const FormItem = Form.Item;
const { Option } = Select;
class CreatePropertyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfLegalInfo: 1,
      numberOfSitePlan: 1,
      numberOfDiscount: 1,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { legalInfo, sitePlan, discounts, salePolicy, priceList, propertyImage, productTable} =this.props
      values = {
        ...values, 
        legalInfo, sitePlan, discounts, salePolicy, priceList, propertyImage, productTable,
      }
      console.log(values);

      if (!err) {
        console.log("OK");
      }
    });
  };

  onChangeSwitch = checked => {
    console.log(`switch to ${checked}`);
  };

  handleExpandDiscount = () => {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      numberOfDiscount: this.state.numberOfDiscount + 1,
    });
  };

  handleRemoveDiscount = e => {
    if (this.state.numberOfDiscount > 1) {
      e.target.parentNode.parentNode.parentNode.parentNode.remove();
    }
  };

  render() {
    const { form, legalInfo, sitePlan, discounts } = this.props;

    const { getFieldDecorator } = form;

    const legalArea = legalInfo.map(e => <LegalInfo key={e.id} id={e.id} />);
    const sitePlanArea = sitePlan.map(e => (
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

            <FormItem className="overview">
              {getFieldDecorator("overview", {
                rules: [
                  {
                    required: true,
                    message: "ABC",
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
                    <Button type="primary" onClick={this.props.expandLegalInfo}>
                      Thêm
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Postion />

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

            <SalePolicy />
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
                    {getFieldDecorator("display")(
                      <div className="display">
                        <label>Hiển thị</label>
                        <Switch defaultChecked onChange={this.onChangeSwitch} />
                      </div>,
                    )}
                  </FormItem>
                </Col>
                <Col offset={3} xs={6}>
                  {getFieldDecorator("status")(
                    <div className="status">
                      <label>Tình trạng</label>
                      <Select defaultValue="0">
                        <Option value="0">Bình thường</Option>
                        <Option value="1">Hot</Option>
                        <Option value="2">New</Option>
                      </Select>
                    </div>,
                  )}
                </Col>
              </Row>
            </div>

            <div className="submitButton">
              <Button type="primary" onClick={this.handleSubmit}>
                Thêm dự án
              </Button>
            </div>
          </Form>
        </Layout>
      </StyleWrapper>
    );
  }
}

const mapStateToProps = state => {
  const {legalInfo, sitePlan, discounts, salePolicy, priceList, propertyImage, productTable} = state.property
  return {
    legalInfo, sitePlan, discounts, salePolicy, priceList, propertyImage, productTable,
  }
}


const mapDispatchToProps = dispatch => ({
  expandLegalInfo: () => {
    dispatch(addNewLegalInfoAction());
  },

  expandSitePlan: () => {
    dispatch(addNewSitePlanAction());
  },

  expandDiscount: () => {
    dispatch(addNewDiscountAction());
  },
});

CreatePropertyForm.propTypes = {
  form: PropTypes.object,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(CreatePropertyForm));
