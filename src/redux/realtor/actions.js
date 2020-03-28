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
