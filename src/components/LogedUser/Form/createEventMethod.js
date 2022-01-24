import axiosInstance from "../../../utils/axiosInstance";
import axios from "axios";
import { uiActions } from "../../../redux/slices/ui";

export const createEventOnlyBackground = (
  formData,
  data,
  history,
  dispatch
) => {
  axiosInstance
    .post("/api/files", formData, {
      params: { type: "EVENT_BACKGROUND" },
    })
    .then((res) => {
      console.log("res :>> ", res.data.fileId);
      data.background = res.data.fileId;
      console.log("dataCreateBack :>> ", data);

      axiosInstance
        .post("/api/events", data)
        .then((res) => {
          console.log("res :>> ", res);
          dispatch(
            uiActions.openAlert({
              status: "success",
              message: "Event is successfully created!",
            })
          );
          history.push(`/events/${res.data.eventId}`);
        })
        .catch((err) => {
          console.log("err :>> ", err.response);
          dispatch(
            uiActions.openAlert({
              status: "error",
              message: err.response.data.message,
            })
          );
        });
    })
    .catch((err) => {
      dispatch(
        uiActions.openAlert({
          status: "error",
          message: err.response.data.message,
        })
      );
      console.log("err :>> ", err);
    });
};

export const createEventOnSubmit = (
  formDataMultiple,
  formData,
  data,
  history,
  dispatch
) => {
  axios
    .all([
      axiosInstance.post("/api/files/bulk", formDataMultiple, {
        params: { type: "EVENT_PHOTO" },
      }),
      axiosInstance.post("/api/files", formData, {
        params: { type: "EVENT_BACKGROUND" },
      }),
    ])
    .then((res1) => {
      console.log("res1 :>> ", res1);
      data.background = res1[1].data.fileId;
      res1[0].data.map((res) => {
        data.photos.push(res.fileId);
      });
      console.log("res1[1] :>> ", res1[1]);

      console.log("data.backgroundUrl :>> ", data.backgroundUrl);

      axiosInstance
        .post("/api/events", data)
        .then((res) => {
          dispatch(
            uiActions.openAlert({
              status: "success",
              message: "Event is successfully created!",
            })
          );
          history.push(`/events/${res.data.eventId}`);
        })
        .catch((err) => {
          console.log("err.mes :>> ", err.message);
          dispatch(
            uiActions.openAlert({
              status: "error",
              message: err.response.data.message,
            })
          );
        });
    })
    .catch((err) => {
      console.log("err.messsss :>> ", err);
      dispatch(
        uiActions.openAlert({
          status: "error",
          message: err.response.data.message,
        })
      );
    });
};

