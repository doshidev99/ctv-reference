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
<<<<<<< HEAD
  .ant-input:focus {
    border-color: ${({ theme }) => `${theme.palette.lightPrimary} !important`}
    box-shadow: 0 0 0 0.5px ${({ theme }) => theme.palette.lightPrimary};
=======
  .ant-input:focus, .ant-input:hover  {
    border-color: ${({ theme }) => `${theme.palette.lightPrimary} !important`};
>>>>>>> 85f638a070941a61139c08918a382b04ccb499de
  }
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid ${({ theme }) => theme.background.container};
    color: ${({ theme }) => theme.palette.color[0]};
  }
  .ant-layout-footer {
    background: #FFFFFF;
  }
`;

export default AppWrapper;
