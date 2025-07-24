import { Form, Input, Button, Select, message } from 'antd';
import { useAddDevice } from '../hooks/useAddDevice';
import type { DeviceData } from '../types/deviceData';
import { useEffect, useState } from 'react';
import type { User } from '../types/auth';
import { getAllNameUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import { useSetHeaderTitle } from '../hooks/useHeaderTitle';

const { Option } = Select;

const AddDevicePage = () => {
  const [form] = Form.useForm();
  const { handleAddDevice, loading } = useAddDevice();
  const navigate = useNavigate();
  const [managers, setManagers] = useState<User[]>([]);

  const [loadingManagers, setLoadingManagers] = useState(false);

  useSetHeaderTitle( "THÊM THIẾT BỊ");

  useEffect(() => {
    const fetchManagers = async () => {
      setLoadingManagers(true);
      try {
        const data = await getAllNameUser();
        console.log('Danh sách managers:', data); 
        setManagers(data);
      } catch {
        message.error('Không thể t  i danh sách người quản lý');
      } finally {
        setLoadingManagers(false);
      }
    };

    fetchManagers();
  }, []);

  const onFinish = async (values: DeviceData) => {
    try {
      const data: DeviceData = {
        name: values.name,
        ip_address: values.ip_address,
        address: values.address,
        manager_user_id: values.manager_user_id,

      };
      await handleAddDevice(data);
      message.success('Thêm thiết bị thành công!');
      form.resetFields();
       navigate("/");
    } catch {
      message.error('Thêm thiết bị thất bại!');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      <Form.Item
        name="name"
        label="Tên thiết bị"
        rules={[{ required: true, message: 'Vui lòng nhập tên thiết bị' }]}
      >
        <Input placeholder="Tên thiết bị" />
      </Form.Item>

      <Form.Item
        name="ip_address"
        label="Địa chỉ IP"
        rules={[{ required: true, message: 'Vui lòng nhập IP' }]}
      >
        <Input placeholder="192.168.1.1" />
      </Form.Item>

      <Form.Item
        name="address"
        label="Địa chỉ"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
      >
        <Input placeholder="Tầng 2, phòng kỹ thuật" />
      </Form.Item>

      <Form.Item
        name="manager_user_id"
        label="Người quản lý"
        rules={[{ required: true, message: 'Chọn người quản lý' }]}
      >
        <Select
          placeholder="Chọn người quản lý"
          loading={loadingManagers}
          showSearch
          allowClear
          optionFilterProp="children"
        >
          {Array.isArray(managers) &&
            managers.map((m) => (
              <Option key={m.id} value={m.id}>
                {m.name}
              </Option>
            ))}
        </Select>
      </Form.Item>


      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Thêm thiết bị
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddDevicePage; 
