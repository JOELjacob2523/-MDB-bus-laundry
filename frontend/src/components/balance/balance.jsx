import { useEffect, useState } from "react";
import { getAllZmanGoalInfo } from "../../servers/getRequest";
import "./balance.css";

const StudentBalance = ({ payment }) => {
  const [zmanGoal, setZmanGoal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const zmanGoalData = await getAllZmanGoalInfo();
        setZmanGoal(zmanGoalData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const totalPayments = payment.reduce(
    (acc, pay) => acc + parseFloat(pay.total_paid),
    0
  );

  const weeklyCost = zmanGoal?.[0]?.wash_price || 0;
  const highWeeklyCost = zmanGoal?.[0]?.bus_price || 0;

  const calculateTotalCost = () => {
    if (!zmanGoal || !zmanGoal[0])
      return { totalCost: 0, remainingWeeksCost: 0 };

    const startDate = new Date(zmanGoal[0].zman_starts_ends.start.date);
    const endDate = new Date(zmanGoal[0].zman_starts_ends.end.date);
    const currentDate = new Date();

    let totalCost = 0;
    let highCostWeeksTotal = 0;
    let remainingWeeksCost = 0;

    const numberOfWeeks = Math.floor(
      (Math.min(currentDate, endDate) - startDate) / (7 * 24 * 60 * 60 * 1000)
    );

    for (let i = 0; i <= numberOfWeeks; i++) {
      const currentWeek = new Date(startDate);
      currentWeek.setDate(currentWeek.getDate() + i * 7);
      currentWeek.setHours(0, 0, 0, 0);
      totalCost += Number(weeklyCost);

      if (currentWeek > currentDate) {
        remainingWeeksCost += Number(weeklyCost);
      }
    }

    zmanGoal[0].closed_weeks.forEach((closedWeek) => {
      const closedDate = new Date(closedWeek.date);
      closedDate.setHours(0, 0, 0, 0);

      if (closedDate < currentDate) {
        highCostWeeksTotal += Number(highWeeklyCost);
      } else {
        remainingWeeksCost += Number(highWeeklyCost);
      }
    });

    totalCost += highCostWeeksTotal;

    return {
      totalCost,
      remainingWeeksCost,
    };
  };

  const { totalCost, remainingWeeksCost } = calculateTotalCost();
  const balance = totalPayments - totalCost;

  let balanceColor;

  if (balance >= remainingWeeksCost) {
    balanceColor = "green";
  } else if (balance < remainingWeeksCost) {
    balanceColor = "red";
  } else {
    balanceColor = "black";
  }

  return (
    <div className="payment_info_container">
      {payment.length === 0 ? (
        <div className="no_payment">No payments found</div>
      ) : (
        <div style={{ color: balanceColor }}>${balance.toFixed(2)}</div>
      )}
    </div>
  );
};

export default StudentBalance;
