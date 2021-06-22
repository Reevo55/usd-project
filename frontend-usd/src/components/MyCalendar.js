import React, { useEffect, useState } from "react";
import { Calendar, Badge } from "antd";
import AccountService from "../services/AccountService";
import moment from "moment";

import "moment/locale/pl";
moment.locale("pl");

function getListData(value) {
  let listData;

  console.log("[DEBUG DAY]", value.date());
  console.log("[DEBUG MONTH]", value.month());
  console.log("[DEBUG MONTH]", value.year());

  // FILTER BY THIS

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
