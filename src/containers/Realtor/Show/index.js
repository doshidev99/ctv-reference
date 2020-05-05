import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment'
import { Descriptions, Button, Modal, Row, Form,Input, Popconfirm, Avatar, Tag, Skeleton } from "antd";
import Wrapper from "./styles";
import {
  getOneRealtorAction,
  requestResend,
  confirmDigitalContractAction,
  requestResendIdentity,
  confirmIdentityAction,
 } from "../../../redux/realtor/actions";
import TransactionTable from './Transaction';
import { DIGITAL_CONTRACT_STATUS, IDENTITY_STATUS } from "../../../configs/constants"

class BasicInfo extends Component {
  state = {
    visible: false,
    visiblePopup: false,
    visibleAvatar: false,
    visibleCmnd: false,
    visiblePopupIdentity: false,
  }

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
    this.props.confirmContract(this.props.match.params.id, 2)
    this.setState({
      visible: false,
    });
  };

  handleOkIdentity = () => {
    this.props.confirmIdentity(this.props.match.params.id, 2)
    this.setState({
      visibleCmnd: false,
    });
  }

  handleOkPopup = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      await this.props.updateContractMessage(this.props.match.params.id, 3, values )
      this.setState({
        visiblePopup: false,
        visible: false,
      });
      })
  };
  
  handleOkPopupIdentity = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      await this.props.updateIdentityMessage(this.props.match.params.id, 3, values )
      this.setState({
        visiblePopupIdentity: false,
        visible: false,
        visibleCmnd: false,
      });
      })
  };

  handleCancel = async () => {
    this.setState({
      visible: false,
      visibleAvatar: false,
      visibleCmnd: false,
    });
  };

  handleCancelPopup = () => {
    this.setState({
      visiblePopup: false,
      visiblePopupIdentity: false,
    });
  };

  handleRequestResend = () => {
    this.setState({
      visiblePopup: true,
    })
  }

  handleRequestIdentity = () => {
    this.setState({
      visiblePopupIdentity: true,
    })
  }

  openAvatar = () => {
    this.setState({
      visibleAvatar: true,
    })
  }

  showModalCmnd = () => {
    this.setState({
      visibleCmnd: true,
    })
  }

  renderStatus = (status) => {
    const found = DIGITAL_CONTRACT_STATUS.find(item => item.id === status);
    return (
      <Tag color={found.color} key={status}>
        {found.text}
      </Tag>
    )
  }

  renderIdentityStatus = (status) => {
    const found = IDENTITY_STATUS.find(item => item.id === status);
    return (
      <Tag color={found.color} key={status}>
        {found.text}
      </Tag>
    )
  }

  render() {
    const { currentRealtor, loading, loadingPage } = this.props;
    const { getFieldDecorator } = this.props.form;
    const footer =  currentRealtor.digitalContractStatus === 1 ? [
      <Button key="back" onClick={this.handleCancel}>
              Trở lại
      </Button>,
      <Button key="submitRequest" type="danger" onClick={this.handleRequestResend}>
              Yêu cầu gửi lại
      </Button>,
      <Popconfirm
        title="Bạn có chắc muốn xác nhận?"
        onConfirm={this.handleOk}
        onCancel={this.handleCancelPopup}
        okText="Yes"
        cancelText="No">
        <Button key="submitOk" type="primary" loading={loading}>
                Xác nhận
        </Button>
      </Popconfirm>,
    ] : [
      <Button key="back" onClick={this.handleCancel}>
              Trở lại
      </Button>,
    ]

    const footerIdentity =  currentRealtor.identityStatus === 1 ? [
      <Button key="back" onClick={this.handleCancel}>
              Trở lại
      </Button>,
      <Button key="submitRequestIdentity" type="danger" onClick={this.handleRequestIdentity}>
              Yêu cầu gửi lại
      </Button>,
      <Popconfirm
        title="Bạn có chắc muốn xác nhận?"
        onConfirm={this.handleOkIdentity}
        onCancel={this.handleCancelPopup}
        key="confirmIdentity"
        okText="Yes"
        cancelText="No">
        <Button key="submitOkIdentity" type="primary" loading={loading}>
                Xác nhận
        </Button>
      </Popconfirm>,
    ] : [
      <Button key="backIdentity" onClick={this.handleCancel}>
              Trở lại
      </Button>,
    ]
    
    return (
      <Wrapper>
        { loadingPage ? <Skeleton active /> : (
          <div>
            <div className="section-header">
              <p>Thông tin chung</p>
            </div>
            <Avatar shape="square" size={128} src={currentRealtor.avatar} onClick={this.openAvatar} style={{marginBottom: '1em'}} />
            <Modal
              title="Ảnh đại diện"
              visible={this.state.visibleAvatar}
              onCancel={this.handleCancel}
              width="60%"
              footer={[]}
            >
              <div>
                <img src={currentRealtor.avatar} alt="avatar" style={{width: "100%", paddingBottom:"20px"}} />
              </div>
            </Modal>
            <Descriptions column={2}>
              <Descriptions.Item label="Họ và tên">{currentRealtor.fullName}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{currentRealtor.phone}</Descriptions.Item>
              <Descriptions.Item label="Email">
                {currentRealtor.email}
              </Descriptions.Item>
              <Descriptions.Item label="Giới tính">
                {currentRealtor.gender === 1 ? "Nam" : "Nữ"}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">{currentRealtor.birthday ?  moment(currentRealtor.birthday).format('DD-MM-YYYY'): 'Chưa cập nhật'}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ"> 
                {currentRealtor.address || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item label="Mã tiếp thị liên kết">
                {currentRealtor.affiliateCode}
              </Descriptions.Item>
              <Descriptions.Item label="Chứng minh nhân dân">
                {currentRealtor.identityStatus || currentRealtor.identityStatus === 0 ? this.renderIdentityStatus(currentRealtor.identityStatus): ''}
                {currentRealtor.identityStatus === 1 || currentRealtor.identityStatus === 2 ? (
                  <Button icon="folder" onClick={this.showModalCmnd} className="open-button-cmnd"> Xem ảnh </Button>

                ): ''}
                <Modal
                  title="Chứng minh nhân dân"
                  visible={this.state.visibleCmnd}
                  onCancel={this.handleCancel}
                  footer={footerIdentity}
                >
                  <div>
                    <p style={{fontWeight: 'bold'}}>
                      Số CMND:
                      {' '}
                      {currentRealtor.identityNumber}
                    </p>
                    <p>Ảnh mặt trước cmnd:</p>
                    <img src={currentRealtor.identityCardFront} alt="avatar" style={{width: "100%", marginBottom:"1em"}} />
                    <p>Ảnh mặt sau cmnd:</p>
                    <img src={currentRealtor.identityCardBack} alt="avatar" style={{width: "100%", marginBottom:"1em"}} />
                  </div>
                </Modal>
                <Modal
                  title="Yêu cầu gửi lại CMND"
                  visible={this.state.visiblePopupIdentity}
                  onOk={this.handleOkPopupIdentity}
                  onCancel={this.handleCancelPopup}
                  width="40%"
                >
                  <Row>
                    <Form layout="vertical">
                      <Form.Item label="Nội dung:">
                        {getFieldDecorator("content", {
                          rules: [{ required: true, message: 'Vui lòng nhập nội dung!'}],
                        })(
                          <Input.TextArea placeholder="Nội dung" />,
                        )}
                      </Form.Item>
                    </Form>
                  </Row>
                </Modal>
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Mô tả">
                {currentRealtor.description}
              </Descriptions.Item>
            </Descriptions>
        
            <div className="section-header">
              <p>Thông tin thanh toán</p>
            </div>
            <Descriptions column={2}>
              <Descriptions.Item label="Trạng thái hợp đồng">
                {currentRealtor.digitalContractStatus || currentRealtor.digitalContractStatus === 0 ? this.renderStatus(currentRealtor.digitalContractStatus): ''}
              </Descriptions.Item>
              <Descriptions.Item label="Hợp đồng điện tử">
                { (currentRealtor.digitalContractStatus === 1 || currentRealtor.digitalContractStatus === 2) && (
                <Button icon="folder" onClick={this.showModal} className="open-button"> Xem ảnh </Button>
            )}
              </Descriptions.Item>
              <Descriptions.Item label="Phương thức thanh toán">
                {currentRealtor.paymentMethod || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item label="Số tài khoản">
                {currentRealtor.accountNumber || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item label="Tổng tiền hoa hồng">
                {currentRealtor.totalCommission || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item label="Điểm">
                {currentRealtor.point || 'Chưa cập nhật'}
              </Descriptions.Item>
            </Descriptions>
            <Modal
              title="Hợp đồng điện tử"
              visible={this.state.visible}
              onCancel={this.handleCancel}
              width="60%"
              footer={footer}
            >
              <div className="contract-image-container">
                {currentRealtor.digitalContract ? ( currentRealtor.digitalContract.map((value, i) => {
              const num = i+ 1;
              return <img src={value} key={num} alt="digitalContract" style={{width: "100%", paddingBottom:"20px"}} />
            })) : ''}
              </div>
            </Modal>
            <Modal
              title="Yêu cầu gửi lại"
              visible={this.state.visiblePopup}
              onOk={this.handleOkPopup}
              onCancel={this.handleCancelPopup}
              width="40%"
            >
              <Row>
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                  <Form.Item label="Nội dung:">
                    {getFieldDecorator("content", {
                  rules: [{ required: true, message: 'Vui lòng nhập nội dung!'}],
                })(
                  <Input.TextArea placeholder="Nội dung" />,
                )}
                  </Form.Item>
                </Form>
              </Row>
            </Modal>
            <TransactionTable {...this.props} />
          </div>
      )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  const { currentRealtor, loading, loadingPage } = state.realtor;
  return {
    currentRealtor,
    loading,
    loadingPage,
  };
};

const mapDispatchToProps = dispatch => ({
  getRealtorInfo: id => {
    dispatch(getOneRealtorAction(id));
  },
  updateContractMessage: (id, status, payload ) => {
    dispatch(requestResend(id, status, payload))
  },
  confirmContract: (id, status) => {
    dispatch(confirmDigitalContractAction(id, status))
  },
  updateIdentityMessage: (id, status, payload) => {
    dispatch(requestResendIdentity(id, status, payload))
  },
  confirmIdentity: (id, status) => {
    dispatch(confirmIdentityAction(id, status))
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(BasicInfo));
