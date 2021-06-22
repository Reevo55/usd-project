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

  static async getComments(courseId) {
    try {
      const comments = await axios.get(`${USER_URL}/${courseId}/comments/`);
      return comments;
    } catch (err) {
      alert("Something went wrong, try again!");
    }
  }

  static async postComment(courseId, body) {
    try {
      const comment = await axios.post(
        `${USER_URL}/${courseId}/comments/`,
        body
      );
      return comment;
    } catch (err) {
      alert("Something went wrong, try again!");
    }
  }

  static async getLessons(courseId) {
    try {
      const lessons = await axios.get(`${USER_URL}/${courseId}/lessons/`);
      return lessons;
    } catch (err) {
      alert("Something went wrong, try again!");
    }
  }

  static async getLesson(courseId, lessonId) {
    try {
      const lessons = await axios.get(
        `${USER_URL}/${courseId}/lessons/`,
        lessonId
      );
      return lessons;
    } catch (err) {
      alert("Something went wrong, try again!");
    }
  }

  static async getTeacher(teacherId) {
    try {
      const teacher = await axios.get(`api/teachers/${teacherId}`);
      return teacher;
    } catch (err) {
      alert("Something went wrong, try again!");
    }
  }
}

export default CourseService;
