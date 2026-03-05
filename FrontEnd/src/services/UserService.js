import axiosClient from "../axios-client";

const UserService = {
  register: async (data) => {
    const response = await axiosClient.post("/register", data);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axiosClient.post("/login", credentials);
    return response.data;
  },

  logout: async () => {
    return await axiosClient.post("/logout");
  },

  getUser: async () => {
    const response = await axiosClient.get("/user");
    return response.data;
  },
};

export default UserService;
