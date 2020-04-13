import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Label from '../../../components/RestField/Label';
import RestList from '../../rest/List';
import Filter from '../components/Filter';
import RealtorWrapper from './styles';

class ListRealtor extends Component {
  componentDidMount() {}

  render() {
    const DIGITAL_CONTRACT_STATUS = [
      {
        id: 0,
        text: "Chưa gửi",
      },
      {
        id: 1,
        text: "Chờ xác nhận",
      },
      {
        id: 2,
        text: "Xác nhận",
      },
      {
        id: 3,
        text: "Yêu cầu gửi lại",
      },
    ]
    return (
      <RealtorWrapper>
        <RestList
          title="Danh sách người môi giới"
          filter={<Filter />}
          resource="realtors"
          initialFilter={{ limit: 10, skip: 0, filter: {} }}
          onDoubleClick="show"
          hasCreate={false}
          {...this.props}
        >
          <Label source="id" title="ID" width="90px" />
          <Label
            source="fullName"
            title="Họ và tên"
            render={( value, record) => {
            return <Link to={`/realtors/${record.id}/show`}>{value}</Link>
          }}  />
          <Label source="email" title="Email" />
          <Label source="phone" title="Số điện thoại" />
          <Label
            source="digitalContractStatus"
            title="Hợp đồng điện tử"
            render={value => DIGITAL_CONTRACT_STATUS.find(item => item.id === value)
            && DIGITAL_CONTRACT_STATUS.find(item => item.id === value).text} />
        </RestList>
      </RealtorWrapper>
    );
  }
}

ListRealtor.propTypes = {
  onChange: PropTypes.func,
};

export default ListRealtor;
