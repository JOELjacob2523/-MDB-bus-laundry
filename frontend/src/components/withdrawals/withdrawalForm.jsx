import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Select, message } from "antd";
import { HDate, HebrewDateEvent } from "@hebcal/core";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
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
  const [date, setDate] = useState(new Date().toLocaleString());
  const [hebrewDate, setHebrewDate] = useState("");
  const [userId, setUserId] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  useEffect(() => {
    const updateDates = async () => {
      await checkAuth().then((result) => {
        setUserId(result.user_id);
      });
      setDate(new Date().toLocaleString());

      const hd = new HDate(new Date());
      const ev = new HebrewDateEvent(hd);
      const HD = ev.render("he-x-NoNikud");
      setHebrewDate(HD);
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
          initialValues={{ date, hebrew_date: hebrewDate, user_id: userId }}
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
            <Input value={date} disabled prefix={<CiCalendarDate />} />
          </Form.Item>
          <Form.Item name="hebrew_date" label="Hebrew date">
            <Input value={hebrewDate} disabled prefix={<CiCalendarDate />} />
          </Form.Item>
          <Form.Item name="user_id">
            <Input value={userId} hidden />
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
