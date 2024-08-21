import axios from "axios";
let URL = `http://localhost:3001`;

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get(`/check_auth`);
    return response.data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};
