import { useContext } from 'react';
import { Layout, Menu, Button, Space, Typography } from 'antd';
import { ShoppingCartOutlined, UserOutlined, LogoutOutlined, LoginOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '0 20px',
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Space>
          <ShoppingCartOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          <Title level={3} style={{ margin: 0 }}>
            <Link to="/" style={{ color: '#1890ff', textDecoration: 'none' }}>
              Product Catalog
            </Link>
          </Title>
        </Space>
      </div>
      
      <div>
        <Menu 
          mode="horizontal" 
          selectedKeys={[location.pathname]}
          style={{ border: 'none' }}
        >
          <Menu.Item key="/" icon={<AppstoreOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/products" icon={<ShoppingCartOutlined />}>
            <Link to="/products">Products</Link>
          </Menu.Item>
          
          {isAuthenticated ? (
            <>
              <Menu.Item key="/profile" icon={<UserOutlined />}>
                <Link to="/profile">
                  {user?.username || 'Profile'}
                </Link>
              </Menu.Item>
              <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="/login" icon={<LoginOutlined />}>
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="/register">
                <Link to="/register">
                  <Button type="primary">Register</Button>
                </Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </div>
    </Header>
  );
};

export default Navbar; 