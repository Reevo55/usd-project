import jwt_decode from "jwt-decode";
import axios from "axios";
const USER_URL = "";

class UserService {
  static async logIn(body) {
    const loggedIn = await axios.post(`${USER_URL}/api/token/`, body);
    const accessJWT = loggedIn.data.access;
    localStorage.setItem("jwtToken", accessJWT);
    var decoded = jwt_decode(accessJWT);

    if ("jwtToken" in localStorage) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      };
    }

    return decoded;
  }

  static async register(body) {
    const registeredAccount = await axios.post(`${USER_URL}/register/`, body);
    return registeredAccount;
  }
}

export default UserService;
