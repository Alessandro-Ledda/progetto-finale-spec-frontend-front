import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DefaultLayout from './layout/DefaultLayout';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />} />
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
