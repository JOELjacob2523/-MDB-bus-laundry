import React, { useEffect, useState } from "react";
import { HDate } from "hebcal";
import { Select } from "antd";

const { Option } = Select;

const SedraSelect = ({ onChange }) => {
  const [sedras, setSedras] = useState([]);

  useEffect(() => {
    const getAllSedras = (year) => {
      const startDate = new HDate(new Date(year, 0, 1)); // Start of the year
      const endDate = new HDate(new Date(year, 12, 15)); // End of the year

      const sedras = [];

      for (
        let date = startDate;
        date.abs() <= endDate.abs();
        date = date.next()
      ) {
        if (date.getDay() === 6) {
          const events = date.getSedra("h");
          if (events && events.length > 0) {
            const gregDate = date.greg();
            const parsha = events.join(" - ");
            sedras.push({
              id: `${gregDate.toISOString().split("T")[0]} - ${parsha}`,
              date: gregDate.toISOString().split("T")[0],
              sedra: parsha,
            });
          }
        }
      }

      return sedras;
    };

    const year = new Date().getFullYear();
    const fetchedSedras = getAllSedras(year);
    setSedras(fetchedSedras);
  }, []);

  const handleSelectChange = (value, option) => {
    const selectedSedra = sedras.find((sedra) => sedra.id === value);
    onChange(selectedSedra);
  };

  return (
    <div>
      <Select
        showSearch
        onChange={handleSelectChange}
        style={{
          width: 200,
        }}
        placeholder="Search to Select"
        optionFilterProp="label"
        filterOption={(input, option) =>
          option.label
            ? option.label
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            : false
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
      >
        {sedras.map((sedra, index) => (
          <Option key={index} value={sedra.id}>
            {sedra.date} - {sedra.sedra}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SedraSelect;
