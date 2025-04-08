import { useState, useEffect, useContext } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Popconfirm, 
  message, 
  Typography, 
  Image, 
  Tag, 
  Input,
  Select
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SearchOutlined 
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import * as productService from '../services/productService';

const { Title } = Typography;
const { Option } = Select;

const ProductList = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        message.error('Failed to fetch products');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (id) => {
    try {
      await productService.deleteProduct(id);
      setProducts(products.filter(product => product._id !== id));
      message.success('Product deleted successfully');
    } catch (error) {
      message.error('Failed to delete product');
      console.error(error);
    }
  };

  // Filter products based on search text and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchText.toLowerCase()) || 
      product.description.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Table columns
  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: imageUrl => (
        <Image 
          src={imageUrl} 
          alt="Product" 
          width={60} 
          height={60} 
          style={{ objectFit: 'cover' }}
          fallback="https://via.placeholder.com/60"
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: price => `$${price.toFixed(2)}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: category => <Tag color="blue">{category}</Tag>,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Link to={`/products/${record._id}`}>
            <Button type="primary" icon={<EditOutlined />} size="small">
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
      hidden: !isAuthenticated,
    },
  ].filter(col => !col.hidden);

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px' 
      }}>
        <Title level={2}>Products</Title>
        {isAuthenticated && (
          <Link to="/products/new">
            <Button type="primary" icon={<PlusOutlined />}>
              Add Product
            </Button>
          </Link>
        )}
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px' 
      }}>
        <Space>
          <Input
            placeholder="Search products"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 250 }}
            allowClear
          />
          <Select
            placeholder="Filter by category"
            value={categoryFilter}
            onChange={value => setCategoryFilter(value)}
            style={{ width: 180 }}
            allowClear
          >
            {categories.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
        </Space>
        <Typography.Text>
          {filteredProducts.length} product(s) found
        </Typography.Text>
      </div>

      <Table
        columns={columns}
        dataSource={filteredProducts.map(product => ({ ...product, key: product._id }))}
        loading={loading}
        pagination={{ pageSize: 10 }}
        rowKey="_id"
      />
    </div>
  );
};

export default ProductList; 