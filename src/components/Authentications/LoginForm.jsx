import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";
import axios from "axios";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const email = useRef("");
  const password = useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handelFormSubmit = async (event) => {
    event.preventDefault();
    const email_address = email.current.value;
    const passowrd_ = password.current.value;
    // console.log(email_address, passowrd_);
    //  "make api call here" then navigate to home

    try {
      const response = await axios.post(
        "http://localhost:8000/api/account/login/",
        {
          email: email_address,
          password: passowrd_,
        }
      );
      if (response.status === 200) {
        // console.log(response.data);

        const access_token = response.data.token.access;
        const refresh_token = response.data.token.refresh;
        const user_email = response.data.email;
        const user_first_name = response.data.user_data.first_name;
        const user_last_name = response.data.user_data.last_name;

        // console.log(
        //   user_first_name,
        //   user_last_name,
        //   user_email,
        //   access_token,
        //   refresh_token
        // );

        dispatch(
          login({
            access_token: access_token,
            refresh_token: refresh_token,
            first_name: user_first_name,
            last_name: user_last_name,
            email: user_email,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }

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
