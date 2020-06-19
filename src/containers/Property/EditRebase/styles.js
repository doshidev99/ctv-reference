import styled from "styled-components";

export default styled.div`
  .propertyNameLabel,
  .commissionLabel,
  .discountTitle,
  .sitePlanTitle,
  .productTableTitle,
  .othersTitle,
  .legalTitle,
  .salesPolicyTitle,
  .cityLabel,
  .typeLabel,
  .openSaleDateLabel,
  .paymentMethodLabel {
    font-size: 18px;
    font-weight: 500;
  }
  .form-group-title {
    font-size: 18px;
    font-weight: 500;
  }

  .openSaleDate {
    .ant-calendar-picker {
      width: 100%;
    }
  }
  .overview {
    .ql-container {
      height: 350px;
    }
    label {
      font-size: 18px;
      font-weight: 500;
    }
  }

  .legalArea {
    margin-bottom: 10px;
  }

  .salesPolicyArea {
    margin: 20px 0;
    margin-right: 10px;
  }

  .locationDescription {
    .ql-container {
      height: 100px;
    }
  }

  .actionGroup {
    .ant-btn {
      margin-right: 10px;
    }
  }

  .discountArea {
    margin-bottom: 10px;
  }
  .productTable {
    margin-bottom: 10px;
  }

  .others {
    margin-bottom: 20px;
    .display {
      label {
        margin-right: 10px;
        line-height: 25px;
      }
    }

    .status {
      display: flex;
      label {
        width: 100px;
        line-height: 25px;
      }
    }
  }
  .submitButton {
    display: flex;
    justify-content: flex-end;
    button {
      width: 200px;
      margin: 1rem 0 0 0;
    }
  }
  .ant-table {
    color: #f2f3f5;
  }
  .ant-upload-list-item-info {
    max-width: 100px;
  }
  .blockEdit {
    background-color: white;
    padding: 15px;
    margin: 30px 0 50px 0
  }
`;
