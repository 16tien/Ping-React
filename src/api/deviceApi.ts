import axiosInstance from "../utils/axiosInstance";


export const getAllDevices = async (params?: Record<string, unknown>) => {
  const res = await axiosInstance.get('/devices/allInfoDevices', { params });
  return res.data; 
};