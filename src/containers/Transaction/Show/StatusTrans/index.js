import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import i18n from "i18next";
import {  Row, Col, Form, Typography, Input, Skeleton, Select, Button, Radio, Modal, Popconfirm, Checkbox } from "antd";
import StyleWrapper from "./styles";
import Bonus from './ComissionBonus';
import StandingOrderImage from './OrderPicture';
import TablePayment from './TablePayment';
import {
  addNewBonusAction,
  confirmOrderAction,
  resendRequestAction,
  cancelTransactionAction,
  confirmTransactionAction,
  changeTypeAction,
  submitUpdateFormAction,
} from "../../../../redux/transaction/actions";
import {getPaymentMethodAction, getDiscountGroupAction } from "../../../../redux/property/actions"

const FormItem = Form.Item;
const { Title } = Typography

class StatusTrans extends Component {
  state = {
    visibleEdit: false,
    visibleCommission: false,
    visibleAdvance: false,
  };

  componentDidMount() {}

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
      if (!err) {
        await this.props.addPayment(this.props.match.params.id,values);
        this.handleCancelModalCommission();
      }
    });
  }
  
  handleSubmitEdit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.discountIds = values.discountIds || [];
        values.discountIds = values.discountIds || values.discountId ? values.discountIds.concat(values.discountId.filter(Boolean)) : [];
        const {bonus} = this.props;
        values = {
          ...values,
          rewards: bonus,
        };
        this.props.submitEditForm(this.props.match.params.id,values);
      }
    });
  };

  handleCancel = async () => {
    await this.setState({
      visibleEdit:false,
    });
  };

  showModalCommission = async () => {
    await this.setState({
      visibleCommission: true,
    })
  }

  showModalEdit = async () => {
    await this.setState({
      visibleEdit: true,
    })
    this.props.getPaymentMethod(this.props.transaction.propertyId);
    this.props.getDiscountGroup(this.props.transaction.propertyId);
  }

  handleCancelModalCommission = () => {
    this.setState({
      visibleCommission: false,
    });
  };


  render() {
    const {
      transaction,
      isLoadingStatus,
      isLoadingConfirm,
      bonus,
      form,
      paymentMethods,
      discountGroup,
      } = this.props;
      const { visibleEdit } = this.state;
      const { getFieldDecorator } = form;
      const bonusArea = bonus.map(e => <Bonus key={e.id} id={e.id} />);

    return (
      <StyleWrapper>
        {isLoadingStatus ? ( <Skeleton active />) : (
          <div>
            {transaction.status === 0 && (
              <div className="upload">
                { transaction.type === 1 ? <StandingOrderImage id={this.props.match.params.id} /> : ''}
                <Popconfirm title="Bạn có chắc chắn không？" okText="Chắc" cancelText="Không" onConfirm={() => this.props.cancelTrans(this.props.match.params.id)}>
                  <Button size="large" type="danger">
                    {i18n.t("transaction.detail.cancelTrans")}
                  </Button>
                </Popconfirm>
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
                <Row className="buttonGrConfirm">
                  <Button type="primary" size="large" onClick={this.showModalEdit}>
                        Chuyển sang trạng thái đang thanh toán
                  </Button>
                  <Popconfirm title="Bạn có chắc chắn không？" okText="Chắc" cancelText="Không" onConfirm={() => this.props.cancelTrans(this.props.match.params.id)}>
                    <Button type="danger" size="large">
                      {i18n.t("transaction.detail.cancelTrans")}
                    </Button>
                  </Popconfirm>
                </Row>

                <Modal
                  title="Chỉnh sửa giao dịch"
                  width="40%"
                  visible={visibleEdit}
                      // onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={[
                    <Button key="back" size='large' onClick={this.handleCancel}>
                        Trở lại
                    </Button>,
                    <Button key="submit" size='large' type="primary" htmlType="submit" loading={isLoadingConfirm} onClick={this.handleSubmitEdit}>
                        Hoàn thành
                    </Button>,
                      ]}
                    >
                  <Form layout="vertical" onSubmit={this.handleSubmitEdit}>
                    <FormItem label="Tổng tiền hoa hồng thực tế:">
                      {getFieldDecorator("actualCommissionAmount",{
                            rules: [
                              { required: true, message: 'Vui lòng nhập tổng tiền hoa hồng thực tế!' },
                            ],
                            initialValue: transaction.actualCommissionAmount,
                          })(
                            <Input placeholder="Tổng tiền hoa hồng thực tế" />,
                          )}
                    </FormItem>
                    <FormItem label="Mã hợp đồng:">
                      {getFieldDecorator("contractCode",{
                            rules: [
                              { required: true, message: 'Vui lòng nhập mã hợp đồng!' },
                            ],
                            initialValue: transaction.contractCode,
                          })(
                            <Input placeholder="Mã hợp đồng" />,
                        )}
                    </FormItem>
                    <FormItem label="Phần trăm(%) thuế  TNCN:">
                      {getFieldDecorator("personalIncomeTaxRate",{
                            rules: [
                              { required: true, message: 'Vui lòng nhập giá tri %' },
                            ],
                            initialValue: transaction.personalIncomeTaxRate,
                          })(
                            <Input placeholder="Phần trăm(%) thuế  TNCN" />,
                        )}
                    </FormItem>
                    <FormItem label="Phương thức thanh toán:">
                      {getFieldDecorator("paymentMethodId", {
                            initialValue: transaction.paymentMethodId || '',
                            })(
                              <Select
                                // initialValue={transaction.paymentMethodId || ''}
                                placeholder="Chọn phương pháp thanh toán"
                            >
                                {paymentMethods? paymentMethods.map((method) =>  (
                                  <Select.Option key={method.id} value={method.id}>{method.name}</Select.Option>
                              )) : ''}
                              </Select>,
                          )}
                    </FormItem>
                    <div className="discountGroupLabel">
                      <p style={{fontWeight: 'bold'}}>Danh sách chiết khấu:</p>
                    </div>
                    {discountGroup.map((group) => (
                      <div key={group.id} style={{paddingLeft: "15px"}}>
                        <p style={{margin: '0', fontWeight: '600'}}>
                          {group.name}
                          {': '}
                        </p>
                        { group.name === 'Chiết khấu khác' ?
                                (getFieldDecorator("discountIds")(
                                  <Checkbox.Group onChange={this.onCheckbox} style={{paddingLeft: "15px"}}>
                                    {group.discounts.map((discount) => (
                                      <Row key={discount.id}>
                                        <Checkbox value={discount.id} style={{marginBottom: "5px"}}>{discount.name}</Checkbox>
                                      </Row>
                                  ))}
                                  </Checkbox.Group>,
                                )): ( getFieldDecorator(`discountId[${group.id}]`)(
                                  <Radio.Group name="radiogroup" onChange={this.onChangeRadio} style={{paddingLeft: "15px"}}>
                                    {group.discounts.map((discount) => (
                                      <Row key={discount.id}>
                                        <Radio value={discount.id} style={{marginBottom: "5px"}}>{discount.name}</Radio>
                                      </Row>
                                    ))}
                                  </Radio.Group>,
                                ))}
                      </div>
                          ))}
                    <p style={{fontWeight: "bold"}}>Các khoảng thưởng:</p>
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
                <Title level={4}>Thông tin chi tiết giao dịch</Title>
                <Row>
                  <Col span={10}>
                    <p>
                      {i18n.t("transaction.detail.allCommission")}
                      {': '}
                      {transaction.actualCommissionAmount}
                      {' VND'}
                    </p>
                    <p>
                        Tổng tiền hoa hồng đã thanh toán:
                      {transaction.withdrawnAmount}
                      {' VND'}
                    </p>
                    <p>
                        Tổng tiền hoa hồng chưa thanh toán:
                      {transaction.actualCommissionAmount && transaction.withdrawnAmount !== null ? transaction.actualCommissionAmount - transaction.withdrawnAmount : ''}
                      {' VND'}
                    </p>
                    <p style={{marginBottom: "2px"}}>
                        Các khoản thưởng:
                    </p>
                    <ul>
                      {transaction.rewards.map( reward => (
                        <li key={reward.id}>
                          {reward.name}
                              :
                          {' '}
                          {reward.value}
                          {' VND'}
                        </li>
                          ))}
                    </ul>
                    <p style={{fontWeight: 'bold'}}>
                        Yêu cầu thanh toán:
                      {transaction.requestAmount || '0'}
                      {' VND'}
                    </p>
                  </Col>
                  <Col span={10}>
                    <p>
                        Mã hợp đồng:
                      {transaction.contractCode}
                    </p>
                    <p>
                        Phương thức thanh toán:
                      {transaction.paymentMethod.name}
                    </p>
                    <p style={{marginBottom: "2px"}}>
                        Chiết khấu:
                    </p>
                    <ul>
                      {transaction.discounts.map(e =>(
                        <li key={e.id}>
                          {e.name}
                          {': '}
                          {e.value}
                          {e.type === 1 ? '%': 'VND'}
                        </li>
                          ))}
                    </ul>
                  </Col>
                </Row>

                <Title level={4}>Các đợt thanh toán</Title>
                <TablePayment {...this.props} />
              </div>
            )}
          </div>
        )}
      </StyleWrapper>
    );
  }
}

StatusTrans.propTypes = {
  isLoadingStatus: PropTypes.bool,
  isLoadingConfirm: PropTypes.bool,
  transaction: PropTypes.object,
  form: PropTypes.object,
}

const mapStateToProps = state => {
  const {
    transaction,
    total,
    bonus,
    isLoadingStatus,
    isLoadingConfirm,
    addPaymentSuccess,
    addPaymentFailure,
  } = state.transaction;
  const {paymentMethods, discountGroup} = state.property;
  return {
    transaction,
    total,
    bonus,
    isLoadingStatus,
    isLoadingConfirm,
    addPaymentSuccess,
    addPaymentFailure,
    paymentMethods,
    discountGroup,
  };
};

const mapDispatchToProps = dispatch => ({
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
  changeType: (id) => {
    dispatch(changeTypeAction(id));
  },
  submitEditForm: (id, payload) => {
    dispatch(submitUpdateFormAction(id,payload))
  },
  getPaymentMethod: (id) => {
    dispatch(getPaymentMethodAction(id))
  },
  getDiscountGroup: (id) => {
    dispatch(getDiscountGroupAction(id))
  },
});
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
) (Form.create()(StatusTrans))) 