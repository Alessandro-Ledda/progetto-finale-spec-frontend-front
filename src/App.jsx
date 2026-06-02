import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DefaultLayout from './layout/DefaultLayout';
import ProductList from './pages/ProductList';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />} />
        <Route path="/" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
