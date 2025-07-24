import { Form, Input, Button, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllNameUser } from '../api/userApi';
import { getDeviceById } from '../api/deviceApi';
import type { User } from '../types/auth';
import type { DeviceData } from '../types/deviceData';
import { useUpdateDevice } from '../hooks/useUpdateDevice';
import { useSetHeaderTitle } from '../hooks/useHeaderTitle';

const { Option } = Select;

const EditDevicePage = () => {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const { handleUpdateDevice, loading } = useUpdateDevice();
  const [managers, setManagers] = useState<User[]>([]);
  const [loadingManagers, setLoadingManagers] = useState(false);
    useSetHeaderTitle( "SỬA THIẾT BỊ");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManagers = async () => {
      setLoadingManagers(true);
      try {
        const data = await getAllNameUser();
        setManagers(data);
      } catch {
        message.error('Không thể tải danh sách người quản lý');
      } finally {
        setLoadingManagers(false);
      }
    };

    fetchManagers();
  }, []);

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        if (!id) return;
        const data = await getDeviceById(id);
        if (!data) {
          message.error('Không tìm thấy thiết bị');
          return;
        }
        form.setFieldsValue(data);
      } catch {
        message.error('Lỗi khi tải thông tin thiết bị');
      }
    };

    fetchDevice();
  }, [id, form]);

  const onFinish = async (values: DeviceData) => {
    try {
      if (!id) return;
      await handleUpdateDevice(Number(id), values);
      message.success('Cập nhật thiết bị thành công!');
      navigate("/");
    } catch {
      message.error('Cập nhật thiết bị thất bại!');
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
          {managers.map((m) => (
            <Option key={m.id} value={m.id}>
              {m.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Cập nhật thiết bị
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditDevicePage;
