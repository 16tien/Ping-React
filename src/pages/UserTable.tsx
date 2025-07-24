// components/UserTable.tsx
import React, { useEffect } from 'react';
import { Input, Popconfirm, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getAllUsers } from '../api/userApi';
import { useTableData } from '../hooks/useTableData';
import { useSearch } from '../hooks/useSearch';
import type { User } from '../types/auth';

const UserTable: React.FC = () => {
  const {
    data,
    loading,
    pagination,
    handleTableChange,
  } = useTableData<User>({ fetchApi: getAllUsers });
    const { setSearchComponent, setKeyword } = useSearch();
  useEffect(() => {
    setSearchComponent?.(
      <Input.Search
        placeholder="Tìm người dùng..."
        onChange={(e) => setKeyword(e.target.value)}
        allowClear
        style={{ width: 250, marginTop: 15 }}
      />
    );

    return () => setSearchComponent?.(null); // cleanup
  }, [setKeyword, setSearchComponent]);

  const handleEdit = (record: User) => {
  console.log('Edit user:', record);
  
};

const handleDelete = async (id: number) => {
  console.log('Delete user ID:', id);
  
};
  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
      width: 80,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'User', value: 'user' },
      ],
      filterMultiple: false,
    },
    {
     title: 'Hành động',
  key: 'action',
  width: 120,
  fixed: 'right',
  render: (_: unknown, record: User) => (
    <div style={{ display: 'flex', gap: 8 }}>
      <a
        onClick={(e) => {
          e.stopPropagation();
          handleEdit?.(record);
        }}
      >
        Sửa
      </a>
      <Popconfirm
        title="Bạn có chắc chắn muốn xóa?"
        onConfirm={(e) => {
          e?.stopPropagation?.();
          handleDelete?.(record.id); 
        }}
        okText="Xóa"
        cancelText="Hủy"
      >
        <a
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{ color: 'red' }}
        >
          Xóa
        </a>
      </Popconfirm>
    </div>
  ),
  },
  ];

  return (
    <Table
      columns={columns}
      rowKey="id"
      dataSource={data}
      loading={loading}
      pagination={pagination}
      onChange={handleTableChange}
    />
  );
};

export default UserTable;
