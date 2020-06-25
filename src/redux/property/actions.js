import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const PropertyTypes = makeConstantCreator(
  "GET_LIST_PROPERTY",
  "GET_LIST_PROPERTY_SUCCESS",
  "GET_LIST_PROPERTY_FAILURE",

  "UPLOAD_FILE_SUCCESS",
  "UPLOAD_FILE_FAILURE",

  "UPLOAD_SITE_IMAGE_SUCCESS",
  "UPLOAD_SITE_IMAGE_FAILURE",

  "ADD_NEW_LEGAL_RECORD",
  "ADD_NEW_LEGAL_RECORD_SUCCESS",
  "REMOVE_ONE_LEGAL_RECORD",

  "ADD_NEW_BROKERAGE_POLICY",
  "ADD_NEW_BROKERAGE_POLICY_SUCCESS",
  "REMOVE_ONE_BROKERAGE_POLICY",

  "ADD_NEW_SITE_PLAN",
  "ADD_NEW_SITE_PLAN_SUCCESS",
  "REMOVE_ONE_SITE_PLAN",
  "REMOVE_SITE_PLAN_IMAGE",

  "ADD_SALES_POLICY",
  "ADD_SALES_POLICY_SUCCESS",
  "REMOVE_SALES_POLICY",

  "ADD_PRICE_LIST",
  "REMOVE_PRICE_LIST",

  "ADD_PROPERTY_IMAGE",
  "REMOVE_PROPERTY_IMAGE",

  "ADD_PROPERTY_MEDIA",
  "REMOVE_PROPERTY_MEDIA",
  "REMOVE_PROPERTY_MEDIA_SUCCESS",

  "ADD_NEW_DISCOUNT",
  "REMOVE_DISCOUNT",
  "ON_CHANGE_DISCOUNT",
  "ADD_NEW_DISCOUNT_SUCCESS",

  "MARK_LOCATION",
  "ON_CHANGE_LOCATION_DESCRIPTION",

  "ADD_NEW_FLOOR",
  "REMOVE_ONE_FLOOR",

  "OPEN_ROOM_FORM",
  "CLOSE_ROOM_FORM",

  "SUBMIT_ROOM_FORM",

  "DELETE_ONE_ROOM",

  "DELETE_PROPERTY",
  "DELETE_PROPERTY_SUCCESS",
  "DELETE_PROPERTY_FAILURE",

  "LOAD_EXCEL_SUCCESS",

  "LOAD_TYPE_IMAGE_SUCCESS",

  "SUBMIT_CREATE_PROPERTY_FORM",
  "SUBMIT_CREATE_PROPERTY_FORM_SUCCESS",
  "SUBMIT_CREATE_PROPERTY_FORM_FAILURE",

  "ADD_NEW_PAYMENT_METHOD",
  "ADD_NEW_PAYMENT_METHOD_SUCCESS",
  "REMOVE_PAYMENT_METHOD",

  "ADD_PAYMENT_PROGRESS",
  "ADD_PAYMENT_PROGRESS_SUCCESS",
  "REMOVE_PAYMENT_PROGRESS",

  "GET_PAYMENT_METHOD",
  "GET_PAYMENT_METHOD_SUCCESS",
  "GET_PAYMENT_METHOD_FAILURE",

  "GET_DISCOUNT_GROUP",
  "GET_DISCOUNT_GROUP_SUCCESS",
  "GET_DISCOUNT_GROUP_FAILURE",


  "CLEAR",


  "GET_ONE_PROPERTY",
  "GET_ONE_PROPERTY_SUCCESS",


  "SUBMIT_EDIT_ONE_PROPERTY",
  "SUBMIT_EDIT_CHILDREN_PROPERTY",

  "RETRIEVE_PRODUCT_TABLE",
  "RETRIEVE_PRODUCT_TABLE_SUCCESS",
);

// Get list property
export const getListPropertyAction = (limit, offset, filter, orderBy) =>
  makeActionCreator(PropertyTypes.GET_LIST_PROPERTY, {
    limit,
    offset,
    filter,
    orderBy,
  });
export const getListPropertySuccessAction = (data, total, limit, offset) =>
  makeActionCreator(PropertyTypes.GET_LIST_PROPERTY_SUCCESS, {
    data,
    total,
    limit,
    offset,
  });
export const getListPropertyFailureAction = (error) =>
  makeActionCreator(PropertyTypes.GET_LIST_PROPERTY_FAILURE, { error });

// Upload file
export const uploadFileSuccessAction = (fileUrl, mode) =>
  makeActionCreator(PropertyTypes.UPLOAD_FILE_SUCCESS, { fileUrl, mode });
export const uploadFileFailureAction = (error) =>
  makeActionCreator(PropertyTypes.UPLOAD_FILE_FAILURE, { error });

// Upload image
export const uploadSiteImageSuccessAction = (fileUrl, mode) =>
  makeActionCreator(PropertyTypes.UPLOAD_SITE_IMAGE_SUCCESS, { fileUrl, mode });
