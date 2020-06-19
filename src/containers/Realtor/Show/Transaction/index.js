import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Label from '../../../../components/RestField/Label';
import RestList from '../../../rest/List';
import {STATUS} from '../../../../configs/constants'
// import Filter from '../components/Filter';
import Wrapper from './styles';

class ListTransaction extends Component {
  componentDidMount() {
  }

  render() {
    const apiUrl = `realtors/${this.props.match.params.id}/transactions`;
    return (
      <Wrapper>
        <div className="section-header">
          <p>Danh sách giao dịch</p>
        </div>
        <RestList
          // filter={<Filter />}
          resource={apiUrl}
          initialFilter={{ limit: 5, skip: 0, filter: {} }}
          hasCreate={false}
          redirects={{
            show: 'newPage',
          }}
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
            render={value => STATUS.find(item => item.id === value)
            && STATUS.find(item => item.id === value).titleProp} />
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
