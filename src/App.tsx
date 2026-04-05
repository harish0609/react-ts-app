import React from 'react';
import './App.css';
import LoginPage from './pages/login/login-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/dashboard/home';
import ProductList from './pages/products/product-list';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
