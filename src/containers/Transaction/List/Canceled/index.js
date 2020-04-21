import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Label from "../../../../components/RestField/Label";
import RestList from "../../../rest/List";
import Filter from "../../Components/CanceledFilter";
import PropertyWrapper from "./styles";
import { formatDate } from "../../../../utils/textProcessor";


class ListTransaction extends Component {
  componentDidMount() {}

  render() {

    return (
      <PropertyWrapper>
        <RestList
          // title="Danh sách giao dịch"
          filter={<Filter />}
          resource="transactions"
          initialFilter={{ limit: 10, skip: 0, order: "id", filter: {status: 5} }}
          hasCreate={false}
          {...this.props}
          redirects={{
            create: 'newPage',
          }}
        >
          <Label
            source="createdAt"
            title="Thời gian"
            render={(value) => formatDate(value)}
          />
          <Label
            source="code"
            title="Mã giao dịch"
            render={( value,record) => {
              return <Link to={`/transactions/${record.id}/show`}>{value}</Link>
            }}
          />
          <Label source="property.name" title="Dự án" />
          <Label source="realtor.fullName" title="Tên CTV" />
          <Label source="customer.fullName" title="Tên KH" />
        </RestList>
      </PropertyWrapper>
    );
  }
}

ListTransaction.propTypes = {
  onChange: PropTypes.func,
};

export default ListTransaction;
