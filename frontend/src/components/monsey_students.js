import { useState, useEffect } from "react";

const MonseyStudents = ({ monseyStudents, isVisible }) => {
  const [monsey, setMonsey] = useState([]);

  useEffect(() => {
    if (monseyStudents) {
      const monseydata = monseyStudents
        .filter((user) => user.city.trim().toLowerCase() === "monsey")
        .map((user) => ({
          first_name: user.first_name,
          last_name: user.last_name,
          age: user.age,
          address1: user.address1,
          address2: user.address2,
          city: user.city,
          state: user.state,
          zip_code: user.zip_code,
        }));
      setMonsey(monseydata);
    }
  }, [monseyStudents]);

  console.log(monsey);

  if (isVisible && monsey.length > 0) {
    return (
      <>
        <h3>מאנסי בחורים</h3>
        {monsey.map((monseyUser, index) => (
          <div key={index}>
            <p>{`Name: ${monseyUser.first_name} ${monseyUser.last_name}`}</p>
            <p>{`Age: ${monseyUser.age}`}</p>
            <p>{`Address: ${monseyUser.address1}`}</p>
            <p>{`Address2: ${monseyUser.address2}`}</p>
            <p>{`City: ${monseyUser.city}`}</p>
            <p>{`State: ${monseyUser.state}`}</p>
            <p>{`Zip Code: ${monseyUser.zip_code}`}</p>
          </div>
        ))}
      </>
    );
  } else {
    return `No users found`;
  }
};

export default MonseyStudents;
