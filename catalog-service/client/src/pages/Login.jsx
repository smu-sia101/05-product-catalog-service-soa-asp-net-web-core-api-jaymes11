import { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  const { login, isAuthenticated, error, loading, clearError } = useContext(AuthContext);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/products');
    }
    
    // Set local error state from context
    if (error) {
      setLocalError(error);
    }
  }, [isAuthenticated, navigate, error]);

  const onFinish = async (values) => {
    setLocalError('');
    clearError();
    
    const success = await login(values);
    
    if (success) {
      navigate('/products');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh' 
    }}>
      <Card 
        style={{ 
          width: 400, 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>Login</Title>
          </div>
          
          {localError && (
            <Alert
              message="Error"
              description={localError}
              type="error"
              closable
              onClose={() => {
                setLocalError('');
                clearError();
              }}
            />
          )}
          
          <Form
            form={form}
            name="login"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email address!',
                },
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Email" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
          
          <div style={{ textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link to="/register">Register now!</Link>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Login; 