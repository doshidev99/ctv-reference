import React, { Component } from "react";
import i18n from "i18next";
import { Layout, Form, Input, Button, Switch, Select } from "antd";
import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
import Editor from "../../../components/common/Editor/index";
import StyleWrapper from "./styles";
import LegacyInfo from "./LegacyInfo";
import Postion from "./Position";
import SitePlan from "./SitePlan";
import SalePolicy from "./SalePolicy";
import PriceList from "./PriceList";
import PropertyImage from "./PropertyImage";
import Discount from "./Discount";
import ProductTable from "./ProductTable";

const FormItem = Form.Item;
const {Option} = Select
class CreatePropertyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfLegacy: 1,
      numberOfSitePlan: 1,
      numberOfDiscount: 1,
    };
  }

  onChangeSwitch = (checked) =>{
    console.log(`switch to ${checked}`);
  }

  handleExpandLegacy = () => {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      numberOfLegacy: this.state.numberOfLegacy + 1,
    });
  };

  handleRemoveLegacy =  async e => {
    
    if (this.state.numberOfLegacy > 1) {
      e.target.parentNode.parentNode.remove();
    }
  };

  handleExpandSitePlan = () => {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      numberOfSitePlan: this.state.numberOfSitePlan + 1,
    });
  };

  handleRemoveSitePlan= e => {
    if (this.state.numberOfSitePlan > 1) {
      e.target.parentNode.parentNode.remove();
    }
  };


  handleExpandDiscount = () => {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      numberOfDiscount: this.state.numberOfDiscount + 1,
    });
  }

  handleRemoveDiscount = e => {
    if (this.state.numberOfDiscount > 1) {
      e.target.parentNode.parentNode.remove();
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values);
      }
    });
  };

  render() {
    const { form } = this.props;

    const { getFieldDecorator } = form;
    const legacyArea = [];
    const sitePlanArea=[];
    const discountArea = []
    for (let i = 0; i < this.state.numberOfLegacy; i += 1) {
      legacyArea.push(
        <LegacyInfo
          key={`legacyInfo${i + 1}`}
          getFieldDecorator={getFieldDecorator}
          name={`legacyInfo${i + 1}`}
          handleExpandLegacy={this.handleExpandLegacy}
          handleRemoveLegacy={this.handleRemoveLegacy}
        />,
        
      
      );
    }
    for (let i = 0; i < this.state.numberOfSitePlan; i += 1) {
      sitePlanArea.push(
        <SitePlan
          key={`sitePlan${i + 1}`}
          getFieldDecorator={getFieldDecorator}
          name={`sitePlan${i + 1}`}
          handleExpandSitePlan={this.handleExpandSitePlan}
          handleRemoveSitePlan={this.handleRemoveSitePlan}
        />,
        
      
      );
    }
    for (let i = 0; i < this.state.numberOfDiscount; i += 1) {
      discountArea.push(
        <Discount
          key={`sitePlan${i + 1}`}
          getFieldDecorator={getFieldDecorator}
          name={`sitePlan${i + 1}`}
          handleExpandDiscount={this.handleExpandDiscount}
          handleRemoveDiscount={this.handleRemoveDiscount}
        />,
        
      
      );
    }

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
              <Editor label="Tổng quan dự án" onChange={this.handleChange} />
            </FormItem>
            {legacyArea}
            <Postion />
            {sitePlanArea}
            <SalePolicy />
            <PriceList />
            <PropertyImage />
            <FormItem>
              <div className="commission">
                <label className="commissionLabel">Tỉ lệ hoa hồng (%)</label>
                <Input />
              </div>
            </FormItem>
            <div>
              <div className="discountTitle">
                <span>Tỷ lệ chiết khấu</span>
              </div>
              {discountArea}
            </div>
            
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
              <div className="flex">
                <div className="display">
                  <label>Hiển thị</label>
                  <Switch defaultChecked onChange={this.onChangeSwitch} />
                </div>
                <div className="status">
                  <label>Tình trạng</label>
                  <Select defaultValue="0">
                    <Option value="0">Bình thường</Option>
                    <Option value="1">Hot</Option>
                    <Option value="2">New</Option>
                  </Select>

                </div>
              </div>
            </div>

            <div className="submitButton">
              <Button type="primary">Thêm dự án</Button>
            </div>
          </Form>
        </Layout>
      </StyleWrapper>
    );
  }
}

// const mapStateToProps = state => ({
//   data: state.property.properties,
// })

// const mapDispatchToProps = dispatch => ({

// })

CreatePropertyForm.propTypes = {
  form: PropTypes.object,
};
export default withRouter(Form.create()(CreatePropertyForm));
