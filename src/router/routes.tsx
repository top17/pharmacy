import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home.page";
import EditProduct from "../pages/EditProduct/EditProduct.page";
import AddProduct from "../pages/AddProduct/AddProduct.page";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/edit/:id" element={<EditProduct />} />
      <Route path="/product/add" element={<AddProduct />} />
    </Routes>
  );
};

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default MainRoutes;
