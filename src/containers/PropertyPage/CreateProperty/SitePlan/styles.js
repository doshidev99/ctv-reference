import styled from "styled-components";

export default styled.div`
  margin-top: 10px
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
    display: flex;
    .upload {
      max-width: 700px;
      min-width: 400px;

      .ant-upload-picture-card-wrapper {
        display: flex;
        flex-direction: row-reverse;
      }
    }
  }

  
`;
