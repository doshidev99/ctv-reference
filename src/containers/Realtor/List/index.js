import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Tag } from "antd"
import Label from '../../../components/RestField/Label';
import RestList from '../../rest/List';
import Filter from '../components/Filter';
import RealtorWrapper from './styles';
import {DIGITAL_CONTRACT_STATUS} from "../../../configs/constants"
import {
  getExcelAction,
} from "../../../redux/realtor/exportExcel/actions"

class ListRealtor extends Component {
  componentDidMount() {}

  handleClick = () => {
    this.props.ExportExcel();
  }

  render() {
    const { urlExcel } = this.props;
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
        <div className="buttonExport">
          <Button type="primary" onClick={this.handleClick} href={urlExcel}>
            Export Excel
          </Button>
        </div>
      </RealtorWrapper>
    );
  }
}

const mapStateToProps = state => ({
  urlExcel: state.exportExcel.location,
})

const mapDispatchToProps = dispatch => ({
  ExportExcel: () =>{
    dispatch(getExcelAction());
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListRealtor);
