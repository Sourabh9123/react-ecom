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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="" element={<Home />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="sign-up" element={<SignUpForm />} />
      <Route path="logout" element={<Logout />} />
      <Route path="cart" element={<Cart />} />
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
