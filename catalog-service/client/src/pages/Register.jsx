import { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const { Title } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  const { register, isAuthenticated, error, loading, clearError } = useContext(AuthContext);
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
    
    // Ensure the passwords match
    if (values.password !== values.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    
    // Create the form data without confirmPassword
    const formData = {
      username: values.username,
      email: values.email,
      password: values.password
    };
    
    const success = await register(formData);
    
    if (success) {
      navigate('/login');
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
            <Title level={2}>Register</Title>
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
            name="register"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Username" 
                size="large"
              />
            </Form.Item>
            
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
                prefix={<MailOutlined />} 
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
                {
                  min: 6,
                  message: 'Password must be at least 6 characters!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
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
                Register
              </Button>
            </Form.Item>
          </Form>
          
          <div style={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link to="/login">Login now!</Link>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Register; 