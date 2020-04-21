import moment from "moment";
import { makeReducerCreator } from "../../utils/reduxUtils";
import { PropertyTypes } from "./actions";
import { mongoObjectId } from "../../utils/textProcessor";
// Setup inintial state for property
export const initialState = {
  properties: [],
  offset: 0, // offset = (page - 1) * limit;
  limit: 10,
  total: null,
  loading: false,
  listPropertySuccess: undefined,
  listPropertyFailure: undefined,
  createPropertyLoading: false,
  legalRecords: [
    {
      id: mongoObjectId(),
    },
  ],
  sitePlans: [
    {
      id: mongoObjectId(),
      links: [],
    },
  ],
  salesPolicies: [
    {
      id: mongoObjectId(),
    },
  ],
  paymentProgress: [
    {
      id: mongoObjectId(),
    },
  ],
  priceList: null,
  propertyImage: [],
  medias: [],
  discounts: [],
  paymentMethods: [],
  location: [],
  locationDescription: "",
  // productTable: [
  //   {
  //     id: mongoObjectId(),
  //     name: "Tầng 1",
  //     rooms: [],
  //   },
  // ],
  productTable: [],
  mode: undefined,
  isShowRoom: false,
  roomInfo: {},
  fileUrl: undefined,
};
// End setup

// LIST PROPERTY
const getListProperty = (state) => ({
  ...state,
  loading: true,
});

const getListPropertySuccess = (state, { data, total, limit, offset }) => ({
  ...state,
  properties: data,
  limit,
  offset,
  total,
  loading: false,
  listPropertySuccess: true,
  listPropertyFailure: false,
});

const getListPropertyFailure = (state) => ({
  ...state,
  loading: false,
  listPropertySuccess: false,
  listPropertyFailure: true,
});

// UPLOAD FILE
const uploadFileSuccess = (state, { fileUrl }) => {
  return {
    ...state,
    fileUrl,
  };
};

const uploadFileFailure = (state) => ({
  ...state,
  loading: false,
});

// LEGAL RECORD

const addNewLegalRecord = (state) => {
  const legalRecords = [...state.legalRecords];
  legalRecords.push({
    id: mongoObjectId(),
  });
  return {
    ...state,
    legalRecords,
  };
};
const addNewLegalRecordSuccess = (state, { id, title, link, mimeType }) => {
  const legalRecords = [...state.legalRecords];
  const index = legalRecords.findIndex((e) => e.id === id);
  legalRecords[index] = {
    id,
    title,
    link,
    mimeType,
  };
  return {
    ...state,
    legalRecords,
  };
};

const removeOneLegalRecord = (state, { id }) => {
  let legalRecords = [...state.legalRecords];
  legalRecords = legalRecords.filter((e) => e.id !== id);
  return {
    ...state,
    legalRecords,
  };
};

// SITE PLAN
const addSitePlan = (state) => {
  const sitePlans = [...state.sitePlans];
  sitePlans.push({
    id: mongoObjectId(),
    link: [],
  });
  return {
    ...state,
    sitePlans,
  };
};

const addNewSitePlanSuccess = (state, { id, title, link }) => {
  const sitePlans = [...state.sitePlans];
  const index = sitePlans.findIndex((e) => e.id === id);
  sitePlans[index] = {
    id,
    title,
    links: [...sitePlans[index].links, link],
  };

  return {
    ...state,
    sitePlans,
  };
};

const removeSitePlanImage = (state, { id, link }) => {
  const sitePlans = [...state.sitePlans];
  const index = sitePlans.findIndex((e) => e.id === id);
  const links = [...sitePlans[index].links];
  const imgIndex = links.findIndex((e) => e === link);
  links.splice(imgIndex, 1);
  sitePlans[index].links = links;
  return {
    ...state,
    sitePlans,
  };
};
const removeOneSitePlan = (state, { id }) => {
  let sitePlans = [...state.sitePlans];
  sitePlans = sitePlans.filter((e) => e.id !== id);
  return {
    ...state,
    sitePlans,
  };
};

// SALE POLICY
const addSalesPolicy = (state) => {
  const salesPolicies = [...state.salesPolicies];
  salesPolicies.push({
    id: mongoObjectId(),
  });
  return {
    ...state,
    salesPolicies,
  };
};

