import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Tag } from "antd"
import Label from '../../../components/RestField/Label';
import RestList from '../../rest/List';
import Filter from '../components/Filter';
import RealtorWrapper from './styles';
import {DIGITAL_CONTRACT_STATUS} from "../../../configs/constants"

class ListRealtor extends Component {
  componentDidMount() {}

  render() {
    return (
      <RealtorWrapper>
        <RestList
          title="Danh sách người môi giới"
          filter={<Filter />}
          resource="realtors"
          initialFilter={{ limit: 10, skip: 0, filter: {} }}
          onDoubleClick="show"
          hasCreate={false}
          redirects={{
            show: 'newPage',
          }}
          {...this.props}
        >
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
            render={value => {
              const found = DIGITAL_CONTRACT_STATUS.find(item => item.id === value)
              return (
                <Tag color={found.color} key={found.id}>
                  {found.text}
                </Tag>
              )
            }}
          />
        </RestList>
      </RealtorWrapper>
    );
  }
}

ListRealtor.propTypes = {
  onChange: PropTypes.func,
};

export default ListRealtor;
