import axiosInstance from "../../utils/axiosInstance";

function getEventTypes(url) {
  return axiosInstance
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export default getEventTypes;
