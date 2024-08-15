import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy load all components where possible
const RegistrationForm = lazy(() => import("auth/RegistrationForm"));
const HomePageCrud = lazy(() => import("components/home/HomePageCrud"));
const Portfolio = lazy(() => import("components/personal/Portfolio"));
const Companies = lazy(() => import("components/company/Companies"));
const NotFound = lazy(() => import("utils/NotFound"));
const Layout = lazy(() => import("layout/Layout"));
const ThemeGallery = lazy(() => import("themes/ThemeGallery"));
const ContactUsPage = lazy(() => import("layout/contactus/ContactUsPage"));
const CartManager = lazy(() => import("components/checkout/CartManager"));
const PrivacyPolicy = lazy(() => import("layout/policies/PrivacyPolicy"));
const TermsOfService = lazy(() => import("layout/policies/TermsofService"));
const TermsAndConditions = lazy(() =>
  import("layout/policies/TermsAndConditions")
);
const About = lazy(() => import("layout/aboutus/About"));
const Home = lazy(() => import("components/home/Home"));
const SignIn = lazy(() => import("auth/Login"));
const UserProfile = lazy(() => import("components/users/user/UserProfile"));
const AdminProfile = lazy(() => import("components/users/admin/AdminProfile"));
const AuthRoute = lazy(() => import("routes/AuthRoute"));
const AdminRoute = lazy(() => import("routes/AdminRoute"));

//temp
const BasicProducts = lazy(() => import("components/products/BasicProducts"));

const routes = (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/register" element={<RegistrationForm />} />
    <Route path="/login" element={<SignIn />} />
    <Route path="/themes" element={<ThemeGallery />} />
    <Route path="/contactus" element={<ContactUsPage />} />
    <Route path="/about" element={<About />} />
    <Route path="/cart" element={<CartManager />} />
    <Route path="/products" element={<BasicProducts />} />

    {/* Legal routes, always accessible */}
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

    {/* Private routes */}
    <Route
      path="/myaccount/*"
      element={
        <AuthRoute>
          <Layout />
        </AuthRoute>
      }
    >
      <Route path="profile" element={<UserProfile />} />
    </Route>

    <Route
      path="/app/*"
      element={
        <AuthRoute>
          <Layout />
        </AuthRoute>
      }
    >
      <Route path="dashboard" element={<UserProfile />} />
      <Route path="users" element={<UserProfile />} />
      <Route path="homepage" element={<HomePageCrud />} />
    </Route>

    {/* Admin routes */}
    <Route
      path="/adminprofile"
      element={
        <AdminRoute>
          <AdminProfile />
        </AdminRoute>
      }
    />

    {/* Personal routes */}
    <Route path="/thirumalaivasan" element={<Portfolio />} />
    <Route path="/thirumalaivasank" element={<Portfolio />} />

    {/* Company routes */}
    <Route path="/companies" element={<Companies />} />

    {/* Catch-all for unmatched routes */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default routes;
