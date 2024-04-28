import axios from "axios";
import Cookies from "js-cookie";

export const setCookie = (key, value) => {
  Cookies.set(key, value, { expires: 2 });
};

export const removeCookie = (key) => {
  Cookies.remove(key);
};
export const getCookie = (key) => {
  return Cookies.get(key);
};

export const setAuthentication = (token) => {
  setCookie("token", token);
};

export const logout = () => {
  removeCookie("token");
};

export const isLogin = async () => {
    const token = getCookie("token");
    // console.log(`token: ${token}`);
    if (token) {
      try {
        const res = await axios.post("http://localhost:5000/api/user", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(res);
        return res.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return false;
      }
    }
    return false;
  };

export const getAllStudents = async () => {
    const token = getCookie("token");
    // console.log(`token: ${token}`);
    if (token) {
      try {
        const res = await axios.post("http://localhost:5000/api/getStudents", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(res);
        return res.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return false;
      }
    }
    return false;
  };