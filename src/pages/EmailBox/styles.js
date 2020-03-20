import styled from 'styled-components';

export default styled.div`
  height: 100%;
  
  .emailLayout {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .leftWrapper {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    background-color: #ffffff;
    border-right: 1px solid rgba(228,228,228,0.65);
    border-left: 0px solid rgba(228,228,228,0.65);
    width: 250px;
    height: 100%;
  }

  .middleWrapper {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    background-color: #ffffff;
    border-right: 1px solid rgba(228,228,228,0.65);
    border-left: 0px solid rgba(228,228,228,0.65);
    width: 400px;
    @media only screen and (max-width: 767px) {
      width: 100%;
    }

    @media only screen and (min-width: 767px) and (max-width: 990px) {
      width: 320px;
    }

    @media only screen and (min-width: 991px) and (max-width: 1366px) {
      width: 340px;
    }
  }

  .singleMailWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
  }

`