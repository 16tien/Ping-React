import { useState } from "react";
import type { DeviceData } from "../types/deviceData";
import { updateDevice } from "../api/deviceApi";

export const useUpdateDevice = () => {
  const [loading, setLoading] = useState(false);

  const handleUpdateDevice = async (id: number, input: DeviceData) => {
    setLoading(true);
    try {
      await updateDevice(id, input); 
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateDevice, loading };
};
