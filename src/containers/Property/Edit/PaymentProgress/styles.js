import styled from "styled-components";

export default styled.div`
  display: flex;
  justify-content: space-between;
 
  .title {
    width: 100%;
    display: block;
  }
  .ant-row {
    width: 100%;
  }
  .time {
    margin: 0 10px;
  }
  .files {
    display: flex;
    justify-content: flex-end;
    .upload, .cancel {
      font-size: 20px
      margin-right: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-end
      .ant-upload-list {
        display: flex
      }
    }
  }
 
  .ant-upload-list-item-name {
    font-size: 16px
  }
  .ant-upload-list-item-card-actions .anticon{
    color: red
  }
  
`;
