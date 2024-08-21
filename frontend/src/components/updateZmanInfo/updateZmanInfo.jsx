import "./updateZmanInfo.css";
import React, { useState } from "react";
import { Button, Divider, Form, Input, Select, Space, Modal } from "antd";
import { BsCurrencyDollar } from "react-icons/bs";
import {
  PlusOutlined,
  MinusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import HebrewDatePicker from "../jewishDtaePicker/hebcalDatePicker";
import { zmanGoalInfo } from "../../servers/postRequest";
import { useNavigate } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const UpdateClosedWeeks = () => {
  const [form] = Form.useForm();
  const [closedWeeks, setClosedWeeks] = useState([""]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const calculateWeeksBetweenDates = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInMilliseconds = endDate - startDate;
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    return Math.ceil(diffInDays / 7);
  };

  const handleFormChange = (_, allValues) => {
    const busPrice = Number(allValues.bus_price) || 0;
    const washPrice = Number(allValues.wash_price) || 0;
    const closedWeeksCount = closedWeeks.length;

    let totalZmanWeeks = 0;
    if (
      allValues.zman_starts_ends?.start?.date &&
      allValues.zman_starts_ends?.end?.date
    ) {
      totalZmanWeeks = calculateWeeksBetweenDates(
        allValues.zman_starts_ends.start.date,
        allValues.zman_starts_ends.end.date
      );
    }

    const totalBusGoal = busPrice * closedWeeksCount;
    const totalWashGoal = washPrice * totalZmanWeeks;
    const totalZmanGoal = totalBusGoal + totalWashGoal;

    form.setFieldsValue({
      total_zman_weeks: totalZmanWeeks,
      total_zman_goal: totalZmanGoal,
      total_bus_goal: totalBusGoal,
      total_wash_goal: totalWashGoal,
    });
  };

  const handleSubmit = async (values) => {
    try {
      await zmanGoalInfo(values);
      console.log("Zman goal added successfully", values);
      Modal.success({
        title: "Success",
        content: "Zman goal added successfully",
        footer: null,
      });
      setTimeout(() => {
        navigate("/buses");
      }, 2000);
    } catch (error) {
      console.error("Error adding zman goal:", error);
      Modal.error({
        title: "Error",
        content: "Failed to add zman goal",
        footer: null,
      });
      setTimeout(() => {
        navigate(0);
      }, 2000);
    }
  };

  const handleAdd = () => {
    setClosedWeeks([...closedWeeks, ""]);
  };

  const handleRemove = (index) => {
    const newClosedWeeks = closedWeeks.filter((_, i) => i !== index);
    setClosedWeeks(newClosedWeeks);
    form.setFieldsValue({ closed_weeks: newClosedWeeks });
  };

  const handleInputChange = (index, event) => {
    const newClosedWeeks = [...closedWeeks];
    newClosedWeeks[index] = event.target.value;
    setClosedWeeks(newClosedWeeks);
    form.setFieldsValue({ closed_weeks: newClosedWeeks });
  };

  const handleDateChange = (dateRange) => {
    form.setFieldsValue({ zman_starts_ends: dateRange });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="update_zman_goal_container">
      <EditOutlined
        type="primary"
        className="update_zman_goal_btn"
        onClick={showModal}
      />
      <Modal
        title="Update Zman Information"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="update_zman_goal_modal"
      >
        <Form
          {...formItemLayout}
          form={form}
          variant="filled"
          className="zman_goal_form"
          onValuesChange={handleFormChange}
          onFinish={handleSubmit}
          action="/zman_goal"
          method="POST"
        >
          <Form.Item
            label="Choose Zman"
            name="zman"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Select
              options={[
                { value: "חורף", label: "חורף" },
                { value: "קיץ", label: "קיץ" },
              ]}
              allowClear
              placeholder="Choose zman"
            />
          </Form.Item>
          <Form.Item
            label="Zman starts/ends"
            name="zman_starts_ends"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <HebrewDatePicker onChange={handleDateChange} />
          </Form.Item>

          <Form.Item label="Closed Weeks" required>
            {closedWeeks.map((week, index) => (
              <Space key={index} align="baseline">
                <Form.Item
                  name={["closed_weeks", index]}
                  rules={[
                    {
                      required: true,
                      message: "Please input!",
                    },
                  ]}
                >
                  <Input
                    value={week}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Enter closed weeks..."
                  />
                </Form.Item>
                {closedWeeks.length > 1 && (
                  <MinusCircleOutlined onClick={() => handleRemove(index)} />
                )}
              </Space>
            ))}
            <Button type="dashed" onClick={handleAdd} icon={<PlusOutlined />}>
              Add Closed Week
            </Button>
          </Form.Item>

          <Form.Item
            label="Bus Round Trip Price"
            name="bus_price"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input
              prefix={<BsCurrencyDollar />}
              placeholder="Enter bus round trip price..."
            />
          </Form.Item>

          <Form.Item
            label="Wash Bag Price"
            name="wash_price"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input
              prefix={<BsCurrencyDollar />}
              placeholder="Enter wash price..."
            />
          </Form.Item>

          <Divider>Total</Divider>

          <Form.Item label="Zman Weeks" name="total_zman_weeks">
            <Input disabled={true} />
          </Form.Item>

          <Form.Item label="Zman Goal" name="total_zman_goal">
            <Input prefix={<BsCurrencyDollar />} disabled={true} />
          </Form.Item>

          <Form.Item label="Bus Goal" name="total_bus_goal">
            <Input prefix={<BsCurrencyDollar />} disabled={true} />
          </Form.Item>

          <Form.Item label="Wash Goal" name="total_wash_goal">
            <Input prefix={<BsCurrencyDollar />} disabled={true} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 15,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="submit_goal_form_btn"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateClosedWeeks;
