import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CustomerAuthProvider } from './context/CustomerAuthContext';
import CustomerLayout from './layouts/CustomerLayout';
import OwnerDashboardLayout from './layouts/OwnerDashboardLayout';
import AdminDashboardLayout from './layouts/AdminDashboardLayout';
import CustomerAuthModal from './components/CustomerAuthModal';

// Pages
import Home from './pages/Home';
import BrowseBooks from './pages/BrowseBooks';
import BookDetail from './pages/BookDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import OwnerLogin from './pages/admin/OwnerLogin';
import AdminLogin from './pages/admin/AdminLogin';
import DashboardHome from './pages/admin/DashboardHome';
import DashboardBooks from './pages/admin/DashboardBooks';
import AddBook from './pages/admin/AddBook';
import CreateAdmin from './pages/admin/CreateAdmin';
import ManageAdmins from './pages/admin/ManageAdmins';
import AdminDashboardHome from './pages/admin/AdminDashboardHome';
import Orders from './pages/admin/Orders';

function App() {
  return (
    <AuthProvider>
      <CustomerAuthProvider>
        <Router>
          {/* Global customer auth modal */}
          <CustomerAuthModal />

          <Routes>
            {/* Default redirect to user store */}
            <Route path="/" element={<Navigate to="/user" replace />} />

            {/* Customer Routes */}
            <Route path="/user" element={<CustomerLayout />}>
              <Route index element={<Home />} />
              <Route path="browse" element={<BrowseBooks />} />
              <Route path="book/:id" element={<BookDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="orders" element={<MyOrders />} />
            </Route>

            {/* Owner Routes */}
            <Route path="/admin">
              <Route path="login/owner" element={<OwnerLogin />} />
              <Route path="login/admin" element={<AdminLogin />} />

              <Route path="dashboard" element={<OwnerDashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="books" element={<DashboardBooks />} />
                <Route path="add-book" element={<AddBook />} />
                <Route path="orders" element={<Orders />} />
                <Route path="create-admin" element={<CreateAdmin />} />
                <Route path="admins" element={<ManageAdmins />} />
              </Route>

              {/* Admin Portal Routes (Separate from Owner Dashboard) */}
              <Route path="portal" element={<AdminDashboardLayout />}>
                <Route index element={<AdminDashboardHome />} />
                <Route path="books" element={<DashboardBooks />} />
                <Route path="add-book" element={<AddBook />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/user" replace />} />
          </Routes>
        </Router>
      </CustomerAuthProvider>
    </AuthProvider>
  );
}

export default App;
