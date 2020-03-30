/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { withRouter } from "react-router-dom";
import i18n from "i18next";
import { Layout, Row, Col, Form, Typography, Input, Table, Skeleton, Button, Modal, Popconfirm } from "antd";
import StyleWrapper from "./styles";
import Bonus from './ComissionBonus';
import StandingOrderImage from './OrderPicture'
import {
  getDetailTransactionAction,
  getTablePaymentAction,
  addNewBonusAction,
  confirmOrderAction,
  resendRequestAction,
  cancelTransactionAction,
  confirmTransactionAction,
  addPaymentAction,
} from "../../../redux/transaction/actions";

const { Title } = Typography;
const FormItem = Form.Item;
const columns = [
  {
    title: "Thời gian",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Số tiền",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Loại",
    dataIndex: "paymentType",
    key: "paymentType",
  },
  {
    title: "Tình trạng",
    dataIndex: "realtorReceived",
    key:'realtorReceived',
  },
]

class DetailTransaction extends Component {
  state = {
    visible: false,
    visibleCommission: false,
    visibleAdvance: false,
  };

  componentDidMount() {
    this.props.getDetail(this.props.match.params.id);
    this.props.getTablePayment(this.props.match.params.id)
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {bonus} = this.props;
        values = {
          ...values,
          bonus,
        };
        this.props.confirmTransaction(this.props.match.params.id, values);
      }
    });
  };

  handleSubmitCommission = e => {
    e.preventDefault();
    this.props.form.validateFields( async (err, values) => {
      if(!err) {
        values.type = 1;
        await this.props.addPayment(this.props.match.params.id,values);
        this.handleCancelModalCommission();
        this.props.form.payAmount = '';
        this.props.form.advanceAmount = '';
      }
    })
  }

  handleSubmitAdvance = e => {
    e.preventDefault();
    this.props.form.validateFields( async (err, values) => {
      if(!err) {
        values.type = 2;
        await this.props.addPayment(this.props.match.params.id,values);
        this.handleCancelModalAdvance();
      }
    })
  }
  
  showModal = async () => {
    await this.setState({
      visible: true,
    });
  };

  handleCancel = async () => {
    await this.setState({
      visible: false,
    });
  };

  showModalCommission = async () => {
    await this.setState({
      visibleCommission: true,
    })
  }

  showModalAdvance = async () => {
    await this.setState({
      visibleAdvance: true,
    })
  }

  handleCancelModalCommission = () => {
    this.setState({
      visibleCommission: false,
    });
  };

  handleCancelModalAdvance = () => {
    this.setState({
      visibleAdvance: false,
    });
  };

  render() {
    const {
      transaction,
      payment,
      isLoadingDetail,
      isLoadingTable,
      isLoadingStatus,
      isLoadingConfirm,
      bonus,
      form,
    } = this.props;
    const { visible, visibleCommission, visibleAdvance } = this.state;
    const { getFieldDecorator } = form;
    const bonusArea = bonus.map(e => <Bonus key={e.id} id={e.id} />);

    return (
      <StyleWrapper>
        <Layout>
          { isLoadingDetail ? ( <Skeleton active />):(
            <div className="info-box">
              <Title level={4}>{i18n.t("transaction.detail.generalInfo")}</Title>
              <Row>
                <Col span={8}>
                  <p>
                    {i18n.t("transaction.detail.transCode")} 
                    {': '}
                    {transaction.code}
                  </p>
                  <p>
                    {i18n.t("transaction.detail.transStatus")} 
                    {': '}
                    {{
                      0: 'Đang xử lý',
                      1: 'Chờ xác nhận đặt cọc',
                      2: 'Đã cọc',
                      3: 'Thanh toán hoa hồng',
                      4: 'Đã thanh toán',
                      5: 'Đã hủy',
                    }[transaction.status]}
                  </p>
                </Col>
                <Col span={8}>
                  <p>
                    {i18n.t("transaction.detail.transDate")}
                    {': '}
                    {transaction.transactedAt ? moment(transaction.transactedAt).format('DD/MM/YYYY') : ''}
                  </p>
                  
                </Col>
              </Row>
              <Title level={4}>{i18n.t("transaction.detail.infoRealtor")}</Title>
              <Row>
                <Col span={8}>
                  <p>
                    {i18n.t("transaction.detail.fullName")}
                    {': '}
                    {transaction.realtor.fullName} 
                  </p>
                  <p>
                    {i18n.t("transaction.detail.birthday")}
                    {': '}
                    {transaction.realtor.birthday ? moment(transaction.realtor.birthday).format('DD/MM/YYYY') : ''}
                  </p>
                </Col>
                <Col span={8}>
                  <p>
                    {i18n.t("transaction.detail.phoneNumber")}
                    {': '}
                    {transaction.realtor.phone}
                  </p>
                  <p>
                    {i18n.t("transaction.detail.address")}
                    {': '}
                    {transaction.realtor.address}
                  </p>
                </Col>
              </Row>
              <Title level={4}>{i18n.t("transaction.detail.customerInfo")}</Title>
              <Row>
                <Col span={8}>
                  <p>
                    {i18n.t("transaction.detail.fullName")}
                    {': '}
                    {transaction.customer.fullName}
                  </p>
                  <p>
                    {i18n.t("transaction.detail.birthday")}
                    {': '}
                    {transaction.customer.birthday  ? moment(transaction.customer.birthday).format('DD/MM/YYYY') : ''}
                  </p>
                  <p>
                    {i18n.t("transaction.detail.idCard")}
                    {': '}
                    {transaction.customer.identityNumber}
                  </p>
                </Col>
                <Col span={8}>
                  <p>
                    {i18n.t("transaction.detail.phoneNumber")}
                    {': '}
                    {transaction.customer.phone}
                  </p>
                  <p>
                    {i18n.t("transaction.detail.address")}
                    {': '}
                    {transaction.customer.address}
                  </p>
                  <p>
                    {i18n.t("transaction.detail.job")}
                    {': '}
                    {transaction.customer.occupation}
                  </p>
                </Col>
              </Row>
              <Title level={4}>{i18n.t("transaction.detail.productInfo")}</Title>
              {  transaction.sections.map((section) => {
              return (
                <Row key={section.id}>
                  <Col span={8}>
                    <p>
                      {i18n.t("transaction.detail.productCode")}
                      {': '}
                      {section.code}
                    </p>
                    <p>
                      {i18n.t("transaction.detail.floor")}
                      {': '}
                      {section.floor}
                    </p>
                  </Col>
                  <Col span={8}>
                    <p>
                      {i18n.t("transaction.detail.property")}
                      {': '}
                      {transaction.property.name}
                    </p>
                    <p>
                      {i18n.t("transaction.detail.area")}
                      {': '}
                      {section.area}
                    </p>
                  </Col>
                </Row>
              )})}
            </div>
          )}
          

          { isLoadingStatus ? ( <Skeleton active />) : (
            <div>
              {transaction.status === 0 && (
              <div className="upload"> 
                <StandingOrderImage id={this.props.match.params.id} />
              </div>
              )}
              { transaction.status === 1 && (
                <div className="confirm-box">
                  <Title level={4}>{i18n.t("transaction.detail.depositConfirm")}</Title>
                  <Row>
                    <Col span={12}>
                      <div className="image">
                        <img alt="deposit" src={transaction.standingOrder} />
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className="button-group">
                        <Button type="primary" onClick={() => this.props.confirmOrder(this.props.match.params.id)} block>
                          {i18n.t("transaction.detail.depositConfirm")}
                        </Button>
                        <Popconfirm title="Bạn có chắc chắn không？" okText="Chắc" cancelText="Không" onConfirm={() => this.props.resendRequest(this.props.match.params.id)}>
                          <Button type="primary" block>
                            {i18n.t("transaction.detail.sendRequest")}
                          </Button>
                        </Popconfirm>
                        <Popconfirm title="Bạn có chắc chắn không？" okText="Chắc" cancelText="Không" onConfirm={() => this.props.cancelTrans(this.props.match.params.id)}>
                          <Button type="danger" block>
                            {i18n.t("transaction.detail.cancelTrans")}
                          </Button>
                        </Popconfirm>
                        
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
              { transaction.status === 2 && (
                <div className="button">
                  { !transaction.standingOrder ? '': (
                    <Row>
                      <Title level={4}>Ủy nhiệm chi</Title>
                      <Col span={12}>
                        <div className="image">
                          <img alt="deposit" src={transaction.standingOrder} />
                        </div>
                      </Col>
                    </Row>
                  )}
                  <Row>
                    <Col span={8}>
                      <Button type="primary" size="large" onClick={this.showModal}>
                        {i18n.t("transaction.detail.successTransConfirm")}
                      </Button>
                    </Col>
                    <Col span={8}>
                      <Popconfirm title="Bạn có chắc chắn không？" okText="Chắc" cancelText="Không" onConfirm={() => this.props.cancelTrans(this.props.match.params.id)}>
                        <Button type="danger" size="large">
                          {i18n.t("transaction.detail.cancelTrans")}
                        </Button>
                      </Popconfirm>
                    </Col>
                  </Row>
                  
                  <Modal
                    title={i18n.t("transaction.detail.successTransConfirm")}
                    visible={visible}
                    // onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                      <Button key="back" onClick={this.handleCancel}>
                      Trở lại
                      </Button>,
                      <Button key="submit" type="primary" htmlType="submit" loading={isLoadingConfirm} onClick={this.handleSubmit}>
                      Gửi
                      </Button>,
                    ]}
                  >
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                      <p>
                        Tổng tiền hoa hồng gợi ý:
                        {'  '}
                        {transaction.commissionAmount}
                        {' vnd'}
                      </p>
                      <FormItem>
                        {getFieldDecorator("commissionAmount",{
                          rules: [
                            { required: true, message: 'Vui lòng nhập tiền hoa hồng!' },
                          ],
                        })(
                          <div className="totalCommission">
                            <label className="totalCommissionLabel">
                            Tổng tiền hoa hồng thực tế:
                            </label>
                            <Input />
                          </div>,
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator("contractCode", {
                          rule: [
                            { required: true, message: 'Vui lòng nhập mã hợp đồng!' },
                          ],
                        })(
                          <div className="contractCode">
                            <label className="contractCodeLabel">
                            Mã hợp đồng:
                            </label>
                            <Input />
                          </div>,
                      )}
                      </FormItem>
                      <p>Các khoảng thưởng:</p>
                      <div className="bonusArea">
                        {bonusArea}
                        <div className="actionGroup">
                          <Button icon="plus" onClick={this.props.expandBonus}>Thêm</Button>
                        </div>
                      </div>
                    </Form>
                  </Modal>
                </div>
              )}
              { (transaction.status === 3 || transaction.status === 4) && (
                <div className="table-box">
                  <Title level={4}>{i18n.t("transaction.detail.commission")}</Title>
                  <p>
                    {i18n.t("transaction.detail.allCommission")}
                    {': '}
                    {transaction.commissionAmount}
                  </p>
                  <p>
                    Tổng tiền hoa hồng đã thanh toán:
                    {transaction.totalReceivedCommissionAmount}
                  </p>
                  <p>
                    Tổng tiền hoa hồng chưa thanh toán:
                    {transaction.commissionAmount - transaction.totalReceivedCommissionAmount}
                  </p>
                  <Title level={4}>Các đợt thanh toán và tạm ứng</Title>
                  { (transaction.status === 4 || transaction.commissionAmount - transaction.totalReceivedCommissionAmount < 0) ? '': (
                    <Row style={{marginBottom: "10px"}}>
                      <Col span={6}>
                        <Button type="primary" icon="plus" onClick={this.showModalCommission}>Thêm đợt thanh toán</Button>
                      </Col>
                      <Col span={6}>
                        <Button type="primary" icon="plus" onClick={this.showModalAdvance}>Thêm đợt tạm ứng</Button>
                      </Col>
                    </Row>
                  )}
                  <Modal
                    title="Thêm đợt thanh toán"
                    visible={visibleCommission}
                    onOk={this.handleSubmitCommission}
                    onCancel={this.handleCancelModalCommission}
                    footer={[
                      <Button key="submit" type="primary" loading={isLoadingConfirm} onClick={this.handleSubmitCommission}>
                      Xác nhận
                      </Button>,
                    ]}
                  >
                    <Row>
                      <Col span={12}>
                        <p>Tổng tiền hoa hồng chưa thanh toán:</p>
                      </Col>
                      <Col span={12}>
                        {transaction.commissionAmount - transaction.totalReceivedCommissionAmount}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <p>Số tiền thanh toán:</p>
                      </Col>
                      <Col span={12}>
                        <Form layout="vertical" onSubmit={this.handleSubmitCommission}>
                          <FormItem>
                            {this.props.form.getFieldDecorator("payAmount", {
                              // rules: [{ required: true, message: 'Vui lòng nhập giá trị!'}],
                            })(
                              <div className="payAmount">
                                <Input />
                              </div>,
                            )}
                          </FormItem>
                        </Form>
                      </Col>
                    </Row>
                  </Modal>
                  <Modal
                    title="Thêm đợt tạm ứng"
                    visible={visibleAdvance}
                    onOk={this.handleSubmitAdvance}
                    onCancel={this.handleCancelModalAdvance}
                    footer={[
                      <Button key="submit" type="primary" loading={isLoadingConfirm} onClick={this.handleSubmitAdvance}>
                      Xác nhận
                      </Button>,
                    ]}
                   >
                    <Row>
                      <Col span={12}>
                        <p>Tổng tiền hoa hồng chưa thanh toán:</p>
                      </Col>
                      <Col span={12}>
                        {transaction.commissionAmount - transaction.totalReceivedCommissionAmount}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <p>Số tiền tạm ứng:</p>
                      </Col>
                      <Col span={12}>
                        <Form layout="vertical" onSubmit={this.handleSubmitAdvance}>
                          <FormItem>
                            {this.props.form.getFieldDecorator("advanceAmount", {
                              // rules: [{ required: true, message: 'Vui lòng nhập giá trị!'}],
                            })(
                              <div className="advanceAmount">
                                <Input />
                              </div>,
                            )}
                          </FormItem>
                        </Form>
                      </Col>
                    </Row>
                  </Modal>
                  <Table columns={columns} dataSource={payment} loading={isLoadingTable} />
                </div>
              )}
            </div>
          )}
        </Layout>
      </StyleWrapper>
    )
  }
}
DetailTransaction.propTypes = {
  isLoadingDetail: PropTypes.bool,
  isLoadingTable: PropTypes.bool,
  isLoadingStatus: PropTypes.bool,
  isLoadingConfirm: PropTypes.bool,
  transaction: PropTypes.object,
  payment: PropTypes.array,
  form: PropTypes.object,
}

