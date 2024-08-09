import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useState } from "react";
import { IoMdCart } from "react-icons/io";

function Navbar() {
  const is_login = useSelector((state) => state.authentication.is_login);

  console.log(is_login, "is_login");

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="nav-link active" aria-current="page" to="/">
            Ecom
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              {is_login ? (
                <li className="nav-item">
                  <Link className="nav-link" to="logout">
                    Logout
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      LogIn
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="sign-up">
                      SignUp
                    </Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Link className="nav-link" to="contact-us">
                  ContactUs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="cart">
                  <IoMdCart /> Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
