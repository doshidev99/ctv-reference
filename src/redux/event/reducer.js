import { makeReducerCreator } from "../../utils/reduxUtils";
import { EventTypes } from "./actions";


// Setup inintial state for event
export const initialState = {
  events: [],
  offset: 0, // offset = (page - 1) * limit;
  limit: 10,
  total: null,
  loading: false,
  listEventSuccess: undefined,
  listEventFailure: undefined,

  createEventSuccess: undefined,
  createEventFailure: undefined,

  updateEventSuccess: undefined,
  updateEventFailure: undefined,

  currentEvent: {},
  registrations: [],
  eventImage: null,
};
// End setup

// LIST EVENT
const getListEvent = state => ({
  ...state,
  loading: true,
});

const getListEventSuccess = (state, { data, total, limit, offset }) => ({
  ...state,
  events: data,
  limit, 
  offset,
  total,
  loading: false,
  listEventSuccess: true,
  listEventFailure: false,
});

const getListEventFailure = state => ({
  ...state,
  loading: false,
  listEventSuccess: false,
  listEventFailure: true,
});

// ---------------------------------------
const createOneEventSuccess = state => {

  return {
    ...state,
    loading:false,
    createEventFailure: false,
    createEventSuccess: true,
  }
} 

const createOneEventFailure = state => ({
  ...state,
  loading:false,
  createEventFailure: false,
  createEventSuccess: true,
})
// -----------------------------------------
const updateOneEvent = (state, {id, payload}) => {
  const eventList = [...state.events];
  payload.key = id
  const index = eventList.findIndex(e => e.id ===id);
  eventList[index] = payload;
  return {
    ...state,
    events:eventList,
  }
}
const updateOneEventSuccess = state => ({
  ...state,
  loading:false,
  updateEventFailure: false,
  updateEventSuccess: true,
})
const updateOneEventFailure = state => ({
  ...state,
  loading:false,
  updateEventFailure: false,
  updateEventSuccess: true,
})

// -----------------------------------------
const getOneEventSuccess =(state, {data}) => ({
  ...state,
  currentEvent: data,
  loading:false,
})
const getOneEventFailure =(state) => ({
  ...state,
  loading:false,
})

// -----------------------------------------
// UPLOAD IMAGE
const uploadImageSuccess = (state, { fileUrl }) => {
  return {
    ...state,
    eventImage: fileUrl,
  };
};

const uploadImageFailure = state => ({
  ...state,
  loading: false,
});

const removeImage = (state) => ({
  ...state,
  eventImage:null,
})
// --------------------------------------------------
// GET REGISTRATIONS BY EVENT
const getRegistrations = state => ({
  ...state,
  loading: true,
})
const getRegistrationsSuccess = (state,{data, total, limit, offset} )=> ({
  ...state,
  registrations: data,
  total, limit, offset,
  loading: false,
})
const getRegistrationsFailure = state => ({
  ...state,  
  loading: false,
})

export const event = makeReducerCreator(initialState, {
  [EventTypes.GET_LIST_EVENT]: getListEvent,
  [EventTypes.GET_LIST_EVENT_SUCCESS]: getListEventSuccess,
  [EventTypes.GET_LIST_EVENT_FAILURE]: getListEventFailure,

  [EventTypes.CREATE_ONE_EVENT_SUCCESS]: createOneEventSuccess,
  [EventTypes.CREATE_ONE_EVENT_FAILURE]: createOneEventFailure,

  [EventTypes.UPDATE_ONE_EVENT]: updateOneEvent,
  [EventTypes.UPDATE_ONE_EVENT_SUCCESS]: updateOneEventSuccess,
  [EventTypes.UPDATE_ONE_EVENT_FAILURE]: updateOneEventFailure,

  [EventTypes.GET_ONE_EVENT_SUCCESS]: getOneEventSuccess,
  [EventTypes.GET_ONE_EVENT_FAILURE]: getOneEventFailure,

  [EventTypes.UPLOAD_IMAGE_SUCCESS]: uploadImageSuccess,
  [EventTypes.UPLOAD_IMAGE_FAILURE]: uploadImageFailure,

  [EventTypes.REMOVE_IMAGE]: removeImage,

  [EventTypes.GET_REGISTRATIONS_BY_EVENT]: getRegistrations,
  [EventTypes.GET_REGISTRATIONS_BY_EVENT_SUCCESS]: getRegistrationsSuccess,
  [EventTypes.GET_REGISTRATIONS_BY_EVENT_FAILURE]: getRegistrationsFailure,
})