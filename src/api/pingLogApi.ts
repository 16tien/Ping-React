import axiosInstance from "../utils/axiosInstance";
import type { PingLogUI } from "../types/pingLogUI";

export const fetchPingLogs = async (
  params?: Record<string, unknown>
): Promise<{ data: PingLogUI[]; total: number }> => {
  const res = await axiosInstance.get('/pings/pingLogById', { params });

  return {
    data: res.data?.items || [],
    total: res.data?.total || 0,
  };
};
