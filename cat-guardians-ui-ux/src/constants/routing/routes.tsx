import React from "react";
import AdminHOC from "src/HOC/AdminHOC";
import AuthHOC from "src/HOC/AuthHOC";

import { PERMISSIONS } from "./permissions";
import { ROUTES } from "./urls";
const Home = React.lazy(() => import("../../pages/home/Home"));
const Posts = React.lazy(() => import("../../pages/posts/Posts"));
const Customers = React.lazy(() => import("../../pages/customers/Customers"));

const PetsList = React.lazy(() => import("../../pages/petsList/PetsList"));
const PetView = React.lazy(() => import("src/pages/PetView/PetView"));
const AdoptionForm = React.lazy(() => import("src/pages/adoption/AdoptionForm"));
const Donate = React.lazy(() => import("../../pages/donate/Donate"));
const DonateShelter = React.lazy(() => import("../../pages/donateShelter/DonateShelter"));
const Found = React.lazy(() => import("src/pages/found/Found"));
const AboutUs = React.lazy(() => import("src/pages/aboutUs/AboutUs"));
const ContactUs = React.lazy(() => import("src/pages/contactUs/ContactUs"));
const Login = React.lazy(() => import("src/pages/login/Login"));
const SignUp = React.lazy(() => import("src/pages/signUp/SignUp"));
const Admin = React.lazy(() => import("src/pages/admin/Admin"));

export const ROUTES_WITH_NAVIGATION = [
  {
    path: ROUTES.ROOT,
    element: Home,
    exact: true
  },
  {
    element: PetsList,
    path: ROUTES.PETSLIST
  },
  {
    element: PetView,
    path: ROUTES.PETVIEW
  },
  {
    element: AdoptionForm,
    path: ROUTES.ADOPTION
  },
  {
    element: Donate,
    path: ROUTES.DONATE
  },
  {
    element: DonateShelter,
    path: ROUTES.DONATEFORM
  },
  {
    element: Found,
    path: ROUTES.FOUND
  },
  {
    element: AboutUs,
    path: ROUTES.ABOUTUS
  },
  {
    element: ContactUs,
    path: ROUTES.CONTACTUS
  },
  {
    element: AuthHOC(Login),
    path: ROUTES.LOGIN
  },
  {
    element: AuthHOC(SignUp),
    path: ROUTES.SIGNUP
  },
  {
    element: AdminHOC(Admin),
    path: ROUTES.ADMIN
  }
];

export const ROUTES_WITHOUT_NAVIGATION = [
  {
    path: ROUTES.POSTS,
    element: Posts,
    exact: true
  }
];

export const PRIVATE_ROUTE = [
  {
    path: ROUTES.CUSTOMERS,
    element: Customers,
    exact: true
  }
];

export const PRIVATE_ROUTES_PERMISSIONS = [
  {
    link: ROUTES.CUSTOMERS,
    permissions: [PERMISSIONS.ADMIN]
  }
];
