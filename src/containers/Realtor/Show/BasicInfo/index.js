import React, { Component } from "react";
import { connect } from "react-redux";
import { Descriptions, Button, Modal } from "antd";
import Wrapper from "./styles";
import { getOneRealtorAction } from "../../../../redux/realtor/actions";

class BasicInfo extends Component {
  state = {visible: false}

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getRealtorInfo(id);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  renderSwitch = (param) => {
    switch(param) {
      case 0:
        return 'Chưa gửi';
      case 1:
        return 'Chờ xác nhận';
      case 2:
        return 'Xác nhận';
      case 3:
        return 'Yêu cầu gửi lại'
      default:
        return 'Chưa gửi';
    }
  };

  render() {
    const { fullName, phone, address, birthday } = this.props.currentRealtor;
    const { digitalContract, digitalContractStatus } = this.props.currentRealtor;
    
    return (
      <Wrapper>
        <div className="section-header">
          <p>Thông tin chung</p>
        </div>
        <Descriptions column={2}>
          <Descriptions.Item label="Họ và tên">{fullName}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{phone}</Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">{birthday}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ"> 
            {address}
          </Descriptions.Item>
        </Descriptions>
        <div className="section-header">
          <p>Hợp đồng điện tử</p>
        </div>
        <p>
          Trạng thái:
          {' '}
          {this.renderSwitch(digitalContractStatus)}
        </p>
        <Button icon="folder" onClick={this.showModal} className="open-button"> Xem ảnh </Button>
        <Modal
          title="Hợp đồng điện tử"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="60%"
        >
          <div className="contract-image-container">
            {digitalContract ? ( digitalContract.map((value) => {
              return <img src={value} alt="digitalContract" style={{width: "100%", paddingBottom:"20px"}} />
            })) : ''}
          </div>
        </Modal>
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
