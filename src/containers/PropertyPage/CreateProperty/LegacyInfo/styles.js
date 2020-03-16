import styled from "styled-components";

export default styled.div`
  margin-bottom: 10px

.inputArea {
  display: flex;
  justify-content: space-between;
  .legacyInfoLabel {
    width: 300px;
    display: block;
  }

  .ant-form-item{
    margin-bottom: 0;
  }
  .files {
    width: 300px;
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
    }
  }
}
  
`;
