import jwt_decode from "jwt-decode";
import axios from "axios";
const USER_URL = "";

class UserService {
  static async logIn(body) {
    try {
      const loggedIn = await axios.post(`${USER_URL}/api/token/`, body);
      const accessJWT = loggedIn.data.access;
      localStorage.setItem("jwtToken", accessJWT);
      var decoded = jwt_decode(accessJWT);
      axios.defaults.baseURL = "http://localhost:8000";
      if ("jwtToken" in localStorage) {
        axios.defaults.headers.common = {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        };
      }
      return decoded;
    } catch (err) {
      alert("Something went wrong, try again!");
    }
  }
  static async register(body) {
    try {
      const registeredAccount = await axios.post(`${USER_URL}/register/`, body);
      return registeredAccount;
    } catch (err) {
      console.log(err);
      alert("Something went wrong, try again!");
    }
  }
}

export default UserService;
