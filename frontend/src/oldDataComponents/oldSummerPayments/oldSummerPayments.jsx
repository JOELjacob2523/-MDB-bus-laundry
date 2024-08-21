import "../../Fonts/fonts.css";
import "./oldSummerPayments.css";
import { useEffect, useState } from "react";
import { getOldPaymentInfo, getOldStudentInfo } from "../../servers/getRequest";
import { Card, Descriptions, Empty } from "antd";

const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

const OldSummerPayments = ({ oldZmanGoal, selectedZman }) => {
  const [paymentData, setPaymentData] = useState([]);
  const [studentData, setStudentData] = useState({});
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);

  useEffect(() => {
    const fetchOldPayments = async () => {
      try {
        const payments = await getOldPaymentInfo();
        setPaymentData(payments);

        const studentIds = [
          ...new Set(payments.map((payment) => payment.student_id)),
        ];
        const studentDetailsArrays = await Promise.all(
          studentIds.map((id) => getOldStudentInfo(id))
        );

        const studentDetails = studentDetailsArrays.flat();

        const studentDataMap = studentDetails.reduce((acc, student) => {
          if (student.student_id) {
            acc[student.student_id] = student;
          }
          return acc;
        }, {});

        setStudentData(studentDataMap);

        oldZmanGoal.forEach((goal) => {
          if (goal.zman === selectedZman) {
            const start = new Date(goal.zman_starts_ends.start.date);
            const end = new Date(goal.zman_starts_ends.end.date);
            setStartDate(start);
            setEndDate(end);
          }
        });
      } catch (error) {
        console.error("Error fetching payments or student data:", error);
      }
    };
    fetchOldPayments();
  }, [oldZmanGoal, selectedZman]);

  const isDateInRange = (date) => {
    return (
      startDate &&
      endDate &&
      new Date(date) >= startDate &&
      new Date(date) <= endDate
    );
  };

  const getMatchingPayments = () => {
    return paymentData.filter((payment) => {
      const paymentDate = payment.date ? new Date(payment.date) : null;
      if (!paymentDate) {
        return false;
      }
      const isInRange = isDateInRange(paymentDate);
      return isInRange;
    });
  };

  const matchingPayments = getMatchingPayments();

  return (
    <div>
      {matchingPayments.length > 0 ? (
        matchingPayments.map((payment, index) => {
          const student = studentData[payment.student_id] || {};
          let paymentType;
          if (payment.bus_wash === "1") {
            paymentType = "באס און וואשן";
          } else if (payment.bus === "1") {
            paymentType = "באס";
          } else if (payment.wash === "1") {
            paymentType = "וואשן";
          }

          return (
            <div key={index} className="description_container">
              <Card
                hoverable
                size="small"
                title={
                  <div
                    className="description_title"
                    style={{ fontFamily: "OYoelTovia" }}
                  >
                    הב' {student.first_name} {student.last_name}
                  </div>
                }
              >
                <Descriptions layout="vertical" size="small" bordered>
                  <Descriptions.Item
                    label="Address"
                    labelStyle={{ fontWeight: "bold" }}
                  >
                    <div className="description_item">{student.address1}</div>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Address 2"
                    labelStyle={{ fontWeight: "bold" }}
                  >
                    <div className="description_item">
                      {student.address2 || "N/A"}
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="City-State-Zip"
                    labelStyle={{ fontWeight: "bold" }}
                  >
                    <div className="description_item">
                      {student.city} {student.state} {student.zip_code}
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Phone number"
                    labelStyle={{ fontWeight: "bold" }}
                  >
                    <div className="description_item">
                      {" "}
                      {student.phone
                        ? student.phone.replace(
                            /^(\d{3})(\d{3})(\d{4})/,
                            "$1-$2-$3"
                          )
                        : "N/A"}{" "}
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Total Paid"
                    labelStyle={{ fontWeight: "bold" }}
                  >
                    <div className="description_item">{`$${formatNumber(
                      payment.total_paid
                    )}`}</div>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Pay Date"
                    labelStyle={{ fontWeight: "bold" }}
                    className="description_item"
                  >
                    <div className="description_item">
                      {payment.pay_date ? payment.pay_date : "N/A"}
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Cash"
                    labelStyle={{ fontWeight: "bold" }}
                  >
                    <div className="description_item">
                      {payment.cash ? `$${formatNumber(payment.cash)}` : "N/A"}
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Check"
                    labelStyle={{ fontWeight: "bold" }}
                  >
                    <div className="description_item">
                      {payment.checks
                        ? `$${formatNumber(payment.checks)}`
                        : "N/A"}
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Credit Card"
                    labelStyle={{ fontWeight: "bold" }}
                  >
                    <div className="description_item">
                      {payment.credit_card
                        ? `$${formatNumber(payment.credit_card)}`
                        : "N/A"}
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Payment Type"
                    labelStyle={{ fontWeight: "bold" }}
                    className="description_item"
                  >
                    <div className="description_item">{paymentType}</div>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </div>
          );
        })
      ) : (
        <div>
          <Empty description="No student data" />
        </div>
      )}
    </div>
  );
};

export default OldSummerPayments;
