import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const PropertyTypes = makeConstantCreator(
  "GET_LIST_PROPERTY",
  "GET_LIST_PROPERTY_SUCCESS",
  "GET_LIST_PROPERTY_FAILURE",

  "UPLOAD_FILE_SUCCESS",
  "UPLOAD_FILE_FAILURE",

  "UPLOAD_SITE_IMAGE_SUCCESS",
  "UPLOAD_SITE_IMAGE_FAILURE",

  "ADD_NEW_LEGAL_INFO",
  "ADD_NEW_LEGAL_INFO_SUCCESS",
  "REMOVE_ONE_LEGAL_INFO",


  "ADD_NEW_SITE_PLAN",
  "ADD_NEW_SITE_PLAN_SUCCESS",
  "REMOVE_ONE_SITE_PLAN",
  "REMOVE_SITE_PLAN_IMAGE",

  "ADD_SALE_POLICY",
  "REMOVE_SALE_POLICY",

  "ADD_PRICE_LIST",
  "REMOVE_PRICE_LIST",

  "ADD_PROPERTY_IMAGE",
  "REMOVE_PROPERTY_IMAGE",

  "ADD_NEW_DISCOUNT",
  "REMOVE_DISCOUNT",
  "ON_CHANGE_DISCOUNT",
);

// Get list property
export const getListPropertyAction = params => makeActionCreator(PropertyTypes.GET_LIST_PROPERTY, { params });
export const getListPropertySuccessAction = data => makeActionCreator(PropertyTypes.GET_LIST_PROPERTY_SUCCESS, { data });
export const getListPropertyFailureAction = error => makeActionCreator(PropertyTypes.GET_LIST_PROPERTY_FAILURE, { error });


// Upload file
export const uploadFileSuccessAction = (fileUrl, mode) => makeActionCreator(PropertyTypes.UPLOAD_FILE_SUCCESS, { fileUrl, mode });
export const uploadFileFailureAction = error => makeActionCreator(PropertyTypes.UPLOAD_FILE_FAILURE, { error });

// Upload image
export const uploadSiteImageSuccessAction = (fileUrl, mode) => makeActionCreator(PropertyTypes.UPLOAD_SITE_IMAGE_SUCCESS, { fileUrl, mode });
export const uploadSiteImageFailureAction = error => makeActionCreator(PropertyTypes.UPLOAD_SITE_IMAGE_FAILURE, { error });

export const addNewLegalInfoAction = () => makeActionCreator(PropertyTypes.ADD_NEW_LEGAL_INFO)
export const addNewLegalInfoSuccessAction = (id, title, link) => makeActionCreator(PropertyTypes.ADD_NEW_LEGAL_INFO_SUCCESS, {id, title, link})

export const removeOneLegalInfoAction = (id) => makeActionCreator(PropertyTypes.REMOVE_ONE_LEGAL_INFO, {id})


export const addNewSitePlanAction = () => makeActionCreator(PropertyTypes.ADD_NEW_SITE_PLAN)
export const addNewSitePlanSuccessAction = (id, title, link) => makeActionCreator(PropertyTypes.ADD_NEW_SITE_PLAN_SUCCESS, {id, title, link})

export const removeOneSitePlanAction = (id) => makeActionCreator(PropertyTypes.REMOVE_ONE_SITE_PLAN, {id})
export const removeSitePlanImageAction = (id, link) => makeActionCreator(PropertyTypes.REMOVE_SITE_PLAN_IMAGE, {id, link})

export const addSalePolicyAction = (link) => makeActionCreator(PropertyTypes.ADD_SALE_POLICY, {link})
export const removeSalePolicyAction = () => makeActionCreator(PropertyTypes.REMOVE_SALE_POLICY)


export const addPriceListAction = (link) => makeActionCreator(PropertyTypes.ADD_PRICE_LIST, {link})
export const removePriceListAction = () => makeActionCreator(PropertyTypes.REMOVE_PRICE_LIST)

export const addPropertyImageAction = (link) => makeActionCreator(PropertyTypes.ADD_PROPERTY_IMAGE, {link})
export const removePropertyImagetAction = (link) => makeActionCreator(PropertyTypes.REMOVE_PROPERTY_IMAGE, {link})

export const addNewDiscountAction = () => makeActionCreator(PropertyTypes.ADD_NEW_DISCOUNT)
export const removeDiscountAction = (id) => makeActionCreator(PropertyTypes.REMOVE_DISCOUNT, {id})
export const onChangeDiscountAction = (id, title, value) => makeActionCreator(PropertyTypes.ON_CHANGE_DISCOUNT, {id, title, value})