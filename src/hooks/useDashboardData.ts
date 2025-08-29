// src/hooks/useDashboardData.ts
import { useEffect, useState } from "react";
import { getDashboardData } from "../api/deviceApi";

export interface KPI {
  online: number;
  offline: number;
}

export interface ChartPoint {
  time: string;
  online: number;
  offline: number;
}

export interface OfflineDevice {
  key: string;
  name: string;
  ip: string;
  time: string;
}

export type AlertLog = string;

export interface DashboardData {
  kpi: KPI;
  chart: ChartPoint[];
  offlineDevices: OfflineDevice[];
  logs: AlertLog[];
}

export const useDashboardData = (refreshInterval = 30000) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const result = await getDashboardData();
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError((err as Error).message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDashboard();

    const interval = setInterval(fetchDashboard, refreshInterval);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [refreshInterval]);

  return { data, loading, error };
};
