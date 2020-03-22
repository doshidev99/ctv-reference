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
  .ant-input:focus, .ant-input:hover  {
    border-color: ${({ theme }) => `${theme.palette.lightPrimary} !important`};
  }

`;

export default AppWrapper;
