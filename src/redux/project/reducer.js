import { makeReducerCreator } from "../../utils/reduxUtils";
import { ProjectTypes } from "./actions";

// Setup inintial state for app
export const initialState = {
  projects: [],
  loading: false,
  listProjectSuccess: undefined,
  listProjectFailure: undefined,
};
// End setup

const getListProject = state => ({
  ...state,
  loading: true,
});

const getListProjectSuccess = (state, { data }) => ({
  ...state,
  projects: data,
  loading: false,
  listProjectSuccess: true,
  listProjectFailure: false,
});

const getListProjectFailure = state => ({
  ...state,
  loading: false,
  listProjectSuccess: false,
  listProjectFailure: true,
});

export const project = makeReducerCreator(initialState, {
  [ProjectTypes.GET_LIST_PROJECT]: getListProject,
  [ProjectTypes.GET_LIST_PROJECT_SUCCESS]: getListProjectSuccess,
  [ProjectTypes.GET_LIST_PROJECT_FAILURE]: getListProjectFailure,
});
