import { Button, Typography, Space, Card, Row, Col } from 'antd';
import { ShoppingCartOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div style={{ padding: '50px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <Title level={1}>Welcome to Product Catalog</Title>
        <Paragraph style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto' }}>
          Browse our collection of products, manage your inventory, and more!
        </Paragraph>
        
        <Space style={{ marginTop: '30px' }}>
          <Link to="/products">
            <Button type="primary" size="large" icon={<ShoppingCartOutlined />}>
              Browse Products
            </Button>
          </Link>
          <Link to="/register">
            <Button size="large" icon={<UserOutlined />}>
              Register Now
            </Button>
          </Link>
        </Space>
      </div>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
          Key Features
        </Title>
        
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={8}>
            <Card 
              hoverable 
              style={{ height: '100%' }}
              cover={
                <div style={{ 
                  background: '#f5f5f5', 
                  padding: '40px 0', 
                  textAlign: 'center' 
                }}>
                  <ShoppingCartOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                </div>
              }
            >
              <Card.Meta
                title="Product Management"
                description="Add, edit, and remove products from your catalog with ease."
              />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} lg={8}>
            <Card 
              hoverable 
              style={{ height: '100%' }}
              cover={
                <div style={{ 
                  background: '#f5f5f5', 
                  padding: '40px 0', 
                  textAlign: 'center' 
                }}>
                  <AppstoreOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                </div>
              }
            >
              <Card.Meta
                title="Categorization"
                description="Organize products by category for easy navigation and management."
              />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} lg={8}>
            <Card 
              hoverable 
              style={{ height: '100%' }}
              cover={
                <div style={{ 
                  background: '#f5f5f5', 
                  padding: '40px 0', 
                  textAlign: 'center' 
                }}>
                  <UserOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                </div>
              }
            >
              <Card.Meta
                title="User Authentication"
                description="Secure user authentication and authorization system."
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home; 