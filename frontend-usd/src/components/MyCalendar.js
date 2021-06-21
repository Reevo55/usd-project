import React, { useEffect, useState } from "react";
import { Calendar, Badge } from "antd";
import AccountService from "../services/AccountService";
import moment from "moment";

import "moment/locale/pl";
moment.locale("pl");

function getListData(value) {
  let listData;

  console.table("[DEBUG DAY]", value.date());
  console.table("[DEBUG MONTH]", value.month());
  console.table("[DEBUG MONTH]", value.year());

  switch (value.date()) {
    case 1:
      listData = [
        { type: "warning", content: "Hurtownie danych" },
        { type: "success", content: "WZPI" },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "Hurtownie danych" },
        { type: "success", content: "WZPI" },
        { type: "error", content: "EGZAMIN Sztuczna Inteligencja" },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "Hurtownie danych" },
        { type: "success", content: "ZTW" },
        { type: "error", content: "TEST Lab SI" },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map((item) => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Dużo kursów</span>
    </div>
  ) : null;
}

function MyCalendar() {
  const [calendarCourses, setCalendarCourses] = useState([]);

  useEffect(() => {
    try {
      if ("userData" in localStorage && "jwtToken" in localStorage) {
        const userData = JSON.parse(localStorage.getItem("userData"));

        AccountService.getCalendar(userData.account_id).then((res) => {
          console.log("[CALENDAR_DATA]", res.data);

          setCalendarCourses(res.data);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
}

export default MyCalendar;
