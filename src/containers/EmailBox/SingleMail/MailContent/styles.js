import styled from 'styled-components';

export const SingleMailContents = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;

  .singleMail {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
  }
`;

export const SingleMailHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 35px;
  flex-shrink: 0;
  border-bottom: 1px solid #e9e9e9;

  @media only screen and (max-width: 767px) {
    padding: 35px 20px;
  }

  h2 {
    font-size: 18px;
    font-weight: 400;
    color: #788195;
    line-height: 1.5;
    margin: 0;
    text-align: left;
  }

  .label {
    font-size: 12px;
    font-weight: 400;
    color: #ffffff;
    line-height: 1;
    padding: 0 15px;
    height: 25px;
    line-height: 25px;
    background-color: #4482FF;
    text-transform: capitalize;
    margin: ${props => (props['data-rtl'] === 'rtl' ? '0 25px 0 0' : '0 0 0 25px')};
  }
`;

export const SingleMailInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 25px 35px;
  border-bottom: 1px solid #e9e9e9;

  @media only screen and (max-width: 767px) {
    padding: 25px 20px;
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
    border-radius:: 50%;

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

  .mailAddress {
    width: 100%;
    padding: ${props => (props['data-rtl'] === 'rtl' ? '0 20px 0 0' : '0 0 0 20px')};
    display: flex;
    flex-direction: column;
    text-align: ${props => (props['data-rtl'] === 'rtl' ? 'right' : 'left')};

    .address {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      position: relative;

      h3 {
        font-size: 14px;
        font-weight: 700;
        color: #323332;
        line-height: 1.1;
        margin: 0 0 8px;

        @media only screen and (max-width: 767px) {
          line-height: 1.5;
        }

        span {
          font-size: inherit;
          font-weight: 400;
          color: #788195;
          padding: ${props =>
            props['data-rtl'] === 'rtl' ? '0 5px 0 0' : '0 0 0 5px'};
          display: -webkit-inline-flex;
          display: -ms-inline-flex;
          display: inline-flex;
        }
      }

      .mailDate {
        font-size: 13px;
        font-weight: 400;
        color: #788195;
        flex-shrink: 0;

        @media only screen and (max-width: 767px) {
          position: absolute;
          right: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
          left: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
        }
      }
    }

    p {
      font-size: 13px;
      font-weight: 400;
      color: #788195;
      line-height: 1.1;

      span {
        font-size: inherit;
        font-weight: 700;
        color: #323332;
      }
    }
  }
`;

export const SingleMailBody = styled.div`
  padding: 30px 35px;
  text-align: ${props => (props['data-rtl'] === 'rtl' ? 'right' : 'left')};
  flex-shrink: 0;
  border-bottom: 1px solid #e9e9e9;

  @media only screen and (max-width: 767px) {
    padding: 30px 20px;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    color: #797979;
    line-height: 1.5;
    margin-bottom: 21px;
  }
`;

export const SingleMailReply = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 35px;
  flex-shrink: 0;

  @media only screen and (max-width: 767px) {
    padding: 35px 20px;
  }

  .composeMailWrapper {
    padding: 0;
    height: auto;
    overflow: hidden;
  }

  .replyMailBtn {
    width: 100%;
    height: 80px;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 14px;
    color: #979797;
    border: 1px solid #e9e9e9;
    padding: 10px 15px;

    span {
      font-size: inherit;
      color: #979797;
      text-decoration: underline;
      padding: ${props => (props['data-rtl'] === 'rtl' ? '0 3px 0 0' : '0 0 0 3px')};
      cursor: pointer;
      -webkit-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
      -moz-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
      -ms-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
      -o-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
      transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

      &:hover {
        color: #4482FF;
      }
    }
  }
`;



