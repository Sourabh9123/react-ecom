import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { GiPlagueDoctorProfile } from "react-icons/gi";

function Footer() {
  return (
    <>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <svg className="bi" width="30" height="24">
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">
            © 2024 Company, Inc
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex ">
          <li className="social-icon">
            <FaInstagram
              style={{ fontSize: "25px" }}
              onClick={() => {
                window.open(
                  "https://www.instagram.com/sourabh_das1/",
                  "_blank"
                );
              }}
            />
          </li>
          <li className="social-icon">
            <FaFacebook style={{ fontSize: "25px" }} />
          </li>
          <li className="social-icon">
            <GiPlagueDoctorProfile
              style={{ fontSize: "25px" }}
              onClick={() => {
                console.log("gi clicked");
              }}
            />
          </li>
        </ul>
      </footer>
    </>
  );
}

export default Footer;
