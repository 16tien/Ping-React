import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDevicesTable } from '../hooks/useDevicesTable';
import type { DeviceType } from '../types/deviceType';

const columns: ColumnsType<DeviceType> = [
  {
    title: 'Tên thiết bị',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
  },
  {
    title: 'IP Address',
    dataIndex: 'ip_address',
    width: '20%',
  },
  {
    title: 'Người quản lý',
    dataIndex: ['manager', 'manager_name'],
    width: '20%',
  },
  {
    title: 'Trạng thái',
    dataIndex: ['pinglog', 'status'],
    render: (status: boolean) => (
      <span style={{ color: status ? 'green' : 'red' }}>
        {status ? 'Online' : 'Offline'}
      </span>
    ),
    filters: [
      { text: 'Online', value: true },
      { text: 'Offline', value: false },
    ],
    onFilter: (value, record) => record.pinglog.status === value,
    width: '20%',
  },
  {
    title: 'Thời gian ping gần nhất',
    dataIndex: ['pinglog', 'ping_time'],
    width: '20%',
  },
];

const DevicePage: React.FC = () => {
  const { data, loading, pagination, handleTableChange } = useDevicesTable();

  return (
    <Table<DeviceType>
      columns={columns}
      rowKey={(record) => record.device_id.toString()}
      dataSource={data}
      loading={loading}
      pagination={pagination}
      onChange={handleTableChange} // ✅ Không còn lồng vào object tableParams
    />
  );
};

export default DevicePage;
