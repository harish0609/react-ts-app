import React from 'react';
import './App.css';
import LoginPage from './pages/login/login-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/dashboard/home';
import ProductList from './pages/products/product-list';
import { Provider } from 'react-redux';
import { store } from './pages/redux/root-reducer';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ProductList />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
