import axios from "axios";
let URL = `http://localhost:3001`;

//add user info
export const MDBuserInfo = async (formData) => {
  try {
    const response = await axios.post(`${URL}/signup`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
    } else {
      console.log(`Error inserting! ${response.data}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};

//confirm user info
export const MDBlogin = async (email, password) => {
  try {
    const response = await axios.post(
      `${URL}/login`,
      { email, password },
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response;
    } else {
      console.log(`Error inserting! ${response.data}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};

export const MDBsendEmail = async (email) => {
  try {
    const response = await axios.post(
      `${URL}/forgot_password`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return response;
    } else {
      console.log(`Error sending email! ${response.data}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};

export const MDBresetPassword = async (newPassword, confirmationNumber) => {
  try {
    const response = await axios.post(
      `${URL}/reset_password`,
      { newPassword, confirmationNumber },
      { withCredentials: true },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return response;
    } else {
      console.log(`Error reseting password! ${response.data}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};