const addSalesPoliciesSuccess = (state, { id, payload }) => {
  const salesPolicies = [...state.salesPolicies];
  const index = salesPolicies.findIndex((e) => e.id === id);
  salesPolicies[index] = {
    id,
    ...payload,
  };

  return {
    ...state,
    salesPolicies,
  };
};

const removeOneSalesPolicy = (state, { id }) => {
  let salesPolicies = [...state.salesPolicies];
  salesPolicies = salesPolicies.filter((e) => e.id !== id);
  return {
    ...state,
    salesPolicies,
  };
};

// PRICE LIST
const addPriceList = (state, { link, mimeType }) => ({
  ...state,
  priceList: {
    link,
    mimeType,
  },
});

const removePriceList = (state) => ({
  ...state,
  priceList: null,
});

// PROPERTY IMAGE
const addPropertyImage = (state, { link }) => {
  const propertyImage = [...state.propertyImage];
  propertyImage.push(link);
  return {
    ...state,
    propertyImage,
  };
};

const removePropertyImage = (state, { link }) => {
  const propertyImage = [...state.propertyImage];
  const index = propertyImage.findIndex((e) => e === link);
  propertyImage.splice(index, 1);

  return {
    ...state,
    propertyImage,
  };
};

// PROPERTY MEDIA

const addPropertyMedia = (state, { payload }) => {
  const mediaList = [...state.medias];
  if (payload.type === 1) {
    const index = mediaList.findIndex((e) => e.id === payload.id);
    if (index >= 0) {
      mediaList[index] = payload;
    } else {
      mediaList.push({
        id: mongoObjectId(),
        ...payload,
      });
    }
  } else {
    mediaList.push({
      id: mongoObjectId(),
      ...payload,
    });
  }

  return {
    ...state,
    medias: mediaList,
  };
};

const removePropertyMedia = (state, { id }) => {
  const mediaList = [...state.medias];
  return {
    ...state,
    medias: mediaList.filter((e) => e.id !== id),
  };
};

// DISCOUNT
const addNewDiscount = (state, { groupId, mode }) => {
  if (mode === "payment") {
    const paymentMethods = [...state.paymentMethods];
    const index = paymentMethods.findIndex((e) => e.id === groupId); // index cua nhom payment method
    const { discounts } = paymentMethods[index];
    discounts.push({
      id: mongoObjectId(),
      groupId,
    });
    paymentMethods[index].discounts = discounts;
    return {
      ...state,
      paymentMethods,
    };
  }
  const discounts = [...state.discounts];
  discounts.push({
    id: mongoObjectId(),
    groupId,
  });

  return {
    ...state,
    discounts,
  };
};

const removeDiscount = (state, { id, groupId, mode }) => {
  if (mode === "payment") {
    const paymentMethods = [...state.paymentMethods];
    const index = paymentMethods.findIndex((e) => e.id === groupId); // index cua nhom payment method
    let { discounts } = paymentMethods[index];
    discounts = discounts.filter((e) => e.id !== id);
    paymentMethods[index].discounts = discounts;
    return {
      ...state,
      paymentMethods,
    };
  }
  let discounts = [...state.discounts];
  discounts = discounts.filter((e) => e.id !== id);
  return {
    ...state,
    discounts,
  };
};

const onChangeDiscount = (state, { id, payload, mode }) => {
  if (mode === "payment") {
    const { groupId } = payload;
    const paymentMethods = [...state.paymentMethods];
    const paymentIndex = paymentMethods.findIndex((e) => e.id === groupId); // index cua nhom payment method
    const { discounts } = paymentMethods[paymentIndex];
    const currentDiscountIndex = discounts.findIndex((e) => e.id === id);
    discounts[currentDiscountIndex] = {
      id,
      ...payload,
    };
    paymentMethods[paymentIndex].discounts = discounts;
    return {
      ...state,
      paymentMethods,
    };
  }
  const discounts = [...state.discounts];
  const index = discounts.findIndex((e) => e.id === id);
  discounts[index] = {
    id,
    ...payload,
  };
  return {
    ...state,
    discounts,
  };
};

const addNewDiscountSuccess = (state, { id, payload }) => {
  const discounts = [...state.discounts];
  const index = discounts.findIndex((e) => e.id === id);
  discounts[index] = {
    id,
    ...payload,
  };
  return {
    ...state,
    discounts,
  };
};

