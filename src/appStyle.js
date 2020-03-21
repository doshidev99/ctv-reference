import styled from 'styled-components';

const AppWrapper = styled.div`
  .anticon:before {
    display: block;
    font-family: 'anticon', 'TCRM' !important;
  }
  .anticon:after {
    display: block;
    font-family: 'anticon', 'TCRM' !important;
  }
  .gradientBackground {
    background-image: ${({ theme }) =>
      `linear-gradient(90deg, ${theme.palette.lightPrimary}, ${theme.palette.primary})`};
  }
  .ant-input:focus {
    border-color: ${({ theme }) => `${theme.palette.lightPrimary} !important`}
    box-shadow: 0 0 0 0.5px ${({ theme }) => theme.palette.lightPrimary};
  }

`;

export default AppWrapper;
