import axios from "axios";
let URL = `http://localhost:3001/mdb/student`;

//get user info
export const MDBgetAllUserInfo = async () => {
  try {
    const response = await axios.get(`${URL}/get_all_user_info`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//get user info by ID
export const MDBgetUserInfoById = async (studentId, token) => {
  try {
    const response = await axios.get(`${URL}/get_user_info`, {
      params: {
        student_id: studentId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
