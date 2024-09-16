import styles from "./totalClosedWeeks.css";
import "../../Fonts/fonts.css";
import React, { useEffect, useState } from "react";
import { Button, Card, Divider, Space, notification } from "antd";
import { FiInfo } from "react-icons/fi";

const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

const TotalClosedWeeks = ({ zmanGoal }) => {
  const [zman, setZman] = useState([]);
  const [sedra, setSedra] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    zmanGoal.map((detail) => setZman(detail));
    const sedrasArray = zmanGoal.flatMap((sedras) =>
      sedras.closed_weeks.map((sedra) => sedra.sedra)
    );
    setSedra(sedrasArray);
  }, [zmanGoal]);

  const content = (
    <div className="main_content_weeks_container">
      <div className="content_weeks_container">
        <Card
          title={<div>זמן אינפארמאציע</div>}
          className="total_sedra_card_container"
        >
          <div className="sedra_item_container">
            <div className="sedra_item">
              <div
                style={{
                  fontFamily: "OYoelToviaBold",
                }}
              >
                {zman.zman}
              </div>
              <div
                style={{
                  fontFamily: "OYoelTovia",
                }}
              >
                :זמן
              </div>
            </div>
            <div className="sedra_item">
              <div
                style={{
                  fontFamily: "OYoelToviaBold",
                }}
              >
                {Array.isArray(zman.zman_starts_ends) &&
                zman.zman_starts_ends[0] &&
                zman.zman_starts_ends[0].start &&
                zman.zman_starts_ends[0].start.jewishDateStrHebrew
                  ? zman.zman_starts_ends[0].start.jewishDateStrHebrew
                  : ""}
              </div>
              <div
                style={{
                  fontFamily: "OYoelTovia",
                }}
              >
                :תחילת הזמן
              </div>
            </div>
            <div className="sedra_item">
              <div
                style={{
                  fontFamily: "OYoelToviaBold",
                }}
              >
                {Array.isArray(zman.zman_starts_ends) &&
                zman.zman_starts_ends[0] &&
                zman.zman_starts_ends[0].end &&
                zman.zman_starts_ends[0].end.jewishDateStrHebrew
                  ? zman.zman_starts_ends[0].end.jewishDateStrHebrew
                  : ""}
              </div>
              <div
                style={{
                  fontFamily: "OYoelTovia",
                }}
              >
                :סוף הזמן
              </div>
            </div>
            <div className="sedra_item">
              <div
                style={{
                  fontFamily: "OYoelTovia",
                }}
              >
                {zman.total_zman_weeks}
              </div>
              <div
                style={{
                  fontFamily: "OYoelTovia",
                }}
              >
                :ס"ה וואכן אינעם זמן
              </div>
            </div>
            <div className="sedra_item">
              <div
                style={{
                  fontFamily: "OYoelTovia",
                }}
              >
                {`$${formatNumber(zman.total_bus_goal)}`}
              </div>
              <div
                style={{
                  fontFamily: "OYoelTovia",
                }}
              >
                :ס"ה באס פרייז{" "}
              </div>
            </div>
            <div className="sedra_item">
              <div
                style={{
                  fontFamily: "OYoelTovia",
                }}
              >
                {`$${formatNumber(zman.total_wash_goal)}`}
              </div>
              <div
                style={{
                  fontFamily: "OYoelTovia",
                }}
              >
                :ס"ה וואשן פרייז{" "}
              </div>
            </div>
          </div>
          <Divider>פארמאכטע וואכן</Divider>
          {sedra.map((item, index) => (
            <div key={index} className={styles.sedra_item}>
              <div className="sedra_item_container">
                <div className="sedra_item">
                  <div
                    style={{
                      fontFamily: "OYoelToviaBold",
                    }}
                  >
                    פרשת {item}
                  </div>
                  <div
                    style={{
                      fontFamily: "OYoelTovia",
                    }}
                  >
                    {`( ${index + 1}`}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="sedra_item">
            <div
              style={{
                fontFamily: "OYoelTovia",
              }}
            >
              {sedra.length}
            </div>
            <div
              style={{
                fontFamily: "OYoelTovia",
              }}
            >
              :ס"ה פארמאכטע וואכן
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const openNotification = (placement) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => api.destroy()}>
          Destroy All
        </Button>
        <Button type="primary" size="small" onClick={() => api.destroy(key)}>
          Ok
        </Button>
      </Space>
    );
    api.open({
      description: (
        <div className="total_weeks_description_container">{content}</div>
      ),
      placement,
      btn,
      key,
      duration: null,
      style: { paddingTop: "50px" },
    });
  };

  return (
    <div>
      {contextHolder}
      <FiInfo
        onClick={() => openNotification("top")}
        className="total_weeks_icon"
      />
    </div>
  );
};

export default TotalClosedWeeks;