// LOCATION
const markLocation = (state, { location }) => {
  return {
    ...state,
    location,
  };
};

const onChangeLocationDescription = (state, { text }) => {
  return {
    ...state,
    locationDescription: text,
  };
};

// FLOOR
const addNewFloor = (state) => {
  const floors = [...state.productTable];
  floors.push({
    id: mongoObjectId(),
    name: `Tầng ${floors.length + 1}`,
    rooms: [],
  });
  return {
    ...state,
    productTable: floors,
  };
};

const removeOneFloor = (state, { id }) => {
  const floors = [...state.productTable];
  const floorIndex = floors.findIndex((e) => e.id === id);
  floors.splice(floorIndex, 1);
  floors.forEach((e, idx) => {
    e.name = `Tầng ${idx + 1}`;
  });
  return {
    ...state,
    productTable: floors,
  };
};

// ROOM
const openRoomForm = (state, { roomInfo, floorId }) => {
  // const floors = [...state.productTable];
  // Tìm tầng hiện tại
  // const index = floors.findIndex(e => e.id === floorId);
  // const currentFloor = floors[index].rooms;

  // Nếu ko có room info tức là chế độ thêm, ngược lại là chế độ edit
  if (!roomInfo) {
    roomInfo = {
      id: mongoObjectId(),
      floorId,
    };
  }
  // Khi ở chế độ sửa thì cũng cần phải tìm thấy vị trí của phòng cần
  // sửa, nếu tìm ko thấy thì là chế độ thêm
  // const roomIndex = currentFloor.findIndex(e => e.id === roomInfo.id)
  // if(roomIndex !== -1) {
  //   delete roomInfo.floorId
  //   floors[index].rooms.push(roomInfo)
  // }
  return {
    ...state,
    // productTable: floors,
    isShowRoom: true,
    roomInfo: {
      ...roomInfo,
      floorId,
      // ...roomInfo,
    },
  };
};

const closeRoomForm = (state) => ({
  ...state,
  isShowRoom: false,
});

const submitFormRoom = (state, { id, floorId, productCode, area, price }) => {
  const floors = [...state.productTable];
  // Tìm tầng hiện tại
  const index = floors.findIndex((e) => e.id === floorId);
  const currentFloor = floors[index].rooms;
  // Tìm phòng hiện tại (đang thêm hoặc sửa)
  const roomIndex = currentFloor.findIndex((e) => e.id === id);
  // console.log(roomIndex);

  // Gán thông tin phòng mới vào tầng thứ 'index' tại phòng 'room index'
  if (roomIndex === -1) {
    // Nếu tạo mới
    floors[index].rooms.push({
      id,
      // floorId,
      productCode,
      area,
      price,
    });
  } else {
    // Nếu edit
    floors[index].rooms[roomIndex] = {
      id,
      // floorId,
      productCode,
      area,
      price,
    };
  }

  return {
    ...state,
    productTable: floors,
    roomInfo: {
      id,
      productCode,
      area,
      price,
      floorId,
    },
  };
};

const deleteOneRoom = (state, { id, floorId }) => {
  const floors = [...state.productTable];
  // Tìm tầng hiện tại
  const index = floors.findIndex((e) => e.id === floorId);
  const currentFloor = floors[index].rooms;
  // Tìm chỉ số phòng hiện tại để xóa
  const roomIndex = currentFloor.findIndex((e) => e.id === id);
  currentFloor.splice(roomIndex, 1);
  floors[index].rooms = currentFloor;
  return {
    ...state,
    productTable: floors,
  };
};

// DELETE PROPERTY
const deleteOnePropertyError = (state) => {
  return {
    ...state,
  };
};

// LOAD EXCEL
const loadExcelSuccess = (state, { data }) => ({
  ...state,
  productTable: data,
});

// CREATE PROPERTY

const creatingProperty = (state) => ({
  ...state,
  createPropertyLoading: true,
});
const createPropertySuccess = (state) => ({
  ...state,
  createPropertyLoading: false,
});
const createPropertyFailure = (state) => ({
  ...state,
  createPropertyLoading: false,
});

// ADD NEW PAYMENT SUCCESS