export const saveEditedEventWithPhotos = (
  eventId,
  data,
  formDataMultiple,
  publish,
  history,
  dispatch
) => {
  axiosInstance
    .post("/api/files/bulk", formDataMultiple, {
      params: { type: "EVENT_PHOTO" },
    })
    .then((res) => {
      console.log("res :>> ", res.data);
      res.data.map((photo) => {
        data.photos.push(photo.fileId);
      });
      axiosInstance
        .put(`/api/events/${eventId}`, data)
        .then((res) => {
          const eventIdUpdated = res.data.eventId;
          history.push(`/events/${res.data.eventId}`);
          dispatch(
            uiActions.openAlert({
              status: "success",
              message: "Event is edited successfully!",
            })
          );
          history.goBack();
          if (publish) {
            axiosInstance
              .patch(`/api/events/${eventIdUpdated}`)
              .then((res) => {
                console.log("resPublish :>> ", res);
                dispatch(
                  uiActions.openAlert({
                    status: "success",
                    message: "Event is successfully published!",
                  })
                );
                history.push(`/events/${eventIdUpdated}`);
              })
              .catch((err) => {
                dispatch(
                  uiActions.openAlert({
                    status: "error",
                    message: err.response.data.message,
                  })
                );
                console.log("err :>> ", err);
              });
          }
        })
        .catch((err) => {
          dispatch(
            uiActions.openAlert({
              status: "error",
              message: err.response.data.message,
            })
          );
          console.log("err :>> ", err);
        });
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
};

export const saveEditedEventWithBackground = (
  eventId,
  data,
  formData,
  publish,
  history,
  dispatch
) => {
  axiosInstance
    .post("/api/files", formData, {
      params: { type: "EVENT_BACKGROUND" },
    })
    .then((res) => {
      console.log("resWithBackground :>> ", res);
      data.background = res.data.fileId;

      axiosInstance
        .put(`/api/events/${eventId}`, data)
        .then((res) => {
          console.log("res :>> ", res);
          const eventIdUpdated = res.data.eventId;
          history.push(`/events/${res.data.eventId}`);
          dispatch(
            uiActions.openAlert({
              status: "success",
              message: "Event is edited successfully!",
            })
          );
          history.goBack();
          if (publish) {
            axiosInstance
              .patch(`/api/events/${eventIdUpdated}`)
              .then((res) => {
                console.log("resPublish :>> ", res);
                history.push(`/events/${eventIdUpdated}`);
                dispatch(
                  uiActions.openAlert({
                    status: "success",
                    message: "Event is successfully published!",
                  })
                );
              })
              .catch((err) => {
                dispatch(
                  uiActions.openAlert({
                    status: "error",
                    message: err.response.data.message,
                  })
                );
                console.log("err :>> ", err);
              });
          }
        })
        .catch((err) => {
          console.log("err :>> ", err);
        });
    });
};

export const saveWithoutPhoto = (eventId, data, publish, history, dispatch) => {
  axiosInstance
    .put(`/api/events/${eventId}`, data)
    .then((res) => {
      console.log("resWithoutPhoto :>> ", res);
      const eventIdUpdated = res.data.eventId;
      dispatch(
        uiActions.openAlert({
          status: "success",
          message: "Event is edited successfully",
        })
      );
      history.goBack();
      if (publish) {
        axiosInstance
          .patch(`/api/events/${eventIdUpdated}`)
          .then((res) => {
            console.log("resPublish :>> ", res);
            dispatch(
              uiActions.openAlert({
                status: "success",
                message: "Event is successfully published",
              })
            );
            history.push(`/events/${eventIdUpdated}`);
          })
          .catch((err) => {
            dispatch(
              uiActions.openAlert({
                status: "error",
                message: err.response.data.message,
              })
            );
            console.log("err :>> ", err);
          });
      }
    })
    .catch((err) => {
      console.log("SaveWithoutPhoto err :>> ", err);
    });
};

export const saveWithPhotosBackground = (
  eventId,
  data,
  formData,
  formDataMultiple,
  publish,
  history,
  dispatch
) => {
  axios
    .all([
      axiosInstance.post("/api/files/bulk", formDataMultiple, {
        params: { type: "EVENT_PHOTO" },
      }),
      axiosInstance.post("/api/files", formData, {
        params: { type: "EVENT_BACKGROUND" },
      }),
    ])
    .then((res1) => {
      data.background = res1[1].data.fileId;
      res1[0].data.map((res) => {
        data.photos.push(res.fileId);
      });

      axiosInstance
        .put(`/api/events/${eventId}`, data)
        .then((res) => {
          console.log("resSaveWithPhotosBackground :>> ", res);
          dispatch(
            uiActions.openAlert({
              status: "success",
              message: "Event is updated successfully!",
            })
          );
          history.goBack();
          const eventIdUpdated = res.data.eventId;
          if (publish) {
            axiosInstance
              .patch(`/api/events/${eventIdUpdated}`)
              .then((res) => {
                console.log("resPublish :>> ", res);
                dispatch(
                  uiActions.openAlert({
                    status: "success",
                    message: "Event is successfully published!",
                  })
                );
                history.push(`/events/${eventIdUpdated}`);
              })
              .catch((err) => {
                dispatch(
                  uiActions.openAlert({
                    status: "error",
                    message: err.response.data.message,
                  })
                );
                console.log("err :>> ", err);
              });
          }
        })
        .catch((err) => {
          dispatch(
            uiActions.openAlert({
              status: "error",
              message: err.response.data.message,
            })
          );
          console.log("err :>> ", err);
        });
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
};
