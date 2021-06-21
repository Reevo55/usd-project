import axios from "axios";
const ACCOUNTS_URL = "/api/accounts";

class AccountService {
  static async getCourses(user_id) {
    try {
      const courses = await axios.get(`${ACCOUNTS_URL}/${user_id}/courses`);
      return courses;
    } catch (err) {
      console.log(err);
    }
  }

  static async getCalendar(user_id) {
    try {
      const calendar = await axios.get(`${ACCOUNTS_URL}/${user_id}/calendar`);
      return calendar;
    } catch (err) {
      console.log(err);
    }
  }

  static async getCourse(user_id, course_id) {
    try {
      const course = await axios.get(
        `${ACCOUNTS_URL}/${user_id}/course/${course_id}`
      );
      return course;
    } catch (err) {
      console.log(err);
    }
  }

  static async getEvents(user_id) {
    try {
      const events = await axios.get(`${ACCOUNTS_URL}/${user_id}/events`).data;
      return events;
    } catch (err) {
      console.log(err);
    }
  }
}

export default AccountService;
