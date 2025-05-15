import toast from "react-hot-toast";
import { logout, setAuthUser, setUsers } from "../redux/authSlice.jsx";
import axios from "axios";
import { persistor } from "../redux/store.js"; // path sahi se adjust karo


const baseUrl = "http://localhost:3000";

export const handleSignup = async (form, navigate) => {
  try {
    let response = await axios.post(`${baseUrl}/api/v1/auth/register`, form);

    if (response.status === 200) {
      toast.success(response.data.message);
      navigate("/login");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message);
  }
};

export const handleLogin = async (form, dispatch, navigate) => {
  try {
    let response = await axios.post(`${baseUrl}/api/v1/auth/login`, form);

    if (response.status === 200) {
      toast.success(response.data.message);
      dispatch(setAuthUser(response.data));
      navigate("/");
    }
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};

export const getAllUsers = async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/auth/get-all-users`, {
      withCredentials: true,
    });
    dispatch(setUsers(response.data.users));
    return response.data.users;
    // Save Store
  } catch {
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