const addNewPaymentMethodSuccess = (state, { name }) => {
  const payments = [...state.paymentMethods];
  payments.push({
    id: mongoObjectId(),
    name,
    discounts: [],
  });
  return {
    ...state,
    paymentMethods: payments,
  };
};

// REMOVE ONE PAYMENT
const removeOnePaymentMethod = (state, { id }) => {
  const payments = [...state.paymentMethods];
  const removedPayments = payments.filter((e) => e.id !== id);

  return {
    ...state,
    paymentMethods: removedPayments,
  };
};

// PAYMENT PROGRESS
const addPaymentProgress = (state) => {
  const paymentProgress = [...state.paymentProgress];
  paymentProgress.push({
    id: mongoObjectId(),
  });
  return {
    ...state,
    paymentProgress,
  };
};

const addPaymentProgressSuccess = (state, { id, payload }) => {
  const paymentProgress = [...state.paymentProgress];
  const index = paymentProgress.findIndex((e) => e.id === id);
  paymentProgress[index] = {
    id,
    ...payload,
  };

  return {
    ...state,
    paymentProgress,
  };
};

const removeOnePaymentProgress = (state, { id }) => {
  let paymentProgress = [...state.paymentProgress];
  paymentProgress = paymentProgress.filter((e) => e.id !== id);
  return {
    ...state,
    paymentProgress,
  };
};

// CLEAR
const clear = () => ({ ...initialState });

//

const getOnePropertySuccess = (state, { data }) => {
  // console.log(data);
  const {
    id,
    name,
    cityId,
    typeId,
    openSaleDate,
    commissionRate,
    overview,
    legalRecords,
    location,
    locationDescription,
    sitePlans,
    salesPolicies,
    priceList,
    mainImages,
    medias,
    paymentProgress,
    discounts,
    paymentMethods,
    isVisible,
    transactionType,
    tags,
  } = data;
  const currentProperty = {
    id,
    name,
    cityId,
    typeId,
    openSaleDate,
    commissionRate,
    overview,
    location,
    locationDescription,
    priceList,
    mainImages,
    medias,
    paymentProgress,
    discounts,
    paymentMethods,
    isVisible,
    transactionType,
    tags,
  };

  legalRecords && legalRecords.forEach((e) => {
    e.id = mongoObjectId();
  });
  sitePlans && sitePlans.forEach((e) => {
    e.id = mongoObjectId();
  });
  salesPolicies && salesPolicies.forEach((e) => {
    e.id = mongoObjectId();
  });

  discounts && discounts.forEach((e) => {
    if (e.beganAt || e.endedAt) {
      e.time = [moment(e.beganAt), moment(e.endedAt)];
    } else {
      e.time = null;
    }
  });

  paymentMethods && paymentMethods.forEach((e) => {
    e.discounts.forEach((sube) => {
      if (sube.beganAt || sube.endedAt) {
        sube.time = [moment(sube.beganAt), moment(sube.endedAt)];
      } else {
        sube.time = null;
      }
    });
  });
  const propertyImage = mainImages.map((e) => e.link);
  return {
    ...state,
    currentProperty,
    location: [
      currentProperty.location.latitude,
      currentProperty.location.longitude,
    ],
    legalRecords,
    sitePlans,
    salesPolicies,
    priceList,
    propertyImage,
    paymentProgress: paymentProgress || [],
    discounts,
    paymentMethods,
  };
};

// -------Get product table----

const getProductTableSuccess = (state, { data }) => {
  const { total, limit, offset, results } = data;
  results.forEach((e) => {
    e.key = e.id;
  });
  return {
    ...state,
    limit,
    offset,
    total,
    productTable: results,
    loading: false,
  };
};

const getProductTable = (state) => ({
  ...state,
  loading: true,
});

