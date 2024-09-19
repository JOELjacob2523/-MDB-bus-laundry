import "./signup.css";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { TbPasswordUser } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { Button, Card, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { MDBuserInfo } from "../../servers/mongoDB/userRequests/postUserRequest";
import KYLetterhead from "../../images/KY_Letterhead.png";

const UserSignup = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await MDBuserInfo(values);
      navigate("/");
    } catch (error) {
      console.error("Error adding user:", error);
      navigate("/error500");
    }
  };
  return (
    <div>
      <div className="signup_main_container">
        <div className="KY_letterhead_img_container">
          <img
            className="KY_letterhead_img"
            alt="KYLetterhead"
            src={KYLetterhead}
          />
        </div>
        <div className="signup_card_container">
          <Card title="Signup" className="signup_card">
            <Form
              name="normal_login"
              className="signup_form"
              action="/signup"
              method="POST"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="First Name"
                />
              </Form.Item>

              <Form.Item
                name="last_name"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Last Name"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password prefix={<TbPasswordUser />} />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<TbPasswordUser />} />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input prefix={<MdOutlineEmail />} />
              </Form.Item>

              <Form.Item>
                <div className="signup_form_footer">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="signup_form_button"
                  >
                    Submit
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default UserSignup;
