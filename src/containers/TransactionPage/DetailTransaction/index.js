/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { withRouter } from "react-router-dom";
import i18n from "i18next";
import { Row, Col, Typography, Switch, Table, Skeleton, Button, Popconfirm, message } from "antd";
import StyleWrapper from "./styles";
import {
  getDetailTransactionAction,
  getTablePaymentAction,
} from "../../../redux/transaction/actions";

const { Title } = Typography;

class DetailTransaction extends Component {
  componentDidMount() {
    this.props.getDetail(this.props.match.params.id);
    this.props.getTablePayment(this.props.match.params.id)
  }

  onConfirm = () => {
    message.success('Thay đổi thành công')
  }

  renderColumn() {
    return [
      {
        title: "Đợt",
        dataIndex: "phase",
        key: "phase",
      },
      {
        title: "Số tiền",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Khả dụng",
        dataIndex: "available",
        key:'available',
        render: (e) => (
          <Popconfirm
            title="Bạn có chắc chắn muốn thay đổi?"
            onConfirm={this.onConfirm}
            okText="Chắc"
            cancelText="Không"
          >
            <Switch defaultChecked={e} />
          </Popconfirm>
        ),
      },
      {
        title: "Rút tiền",
        dataIndex: 'withdraw',
        key: "withdraw",
      render: (e) => (<Switch defaultChecked={e} />),
      },
    ];
  }

  render() {
    const {
      transaction,
      payment,
      isLoadingDetail,
      isLoadingTable,
    } = this.props;
    let buttonType;
    if(transaction.status === 0) {
      buttonType = <Button type="primary" className="confirmButton">Xác nhận đặt cọc</Button>
    } else if(transaction.status === 1) {
      buttonType = <Button type="primary" className="confirmButton">Xác nhận hoàn thành</Button>
    }

    return (
      <div>
        { isLoadingDetail ? ( <Skeleton active />):(
          <StyleWrapper>
            <div className="info-box">
              <Title level={4}>{i18n.t("transaction.detail.generalInfo")}</Title>
              <Row>
                <Col span={12}>
                  <p>
                    {i18n.t("transaction.detail.transCode")} 
                    {': '}
                    {transaction.code}
                  </p>
                  <p>
                    {i18n.t("transaction.detail.contractCode")}
                    {': '}
                    {transaction.contractCode}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    {i18n.t("transaction.detail.transDate")}
                    {': '}
                    {transaction.transactedAt ? moment(transaction.transactedAt).format('DD/MM/YYYY') : ''}
                  </p>
                  <p>
                    {i18n.t("transaction.detail.transStatus")} 
                    {': '}
                    {{
                  0: 'Đang xử lý',
                  1: 'Đã đặt cọc',
                  2: 'Đã hoàn thành',
                  3: 'Đã hủy',
                }[transaction.status]}
                  </p>
                </Col>
              </Row>
            </div>
            <div className="info-box">
              <Title level={4}>{i18n.t("transaction.detail.infoRealtor")}</Title>
              <Row>
                <Col span={12}>
                  <p>
                    {i18n.t("transaction.detail.fullName")}
                    {': '}
                    {transaction.realtor.fullName} 
                  </p>
                  <p>
                    {i18n.t("transaction.detail.birthday")}
                    {': '}
                    {transaction.realtor.birthday}
                  </p>
                </Col>
                <Col span={12}>
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
            </div>
            <div className="info-box">
              <Title level={4}>{i18n.t("transaction.detail.customerInfo")}</Title>
              <Row>
                <Col span={12}>
                  <p>
                    {i18n.t("transaction.detail.fullName")}
                    {': '}
                    {transaction.customer.fullName}
                  </p>
                  <p>
                    {i18n.t("transaction.detail.birthday")}
                    {': '}
                    {transaction.customer.birthday}
                  </p>
                  <p>
                    {i18n.t("transaction.detail.idCard")}
                    {': '}
                    {transaction.customer.identityNumber}
                  </p>
                </Col>
                <Col span={12}>
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
            </div>
            <div className="info-box">
              <Title level={4}>{i18n.t("transaction.detail.productInfo")}</Title>
              {  transaction.sections.map((section) => {
              return (
                <Row key={section.id}>
                  <Col span={12}>
                    <p>
                      {i18n.t("transaction.detail.productCode")}
                      {': '}
                      {section.id}
                    </p>
                    <p>
                      {i18n.t("transaction.detail.floor")}
                      {': '}
                      {section.floor}
                    </p>
                  </Col>
                  <Col span={12}>
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
              )
            })}
            
            </div>
            
          </StyleWrapper>
          )}
        {transaction.status === 0 ? '' : (
          <StyleWrapper>
            <div className="info-box table-box">
              <Title level={4}>{i18n.t("transaction.detail.commission")}</Title>
              <p>
                {i18n.t("transaction.detail.allCommission")}
                {': '}
                {transaction.totalCommission}
              </p>
              { isLoadingTable ? ( <Skeleton active />):(
                <Table columns={this.renderColumn()} dataSource={payment}  />
                )}
            </div>
          </StyleWrapper>
        )}
        <StyleWrapper>
          {buttonType}
        </StyleWrapper>
      </div>
    )
  }
}
DetailTransaction.propTypes = {
  isLoadingDetail: PropTypes.bool,
  isLoadingTable: PropTypes.bool,
  transaction: PropTypes.object,
  payment: PropTypes.array,
}

const mapStateToProps = state => {
  const {
    transaction,
    payment,
    total,
    isLoadingDetail,
    isLoadingTable,
  } = state.transaction;
  return {
    transaction,
    payment,
    total,
    isLoadingDetail,
    isLoadingTable,
  };
};

const mapDispatchToProps = dispatch => ({
  getDetail: id => {
    dispatch(getDetailTransactionAction(id));
  },
  getTablePayment: (id) => {
    dispatch(getTablePaymentAction(id))
  },
});
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
) (DetailTransaction)) 