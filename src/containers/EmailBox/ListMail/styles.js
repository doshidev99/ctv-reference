import styled from 'styled-components';

export default styled.div`

  height: 100%;
  .loadingList {
    height: calc(100% - 110px);
    display: flex;
    flex-direction: column;
    justify-items: center;
    justify-content: center;
  }
 
  .bucketLabel {
    width: 100%;
    height: 80px;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding: 0px 30px;
    background-color: #F9F9F9;
    border-bottom: 1px solid #e9e9e9;

    h3 {
      font-size: 16px;
      font-weight: 500;
      text-transform: capitalize;
      color: #788195;
      line-height: 1.1;
    }

    @media only screen and (max-width: 767px) {
      height: 60px;
      padding: 0 20px;
    }
  }

  .searchMailWrapper {
    width: 100%;
    height: 40px;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    background-color: #F9F9F9;
    border-bottom: 1px solid #e9e9e9;

    .mailSearchBox {
      width: 100%;
      input {
        max-width: 100%;
      }
    }

    input {
      font-size: 14px;
      font-weight: 400;
      color: #979797;
      line-height: inherit;
      height: 39px;
      width: 100%;
      padding: 0 30px;
      margin-bottom: 0;
      border: 0;
      outline: 0 !important;
      overflow: hidden;
      background-color: #F9F9F9;
      &:focus,
      &:hover {
        border-color: transparent;
        box-shadow: none;
      }

      @media only screen and (max-width: 767px) {
        padding: 0 20px;
      }

      &::-webkit-input-placeholder {
        color: #bababa;
      }

      &:-moz-placeholder {
        color: #bababa;
      }

      &::-moz-placeholder {
        color: #bababa;
      }
      &:-ms-input-placeholder {
        color: #bababa;
      }
    }

    .ant-input-suffix {
      display: none;
    }   
  }

  .listMailScrollBar {
    height: calc(100% - 120px);
    .listMailWrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: auto;
      .mailList {
        width: 100%;
        padding: 30px;
        display: flex;
        flex-shrink: 0;
        border-bottom: 1px solid #e9e9e9;
        overflow: hidden;
        position: relative;
        text-align: ${props => (props['data-rtl'] === 'rtl' ? 'right' : 'left')};
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.215,0.61,0.355,1);
  
        .labelIndicator {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: ${props =>
            props['data-rtl'] === 'rtl' ? '0 15px 15px 0;' : '15px 15px 0 0'};
          border-color: transparent transparent transparent transparent;
          position: absolute;
          top: 0;
          left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
          right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
        }
  
        &:last-child {
          border-bottom: 0;
        }
  
        .recipentsImg {
          width: 48px;
          height: 48px;
          display: -webkit-inline-flex;
          display: -ms-inline-flex;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
          border-radius: 50%;
  
  
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
  
          span {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #39435f;
            font-size: 16px;
            font-weight: 300;
            color: #fff;
            letter-spacing: 1px;
          }
        }
  
        .mailInfo {
          width: 100%;
          padding: ${props => (props['data-rtl'] === 'rtl' ? '0 20px 0 0' : '0 0 0 20px')};
  
          .infoHead {
            width: 100%;
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            margin-bottom: 3px;
  
            .recipents {
              font-size: 13px;
              font-weight: 400;
              color: #788195;
            }
  
            .receiveDate {
              font-size: 11px;
              font-weight: 400;
              color: #788195;
              flex-shrink: 0;
            }
          }
  
          .subject {
            font-size: 14px;
            font-weight: 500;
            color: #2d3446;
            margin: 0;
          }
        }
  
        &.unreadMail {
          background-color:  #F6F8FB;
        }
  
        &:hover {
          background-color: #F6F8FB;
        }
  
        &.activeMail {
          background-color: #E9EBEE;
        }
      }
  
      .isoDescription {
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 30px;
        width: 100%;
        overflow: hidden;
      }
    }
  }

  
`

