import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const ProjectTypes = makeConstantCreator(
  "GET_LIST_PROJECT",
  "GET_LIST_PROJECT_SUCCESS",
  "GET_LIST_PROJECT_FAILURE",
);

// Get list project
export const getListProjectAction = params => makeActionCreator(ProjectTypes.GET_LIST_PROJECT, { params });
export const getListProjectSuccessAction = data => makeActionCreator(ProjectTypes.GET_LIST_PROJECT_SUCCESS, { data });
export const getListProjectFailureAction = error => makeActionCreator(ProjectTypes.GET_LIST_PROJECT_FAILURE, { error });

