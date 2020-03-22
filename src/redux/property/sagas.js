import { takeEvery, put, call } from "redux-saga/effects";
import moment from "moment";
import {
  PropertyTypes,
  getListPropertySuccessAction,
  getListPropertyFailureAction,
  deleteProperyFailureAtion,

  // uploadFileSuccessAction,
  // uploadFileFailureAction,
} from "./actions";
// import {data} from './tempData'
import { getProperties, deleteOne } from "../../api/modules/property";
import { apiWrapper } from "../../utils/reduxUtils";

function* getListProperty({ limit, offset, filter }) {
  try {
    if (limit === undefined) {
      limit = 5;
    }
    if (offset === undefined) {
      offset = 0;
    }
    
    const { results, total } = yield getProperties({ limit, offset, filter });

    const data = results.map(e => {
      return {
        key: e.id,
        name: e.name,
        city: e.cityName,
        type: e.typeName,
        date: moment(e.createdAt).format("L"),
      };
    });

    yield put(getListPropertySuccessAction(data, total, limit, offset));
  } catch (error) {
    yield put(getListPropertyFailureAction(error));
  }
}

function* deleteProprety({ id }) {
  try {
    yield call(
      apiWrapper,
      {
        isShowProgress: true,
        isShowSucceedNoti: true,
        successDescription: "Xóa thành công",
      },
      deleteOne,
      id,
    );
  } catch (error) {
    yield put(deleteProperyFailureAtion(error));
  }
}
export default [
  takeEvery(PropertyTypes.GET_LIST_PROPERTY, getListProperty),
  takeEvery(PropertyTypes.DELETE_PROPERTY, deleteProprety),
];
