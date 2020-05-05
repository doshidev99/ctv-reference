import styled from 'styled-components';

export default styled.div`
  background-color: #FFF;
  padding: 15px
  font-size: 16px
`
export const QuillEditorWrapper = styled.div`
  background: ${({ theme }) => theme.background.container};
  width: 100%
  label {
    margin-bottom: 5px;
  }
  .quill {
    background: ${({ theme }) => theme.background.content};
    .ql-container{
      height: 250px;
    }
    ql-snow {
      border: 1px solid #d9d9d9;
    }
  }
`;
