import { useState } from 'react';
import { addDevice } from '../api/deviceApi';
import type { DeviceData } from '../types/deviceData';
import type { AxiosError } from 'axios';

export const useAddDevice = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddDevice = async (data: DeviceData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await addDevice(data);
            return response;
        } catch (err: unknown) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || 'Lỗi khi thêm thiết bị');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { handleAddDevice, loading, error };
};
