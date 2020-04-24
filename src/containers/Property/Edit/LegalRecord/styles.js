import styled from "styled-components";

export default styled.div`
  display: flex;
  .ant-row {
    width: 100%;
  }
  justify-content: space-between;
  .title {
    width: 100%;
    display: block;
  }

  .ant-form-item{
    margin-bottom: 0;
  }
  .files {
    display: flex;
    justify-content: flex-end;
    .upload, .cancel {
      font-size: 20px
      margin-right: 10px;
      display: flex;
      flex-direction: column;

      .ant-upload-list {
        display: flex
      }
    }
  }
  
`;
