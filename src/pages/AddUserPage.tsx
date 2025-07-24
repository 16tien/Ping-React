import { Button, Form, Input, message, Select } from 'antd';
import { createUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';


const AddUserPage = () => {
    const [form] = Form.useForm();
      const navigate = useNavigate();
    const onFinish = async (values: { name: string; email: string; password: string; role: 'admin' | 'user' })  => {
        try {
            await createUser(values);
            message.success('Thêm người dùng thành công');
            form.resetFields();
            navigate('/users')
        } catch  {
            message.error(  'Registration failed');
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ role: 'user' }}
        >
            <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: 'email' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password />
            </Form.Item>

            <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                <Select>
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="user">User</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>   
            </Form.Item>
        </Form>
    );
};

export default AddUserPage;