import styled from "styled-components";

export default styled.div`
  margin-bottom: 10px

.inputArea {
  display: flex;
  justify-content: space-between;
  .sitePlanLabel {
    width: 300px;
    display: block;
  }

  .ant-form-item{
    margin-bottom: 0;
  }
  .files {
    margin-top: 10px
    display: flex;
    justify-content: flex-end;
    .upload, .cancel {
      font-size: 20px
      margin-right: 10px;
      display: flex;
      flex-direction: row-reverse;

      .ant-upload-list {
        display: flex
      }

      .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
      }
      
      .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
      }
    }
  }
}
  
`;
