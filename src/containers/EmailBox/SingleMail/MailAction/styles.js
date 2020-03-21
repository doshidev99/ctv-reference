import styled from "styled-components";



export const SingleMailActions = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 30px;
  background-color: #F9F9F9;
  border-bottom: 1px solid #e9e9e9;

  @media only screen and (max-width: 767px) {
    padding: 0 15px;
    height: 60px;
    overflow: hidden;
    overflow-x: auto;
  }

  .mailBackBtn {
    color:#2d3446;
    width: auto;
    height: 35px;
    padding: 0 10px;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    outline: 0;
    border: 1px solid #e9e9e9;
    margin: ${props =>
      props['data-rtl'] === 'rtl' ? '0 -1px 0 15px' : '0 15px 0 -1px'};
    cursor: pointer;
    -webkit-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
-moz-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
-ms-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
-o-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

    @media only screen and (max-width: 479px) {
      margin: ${props =>
        props['data-rtl'] === 'rtl' ? '0 -1px 0 5px' : '0 5px 0 -1px'};
    }

    i {
      font-size: 16px;
      color:#2d3446;
      -webkit-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
-moz-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
-ms-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
-o-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    &:hover {
      color: #4482FF;
      background-color: darken(#ffffff, 1%);

      i {
        color: #4482FF;
      }
    }
  }

  .mailMoveDropdown {
    .ant-popover-inner-content {
      li {
        cursor: pointer;
        padding: 3px 0;

        &:hover {
          color: #4482FF;
        }
      }
    }
  }
`;

export const MailActionsWrapper = styled.div`
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;

  button {
    font-size: 16px;
    color: #2d3446;
    text-align: center;
    width: 35px;

    height: 35px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    outline: 0;
    border: 1px solid #e9e9e9;
    border-radius: 0;
    margin: ${props =>
      props['data-rtl'] === 'rtl' ? '0 -1px 0 0' : '0 0 0 -1px'};
    cursor: pointer;
    -webkit-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    -moz-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    -ms-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    -o-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

    i {
      font-size: 16px;
      color:#2d3446;
      width: 100%;
      -webkit-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
      -moz-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
      -ms-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
      -o-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
      transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    &:first-child {
      margin: ${props =>
        props['data-rtl'] === 'rtl' ? '0 0 0 -1px' : '0 -1px 0 0'};
    }

    &:hover {
      color: #4482FF;
      background-color: #fcfcfc;

      i {
        color: #4482FF;
      }
    }

    &.mailBackBtn {
      width: auto;
      padding: 0 10px;
      font-size: 14px;
    }
  }
`;


export const MailCategoryWrapper = styled(MailActionsWrapper)`
  margin: ${props =>
    props['data-rtl'] === 'rtl' ? '0 20px 0 0' : '0 0 0 20px'};

  @media only screen and (max-width: 767px) {
    margin: ${props =>
      props['data-rtl'] === 'rtl' ? '0 auto 0 10px' : '0 10px 0 auto'};
  }

  @media only screen and (max-width: 479px) {
    margin: ${props =>
      props['data-rtl'] === 'rtl' ? '0 0 0 5px' : '0 5px 0 0'};
  }
`;

export const MailPaginationWrapper = styled(MailActionsWrapper)`
  margin: ${props =>
    props['data-rtl'] === 'rtl' ? '0 auto 0 0' : '0 0 0 auto'};
`;

export const MailActionDropdown = styled.ul`
  li {
    cursor: pointer;
    padding: 3px 0;

    &:hover {
      color: #4482FF;
    }
  }
`;

