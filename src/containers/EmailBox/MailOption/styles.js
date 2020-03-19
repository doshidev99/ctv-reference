import styled from "styled-components";

export default styled.div`

  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  .composeBtn {
    width: 100%;
    padding: 0px 30px;
    height: 80px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    background-color: #F9F9F9;
    border-bottom: 1px solid rgba(228,228,228,0.65);
    .ant-btn {
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      background-color: #4482FF;
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      border: 0;
      outline: 0;
      cursor: pointer;
      

      &:hover {
        background-color: #3A78F5;
      }
    } 
  }

  .mailScrollBar {
    height: 100%;
    .mailBucketList {
      padding: 35px 0 0;
  
      .singleBucket {
        width: 100%;
        display: flex;
        padding: 0 30px;
        margin-bottom: 15px;
        align-items: center;
        cursor: pointer;
        justify-content: space-between;
  
        span {
          font-size: 14px;
          font-weight: 400;
          color:#788195
          cursor: pointer;
          text-transform: capitalize;
          line-height: 1.1;
          transition: all 0.3s cubic-bezier(0.215,0.61,0.355,1);
        }
  
        .mailBadge {
          font-size: 12px;
          font-weight: 500;
          color: #788195;
          line-height: normal;
          margin: 0 0 0 auto;
          display: -webkit-inline-flex;
          display: -ms-inline-flex;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
  
        &.active {
          span:not(.mailBadge) {
            font-weight: 500;
            color: #4482FF;
          }
        }
  
        span:not(.mailBadge) {
          &:hover {
            color: #4482FF;
          }
        }
      }
    }
  }
 
`;
