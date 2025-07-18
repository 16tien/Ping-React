import React from 'react';
import { Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDevicesTable } from '../hooks/useDevicesTable';
import type { DeviceTypeUI } from '../types/deviceTypeUi';
import { useEffect } from "react";
import { useSearch } from "../hooks/useSearch";
import { useNavigate } from 'react-router-dom';
const columns: ColumnsType<DeviceTypeUI> = [
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
  const navigate = useNavigate();
  const { data, loading, pagination, handleTableChange } = useDevicesTable();
  const { setSearchComponent, setKeyword } = useSearch();
  useEffect(() => {
    setSearchComponent?.(
      <Input.Search
        placeholder="Tìm kiếm thiết bị..."
        onChange={(e) => setKeyword(e.target.value)}
        allowClear
        style={{ width: 250, marginTop: 15 }}
      />
    );

    return () => setSearchComponent?.(null); // cleanup
  }, [setKeyword, setSearchComponent]);
  return (
    <Table<DeviceTypeUI>
      columns={columns}
      rowKey={(record) => record.device_id.toString()}
      dataSource={data}
      loading={loading}
      pagination={pagination}
      onChange={handleTableChange}
      onRow={(record) => {
        return {
          onClick: () => {
            navigate(`/devices/${record.device_id}`)
          },
          style:{cursor:'pointer'}
        };
      }}
    />
  );
};

export default DevicePage;
