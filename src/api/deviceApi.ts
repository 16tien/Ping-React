import axiosInstance from "../utils/axiosInstance";


export const getAllDevices = async (params?: Record<string, unknown>) => {
  const res = await axiosInstance.get('/devices/allInfoDevices', { params });
  return res.data;
};
export const getDeviceById = async (id: string) => {
  const res = await axiosInstance.get(`/devices/${id}`);
  return res.data;
};
export const deleteDevice = (deviceId: number) => {
  return axiosInstance.delete(`/devices/delete/${deviceId}`);
};

export const addDevice = async (data: unknown) => {
  const res = await axiosInstance.post('/devices/addDevice', data)
  return res.data
}
export const updateDevice = async (id: number, data: unknown) => {
  const res = await axiosInstance.put(`/devices/updateDevice/${id}`, data)
  return res.data
}