import React, { Component } from "react";
import { 
  // Row, 
  // Col, 
  // Button, 
  Tabs, 
  // Input, 
  Form,
  Button,
  message,
 } from "antd";
import { connect } from "react-redux";
import { object } from "prop-types";
import Wrapper from "./styles";
import DiscountGroup from "./DiscountGroup";
import {
  addNewPaymentMethodSuccessAction,
  removePaymentMethodAction,
  submitEditChildrenProperty,
} from "../../../../redux/property/actions";
import { getResources } from "../../../../redux/rest/selectors";

class PropertyDiscount extends Component {
  constructor(props) {
    super(props);
    const initialFilter = { limit: 50, skip: 0, order: "id", filter: {} };
    if(!this.props.groups) {
      this.props.retrieveRefferences(
        "discount-groups",
        initialFilter || { limit: 20, skip: 0, filter: {} },
        true,
      );
    }
  }

  clean = (obj) => {
    Object.keys(obj).forEach(
      (key) => (obj[key] == null || object[key] === "") && delete obj[key],
    );
  };

  handleSubmit = async (k) => {
    k.preventDefault();
    try {
      this.props.discounts.forEach((e) => {
        if (e.propertyId) {
          delete e.propertyId;
        }
        if (typeof e.id !== "number") {
          delete e.id
        }
        this.clean(e);
        if (e.time && e.time.length === 2) {
          const { time } = e;
          [e.beganAt, e.endedAt] = time;
          delete e.time;
        } else {
          e.beganAt = null;
          e.endedAt = null;
          delete e.time;
        }
      });
      const values = {
        discounts: this.props.discounts,
      };
      await this.props.submitEdit(this.props.idProperty, values)
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  }

  render() {
    const { discounts, groups } = this.props;
    const groupsExceptPayment =
      groups && groups.list ? groups.list: [];
    const data = groupsExceptPayment.map((group) => {
      const discountsOfGroup = discounts.filter((e) => e.groupId === group.id);
      return {
        id: group.id,
        name: group.name,
        discounts: discountsOfGroup,
      };
    });

    const buttonEdit =  (
      <div className="submitButton">
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          // onClick={this.handleSubmit}
          // loading={createPropertyLoading}
          >
          {/* {createPropertyLoading ? "" : "Cập nhật thông tin"} */}
          Cập nhật thông tin
        </Button>
      </div>
    )

    return (
      <Wrapper>
        <Form onSubmit={this.handleSubmit}>
          <Tabs type="editable-card" onEdit={this.onEdit} hideAdd>
            {data.map((el) => (
              <Tabs.TabPane key={el.id} tab={el.name}>
                <DiscountGroup data={el} form={this.props.form} />
              </Tabs.TabPane>
          ))}
          </Tabs>
          {buttonEdit}
        </Form>
        
      </Wrapper>
    );
  }
}
const mapStateToProps = (state) => {
  const { discounts } = state.property;
  return {
    discounts,
    groups: getResources(state, "discount-groups"),
  };
};
const mapDispatchToProps = (dispatch) => ({
  addNewPaymentMethod: (name) => {
    dispatch(addNewPaymentMethodSuccessAction(name));
  },
  removePaymentMethod: (id) => {
    dispatch(removePaymentMethodAction(id));
  },
  submitEdit: (id, values) => {
    dispatch(submitEditChildrenProperty(id, values))
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(PropertyDiscount));
