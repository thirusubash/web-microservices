import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Listcompanies from "@components/company/Listcompanies";
import CreateCompany from "@components/company/CompanyForm";
import CompanyPlantCRUD from "@components/company/CompanyPlantCRUD";
import CompanyEmployeeCRUD from "@components/company/CompanyEmployeeCRUD";
import CompanyAddressCrud from "@components/company/CompanyAddressCurd";
import CompanyBankDetailsCrud from "@components/company/CompanyBankDetailsCrud";
import CompanyGroupsCRUD from "@components/company/CompanyGroupsCRUD";
import CompanyRolesCURD from "@components/company/CompanyRolesCURD";
import CompanyDesignationsCURD from "@components/company/CompanyDesignationsCURD";
import CompanyProductCURD from "@components/company/CompanyProductCURD";
import MarbleCRUD from "@components/product/Marble/MarbleCRUD";
import GraniteCRUD from "@components/product/Granite/GraniteCRUD";
import AllProductCRUD from "@components/product/AllProductCRUD";
import HollowBrickCRUD from "@components/product/HollowBricks/HollowBricksCURD";
import HomepageCRUD from "@components/homepage/HomePageCURD";
import CreateProductCatalog from "@components/product/CreateProductCatalog";
import ProductCatalog from "@components/product/ProductCatalog";
import QRCodeScanner from "@utils/QRCodeScanner";
import QRCodeGenerator from "@utils/QRCodeGenerator";
import ListMarble from "@components/product/Marble/ListMarble";


// Define a function for lazy loading components
const lazyLoad = (importFunction) => lazy(() => importFunction());

const Home = lazyLoad(() => import('@components/homepage/Home'));
const About = lazyLoad(() => import('@components/homepage/About'));
const Careers = lazyLoad(() => import('@components/homepage/Careers'));
const SignIn = lazyLoad(() => import('@auth/login/SignIn'));
const Signup = lazyLoad(() => import('@auth/login/Signup'));
const NotFound = lazyLoad(() => import('@exception/NotFound'));
const PrivateRoute = lazyLoad(() => import('@auth/PrivateRoute'));
const UserProfile=lazyLoad(()=>(import('@components/pages/UserProfile')));
const routes = (
    <Routes>
        {/* Index route */}
        <Route path="/" element={<Home />} />

        {/* Public routes */}
        <Route path="signin" element={<SignIn />} />
        <Route path="register" element={<Signup />} />
        <Route path="careers" element={<Careers />} />
        <Route path="job" element={<Signup />} />
        <Route path="login" element={<SignIn />} />
        <Route path='products' element={<ProductCatalog />} />
            <Route path='update-homepage' element={<HomepageCRUD />} />
        <Route path='update-products' element={<CreateProductCatalog />} />
        <Route path={'create-company'} element={<CreateCompany/>} />
        <Route path={'list-company'} element={<Listcompanies/>} />
        <Route path={'profile'} element={<UserProfile/>} />
        <Route path={'update-company'} element={<Listcompanies  />} />
        <Route path={'update-company-address'} element={<CompanyAddressCrud  companyId={1}/>}/>
        <Route path={'update-company-plants'} element={<CompanyPlantCRUD   companyId={1}/>}/>
        <Route path={'update-company-employee'} element={<CompanyEmployeeCRUD  companyId={1}/>}/>
        <Route path={'update-company-bank'} element={<CompanyBankDetailsCrud   companyId={1}/>}/>
        <Route path={'update-company-groups'} element={<CompanyGroupsCRUD   companyId={1}/>}/>
        <Route path={'update-company-roles'} element={<CompanyRolesCURD   companyId={1}/>}/>
        <Route path={'update-company-designation'} element={<CompanyDesignationsCURD   companyId={1}/>}/>
        <Route path={'update-company-products'} element={<CompanyProductCURD   companyId={1}/>}/>
        <Route path={'update-marble'} element={<MarbleCRUD   companyId={1}/>}/>
      <Route path={'marble'} element={<ListMarble/>}/>
        <Route path={'update-granite'} element={<GraniteCRUD   companyId={1}/>}/>
            <Route path={'update-hollow-bricks'} element={<HollowBrickCRUD   companyId={1}/>}/>
            <Route path={'update-all'} element={<AllProductCRUD   companyId={1} productType={"marbles"}/>}/>
            <Route path={'qr'} element={<QRCodeScanner/>}/>
             <Route path={'new-qr'} element={<QRCodeGenerator />}/>


        {/* Use PrivateRoute for routes that require authentication */}
        <Route
            path="about"
            element={
                <PrivateRoute>
                    <About />
                </PrivateRoute>
            }
        />

        {/* Add other routes here */}
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default routes;
