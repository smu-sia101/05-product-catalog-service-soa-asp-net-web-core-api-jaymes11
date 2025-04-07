import { useState, useEffect, useContext } from 'react';
import { 
  Card, 
  Typography, 
  Button, 
  Descriptions, 
  Tag, 
  Image, 
  Spin, 
  message,
  Divider,
  Space
} from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  ArrowLeftOutlined, 
  ShoppingCartOutlined 
} from '@ant-design/icons';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as productService from '../services/productService';
import AuthContext from '../context/AuthContext';

const { Title, Text } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (error) {
        message.error('Failed to fetch product details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await productService.deleteProduct(id);
      message.success('Product deleted successfully');
      navigate('/products');
    } catch (error) {
      message.error('Failed to delete product');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Title level={3}>Product not found</Title>
        <Button 
          type="primary" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/products')}
        >
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ marginBottom: 20 }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/products')}
          >
            Back to Products
          </Button>
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ flex: '0 0 300px', marginBottom: '20px' }}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              style={{ width: '100%', objectFit: 'contain' }}
              fallback="https://via.placeholder.com/300?text=Image+Not+Found"
            />
          </div>
          
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: '20px'
            }}>
              <div>
                <Title level={2}>{product.name}</Title>
                <Tag color="blue">{product.category}</Tag>
                {product.stock > 0 ? (
                  <Tag color="green">In Stock: {product.stock}</Tag>
                ) : (
                  <Tag color="red">Out of Stock</Tag>
                )}
              </div>
              
              <Title level={2} style={{ color: '#1890ff' }}>
                ${product.price.toFixed(2)}
              </Title>
            </div>
            
            <Divider />
            
            <div style={{ marginBottom: '20px' }}>
              <Title level={4}>Description</Title>
              <Text style={{ fontSize: '16px' }}>{product.description}</Text>
            </div>
            
            <Divider />
            
            <Descriptions>
              <Descriptions.Item label="Category">{product.category}</Descriptions.Item>
              <Descriptions.Item label="Stock">{product.stock}</Descriptions.Item>
              <Descriptions.Item label="Product ID">{product._id}</Descriptions.Item>
            </Descriptions>
            
            <div style={{ marginTop: '30px' }}>
              {isAuthenticated ? (
                <Space>
                  <Link to={`/products/edit/${product._id}`}>
                    <Button 
                      type="primary" 
                      icon={<EditOutlined />}
                    >
                      Edit Product
                    </Button>
                  </Link>
                  <Button 
                    type="primary" 
                    danger
                    icon={<DeleteOutlined />}
                    onClick={handleDelete}
                  >
                    Delete Product
                  </Button>
                </Space>
              ) : (
                <Button 
                  type="primary" 
                  icon={<ShoppingCartOutlined />} 
                  size="large"
                  disabled={product.stock === 0}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail; 