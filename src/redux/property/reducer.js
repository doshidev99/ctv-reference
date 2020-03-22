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
  legalRecords: [
    {
      id: mongoObjectId(),
    },
  ],
  sitePlans: [
    {
      id: mongoObjectId(),
      link: [],
    },
  ],
  salesPolicy: null,
  priceList: null,
  propertyImage: [],
  discounts: [
    {
      id: mongoObjectId(),
    },
  ],
  location: [],
  locationDescription: "",
  productTable: [
    {
      id: mongoObjectId(),
      name: "Tầng 1",
      rooms: [],
    },
  ],
  mode: undefined,
  isShowRoom: false,
  roomInfo: {},
  fileUrl: undefined,
};
// End setup

// LIST PROPERTY
const getListProperty = state => ({
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

const getListPropertyFailure = state => ({
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

const uploadFileFailure = state => ({
  ...state,
  loading: false,
});

// LEGAL INFO
const addNewLegalRecord = state => {
  const legalRecords = [...state.legalRecords];
  legalRecords.push({
    id: mongoObjectId(),
  });
  return {
    ...state,
    legalRecords,
  };
};

const addNewLegalRecordSuccess = (state, { id, title, link }) => {
  const legalRecords = [...state.legalRecords];
  const index = legalRecords.findIndex(e => e.id === id);
  legalRecords[index] = {
    id,
    title,
    link,
  };

  return {
    ...state,
    legalRecords,
  };
};

const removeOneLegalRecord = (state, { id }) => {
  let legalRecords = [...state.legalRecords];
  legalRecords = legalRecords.filter(e => e.id !== id);
  return {
    ...state,
    legalRecords,
  };
};

// SITE PLAN
const addSitePlan = state => {
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
  const index = sitePlans.findIndex(e => e.id === id);
  sitePlans[index] = {
    id,
    title,
    link: [...sitePlans[index].link, link],
  };

  return {
    ...state,
    sitePlans,
  };
};

const removeSitePlanImage = (state, { id, link }) => {
  const sitePlans = [...state.sitePlans];
  const index = sitePlans.findIndex(e => e.id === id);
  const links = [...sitePlans[index].link];
  const imgIndex = links.findIndex(e => e === link);
  links.splice(imgIndex, 1);
  sitePlans[index].link = links;
  return {
    ...state,
    sitePlans,
  };
};
const removeOneSitePlan = (state, { id }) => {
  let sitePlans = [...state.sitePlans];
  sitePlans = sitePlans.filter(e => e.id !== id);
  return {
    ...state,
    sitePlans,
  };
};

// SALE POLICY
const addSalesPolicy = (state, { link }) => ({
  ...state,
  salesPolicy: link,
});

const removeSalesPolicy = state => ({
  ...state,
  salesPolicy: null,
});

// PRICE LIST
const addPriceList = (state, { link }) => ({
  ...state,
  priceList: link,
});

const removePriceList = state => ({
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
  const index = propertyImage.findIndex(e => e === link);
  propertyImage.splice(index, 1);

  return {
    ...state,
    propertyImage,
  };
};

// DISCOUNT
const addNewDiscount = state => {
  const discounts = [...state.discounts];
  discounts.push({
    id: mongoObjectId(),
  });
  return {
    ...state,
    discounts,
  };
};

const removeDiscount = (state, { id }) => {
  let discounts = [...state.discounts];
  discounts = discounts.filter(e => e.id !== id);
  return {
    ...state,
    discounts,
  };
};

const onChangeDiscount = (state, { id, title, value }) => {
  const discounts = [...state.discounts];
  const index = discounts.findIndex(e => e.id === id);
  let currentDiscount = discounts.filter(e => e.id === id);
  currentDiscount = {
    id,
    title,
    value,
  };
  discounts[index] = currentDiscount;
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
const addNewFloor = state => {
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
  const floorIndex = floors.findIndex(e => e.id === id);
  floors.splice(floorIndex, 1);
  floors.forEach((e,idx) => {
    e.name = `Tầng ${idx + 1}`
  })
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
      ...roomInfo, floorId,
      // ...roomInfo,
    },
  };
};

const closeRoomForm = state => ({
  ...state,
  isShowRoom: false,
});

const submitFormRoom = (state, { id, floorId, productCode, area, price }) => {
  const floors = [...state.productTable];
  // Tìm tầng hiện tại
  const index = floors.findIndex(e => e.id === floorId);
  const currentFloor = floors[index].rooms;
  // Tìm phòng hiện tại (đang thêm hoặc sửa)
  const roomIndex = currentFloor.findIndex(e => e.id === id);
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

const deleteOneRoom = (state, {id, floorId}) => {
  const floors = [...state.productTable];
  // Tìm tầng hiện tại
  const index = floors.findIndex(e => e.id === floorId);
  const currentFloor = floors[index].rooms;
  // Tìm chỉ số phòng hiện tại để xóa
  const roomIndex = currentFloor.findIndex(e => e.id === id);
  currentFloor.splice(roomIndex, 1)
  floors[index].rooms = currentFloor;
  return {
    ...state,
    productTable: floors,
  };
}


// DELETE PROPERTY
const deleteOnePropertyError = (state) =>  {
  return {
    ...state,
  }
}



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
  [PropertyTypes.REMOVE_SALES_POLICY]: removeSalesPolicy,

  [PropertyTypes.ADD_PRICE_LIST]: addPriceList,
  [PropertyTypes.REMOVE_PRICE_LIST]: removePriceList,

  [PropertyTypes.ADD_PROPERTY_IMAGE]: addPropertyImage,
  [PropertyTypes.REMOVE_PROPERTY_IMAGE]: removePropertyImage,

  [PropertyTypes.ADD_NEW_DISCOUNT]: addNewDiscount,
  [PropertyTypes.REMOVE_DISCOUNT]: removeDiscount,
  [PropertyTypes.ON_CHANGE_DISCOUNT]: onChangeDiscount,

  [PropertyTypes.MARK_LOCATION]: markLocation,
  [PropertyTypes.ON_CHANGE_LOCATION_DESCRIPTION]: onChangeLocationDescription,

  [PropertyTypes.ADD_NEW_FLOOR]: addNewFloor,
  [PropertyTypes.REMOVE_ONE_FLOOR]: removeOneFloor,

  [PropertyTypes.OPEN_ROOM_FORM]: openRoomForm,
  [PropertyTypes.CLOSE_ROOM_FORM]: closeRoomForm,

  [PropertyTypes.SUBMIT_ROOM_FORM]: submitFormRoom,
  [PropertyTypes.DELETE_ONE_ROOM]: deleteOneRoom,

  [PropertyTypes.DELETE_PROPERTY_FAILURE]: deleteOnePropertyError,
});
