import { useContext } from 'react';
import { 
  Card, 
  Typography, 
  Button, 
  Descriptions, 
  Avatar, 
  Divider, 
  Space, 
  Tag
} from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined, 
  MailOutlined, 
  CalendarOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const { Title } = Typography;

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  if (!user) {
    return null;
  }
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div style={{ padding: '24px', maxWidth: 800, margin: '0 auto' }}>
      <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Avatar 
            size={100} 
            icon={<UserOutlined />} 
            style={{ 
              backgroundColor: '#1890ff',
              marginBottom: 16
            }}
          />
          <Title level={2}>{user.username}</Title>
          <Tag color={user.role === 'admin' ? 'red' : 'blue'}>
            {user.role === 'admin' ? 'Administrator' : 'User'}
          </Tag>
        </div>
        
        <Divider />
        
        <Descriptions 
          title="User Information" 
          layout="vertical" 
          bordered
          column={{ xs: 1, sm: 2 }}
        >
          <Descriptions.Item label="Username">
            <Space>
              <UserOutlined />
              {user.username}
            </Space>
          </Descriptions.Item>
          
          <Descriptions.Item label="Email">
            <Space>
              <MailOutlined />
              {user.email}
            </Space>
          </Descriptions.Item>
          
          <Descriptions.Item label="Member Since">
            <Space>
              <CalendarOutlined />
              {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
            </Space>
          </Descriptions.Item>
          
          <Descriptions.Item label="Role">
            <Tag color={user.role === 'admin' ? 'red' : 'blue'}>
              {user.role === 'admin' ? 'Administrator' : 'User'}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
        
        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <Button 
            type="primary" 
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile; 