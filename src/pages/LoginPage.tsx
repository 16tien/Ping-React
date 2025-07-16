import { Button, Checkbox, Form, Input, message } from "antd";
import type { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { handleApiError } from "../utils/handleApiError";
import type { LoginFormValues } from "../types/auth";
import { useNavigate } from "react-router-dom";
import { useAuth} from "../hooks/useAuth"

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const onFinish = async (values: LoginFormValues) => {
    try {
      const msg   = await login(values.username, values.password)
      message.success(msg)
      navigate("/");
    } catch (error) {
      handleApiError(error);
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<LoginFormValues>) => {
    console.log("Form validate failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Form<LoginFormValues>
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
