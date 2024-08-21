import "./editUser.css";
import { Button, Empty, Form, Input, InputNumber, message, Spin } from "antd";
import { getUserInfoById } from "../../servers/getRequest";
import { updateUserInfo } from "../../servers/postRequest";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const EditUser = ({ studentId, token, handleCancel }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // if (!userId || !token) {
      //   console.error("Missing userId or token");
      //   setLoading(false);
      //   return;
      // }
      try {
        const data = await getUserInfoById(studentId, token);
        if (data && data.student_id) {
          setUserInfo(data);
        } else {
          console.error("Invalid user data:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [studentId, token]);

  const onFinish = async (values) => {
    try {
      await updateUserInfo(values);
      messageApi.open({
        type: "success",
        content: "Student updated successfully",
      });
      setTimeout(() => {
        navigate(0);
      }, 2000);
    } catch (error) {
      console.error("Error updating student:", error);
      navigate("/error500");
    }
  };

  if (loading) {
    return <Spin spinning="loading" tip="Loading..." fullscreen={true} />;
  }

  if (!userInfo)
    return (
      <div>
        <Empty description="User not found" />
      </div>
    );

  return (
    <>
      {contextHolder}
      <Form
        {...layout}
        onFinish={onFinish}
        className="edit_user_form"
        validateMessages={validateMessages}
        initialValues={userInfo}
        action="/student/update_user_info"
        method="POST"
      >
        <Form.Item name="student_id" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              type: "number",
              min: 10,
              max: 99,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="address1"
          label="Address 1"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address2"
          label="Address 2"
          rules={[
            {
              // required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="state"
          label="State"
          rules={[
            {
              min: 0,
              max: 10,
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="zip_code"
          label="Zip Code"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              // required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 16,
          }}
        >
          <div className="edit_user_form_container">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditUser;
