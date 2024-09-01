import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import SignUpForm from "./components/Authentications/SignUpForm";

import Root from "./components/Root";
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import LoginForm from "./components/Authentications/LoginForm";
import Logout from "./components/Authentications/Logout";
import Cart from "./components/Cart/Cart";
import ProductDetails from "./components/products/ProductDetails";
import InfoPage from "./components/Info/InfoPage";
import Map from "./components/map/Map";
import Orders from "./components/Order/Orders";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="" element={<Home />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="sign-up" element={<SignUpForm />} />
      <Route path="logout" element={<Logout />} />
      <Route path="cart" element={<Cart />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="info" element={<InfoPage />} />
      <Route path="orders" element={<Orders />} />
      <Route path="map" element={<Map />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
