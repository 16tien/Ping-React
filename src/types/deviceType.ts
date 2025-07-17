export interface DeviceType {
  device_id: number;
  name: string;
  ip_address: string;
  manager: {
    manager_id: number;
    manager_name: string;
  };
  pinglog: {
    status: boolean;
    ping_time: string;
  };
}