import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const PartnerTypes = makeConstantCreator(
  "GET_LIST_PARTNER",
  "GET_LIST_PARTNER_SUCCESS",
  "GET_LIST_PARTNER_FAILURE",

  "GET_ONE_PARTNER_INFO",
  "GET_ONE_PARTNER_INFO_SUCCESS",
  "GET_ONE_PARTNER_INFO_FAILURE",

  "CREATE_PARTNER",
  "CREATE_PARTNER_SUCCESS",
  "CREATE_PARTNER_FAILURE",
);

// Get list admin
export const getListPartnerAction = (limit, offset, filter, orderBy, fields) =>
  makeActionCreator(PartnerTypes.GET_LIST_PARTNER, {
    limit,
    offset,
    filter,
    orderBy,
    fields,
  });

export const getListPartnerSuccessAction = (data, total, limit, offset) =>
  makeActionCreator(PartnerTypes.GET_LIST_PARTNER_SUCCESS, {
    data,
    total,
    limit,
    offset,
  });
export const getListPartnerFailureAction = error =>
  makeActionCreator(PartnerTypes.GET_LIST_PARTNER_FAILURE, { error });

// Get one admin info
export const getOnePartnerInfoAction = id =>
  makeActionCreator(PartnerTypes.GET_ONE_PARTNER_INFO, { id });
export const getOnePartnerInfoSuccessAction = data =>
  makeActionCreator(PartnerTypes.GET_ONE_PARTNER_INFO_SUCCESS, { data });
export const getOnePartnerInfoFailureAction = error =>
  makeActionCreator(PartnerTypes.GET_ONE_PARTNER_INFO_FAILURE, { error });


// Create one admin info
export const createOnePartnerAction = payload =>
  makeActionCreator(PartnerTypes.CREATE_PARTNER, { payload });
export const createOnePartnerSuccessAction = data =>
  makeActionCreator(PartnerTypes.CREATE_PARTNER_SUCCESS, { data });
export const createOnePartnerFailureAction = error =>
  makeActionCreator(PartnerTypes.CREATE_PARTNER_FAILURE, { error });


