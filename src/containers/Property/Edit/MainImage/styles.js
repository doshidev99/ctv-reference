import styled from 'styled-components';

export default styled.div`
  margin-bottom: 20px;
  .title {
    width: 100%
    font-size: 18px;
    font-weight: 500;
  }

  .upload-main-image {
    display: flex;
    max-width: 500px;
    .ant-upload-list-text {
      margin-left: 20px;
    }
  }
  .main-image {
    margin: 50px 20px;
    img {
      width: 100%;
    }
  }
`