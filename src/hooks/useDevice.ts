import { useEffect, useState } from "react";
import type { DeviceTypeUI } from "../types/deviceTypeUI";
import { getDeviceById } from "../api/deviceApi";

export const useDevice = (id?: string) => {
  const [device, setDevice] = useState<DeviceTypeUI | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const loadDevice = async () => {
      try {
        const deviceData = await getDeviceById(id); 
        setDevice(deviceData); 
      } catch {
        setError("Không tìm thấy thiết bị");
        setDevice(null); 
      }
    };

    loadDevice();
  }, [id]);

  return { device, error };
};
