import { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  InputNumber, 
  Button, 
  Card, 
  Typography, 
  message, 
  Select,
  Upload,
  Space
} from 'antd';
import { 
  UploadOutlined, 
  SaveOutlined, 
  ArrowLeftOutlined 
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import * as productService from '../services/productService';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const ProductForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [categories, setCategories] = useState([
    'Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Toys', 'Sports', 'Beauty', 'Other'
  ]);

  useEffect(() => {
    // If editing, fetch the product data
    if (isEditing) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const product = await productService.getProductById(id);
          
          // Set form values
          form.setFieldsValue({
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            stock: product.stock,
            imageUrl: product.imageUrl
          });
          
          setImageUrl(product.imageUrl);
        } catch (error) {
          message.error('Error fetching product details');
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchProduct();
    }
  }, [id, isEditing, form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      
      if (isEditing) {
        await productService.updateProduct(id, values);
        message.success('Product updated successfully');
      } else {
        await productService.createProduct(values);
        message.success('Product created successfully');
      }
      
      navigate('/products');
    } catch (error) {
      message.error(isEditing ? 'Failed to update product' : 'Failed to create product');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle image URL change
  const handleImageChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    form.setFieldsValue({ imageUrl: url });
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card style={{ maxWidth: 800, margin: '0 auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={2}>{isEditing ? 'Edit Product' : 'Add New Product'}</Title>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/products')}
            >
              Back to Products
            </Button>
          </div>
          
          <Form
            form={form}
            name="productForm"
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              name: '',
              price: 0,
              description: '',
              category: 'Other',
              stock: 0,
              imageUrl: ''
            }}
          >
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true, message: 'Please enter product name' }]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>
            
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please enter product price' }]}
            >
              <InputNumber
                min={0}
                step={0.01}
                precision={2}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                style={{ width: '100%' }}
              />
            </Form.Item>
            
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter product description' }]}
            >
              <TextArea 
                rows={4} 
                placeholder="Enter product description" 
              />
            </Form.Item>
            
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select placeholder="Select a category">
                {categories.map(category => (
                  <Option key={category} value={category}>{category}</Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              name="stock"
              label="Stock"
              rules={[{ required: true, message: 'Please enter stock quantity' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item
              name="imageUrl"
              label="Image URL"
              rules={[{ required: true, message: 'Please enter image URL' }]}
            >
              <Input 
                placeholder="Enter image URL" 
                onChange={handleImageChange}
              />
            </Form.Item>
            
            {imageUrl && (
              <div style={{ marginBottom: 24 }}>
                <p>Image Preview:</p>
                <img 
                  src={imageUrl} 
                  alt="Product preview" 
                  style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/200?text=Image+Not+Found';
                  }}
                />
              </div>
            )}
            
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
                block
              >
                {isEditing ? 'Update Product' : 'Create Product'}
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default ProductForm; 