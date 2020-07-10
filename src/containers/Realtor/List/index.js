import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Tag } from "antd"
import Label from '../../../components/RestField/Label';
import RestList from '../../rest/List';
import Filter from '../components/Filter';
import RealtorWrapper from './styles';
import {DIGITAL_CONTRACT_STATUS} from "../../../configs/constants"
import { formatDate } from "../../../utils/textProcessor";

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
          hasExport
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
          <Label
            source="createdAt"
            title="Ngày đăng ký"
            render={(value) => formatDate(value)}
          />
        </RestList>
      </RealtorWrapper>
    );
  }
}

export default (ListRealtor);