const mapStateToProps = state => {
  const {
    transaction,
    payment,
    total,
    bonus,
    isLoadingDetail,
    isLoadingTable,
    isLoadingStatus,
    isLoadingConfirm,
    addPaymentSuccess,
    addPaymentFailure,
  } = state.transaction;
  return {
    transaction,
    payment,
    total,
    bonus,
    isLoadingDetail,
    isLoadingTable,
    isLoadingStatus,
    isLoadingConfirm,
    addPaymentSuccess,
    addPaymentFailure,
  };
};

const mapDispatchToProps = dispatch => ({
  getDetail: id => {
    dispatch(getDetailTransactionAction(id));
  },
  getTablePayment: (id) => {
    dispatch(getTablePaymentAction(id))
  },
  expandBonus: () => {
    dispatch(addNewBonusAction());
  },
  confirmOrder: (id) => {
    dispatch(confirmOrderAction(id))
  },
  resendRequest: (id) => {
    dispatch(resendRequestAction(id))
  },
  cancelTrans: (id) => {
    dispatch(cancelTransactionAction(id))
  },
  confirmTransaction: (id, payload) => {
    dispatch(confirmTransactionAction(id, payload));
  },
  addPayment: (id, payload) => {
    dispatch(addPaymentAction(id, payload));
  },
});
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
) (Form.create()(DetailTransaction))) 