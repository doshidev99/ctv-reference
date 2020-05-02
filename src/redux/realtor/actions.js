import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const RealtorTypes = makeConstantCreator(
  "GET_LIST_REALTOR",
  "GET_LIST_REALTOR_SUCCESS",
  "GET_LIST_REALTOR_FAILURE",

  "GET_ONE_REALTOR",
  "GET_ONE_REALTOR_SUCCESS",
  "GET_ONE_REALTOR_FAILURE",

  "GET_TRANSACTIONS_BY_REALTOR",
  "GET_TRANSACTIONS_BY_REALTOR_SUCCESS",
  "GET_TRANSACTIONS_BY_REALTOR_FAILURE",
  
  "REQUEST_RESEND",
  "REQUEST_RESEND_SUCCESS",
  "REQUEST_RESEND_FAILURE",

  "CONFIRM_CONTRACT",
  "CONFIRM_CONTRACT_SUCCESS",
  "CONFIRM_CONTRACT_FAILURE",
);

// Get list realtor
export const getListRealtorAction = (limit, offset, filter, orderBy, fields) =>
  makeActionCreator(RealtorTypes.GET_LIST_REALTOR, {
    limit,
    offset,
    filter,
    orderBy,
    fields,
  });

export const getListRealtorSuccessAction = (data, total, limit, offset) =>
  makeActionCreator(RealtorTypes.GET_LIST_REALTOR_SUCCESS, {
    data,
    total,
    limit,
    offset,
  });
export const getListRealtorFailureAction = error =>
  makeActionCreator(RealtorTypes.GET_LIST_REALTOR_FAILURE, {
    error,
  });

// Get one realtor info
export const getOneRealtorAction = id =>
  makeActionCreator(RealtorTypes.GET_ONE_REALTOR, {
    id,
  });

export const getOneRealtorSuccessAction = data =>
  makeActionCreator(RealtorTypes.GET_ONE_REALTOR_SUCCESS, {
    data,
  });
export const getOneRealtorFailureAction = error =>
  makeActionCreator(RealtorTypes.GET_ONE_REALTOR_FAILURE, {
    error,
  });

// Get transactions by realtor
export const getTransactionsByRealtorAction = (
  id,
  limit,
  offset,
  filter,
  orderBy,
  fields,
) =>
  makeActionCreator(RealtorTypes.GET_TRANSACTIONS_BY_REALTOR, {
    id,
    limit,
    offset,
    filter,
    orderBy,
    fields,
  });
export const getTransactionsByRealtorSuccessAction = (
  data,
  total,
  limit,
  offset,
) =>
  makeActionCreator(RealtorTypes.GET_TRANSACTIONS_BY_REALTOR_SUCCESS, {
    data,
    total,
    limit,
    offset,
  });
export const getTransactionsByRealtorFailureAction = error =>
  makeActionCreator(RealtorTypes.GET_TRANSACTIONS_BY_REALTOR_FAILURE, {
    error,
  });

// Update realtor contract message
export const requestResend = (id, status, payload) =>
  makeActionCreator(RealtorTypes.REQUEST_RESEND, {
    id,
    status,
    payload,
  });

export const requestResendSuccessAction = data =>
  makeActionCreator(RealtorTypes.REQUEST_RESEND_SUCCESS, {
    data,
  });
export const requestResendFailureAction = error =>
  makeActionCreator(RealtorTypes.REQUEST_RESEND_FAILURE, {
    error,
  });

// confirm digital contract
export const confirmDigitalContractAction = (id, status) =>
makeActionCreator(RealtorTypes.CONFIRM_CONTRACT, {
  id,
  status,
});

export const confirmDigitalContractSuccessAction = data =>
makeActionCreator(RealtorTypes.CONFIRM_CONTRACT_SUCCESS, {
  data,
});
export const confirmDigitalContractFailureAction = error =>
makeActionCreator(RealtorTypes.CONFIRM_CONTRACT_FAILURE, {
  error,
});
