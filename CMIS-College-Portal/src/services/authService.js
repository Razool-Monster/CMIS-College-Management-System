import API from "../api/api";

export const loginUser = async (data) => {
  return API.post("/api/auth/login", data);
};

export const registerUser = async (data) => {
  return API.post("/api/auth/register", data);
};
