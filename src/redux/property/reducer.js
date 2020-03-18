import { makeReducerCreator } from "../../utils/reduxUtils";
import { PropertyTypes } from "./actions";
import { mongoObjectId } from "../../utils/textProcessor";

// Setup inintial state for app
export const initialState = {
  properties: [],
  loading: false,
  listPropertySuccess: undefined,
  listPropertyFailure: undefined,
  currentProperty: {},
  legalInfo: [
    {
      id: mongoObjectId(),
    },
  ],
  sitePlan: [
    {
      id: mongoObjectId(),
      link: [],
    },
  ],
  salePolicy: null,
  priceList: null,
  propertyImage: [],
  discounts: [
    {
      id: mongoObjectId(),
    },
  ],
  productTable: [],
  mode: undefined,
  fileUrl: undefined,
};
// End setup


// LIST PROPERTY
const getListProperty = state => ({
  ...state,
  loading: true,
});

const getListPropertySuccess = (state, { data }) => ({
  ...state,
  properties: data,
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
const addNewLegalInfo = state => {
  const legalInfo = [...state.legalInfo];
  legalInfo.push({
    id: mongoObjectId(),
  });
  return {
    ...state,
    legalInfo,
  };
};

const addNewLegalInfoSuccess = (state, { id, title, link }) => {
  const legalInfo = [...state.legalInfo];
  const index = legalInfo.findIndex(e => e.id === id);
  legalInfo[index] = {
    id,
    title,
    link,
  };

  return {
    ...state,
    legalInfo,
  };
};

const removeOneLegalInfo = (state, { id }) => {
  let legalInfo = [...state.legalInfo];
  legalInfo = legalInfo.filter(e => e.id !== id);
  return {
    ...state,
    legalInfo,
  };
};


// SITE PLAN
const addSitePlan = state => {
  const sitePlan = [...state.sitePlan];
  sitePlan.push({
    id: mongoObjectId(),
    link: [],
  });
  return {
    ...state,
    sitePlan,
  };
};

const addNewSitePlanSuccess = (state, { id, title, link }) => {
  const sitePlan = [...state.sitePlan];
  const index = sitePlan.findIndex(e => e.id === id);
  sitePlan[index] = {
    id,
    title,
    link: [...sitePlan[index].link , link],
  };

  return {
    ...state,
    sitePlan,
  };
};

const removeSitePlanImage = (state, {id, link}) => {
  const sitePlan = [...state.sitePlan];
  const index = sitePlan.findIndex(e => e.id === id);
  const links = [...sitePlan[index].link]
  const imgIndex = links.findIndex(e => e === link)
  links.splice(imgIndex, 1)
  sitePlan[index].link = links
  return {
    ...state,
    sitePlan,
  };
}
const removeOneSitePlan = (state, { id }) => {
  let sitePlan = [...state.sitePlan];
  sitePlan = sitePlan.filter(e => e.id !== id);
  return {
    ...state,
    sitePlan,
  };
};


// SALE POLICY
const addSalePolicy = (state, {link}) => ({
  ...state,
  salePolicy: link,
})

const removeSalePolicy = (state) => ({
  ...state,
  salePolicy: null,
})


// PRICE LIST
const addPriceList = (state, {link}) => ({
  ...state,
  priceList: link,
})

const removePriceList = (state) => ({
  ...state,
  priceList: null,
})


// PROPERTY IMAGE
const addPropertyImage = (state, { link}) => {
  const propertyImage = [...state.propertyImage];
  propertyImage.push(link)
  return {
    ...state,
    propertyImage,
  }
}

const removePropertyImage = (state, {link}) => {
  const propertyImage = [...state.propertyImage];
  const index = propertyImage.findIndex(e => e === link);
  propertyImage.splice(index, 1)

  return {
    ...state,
    propertyImage,
  };
}


const addNewDiscount = (state) =>  {
  const discounts = [...state.discounts];
  discounts.push({
    id: mongoObjectId(),
  });
  return {
    ...state,
    discounts,
  };
}

const removeDiscount = (state, {id}) => {
  console.log(id);
  
  let discounts = [...state.discounts];
  discounts = discounts.filter(e => e.id !== id);
  return {
    ...state,
    discounts,
  };
}

const onChangeDiscount = (state, {id, title, value}) => {
  const discounts = [...state.discounts];
  const index = discounts.findIndex(e => e.id === id);
  let currentDiscount = discounts.filter(e => e.id === id);
  currentDiscount = {
    id, title, value,
  }
  discounts[index] = currentDiscount
  return {
    ...state,
    discounts,
  };
}



export const property = makeReducerCreator(initialState, {
  [PropertyTypes.GET_LIST_PROPERTY]: getListProperty,
  [PropertyTypes.GET_LIST_PROPERTY_SUCCESS]: getListPropertySuccess,
  [PropertyTypes.GET_LIST_PROPERTY_FAILURE]: getListPropertyFailure,

  [PropertyTypes.UPLOAD_FILE_SUCCESS]: uploadFileSuccess,
  [PropertyTypes.UPLOAD_FILE_FAILURE]: uploadFileFailure,

  [PropertyTypes.ADD_NEW_LEGAL_INFO]: addNewLegalInfo,
  [PropertyTypes.ADD_NEW_LEGAL_INFO_SUCCESS]: addNewLegalInfoSuccess,

  [PropertyTypes.REMOVE_ONE_LEGAL_INFO]: removeOneLegalInfo,

  [PropertyTypes.ADD_NEW_SITE_PLAN]: addSitePlan,
  [PropertyTypes.ADD_NEW_SITE_PLAN_SUCCESS]: addNewSitePlanSuccess,

  [PropertyTypes.REMOVE_ONE_SITE_PLAN]: removeOneSitePlan,
  [PropertyTypes.REMOVE_SITE_PLAN_IMAGE]: removeSitePlanImage,

  [PropertyTypes.ADD_SALE_POLICY]: addSalePolicy,
  [PropertyTypes.REMOVE_SALE_POLICY]: removeSalePolicy,

  [PropertyTypes.ADD_PRICE_LIST]: addPriceList,
  [PropertyTypes.REMOVE_PRICE_LIST]: removePriceList,

  [PropertyTypes.ADD_PROPERTY_IMAGE]: addPropertyImage,
  [PropertyTypes.REMOVE_PROPERTY_IMAGE]: removePropertyImage,

  [PropertyTypes.ADD_NEW_DISCOUNT]: addNewDiscount,
  [PropertyTypes.REMOVE_DISCOUNT]: removeDiscount,
  [PropertyTypes.ON_CHANGE_DISCOUNT]: onChangeDiscount,
});

