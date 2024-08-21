import "./detailedWithdrawals.css";
import React, { useState, useEffect } from "react";
import { Descriptions } from "antd";
import { getAllWithdrawalInfo } from "../../servers/getRequest";

const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

const WithdrawalsDetials = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllWithdrawalInfo();
      setWithdrawals(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Descriptions title="געלט ארויס דעטאלן" layout="vertical" bordered>
        {withdrawals.map((withdrawal, index) => (
          <Descriptions.Item
            key={index}
            label={
              <div className="withdrawal_display_container">
                <div>{withdrawal.withdrawal_to}</div>
                <div>:ארויס פאר</div>
              </div>
            }
            span={3}
          >
            <div className="withdrawal_display_container">
              <div>
                <strong>${formatNumber(withdrawal.amount)}</strong>
              </div>
              <div>:סכום</div>
            </div>
            <div className="withdrawal_display_container">
              <div>{withdrawal.hebrew_date}</div>
              <div>:אידישע דאטום</div>
            </div>
            <div className="withdrawal_display_container">
              <div>{withdrawal.date}</div>
              <div>:דאטום</div>
            </div>
          </Descriptions.Item>
        ))}
      </Descriptions>
    </div>
  );
};
export default WithdrawalsDetials;
