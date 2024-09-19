import "./forgotPassword.css";
import React, { useState } from "react";
import { sendEmail } from "../../servers/userRequests/postUserRequest";
import { MDBsendEmail } from "../../servers/mongoDB/userRequests/postUserRequest";
import { Button, Card, Form, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import ResetPasswordForm from "../resetPassword/resetPassword";

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

const ForgotPasswordForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { email } = values;
    try {
      // await sendEmail(email);
      await MDBsendEmail(email);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error sending email:", error);
      navigate("/error500");
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="forgot_password_main_container">
      <Card>
        <div className="forgot_password_head_container">
          <div className="forgot_password_head_1">Forgot Password?</div>{" "}
          <div className="forgot_password_head_2">
            Please enter your email to reset your password!
          </div>
        </div>
        <Form onFinish={handleSubmit} validateMessages={validateMessages}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Enter your email" prefix={<MdOutlineEmail />} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 6,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="submit_forgot_password_btn"
            >
              Continue
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        title="Reset Password"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <ResetPasswordForm />
      </Modal>
    </div>
  );
};

export default ForgotPasswordForm;
