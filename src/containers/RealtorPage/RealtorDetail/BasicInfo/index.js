import React, { Component } from "react";
import { connect } from "react-redux";
import { Descriptions } from "antd";
import Wrapper from "./styles";
import { getOneRealtorAction } from "../../../../redux/realtor/actions";

class BasicInfo extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getRealtorInfo(id);
  }

  render() {
    const { fullName, phone, address, birthday } = this.props.currentRealtor;
    let { digitalContract } = this.props.currentRealtor;
    digitalContract = digitalContract || "Chưa cập nhật";
    return (
      <Wrapper>
        <div className="section-header">
          <span>Thông tin chung</span>
        </div>
        <Descriptions column={2}>
          <Descriptions.Item label="Họ và tên">{fullName}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{phone}</Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">{birthday}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ"> 
            {address}
          </Descriptions.Item>
          <Descriptions.Item label="Hợp đồng điện tử">
            {digitalContract}
          </Descriptions.Item>
        </Descriptions>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  const { currentRealtor } = state.realtor;
  return {
    currentRealtor,
  };
};

const mapDispatchToProps = dispatch => ({
  getRealtorInfo: id => {
    dispatch(getOneRealtorAction(id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
