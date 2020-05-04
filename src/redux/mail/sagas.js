import { takeEvery, put, call } from "redux-saga/effects";
import {
  MailTypes,
  getMailListSuccessAction,
  getMailListFailureAction,
  getOneMailSuccessAction,
  getOneMailFailureAction,
  markOneMailReadSuccessAction,
  markOneMailReadFailureAction,
  markOneMailReadAction,
  sendMailSuccessAction,
  sendMailFailureAction,
  getReceivedMailAction,
  getReceivedMailActionSuccess,
  getReceivedMailActionFailure,
  deleteMailActionFailure,
  deleteMailActionSuccess,

  setViewerAction,
} from "./actions";
// import fakeMail from "../../containers/EmailBox/ListMail/fakeData";
import { getAllMails, getOne, markAsRead, deleteOne, sendOneMail } from "../../api/modules/mail";
import { apiWrapper } from "../../utils/reduxUtils";


function* getMailList({ limit, offset, filter, orderBy }) {
  try {
    if (limit === undefined) {
      limit = 5;
    }
    if (offset === undefined) {
      offset = 0;
    }
    if (filter) {
      if(filter.sender === 2) {
        yield put(setViewerAction('me'))
      } else {
        yield put(setViewerAction(null))
      }
    }
    
    const { results, total } = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
      },
      getAllMails,
      { limit, offset, orderBy,  filter: JSON.stringify(filter) },
    )
   
    const data = results.map(e => {
      return {
        id: e.id,
        key: e.id,
        name: e.realtor.fullName,
        img: e.realtor.avatar,
        subject: e.title,
        isRead: e.isRead,
        date: e.createdAt,
      };
    });
    yield put(getMailListSuccessAction(data, total, limit, offset));
  } catch (error) {
    yield put(getMailListFailureAction(error));
  }
}

function* getOneMail({ id }) {
  try {
    const response = yield getOne(id);
    const data = {
      id: response.id,
      name: response.realtor.fullName,
      img: response.realtor.avatar,
      subject: response.title,
      email: response.realtor.email,
      date: response.createdAt,
      body: response.content,
    };
    yield put(getOneMailSuccessAction(data));
    if (!response.isRead) {
      yield put(markOneMailReadAction(id));
    }
  } catch (error) {
    yield put(getOneMailFailureAction(error));
  }
}

function* markRead({ id }) {
  try {
    const body = {
      isRead: true,
    };
    yield markAsRead(id, body);
    yield put(getReceivedMailAction())
    yield put(markOneMailReadSuccessAction(id));
  } catch (error) {
    yield put(markOneMailReadFailureAction(error));
  }
}

function* sendMail({ payload }) {
  try {
    // console.log("From saga >> ", payload);
    yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: true,
        successDescription: "Đã gửi",
      },
      sendOneMail,
      payload,
    );
    yield put(sendMailSuccessAction())
  } catch (error) {
    yield put(sendMailFailureAction(error));
  }
}

function* getReceivedMail() {
  try {
    const receivedFilters =  { limit: 1, offset: 0, orderBy: 'id',  filter: JSON.stringify({"sender":{"$not":2}, "isRead":false})};
    const received = yield getAllMails(receivedFilters);
    // const sentFilters =  { limit: 1, offset: 0, orderBy: 'id',  filter: JSON.stringify({"sender":2})};
    // const sent = yield getAllMails(sentFilters);
    yield put(getReceivedMailActionSuccess({
      received: received.total,
      // sent: sent.total,
    }));
  } catch (error) {
    yield put(getReceivedMailActionFailure(error));
  }
}

function* deleteMail({id}) {
  try {
    yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: true,
        successDescription: "Đã xóa mail",
      },
      deleteOne,
      id,
    );
    
    
    yield put(deleteMailActionSuccess(id));
    
  } catch (error) {
    yield put(deleteMailActionFailure());
  }
}


export default [
  takeEvery(MailTypes.GET_MAIL_LIST, getMailList),
  takeEvery(MailTypes.GET_ONE_MAIL, getOneMail),
  takeEvery(MailTypes.MARK_ONE_MAIL_READ, markRead),
  takeEvery(MailTypes.SEND_MAIL, sendMail),
  takeEvery(MailTypes.GET_RECEIVED_MAIL, getReceivedMail),
  takeEvery(MailTypes.DELETE_MAIL, deleteMail),
];
