import axios from "axios";
let URL = `http://localhost:3001/mdb/student`;

//add student info
export const MDBuserInfo = async (formData) => {
  try {
    const response = await axios.post(`${URL}/student_info`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      console.log("Success!!");
    } else {
      console.log(`Error inserting! ${response.data}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};

//update student info
export const MDBupdateUserInfo = async (formData) => {
  try {
    const response = await axios.post(`${URL}/update_user_info`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      console.log("Updated Success!!");
    } else {
      console.log(`Error updating! ${response.data}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};

//add user payments into the database
export const MDBpayments = async (formData) => {
  try {
    const response = await axios.post(`${URL}/payments`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("Payment Added Success!!");
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};

//delete user info
export const MDBdeleteUserInfo = async (id) => {
  try {
    console.log(`Sending request to delete user with id: ${id}`);
    const response = await axios.post(
      `${URL}/delete_user`,
      { _id: id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Deleted Success!!");
    } else {
      console.log(`Error deleting! ${response.data}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};

//add zman goal info
export const MDBzmanGoalInfo = async (formData) => {
  try {
    const response = await axios.post(`${URL}/zman_goal`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("Success!!");
    } else {
      console.log(`Error inserting! ${response.data}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};
