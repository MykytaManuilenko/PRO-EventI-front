import { uiActions } from "../slices/ui";
const openAlert = (status, message) => (dispatch) => {
  dispatch(uiActions.openAlert(status, message));
};
