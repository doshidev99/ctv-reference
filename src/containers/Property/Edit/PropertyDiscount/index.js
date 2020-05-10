import React, { Component } from "react";
import { 
  // Row, 
  // Col, 
  // Button, 
  Tabs, 
  // Input, 
  Form,
 } from "antd";
import { connect } from "react-redux";
import Wrapper from "./styles";
import DiscountGroup from "./DiscountGroup";
import {
  addNewPaymentMethodSuccessAction,
  removePaymentMethodAction,
} from "../../../../redux/property/actions";
import { getResources } from "../../../../redux/rest/selectors";


// const DISCOUNT_GROUPS = [
//   {
//     id: 1,
//     name: "Chiết khấu theo phương thức thanh toán",
//   },
//   {
//     id: 2,
//     name: "Chiết khấu mua nhiều",
//   },
// ];
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

    
    return (
      <Wrapper>
        <Tabs type="editable-card" onEdit={this.onEdit} hideAdd>
          {data.map((el) => (
            <Tabs.TabPane key={el.id} tab={el.name}>
              <DiscountGroup data={el} form={this.props.form} />
            </Tabs.TabPane>
          ))}
        </Tabs>
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
});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(PropertyDiscount));
