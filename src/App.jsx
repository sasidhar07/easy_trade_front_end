import './App.css';
import LoginPage from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import ProductListingPage from './components/Products';
import CartPage from './components/cart';
import FarmersHome from './FarmerComponents/FarmerHomePage';
import { Routes, Route, useLocation } from "react-router-dom";
import './index.css';
import ProtectedRoute from './components/ProtectedRoutes';
import NotFound from './components/NotFound';
import FarmerHeader from './components/FarmerHeader';
import QualityPridictionPage from './components/CropListingPage';
import PaymentSection from './components/PaymentSection';

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith('/farmer') ? (
        <FarmerHeader />
      ) : location.pathname !== '/login' ? (
        <Header />
      ) : null}

      <Routes>
        <Route path='/login' element={<LoginPage />} />

        {/* Farmer-specific routes */}
        <Route
          path='/farmersHome'
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <FarmersHome />
            </ProtectedRoute>
          }
        />
        <Route
          path='/farmer/QualityPridictionPage'
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <QualityPridictionPage />
            </ProtectedRoute>
          }
        />

        {/* Buyer-specific routes */}
        <Route
          path='/'
          element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/products'
          element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <ProductListingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/cart'
          element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/payment'
          element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <PaymentSection />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
