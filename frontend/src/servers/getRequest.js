import axios from "axios";
let URL = `http://localhost:3001/student`;

//get user info
export const getAllUserInfo = async () => {
  try {
    const response = await axios.get(`${URL}/get_all_user_info`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//get user info by ID
export const getUserInfoById = async (studentId, token) => {
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

//get zman goal info
export const getAllZmanGoalInfo = async () => {
  try {
    const response = await axios.get(`${URL}/get_zman_goal`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//get payment info
export const getAllPaymentInfo = async () => {
  try {
    const response = await axios.get(`${URL}/payments`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//get withdrawal info
export const getAllWithdrawalInfo = async () => {
  try {
    const response = await axios.get(`${URL}/get_withdrawal`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//get old zman goal info
export const getOldZmanGoalInfo = async () => {
  try {
    const response = await axios.get(`${URL}/get_old_zman_goal`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//get old payments info
export const getOldPaymentInfo = async () => {
  try {
    const response = await axios.get(`${URL}/get_old_payments`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//get old students info
export const getOldStudentInfo = async () => {
  try {
    const response = await axios.get(`${URL}/get_old_students`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
