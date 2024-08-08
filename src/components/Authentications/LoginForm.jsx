import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const email = useRef("");
  const password = useRef("");
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handelFormSubmit = (event) => {
    event.preventDefault();
    const email_address = email.current.value;
    const passowrd_ = password.current.value;
    console.log(email_address, passowrd_);
    //  "make api call here" then navigate to home
    email.current.value = "";
    password.current.value = "";
    navigate("/");
  };

  return (
    <div>
      <form className="MyLoginForm" onSubmit={handelFormSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            ref={email}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="exampleInputPassword1"
            ref={password}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
