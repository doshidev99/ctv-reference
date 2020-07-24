import styled from 'styled-components';

const FormWrapper = styled.div`
  width: 100%;
  .filterContainer .filterContent {
    padding-top: 5px;
  }
  .ant-input-disabled {
    display: none;
    visibility: hidden;
  }
  .clearButton {
    display: none;
    visibility: hidden;
  }
  .filterContainer .filterActions {
    margin-right: -111px;
    width: 200px;
  }
  .filterActions .ant-col-24 {
    width: 100%;
    padding: 25%;
  }
  .filterContainer .clearButton {
    margin-top: 0;
  }
`;

export default FormWrapper;
