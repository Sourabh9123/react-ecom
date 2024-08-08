import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef, useState } from "react";
import { TbFlagSearch } from "react-icons/tb";

function SignUpForm() {
  const first_name_element = useRef();
  const last_name_element = useRef();
  const email_element = useRef();
  const password_element = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handeSignUpSubmit = (event) => {
    event.preventDefault();
    const email = email_element.current.value;
    const passowrd = password_element.current.value;
    const first_name = first_name_element.current.value;
    const last_name = last_name_element.current.value;
    console.log(first_name, last_name, email, passowrd);
  };

  return (
    <>
      <form className="SignUpForm" onSubmit={handeSignUpSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            ref={first_name_element}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input type="text" ref={last_name_element} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            ref={email_element}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type={showPassword ? "password" : "text"}
            className="form-control"
            ref={password_element}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default SignUpForm;
