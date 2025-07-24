import React, { useState } from 'react';
import { Input, message, Table } from 'antd';
import { useDevicesTable } from '../hooks/useDevicesTable';
import type { DeviceTypeUI } from '../types/deviceTypeUI';
import { useEffect } from "react";
import { useSearch } from "../hooks/useSearch";
import { useNavigate } from 'react-router-dom';
import { getDeviceColumns } from '../utils/getDeviceColumns'
import { useUser } from '../contexts/UserContext';
import { deleteDevice } from '../api/deviceApi';



const DevicePage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, pagination, handleTableChange, refetch } = useDevicesTable();
  const { setSearchComponent, setKeyword } = useSearch();
  const { user } = useUser();
  const role: "admin" | "user" = user?.role ?? "user";
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleEdit = (record: DeviceTypeUI) => {
    navigate(`/devices/edit/${record.device_id}`);
  };

  const handleDelete = async (record: DeviceTypeUI) => {
    try {
      setDeletingId(record.device_id);
      await deleteDevice(record.device_id);
      message.success(`Đã xoá thiết bị "${record.name}" thành công`);
      refetch(); 
    } catch (error) {
      console.error("Xoá thất bại:", error);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    setSearchComponent?.(
      <Input.Search
        placeholder="Tìm kiếm thiết bị..."
        onChange={(e) => setKeyword(e.target.value)}
        allowClear
        style={{ width: 250, marginTop: 15 }}
      />
    );

    return () => setSearchComponent?.(null); 
  }, [setKeyword, setSearchComponent]);
  return (
    <Table<DeviceTypeUI>
      columns={getDeviceColumns(role, handleEdit, handleDelete, deletingId)}
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
          style: { cursor: 'pointer' }
        };
      }}
    />
  );
};

export default DevicePage;
