import "./studentInfo.css";
import React, { useEffect, useRef, useState, forwardRef } from "react";
import { getAllPaymentInfo, getAllUserInfo } from "../../../servers/getRequest";
import { List } from "antd";
import KYLetterhead from "../../../images/KY_Letterhead.png";

const StudentInfoToPrint = forwardRef((props, ref) => {
  const [studentInfo, setStudentInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const searchInput = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await getAllUserInfo();
        const payments = await getAllPaymentInfo();

        setStudentInfo(students);
        setPaymentInfo(payments);

        const merged = students.map((student, index) => {
          return {
            key: index,
            ...student,
            payment: payments.find(
              (payment) => payment.student_id === student.student_id
            ),
            city_state_zip: `${student.city}, ${student.state} ${student.zip_code}`,
          };
        });
        setMergedData(merged);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div ref={ref} className="student_info_to_print_container">
      <div className="KY_letterhead_img_container">
        <img
          className="KY_letterhead_img"
          alt="KYLetterhead"
          src={KYLetterhead}
        />
      </div>
      <div className="print_main_container">
        <List
          itemLayout="vertical"
          className="print_list_container"
          dataSource={mergedData}
          bordered
          renderItem={(student, index) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <div className="print_list_titel_container">
                    {student.first_name} {student.last_name}{" "}
                  </div>
                }
                description={
                  <div className="print_list_data_container">
                    <div>
                      Age: <strong>{student.age}</strong>
                    </div>
                    <div>
                      Address: <strong>{student.address1}</strong>
                    </div>
                    <div>
                      City-State-Zip: <strong>{student.city_state_zip}</strong>
                    </div>
                    <div>
                      Phone Number:{" "}
                      <strong>
                        {student.phone
                          ? student.phone.replace(
                              /^(\d{3})(\d{3})(\d{4})/,
                              "$1-$2-$3"
                            )
                          : "N/A"}
                      </strong>
                    </div>
                    <div>
                      Total Paid:{" "}
                      {student.payment ? (
                        <strong>
                          ${student.payment && student.payment.total_paid}
                        </strong>
                      ) : (
                        <strong>$0</strong>
                      )}
                    </div>
                    <div>
                      Payment Date:{" "}
                      {student.payment ? (
                        <strong>
                          {student.payment && student.payment.pay_date}
                        </strong>
                      ) : (
                        <strong>N/A</strong>
                      )}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
});

export default StudentInfoToPrint;
