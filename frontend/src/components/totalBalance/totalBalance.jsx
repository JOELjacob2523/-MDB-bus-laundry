import "./totalBalance.css";
import React, { useState, useEffect } from "react";
import {
  MDBgetAllWithdrawalInfo,
  MDBgetOldPaymentInfo,
} from "../../servers/mongoDB/studentRequests/getRequests";

const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

const TotalBalance = ({ bus, wash, goalAmount }) => {
  const [withdrawalData, setWithdrawalData] = useState([]);
  const [busMoney, setBusMoney] = useState(0);
  const [washMoney, setWashMoney] = useState(0);
  const [oldPyaments, setOldPayments] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await MDBgetAllWithdrawalInfo();
        const oldData = await MDBgetOldPaymentInfo();
        setWithdrawalData(data);
        setOldPayments(oldData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const totalOldIncome = Array.isArray(oldPyaments)
    ? oldPyaments.reduce((acc, pay) => acc + parseFloat(pay.total_paid), 0)
    : 0;

  useEffect(() => {
    const withdrawals = () => {
      let totalBusMoney = 0;
      let totalWashMoney = 0;

      withdrawalData.forEach((withdrawal) => {
        if (withdrawal.withdrawal_to === "באס") {
          totalBusMoney += parseFloat(withdrawal.amount) || 0;
        } else if (withdrawal.withdrawal_to === "וואשן") {
          totalWashMoney += parseFloat(withdrawal.amount) || 0;
        }
      });
      setBusMoney(totalBusMoney);
      setWashMoney(totalWashMoney);
    };
    withdrawals();
  }, [withdrawalData]);

  let balanceColor;
  if (bus + wash - busMoney + washMoney >= 0) {
    balanceColor = "black";
  } else if (bus + wash - busMoney + washMoney < 0) {
    balanceColor = "red";
  }

  return (
    <div>
      <div>
        <div className="total_balance_container">
          <div className="total_balance_inner">
            <div>
              {bus + wash ? (
                <strong>${formatNumber(bus + wash + totalOldIncome)}</strong>
              ) : (
                <strong>$0</strong>
              )}
            </div>
            <div>עס איז אריינגעקומען </div>
          </div>
          <div className="total_balance_inner">
            <div>
              {washMoney ? (
                <strong>${formatNumber(washMoney)}</strong>
              ) : (
                <strong>$0</strong>
              )}
            </div>
            <div>עס איז ארויס פאר וואשן </div>
          </div>
          <div className="total_balance_inner">
            <div>
              {busMoney ? (
                <strong>${formatNumber(busMoney)}</strong>
              ) : (
                <strong>$0</strong>
              )}
            </div>
            <div>עס איז ארויס פאר באסעס </div>
          </div>
          <div className="total_balance_inner">
            <div style={{ color: balanceColor }}>
              {busMoney + washMoney ? (
                <strong>
                  $
                  {formatNumber(
                    bus + wash + totalOldIncome - busMoney + washMoney
                  )}
                </strong>
              ) : (
                <strong>$0</strong>
              )}
            </div>
            <div>עס איז געבליבן </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalBalance;
