import toast from "react-hot-toast";
import { logout, setAuthUser, setUsers } from "../redux/authSlice.jsx";
import { setMessage } from "../redux/messageSlice.jsx";
import axios from "axios";
import { persistor } from "../redux/store.js";


const baseUrl = "http://localhost:5000";

export const handleSignup = async (form, navigate) => {
  try {
    let response = await axios.post(`${baseUrl}/api/v1/auth/register`, form);

    if (response.status === 200) {
      toast.success(response.data.message);
      navigate("/login");
    }
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};

export const handleLogin = async (form, dispatch, navigate) => {
  try {

    const response = await axios.post(`${baseUrl}/api/v1/auth/login`, form);

    if (response.status === 200) {
      toast.success(response.data.message);
      dispatch(setAuthUser({
        user: response.data.user,
        token: response.data.token
      }));
      navigate("/");
    }
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};

export const getAllUsers = async (dispatch, token) => {
  try {
    // axios.defaults.withCredentials = true
    const response = await axios.get(`${baseUrl}/api/v1/auth/get-all-users`, {
      // withCredentials: true
      headers: {
        Authorization: `${token}`,
      },
    });
    dispatch(setUsers({
      user: response?.data?.users,
    }));
    return response?.data?.users || [];
  } catch (error) {
    console.log("error: ", error.message);
    toast.error(error.response?.data?.message);
  }
};

export const handleLogout = async (navigate, dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/auth/logout`);
    if (response.status === 200) {
      toast.success(response.data.message);
      navigate("/login");
      dispatch(logout()); // Redux state clear karo
      persistor.purge();  // Clear localStorage (persisted state)
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Logout failed");
  }
};

export const getAllMessages = async (selectedUser, token, dispatch) => {
  try {
    // axios.defaults.withCredentials = true
    const response = await axios.get(`${baseUrl}/api/v1/message/get-messages/${selectedUser?._id}`, {
      // withCredentials: true
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log("response: ", response);

    dispatch(setMessage({
      message: response?.data?.messages,
    }))

    return response?.data?.messages || [];
  } catch (error) {
    console.log("error: ", error.message);
    toast.error(error.response?.data?.message);
  }
};