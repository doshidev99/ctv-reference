import React, { Component } from "react";
import { connect } from "react-redux";
import {  Button, Skeleton, Typography, Row, Col, Popconfirm } from "antd";
import i18n from "i18next";
import moment from "moment";
import Wrapper from "./styles";
// import { getOneRealtorAction } from "../../../../redux/realtor/actions";
import {
  getDetailTransactionAction,
  changeTypeAction,
} from "../../../../redux/transaction/actions";

const { Title } = Typography;
// import {
//   retrieveOneRecord
// } from "../../../../redux/rest/actions";

class BasicInfo extends Component {
  state = {visible: false}

  componentDidMount() {
    this.props.getDetail(this.props.match.params.id);
  }

  render() {
    const {
      transaction,
      isLoadingDetail,
      isLoadingStatus,
    } = this.props;
    return (
      <Wrapper>
        { isLoadingDetail ? ( <Skeleton active />):(
          <div className="info-box">
            <Title level={4}>{i18n.t("transaction.detail.generalInfo")}</Title>
            <Row>
              <Col span={10}>
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
                      1: 'Chờ xác nhận',
                      2: 'Đã xác nhận',
                      3: 'Đang thanh toán',
                      4: 'Đã thanh toán',
                      5: 'Đã hủy',
                    }[transaction.status]}
                </p>
              </Col>
              <Col span={10}>
                <p>
                  {i18n.t("transaction.detail.transDate")}
                  {': '}
                  {transaction.transactedAt ? moment(transaction.transactedAt).format('DD/MM/YYYY') : ''}
                </p>
                <p>
                    Loại giao dịch
                  {': '}
                  {{
                      1: 'Đặt cọc',
                      2: 'Đặt chỗ',
                    }[transaction.type]}
                  {transaction.type === 2 && transaction.status !== 5 ? (
                    <Popconfirm
                      title="Thay đổi loại giao dịch thành đặt cọc?"
                      onConfirm={() => this.props.changeType(this.props.match.params.id)}
                      okText="Đúng"
                      cancelText="Không"
                    >
                      <Button icon="swap" loading={isLoadingStatus} type="primary" className="changeTypeButton">Thay đổi</Button>
                    </Popconfirm>
                    ) : ''}
                    
                </p>
              </Col>
            </Row>
            <Title level={4}>{i18n.t("transaction.detail.infoRealtor")}</Title>
            <Row>
              <Col span={10}>
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
              <Col span={10}>
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
              <Col span={10}>
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
              <Col span={10}>
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
                  <Col span={10}>
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
                  <Col span={10}>
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
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  const { transaction, isLoadingDetail, isLoadingStatus } = state.transaction;
  return {
    transaction,
    isLoadingDetail,
    isLoadingStatus,
  };
};

const mapDispatchToProps = dispatch => ({
  getDetail: id => {
    dispatch(getDetailTransactionAction(id));
  },
  changeType: (id) => {
    dispatch(changeTypeAction(id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
