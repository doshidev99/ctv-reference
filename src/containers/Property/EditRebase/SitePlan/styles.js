import styled from "styled-components";

export default styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;

  .ant-form {
    width: 100%
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
  .site-row{
    width: 100%;
    .sitePlanLabel {
      padding-right: 10px
    }
    .deleteSiteButton {
      width: 100%;
      max-height: 30px;
      border-radius: 10%;
      border: solid red 1px;
      margin-left: 10px;
    }
  }
  .uploadImage{
    border: 1px solid #d9d9d9;
    background-color: #fff;
    padding: 5px 5px 0 5px;
    margin-bottom: 10px;
    .ant-upload.ant-upload-select-picture-card {
      margin: 0
    }
  }
`;
