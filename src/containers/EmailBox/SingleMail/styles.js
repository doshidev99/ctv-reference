import styled from "styled-components";

export default styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;

  .loadingCurrentMail {
    height: calc(100% - 110px);
    display: flex;
    flex-direction: column;
    justify-items: center;
    justify-content: center;
  }
  .noMailMsg {
    margin: 0;
    font-size: 28px;
    font-weight: 300;
    text-transform: capitalize;
    color: #979797;
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  .isoBackCatBtn {
    font-size: 14px;
    color: #2d3446;
    height: 35px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    outline: 0;
    border: 1px solid #e9e9e9;
    cursor: pointer;
    transition: all 0.3 s cubic-bezier(0.215, 0.61, 0.355, 1);

    i {
      font-size: 20px;
      color:#2d3446;
      transition: all 0.3 s cubic-bezier(0.215, 0.61, 0.355, 1);

    }

    &:hover {
      color: #4482FF;
      background-color: #fcfcfc;

      i {
        color: #4482FF;
      }
    }
  }
`