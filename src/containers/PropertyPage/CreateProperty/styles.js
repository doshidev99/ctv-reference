import styled from 'styled-components';

export default styled.div`
  .propertyNameLabel, .commissionLabel, .discountTitle, .sitePlanTitle, .productTableTitle, .othersTitle, .legalTitle {
    font-size: 18px;
    font-weight: 500;
  }
  
 
  .overview {
    .ql-container{
      height: 350px;
    }
  }

  .legalArea {
    margin-bottom: 10px;
  }

  .positionDescription {
    .ql-container{
      height: 100px;
    }
  }

  .actionGroup {
    .ant-btn {
      margin-right: 10px;
    }
  }

  .commission {
    display:flex;

    .commissionLabel {
      margin-right: 20px;
    }
    .ant-input{
      width: 100px;
    }
  }


  .others {
    margin-bottom: 20px;
    .display {
      label {
        margin-right: 10px;
        line-height: 25px
      }
    }

    .status {
      display: flex;
      label {
        width: 100px;
        line-height: 25px
      }
    }
    
    
  }

  .submitButton {
    display: flex;
    justify-content: center;

  }
`