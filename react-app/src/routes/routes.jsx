import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RegistrationForm from "../auth/Signup";
import HomePageCrud from "../components/home/HomePageCrud";
import Settings from "themes/Settings";
import BasicProducts from "components/products/BasicProducts";
import Portfolio from "components/personal/Portfolio";
const Home = lazy(() => import("../components/home/Home"));
const SignIn = lazy(() => import("../auth/Login"));
const UserProfile = lazy(() => import("../components/users/user/UserProfile"));

const routes = (
  <Routes>
    {/* Index route */}
    <Route path="/" element={<Home />} />

    {/* Public routes */}
    <Route path="signin" element={<SignIn />} />
    <Route path="register" element={<RegistrationForm />} />
    <Route path="job" element={<RegistrationForm />} />
    <Route path="login" element={<SignIn />} />
    <Route path="homecurd" element={<HomePageCrud />} />
    <Route path="profile" element={<UserProfile />} />
    <Route path="settings" element={<Settings />} />
    <Route path="products" element={<BasicProducts />} />
    <Route path="portfolio" element={<Portfolio />} />
    <Route path="*" element={<div>Not Found</div>} />
  </Routes>
);

export default routes;
