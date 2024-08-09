import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authentication.access_token);
  const refresh_token = useSelector(
    (state) => state.authentication.refresh_token
  );
  // console.log(token, refresh_token);

  useEffect(() => {
    const handelLogout = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/account/logout/",
          { refresh_token },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("logout", response);
        }
      } catch (error) {}
    };

    handelLogout();
    dispatch(logout());
    navigate("/login");
  }, [dispatch, navigate]);

  return null;
}

export default Logout;
