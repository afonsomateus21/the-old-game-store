import { createBrowserRouter, redirect } from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Customer } from "./pages/Customer";
import { Admin } from "./pages/Admin";
import { jwtDecode } from "jwt-decode";
import { AdminLayout } from "./pages/AdminLayout";
import { AdminProducts } from "./pages/AdminProducts";
import { AdminCategories } from "./pages/AdminCategories";
import { AdminProfile } from "./pages/AdminProfile";

interface TokenPayload {
  isAdmin: boolean;
  email: string;
  id: string 
}

const isAuthenticated = () => {
  return localStorage.getItem('token') ? true : false;
};

const isAdmin = () => {
  const token = localStorage.getItem('token');

  if (token) {
    const decoded = jwtDecode<TokenPayload>(token);

    return decoded.isAdmin ? true : false;
  }
}

const protectedLoader = () => {
  if (!isAuthenticated()) {
    throw redirect("/login"); 
  } else if (isAdmin()) {
    throw redirect("/admin/profile");
  }
  return null; 
};

const adminLoader = () => {
  if (!isAdmin()) {
    throw redirect("/");
  } 
  
  return null;
};

const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  { path: "/profile", Component: Customer, loader: protectedLoader },
  { 
    path: "admin", 
    Component: AdminLayout,
    children: [
      { path: "profile", Component: AdminProfile },
      { path: "products", Component: AdminProducts },
      { path: "categories", Component: AdminCategories }
    ],
    loader: adminLoader
  }
]);

export { router };