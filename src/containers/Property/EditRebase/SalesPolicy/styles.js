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
  /* .files {
    display: flex;
    justify-content: flex-start;
    .upload, .cancel {
      font-size: 20px;
      margin-right: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .ant-upload-list {
        display: flex
      }
    }
  } */
  .uploadPriceButton {
    width: 100px;
    font-weight: 500;
  }

  .dynamic-delete-button {
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all 0.3s;
  }
  .dynamic-delete-button:hover {
    color: #777;
  }
  .dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .ant-upload-list-item {
    margin-bottom: 8px;
    .ant-upload-list-item-info {
      max-width: 200px;
    }
  }
 
  .ant-upload-list-item-name {
    font-size: 16px
  }
  .ant-upload-list-item-card-actions .anticon{
    color: red
  }
`