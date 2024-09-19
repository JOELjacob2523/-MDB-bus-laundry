import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Select, message } from "antd";
import { HDate, HebrewDateEvent } from "@hebcal/core";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import { CiCalendarDate, CiUser } from "react-icons/ci";
import { checkAuth } from "../../servers/userRequests/getUserRequest";
import { MDBwithdrawalInfo } from "../../servers/mongoDB/studentRequests/postRequests";
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

const WithdrawalForm = () => {
  const [form] = Form.useForm();
  const [date, setDate] = useState(new Date().toLocaleString());
  const [hebrewDate, setHebrewDate] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  useEffect(() => {
    const updateDates = async () => {
      await checkAuth().then((result) => {
        if (result) {
          form.setFieldsValue({
            username: `${result.first_name} ${result.last_name}`,
          });
        }
      });
      setDate(new Date().toLocaleString());

      const hd = new HDate(new Date());
      const ev = new HebrewDateEvent(hd);
      const HD = ev.render("he-x-NoNikud");
      setHebrewDate(HD);

      form.setFieldsValue({
        date: new Date().toLocaleString(),
        hebrew_date: HD,
      });
    };
    updateDates();
  }, []);

  const onFinish = async (values) => {
    try {
      await MDBwithdrawalInfo(values);
      messageApi.open({
        type: "success",
        content: "Withdrawal info added successfully",
      });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error adding withdrawal info:", error);
      navigate("/error500");
    }
  };

  return (
    <div>
      {contextHolder}
      <Card>
        <Form
          {...layout}
          key={hebrewDate}
          form={form}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="amount"
            label="Amount"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input prefix={<BsCurrencyDollar />} placeholder="Amount..." />
          </Form.Item>
          <Form.Item
            name="withdrawal_to"
            label="Withdrawal to"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={[
                { value: "באס", label: "באס" },
                { value: "ספרינטער", label: "ספרינטער" },
                { value: "קאר/מיני ווען", label: "קאר/מיני ווען" },
                { value: "וואשן", label: "וואשן" },
              ]}
              placeholder="Choose withdrawal to..."
              suffixIcon={<IoPersonSharp />}
            />
          </Form.Item>
          <Form.Item name="date" label="Date">
            <Input disabled prefix={<CiCalendarDate />} />
          </Form.Item>
          <Form.Item name="hebrew_date" label="Hebrew date">
            <Input disabled prefix={<CiCalendarDate />} />
          </Form.Item>
          <Form.Item name="username" label="Withdrawal by">
            <Input disabled prefix={<CiUser />} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 21,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default WithdrawalForm;