export const uploadSiteImageFailureAction = (error) =>
  makeActionCreator(PropertyTypes.UPLOAD_SITE_IMAGE_FAILURE, { error });

// Legal record
export const addNewLegalRecordAction = () =>
  makeActionCreator(PropertyTypes.ADD_NEW_LEGAL_RECORD);
export const addNewLegalRecordSuccessAction = (payload) =>
  makeActionCreator(PropertyTypes.ADD_NEW_LEGAL_RECORD_SUCCESS, {
    payload,
  });
export const removeOneLegalRecordAction = (id) =>
  makeActionCreator(PropertyTypes.REMOVE_ONE_LEGAL_RECORD, { id });

// BROKERAGE POLICY
export const addNewBrokeragePolicyAction = () =>
  makeActionCreator(PropertyTypes.ADD_NEW_BROKERAGE_POLICY);
export const addNewBrokeragePolicySuccessAction = (payload) =>
  makeActionCreator(PropertyTypes.ADD_NEW_BROKERAGE_POLICY_SUCCESS, {
    payload,
  });
export const removeOneBrokeragePolicyAction = (id) =>
  makeActionCreator(PropertyTypes.REMOVE_ONE_BROKERAGE_POLICY, { id });

// Site Plan
export const addNewSitePlanAction = () =>
  makeActionCreator(PropertyTypes.ADD_NEW_SITE_PLAN);
export const addNewSitePlanSuccessAction = (id, title, link) =>
  makeActionCreator(PropertyTypes.ADD_NEW_SITE_PLAN_SUCCESS, {
    id,
    title,
    link,
  });

export const removeOneSitePlanAction = (id) =>
  makeActionCreator(PropertyTypes.REMOVE_ONE_SITE_PLAN, { id });
export const removeSitePlanImageAction = (id, link) =>
  makeActionCreator(PropertyTypes.REMOVE_SITE_PLAN_IMAGE, { id, link });

// Sale policy
export const addSalesPolicyAction = () =>
  makeActionCreator(PropertyTypes.ADD_SALES_POLICY);
export const addSalesPolicySuccessAction = (id, payload) =>
  makeActionCreator(PropertyTypes.ADD_SALES_POLICY_SUCCESS, {
    id,
    payload,
  });
export const removeSalesPolicyAction = (id) =>
  makeActionCreator(PropertyTypes.REMOVE_SALES_POLICY, { id });

// Price list
export const addPriceListAction = (payload) =>
  makeActionCreator(PropertyTypes.ADD_PRICE_LIST, { payload });
export const removePriceListAction = () =>
  makeActionCreator(PropertyTypes.REMOVE_PRICE_LIST);

// Property image
export const addPropertyImageAction = (link) =>
  makeActionCreator(PropertyTypes.ADD_PROPERTY_IMAGE, { link });
export const removePropertyImagetAction = (link) =>
  makeActionCreator(PropertyTypes.REMOVE_PROPERTY_IMAGE, { link });

// Discount
export const addNewDiscountAction = (groupId, mode) =>
  makeActionCreator(PropertyTypes.ADD_NEW_DISCOUNT, {groupId, mode});
export const removeDiscountAction = (id, groupId, mode) =>
  makeActionCreator(PropertyTypes.REMOVE_DISCOUNT, { id, groupId, mode });
export const onChangeDiscountAction = (id, payload, mode) =>
  makeActionCreator(PropertyTypes.ON_CHANGE_DISCOUNT, { id, payload, mode });
export const addNewDiscountSuccessAction = (id, payload, mode) =>
  makeActionCreator(PropertyTypes.ADD_NEW_DISCOUNT_SUCCESS, { id, payload, mode });

// Location
export const markLocationAction = (location) =>
  makeActionCreator(PropertyTypes.MARK_LOCATION, { location });
export const onChangeLocationDescriptionAction = (text) =>
  makeActionCreator(PropertyTypes.ON_CHANGE_LOCATION_DESCRIPTION, { text });

// Floor
export const addNewFloor = () => makeActionCreator(PropertyTypes.ADD_NEW_FLOOR);
export const removeOneFloorAction = (id) =>
  makeActionCreator(PropertyTypes.REMOVE_ONE_FLOOR, { id });

// Room
export const openRoomFormAction = (roomInfo, floorId) =>
  makeActionCreator(PropertyTypes.OPEN_ROOM_FORM, { roomInfo, floorId });
export const closeRoomFormAction = () =>
  makeActionCreator(PropertyTypes.CLOSE_ROOM_FORM);
export const submitRoomFormAction = ({
  id,
  floorId,
  productCode,
  area,
  price,
}) =>
  makeActionCreator(PropertyTypes.SUBMIT_ROOM_FORM, {
    id,
    floorId,
    productCode,
    area,
    price,
  });
export const deleteOneRoomAction = (id, floorId) =>
  makeActionCreator(PropertyTypes.DELETE_ONE_ROOM, {
    id,
    floorId,
  });

