import { RegisterFormData } from "./pages/Register";
import axios from "axios";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = (import.meta.env.VITE_BASE_URL as string) || "";

export const register = async (formData: RegisterFormData) => {
  await axios
    .post(`${API_BASE_URL}/api/users/register`, formData, {
      withCredentials: true,
    })
    .catch((err: any) => {
      if (err) {
        throw new Error(err?.message);
      }
    });
};

export const validateToken = async () => {
  const response = await axios
    .get(`${API_BASE_URL}/api/auth/validate-token`, { withCredentials: true })
    .then((res) => {
      if (res.status == 200 && res.data) {
        return res.data;
      }
    })
    .catch((err) => {
      if (err) {
        throw new Error(err?.message);
      }
    });
  return response;
};

export const signIn = async (formData: SignInFormData) => {
  const response = await axios
    .post(`${API_BASE_URL}/api/auth/login`, formData, { withCredentials: true })
    .then((res) => {
      if (res) {
        return res.data;
      }
    })
    .catch((err) => {
      if (err) throw new Error(err?.message);
    });
  return response;
};

export const logOut = async () => {
  await axios
    .get(`${API_BASE_URL}/api/auth/logout`, { withCredentials: true })
    .catch((err) => {
      if (err) throw new Error(err?.message);
    });
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await axios
    .post(`${API_BASE_URL}/api/my-hotels`, hotelFormData, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.status == 201 && res.data) {
        return res.data.hotel;
      }
    })
    .catch((err) => {
      throw new Error(err?.message);
    });
  return response;
};
