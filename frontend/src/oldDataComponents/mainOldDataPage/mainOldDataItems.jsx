import { useEffect, useState, useCallback } from "react";
import { getOldZmanGoalInfo } from "../../servers/getRequest";
import { HDate, HebrewDateEvent } from "@hebcal/core";
import { Radio } from "antd";

const OldZmanData = ({
  setItems,
  setOldZmanGoal,
  showSummerModal,
  showWinterModal,
}) => {
  const [value, setValue] = useState("");

  // const onChange = useCallback(
  //   (e) => {
  //     const newValue = e.target.value;
  //     console.log(newValue);
  //     setValue(newValue);
  //     if (newValue === "קיץ") {
  //       showSummerModal();
  //     } else if (newValue === "חורף") {
  //       showWinterModal();
  //     }
  //   },
  //   [showSummerModal, showWinterModal]
  // );

  useEffect(() => {
    const fetchOldZmanData = async () => {
      const data = await getOldZmanGoalInfo();
      setOldZmanGoal(data);

      const newItems = data.map((zmanGoal) => {
        const { day, month, year } = zmanGoal.zman_starts_ends.end.jewishDate;
        const hd = new HDate(day, month, year);
        const ev = new HebrewDateEvent(hd);
        const hebrewYear = ev.render("he-x-NoNikud").split(" ")[3];

        return {
          key: zmanGoal.zman_goal_id,
          label: hebrewYear,
          items: (
            <Radio.Group
            // value={value}
            // onChange={onChange}
            >
              <Radio value="חורף">חורף</Radio>
              <Radio value="קיץ">קיץ</Radio>
            </Radio.Group>
          ),
        };
      });
      setItems(newItems);
    };
    fetchOldZmanData();
  }, [
    setItems,
    // onChange,
    // value,
    setOldZmanGoal,
  ]);

  return null;
};

export default OldZmanData;