// Delete property
export const deletePropertyAction = (id) =>
  makeActionCreator(PropertyTypes.DELETE_PROPERTY, {
    id,
  });
export const deletePropertySuccessAction = (id) =>
  makeActionCreator(PropertyTypes.DELETE_PROPERTY_SUCCESS, {
    id,
  });
export const deletePropertyFailureAction = (error) =>
  makeActionCreator(PropertyTypes.DELETE_PROPERTY_FAILURE, {
    error,
  });

// Load excel
export const loadExcelSuccessAtion = (data) =>
  makeActionCreator(PropertyTypes.LOAD_EXCEL_SUCCESS, {
    data,
  });

// Load type image table
export const loadTypeImageSuccessAction = (data) =>
makeActionCreator(PropertyTypes.LOAD_TYPE_IMAGE_SUCCESS, {
  data,
});

// Submit create property form
export const submitCreatePropertyFormAction = (payload) =>
  makeActionCreator(PropertyTypes.SUBMIT_CREATE_PROPERTY_FORM, {
    payload,
  });
export const submitCreatePropertyFormSuccessAction = () =>
  makeActionCreator(PropertyTypes.SUBMIT_CREATE_PROPERTY_FORM_SUCCESS);
export const submitCreatePropertyFormFailureAtion = (error) =>
  makeActionCreator(PropertyTypes.SUBMIT_CREATE_PROPERTY_FORM_FAILURE, {
    error,
  });

// Payment method

export const addNewPaymentMethodSuccessAction = (name) =>
  makeActionCreator(PropertyTypes.ADD_NEW_PAYMENT_METHOD_SUCCESS, {name});
export const removePaymentMethodAction = (id) =>
  makeActionCreator(PropertyTypes.REMOVE_PAYMENT_METHOD, {id});


// Payment proogress



export const addPaymentProgressAction = () =>
  makeActionCreator(PropertyTypes.ADD_PAYMENT_PROGRESS);
export const addPaymentProgressSuccessAction = (id, payload) =>
  makeActionCreator(PropertyTypes.ADD_PAYMENT_PROGRESS_SUCCESS, {
    id,
    payload,
  });
export const removePaymentProgressAction = (id) =>
  makeActionCreator(PropertyTypes.REMOVE_PAYMENT_PROGRESS, { id });

// Get payment method of one property
export const getPaymentMethodAction = (id) =>
  makeActionCreator(PropertyTypes.GET_PAYMENT_METHOD, {id});
export const getPaymentMethodSuccessAction = (result) =>
  makeActionCreator(PropertyTypes.GET_PAYMENT_METHOD_SUCCESS, {result});
export const getPaymentMethodFailureAction = (error) =>
  makeActionCreator(PropertyTypes.GET_PAYMENT_METHOD_FAILURE, {
    error,
  });

export const getDiscountGroupAction = (id) =>
  makeActionCreator(PropertyTypes.GET_DISCOUNT_GROUP, {id});
export const getDiscountGroupSuccessAction = (result) =>
  makeActionCreator(PropertyTypes.GET_DISCOUNT_GROUP_SUCCESS, {result});
export const getDiscountGroupFailureAction = (error) =>
  makeActionCreator(PropertyTypes.GET_DISCOUNT_GROUP_FAILURE, {
    error,
  });

export const clearAction = (preservedFields) => makeActionCreator(PropertyTypes.CLEAR, {preservedFields})


// -------------------GET ONE PROPERTY------------------------------
export const getOnePropertyAction = (id) =>
  makeActionCreator(PropertyTypes.GET_ONE_PROPERTY, {id});
export const getOnePropertySuccessAction = ( data) =>
  makeActionCreator(PropertyTypes.GET_ONE_PROPERTY_SUCCESS, {
    data,
  });


  // SUBMIT EDIT PROPERTY
export const submitEditPropertyFormAction = (id, payload) =>
  makeActionCreator(PropertyTypes.SUBMIT_EDIT_ONE_PROPERTY, { id, payload });

export const submitEditChildrenProperty = (id, values) =>
  makeActionCreator(PropertyTypes.SUBMIT_EDIT_CHILDREN_PROPERTY, { id, values });


// GET PRODUCT TABLE
export const getProductTableAction = (id, filterParams ) =>
  makeActionCreator(PropertyTypes.RETRIEVE_PRODUCT_TABLE, { id, filterParams });

export const getProductTableSuccessAction = (data) =>
  makeActionCreator(PropertyTypes.RETRIEVE_PRODUCT_TABLE_SUCCESS, { data});



// HANDLE PROPERTY MEDIA

export const addPropertyMediaAction = (payload) =>
  makeActionCreator(PropertyTypes.ADD_PROPERTY_MEDIA, { payload});

export const removePropertyMediaAction = (id) =>
  makeActionCreator(PropertyTypes.REMOVE_PROPERTY_MEDIA, { id});
export const removePropertyMediaSuccessAction = (id) =>
  makeActionCreator(PropertyTypes.REMOVE_PROPERTY_MEDIA_SUCCESS, { id});
