import "./resetPassword.css";
import React from "react";
import { resetPassword } from "../../servers/userRequests/postUserRequest";
import { Button, Card, Form, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { TbPasswordUser } from "react-icons/tb";
import { MdOutlineConfirmationNumber, MdOutlineEmail } from "react-icons/md";

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  const handleReset = async (values) => {
    const { new_password, confirmationNumber } = values;
    try {
      await resetPassword(new_password, confirmationNumber);
      navigate(0);
    } catch (error) {
      console.error("Error resetting password:", error);
      Modal.error({
        title: "Error",
        content: "Failed to reset password, Please try again!",
        footer: null,
      });
    }
  };

  return (
    <div>
      <Card>
        <div className="reset_password_head_container">
          <div className="reset_password_inner">
            Email sent. Please check your email for instructions!
          </div>
        </div>
        <Form onFinish={handleReset}>
          <Form.Item
            label="Confirmation number"
            name="confirmationNumber"
            rules={[
              {
                required: true,
                message: "Please input your Confirmation number!",
              },
            ]}
          >
            <Input
              placeholder="Confirmation number"
              prefix={<MdOutlineConfirmationNumber />}
            />
          </Form.Item>
          {/* <Form.Item
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
          </Form.Item> */}
          <Form.Item
            label="New password"
            name="new_password"
            rules={[
              {
                required: true,
                message: "Please input your New password!",
              },
            ]}
          >
            <Input.Password
              placeholder="New password"
              prefix={<TbPasswordUser />}
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["new_password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm new password"
              prefix={<TbPasswordUser />}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="submit_reset_password_btn"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
