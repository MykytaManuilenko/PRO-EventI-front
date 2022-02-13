import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

function getEventTypes(url) {
  return axios
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export default getEventTypes;
