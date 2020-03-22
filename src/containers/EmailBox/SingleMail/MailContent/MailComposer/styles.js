import styled from 'styled-components';

export default styled.div`
  text-align: left;
  height: 100%;
  width: 100%;
  overflow-y: auto;

  .inputBox {
    font-size: 14px;
    font-weight: 400;
    color: #323332;
    line-height: inherit;
    height: 36px;
    padding: 0 15px;
    border: 1px solid #e9e9e9;
    outline: 0 !important;
    overflow: hidden;
    background-color: #ffffff;
    border-radius: 3px;
    box-shadow: none;
    transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

    &:focus,
    &:hover {
      border-color: #e9e9e9;
      box-shadow: none;
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

  .ql-container{
    min-height: 200px;
    max-height: 400px;
    height: 300px;
  }
  .composeMailBtnWrapper {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .cendMailBtn,
    .cancelMailBtn {
      height: 36px;
      padding: 0 30px;
      background-color: #4482FF;
      border: 0;
      transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

      &:hover {
        background-color: #3A78F5; 
      }
    }

    .cancelMailBtn {
      background-color: #f64744;

      &:hover {
        background-color: #EC3D3A;
      }
    }
  }
`