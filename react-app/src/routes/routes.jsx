import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import RegistrationForm from "auth/RegistrationForm";
import HomePageCrud from "components/home/HomePageCrud";
import Portfolio from "components/personal/Portfolio";
import Companies from "components/company/Companies";
import NotFound from "utils/NotFound";
import Layout from "layout/Layout";
import ThemeGallery from "themes/ThemeGallery";
import AuthRoute from "routes/AuthRoute"; // Make sure to import AuthRoute
import AdminRoute from "routes/AdminRoute"; // Make sure to import AdminRoute
import ContactUsPage from "layout/contactus/ContactUsPage";
import AboutUs from "layout/aboutus/AboutUs";
import CartManager from "components/checkout/CartManager";
import PrivacyPolicy from "layout/policies/PrivacyPolicy";
import TermsOfService from "layout/policies/TermsofService";
import TermsAndConditions from "layout/policies/TermsAndConditions";

// Lazy loaded components
const Home = lazy(() => import("components/home/Home"));
const SignIn = lazy(() => import("auth/Login"));
const UserProfile = lazy(() => import("components/users/user/UserProfile"));
const AdminProfile = lazy(() => import("components/users/admin/AdminProfile")); // Lazy load if needed

const routes = (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Home />} />

    <Route path="/home" element={<Home />} />
    <Route path="signin" element={<SignIn />} />
    <Route path="register" element={<RegistrationForm />} />
    <Route path="login" element={<SignIn />} />
    <Route path="themes" element={<ThemeGallery />} />
    <Route path="/contactus" element={<ContactUsPage />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/cart" element={<CartManager />} />
    {/* legal always open */}
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

    {/* Private routes */}
    <Route path="myaccount/*" element={<AuthRoute element={Layout} />}>
      <Route path="profile" element={<AuthRoute element={UserProfile} />} />
      <Route path="homecrud" element={<AuthRoute element={HomePageCrud} />} />
    </Route>

    <Route path="app/*">
      <Route path="dashboard" element={<AuthRoute element={UserProfile} />} />
      <Route path="users" element={<AuthRoute element={UserProfile} />} />
      <Route path="homepage" element={<HomePageCrud/>}/>
    </Route>

    {/* Admin routes */}
    <Route
      path="adminprofile"
      element={<AdminRoute element={AdminProfile} />}
    />

    {/* Personal routes */}
    <Route path="thirumalaivasan" element={<Portfolio />} />
    <Route path="thirumalaivasank" element={<Portfolio />} />

    {/* Company routes */}
    <Route path="companies" element={<Companies />} />

    {/* Catch-all for unmatched routes */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default routes;
