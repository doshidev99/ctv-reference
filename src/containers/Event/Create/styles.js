import styled from 'styled-components';

export default styled.div`
  background-color: #FFF;
  padding: 15px
  font-size: 16px
  .label {
    line-height: initial;
    span {
      font-size: 18px;
      font-weight: 500;
    }
  }
  .ant-calendar-picker {
    width: 280px;
  }
  .description {
    .quill {
      .ql-snow {
        line-height: initial;
      }
      .ql-container {
        height: 300px;
      }
    }
    label {
      font-size: 18px;
      font-weight: 500;
    }
  }
  .submitButton {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
`;
