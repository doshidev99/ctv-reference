import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const RealtorTypes = makeConstantCreator(
  "GET_LIST_REALTOR",
  "GET_LIST_REALTOR_SUCCESS",
  "GET_LIST_REALTOR_FAILURE",
);

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
