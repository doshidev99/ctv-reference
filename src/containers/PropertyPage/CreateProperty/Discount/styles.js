import styled from "styled-components";

export default styled.div`
  margin: 15px 0;
  .inputArea {
    display:flex;
    margin-bottom: 10px;
    label {
      display: block;
    }
    .title {
      margin-right: 20px;
      .ant-input {
        width: 500px;
      }
    }
    .proportion {
      .ant-input {
        width: 100px;
      }
    }
  }
 
`;
