import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import AdminCountries from './pages/admin/AdminCountries.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminUniversities from './pages/admin/AdminUniversities.jsx';
import AdminApplications from './pages/admin/AdminApplications.jsx';
import AdminTestimonials from './pages/admin/AdminTestimonials.jsx';
import AdminUsers from './pages/admin/AdminUsers.jsx';
import RequireAdmin from './pages/admin/RequireAdmin.jsx';
import UniversityDetails from './pages/UniversityDetails.jsx';
import CountryDetails from './pages/CountryDetails.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/university/:id" element={<UniversityDetails />} />
      <Route path="/country/:name" element={<CountryDetails />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="universities" element={<AdminUniversities />} />
        <Route path="countries" element={<AdminCountries />} />
      </Route>
    </Routes>
  );
}
