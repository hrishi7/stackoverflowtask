import axios from "axios";
import { apiEndpoint } from "./proxy";

export const getData = async (page, limit) => {
  try {
    let url = `${apiEndpoint}?page=${page}&pagesize=${limit}&order=desc&sort=activity&site=stackoverflow`;
    let result = await axios.get(url);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Server error while fetching data",
    };
  }
};