export const property = makeReducerCreator(initialState, {
  [PropertyTypes.GET_LIST_PROPERTY]: getListProperty,
  [PropertyTypes.GET_LIST_PROPERTY_SUCCESS]: getListPropertySuccess,
  [PropertyTypes.GET_LIST_PROPERTY_FAILURE]: getListPropertyFailure,

  [PropertyTypes.UPLOAD_FILE_SUCCESS]: uploadFileSuccess,
  [PropertyTypes.UPLOAD_FILE_FAILURE]: uploadFileFailure,

  [PropertyTypes.ADD_NEW_LEGAL_RECORD]: addNewLegalRecord,
  [PropertyTypes.ADD_NEW_LEGAL_RECORD_SUCCESS]: addNewLegalRecordSuccess,

  [PropertyTypes.REMOVE_ONE_LEGAL_RECORD]: removeOneLegalRecord,

  [PropertyTypes.ADD_NEW_SITE_PLAN]: addSitePlan,
  [PropertyTypes.ADD_NEW_SITE_PLAN_SUCCESS]: addNewSitePlanSuccess,

  [PropertyTypes.REMOVE_ONE_SITE_PLAN]: removeOneSitePlan,
  [PropertyTypes.REMOVE_SITE_PLAN_IMAGE]: removeSitePlanImage,

  [PropertyTypes.ADD_SALES_POLICY]: addSalesPolicy,
  [PropertyTypes.ADD_SALES_POLICY_SUCCESS]: addSalesPoliciesSuccess,
  [PropertyTypes.REMOVE_SALES_POLICY]: removeOneSalesPolicy,

  [PropertyTypes.ADD_PRICE_LIST]: addPriceList,
  [PropertyTypes.REMOVE_PRICE_LIST]: removePriceList,

  [PropertyTypes.ADD_PROPERTY_IMAGE]: addPropertyImage,
  [PropertyTypes.REMOVE_PROPERTY_IMAGE]: removePropertyImage,

  [PropertyTypes.ADD_NEW_DISCOUNT]: addNewDiscount,
  [PropertyTypes.REMOVE_DISCOUNT]: removeDiscount,
  [PropertyTypes.ON_CHANGE_DISCOUNT]: onChangeDiscount,
  [PropertyTypes.ADD_NEW_DISCOUNT_SUCCESS]: addNewDiscountSuccess,

  [PropertyTypes.MARK_LOCATION]: markLocation,
  [PropertyTypes.ON_CHANGE_LOCATION_DESCRIPTION]: onChangeLocationDescription,

  [PropertyTypes.ADD_NEW_FLOOR]: addNewFloor,
  [PropertyTypes.REMOVE_ONE_FLOOR]: removeOneFloor,

  [PropertyTypes.OPEN_ROOM_FORM]: openRoomForm,
  [PropertyTypes.CLOSE_ROOM_FORM]: closeRoomForm,

  [PropertyTypes.SUBMIT_ROOM_FORM]: submitFormRoom,
  [PropertyTypes.DELETE_ONE_ROOM]: deleteOneRoom,

  [PropertyTypes.DELETE_PROPERTY_FAILURE]: deleteOnePropertyError,

  [PropertyTypes.LOAD_EXCEL_SUCCESS]: loadExcelSuccess,

  [PropertyTypes.SUBMIT_CREATE_PROPERTY_FORM]: creatingProperty,
  [PropertyTypes.SUBMIT_CREATE_PROPERTY_FORM_SUCCESS]: createPropertySuccess,
  [PropertyTypes.SUBMIT_CREATE_PROPERTY_FORM_FAILURE]: createPropertyFailure,

  [PropertyTypes.ADD_NEW_PAYMENT_METHOD_SUCCESS]: addNewPaymentMethodSuccess,
  [PropertyTypes.REMOVE_PAYMENT_METHOD]: removeOnePaymentMethod,

  [PropertyTypes.ADD_PAYMENT_PROGRESS]: addPaymentProgress,
  [PropertyTypes.ADD_PAYMENT_PROGRESS_SUCCESS]: addPaymentProgressSuccess,
  [PropertyTypes.REMOVE_PAYMENT_PROGRESS]: removeOnePaymentProgress,

  [PropertyTypes.CLEAR]: clear,

  [PropertyTypes.GET_ONE_PROPERTY_SUCCESS]: getOnePropertySuccess,

  [PropertyTypes.RETRIEVE_PRODUCT_TABLE_SUCCESS]: getProductTableSuccess,
  [PropertyTypes.RETRIEVE_PRODUCT_TABLE]: getProductTable,

  [PropertyTypes.ADD_PROPERTY_MEDIA]: addPropertyMedia,
  [PropertyTypes.REMOVE_PROPERTY_MEDIA]: removePropertyMedia,
});
