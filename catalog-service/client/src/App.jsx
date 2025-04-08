import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ProductForm from './pages/ProductForm';
import Profile from './pages/Profile';

// CSS
import './App.css';

const { Content, Footer } = Layout;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <Navbar />
          <Content style={{ padding: '0', background: '#fff' }}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/products/new" element={<ProductForm />} />
                <Route path="/products/edit/:id" element={<ProductForm />} />
              </Route>
            </Routes>
          </Content>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
