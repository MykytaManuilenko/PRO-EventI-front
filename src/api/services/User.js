import axiosInstance from "../../utils/axiosInstance";

function getEventTypes(url) {
  return axiosInstance
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
}

export default getEventTypes;
