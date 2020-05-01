import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment'
import { Descriptions, Button, Modal, Row, Form,Input, Popconfirm } from "antd";
import Wrapper from "./styles";
import { getOneRealtorAction, requestResend, confirmDigitalContractAction } from "../../../../redux/realtor/actions";

class BasicInfo extends Component {
  state = {visible: false, visiblePopup: false}

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

  handleCancel = async () => {
    this.setState({
      visible: false,
    });
  };

  handleCancelPopup = () => {
    this.setState({
      visiblePopup: false,
    });
  };

  handleRequestResend = () => {
    this.setState({
      visiblePopup: true,
    })
  }

  renderSwitch = (param) => {
    switch(param) {
      case 0:
        return 'Chưa gửi';
      case 1:
        return 'Đang chờ xác nhận';
      case 2:
        return 'Đã Xác nhận';
      case 3:
        return 'Đã yêu cầu gửi lại'
      default:
        return 'Chưa gửi';
    }
  };

  render() {
    const { fullName, phone, address, birthday, digitalContract, digitalContractStatus } = this.props.currentRealtor;
    const { getFieldDecorator } = this.props.form;
    const footer =  digitalContractStatus === 1 ? [
      <Button key="back" onClick={this.handleCancel}>
              Trở lại
      </Button>,
      <Button key="submitRequest" type="dashed" onClick={this.handleRequestResend}>
              Yêu cầu gửi lại
      </Button>,
      <Popconfirm
        title="Bạn có chắc muốn xác nhận?"
        onConfirm={this.handleOk}
              // onCancel={cancel}
        okText="Yes"
        cancelText="No">
        <Button key="submitOk" type="primary" loading={this.props.loading}>
                Xác nhận
        </Button>
      </Popconfirm>,
    ] : [
      <Button key="back" onClick={this.handleCancel}>
              Trở lại
      </Button>,
    ]
    
    return (
      <Wrapper>
        <div className="section-header">
          <p>Thông tin chung</p>
        </div>
        <Descriptions column={2}>
          <Descriptions.Item label="Họ và tên">{fullName}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{phone}</Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">{moment(birthday).format('DD-MM-YYYY')}</Descriptions.Item>
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
        { (digitalContractStatus === 1 || digitalContractStatus === 2) && (
          <Button icon="folder" onClick={this.showModal} className="open-button"> Xem ảnh </Button>
        )}
        <Modal
          title="Hợp đồng điện tử"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width="60%"
          footer={footer}
        >
          <div className="contract-image-container">
            {digitalContract ? ( digitalContract.map((value, i) => {
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
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  const { currentRealtor, loading } = state.realtor;
  return {
    currentRealtor,
    loading,
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
});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(BasicInfo));
