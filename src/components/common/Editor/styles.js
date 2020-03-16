import styled from 'styled-components';

export default styled.div`
  background: ${({ theme }) => theme.background.container};

  label {
    margin-bottom: 5px;
  }
  .quill {
    background: ${({ theme }) => theme.background.content};

  }
`;
