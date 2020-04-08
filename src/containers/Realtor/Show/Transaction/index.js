import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Label from '../../../../components/RestField/Label';
import RestList from '../../../rest/List';
// import Filter from '../components/Filter';
import Wrapper from './styles';

class ListTransaction extends Component {
  componentDidMount() {}

  render() {
    const apiUrl = `realtors/${this.props.match.params.id}/transactions`;
    const TRANSACTION_STATUS = [
      {
        id: 0,
        text: "Đang chờ xử lý",
      },
      {
        id: 1,
        text: "Đang chờ xác nhận",
      },
      {
        id: 2,
        text: "Đã xác nhận",
      },
      {
        id: 3,
        text: "Đang chi trả",
      },
      {
        id: 4,
        text: "Hoàn thành",
      },
      {
        id: 5,
        text: "Bị hủy",
      },
    ]
    return (
      <Wrapper>
        <div className="section-header">
          <p>Giao dịch</p>
        </div>
        <RestList
          // filter={<Filter />}
          resource={apiUrl}
          initialFilter={{ limit: 5, skip: 0, filter: {} }}
          hasCreate={false}
          {...this.props}
        >
          <Label
            source="code"
            title="Mã giao dịch"
            render={( value, record) => {
            return <Link to={`/transactions/${record.id}/show`}>{value}</Link>
          }} />
          <Label source="sections[0].code" title="Mã sản phẩm" />
          <Label source="property.name" title="Dự án" />
          <Label source="customer.fullName" title="Tên khách hàng" />
          <Label
            source="status"
            title="Trạng thái"
            render={value => TRANSACTION_STATUS.find(item => item.id === value)
            && TRANSACTION_STATUS.find(item => item.id === value).text} />
          <Label source="commissionAmount" title="Hoa hồng" />
        </RestList>
      </Wrapper>
    );
  }
}

ListTransaction.propTypes = {
  onChange: PropTypes.func,
};

export default ListTransaction;
