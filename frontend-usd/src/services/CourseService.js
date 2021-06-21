import axios from "axios";
const USER_URL = "/api/courses";

class CourseService {
  static async getAll() {
    try {
      const courses = await axios.get(USER_URL);
      return courses;
    } catch (err) {
      alert("Something went wrong, try again!");
    }
  }
  static async get(id) {
    try {
      const course = await axios.get(`${USER_URL}/${id}`);
      return course;
    } catch (err) {
      alert("Something went wrong, try again!");
    }
  }
}

export default CourseService;
