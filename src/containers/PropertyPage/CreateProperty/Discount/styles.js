import styled from "styled-components";

export default styled.div`
  margin-bottom: 10px;
  display: flex;
  label {
    display: block;
  }
  .title {
    margin-right: 20px;
    .ant-input {
      min-width: 350px;
    }
  }
  .proportion {
    .ant-input {
      max-width: 100px;
    }
  }

  .ant-btn {
    margin-left: 10px;
  }
 
`;
