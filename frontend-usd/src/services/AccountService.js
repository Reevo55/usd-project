import axios from "axios";
const ACCOUNTS_URL = "/api/accounts";
const userData = JSON.parse(localStorage.getItem("userData"));

class AccountService {
  static async getCourses() {
    try {
      console.log("[USER_DATA]", userData);

      const courses = await axios.get(
        `${ACCOUNTS_URL}/${userData.account_id}/courses`
      );
      return courses;
    } catch (err) {
      console.log(err);
    }
  }

  static async getCalendar() {
    try {
      const calendar = await axios.get(
        `${ACCOUNTS_URL}/${userData.account_id}/calendar`
      );
      return calendar;
    } catch (err) {
      console.log(err);
    }
  }

  static async getCourse(course_id) {
    try {
      const course = await axios.get(
        `${ACCOUNTS_URL}/${userData.account_id}/course/${course_id}`
      );
      return course;
    } catch (err) {
      console.log(err);
    }
  }

  static async getEvents() {
    try {
      const events = await axios.get(
        `${ACCOUNTS_URL}/${userData.account_id}/events`
      ).data;
      return events;
    } catch (err) {
      console.log(err);
    }
  }
}

export default AccountService;
