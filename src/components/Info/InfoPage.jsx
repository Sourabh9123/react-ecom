import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  featchAddress,
  createAddress,
  deleteAddress,
} from "../../store/AddressSlice";

function InfoPage() {
  const [re_render, setRe_render] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(featchAddress());
  }, [dispatch, re_render]);

  const addressRef = useRef(null);
  const landmarkRef = useRef(null);
  const mobileRef = useRef(null);
  const nameRef = useRef(null);
  const pincodeRef = useRef(null);
  const stateRef = useRef(null);

  const token = useSelector((state) => state.authentication.access_token);

  const [showAllAddress, setShowAllAddress] = useState([]);

  const data = useSelector((state) => state.address);
  // const data = [];

  useEffect(() => {
    if (!data.is_loading && data.data.length && !data.is_error) {
      setShowAllAddress(data.data);
    }
  }, [data, dispatch]);

  const handelCreateAddress = async (event) => {
    event.preventDefault();
    const create_data = {
      name: nameRef.current.value,
      address: addressRef.current.value,
      state: stateRef.current.value,
      pincode: pincodeRef.current.value,
      mobile: mobileRef.current.value,
      land_mark: landmarkRef.current.value,
    };

    try {
      const response = await dispatch(createAddress(create_data)).unwrap();
      setRe_render((prev) => !prev);

      const { is_loading, is_error, data } = useSelector(
        (state) => state.address
      );
    } catch (error) {
      console.log("inside error");
    }
  };

  const handelDeleteAddress = (address_id) => {
    dispatch(deleteAddress(address_id));

    setRe_render((prev) => !prev);
  };

  return (
    <>
      <div className="mb-4">this is info about you</div>
      <div className="container">
        <div className="row">
          <div className="col-8">
            {showAllAddress &&
              showAllAddress.map((item) => (
                <div className="address-info" key={item.id + item.name}>
                  <button
                    onClick={() => handelDeleteAddress(item.id)}
                    className="btn btn-secondary btn-sm "
                    style={{ float: "inline-end" }}
                  >
                    Delete
                  </button>
                  <p>
                    <strong>Address:</strong> {item.address}
                  </p>
                  <p>
                    <strong>Landmark:</strong> {item.land_mark || "N/A"}
                  </p>
                  <p>
                    <strong>Mobile Number:</strong> {item.mobile}
                  </p>
                  <p>
                    <strong>Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Pincode:</strong> {item.pincode}
                  </p>
                  <p>
                    <strong>State:</strong> {item.state}
                  </p>
                </div>
              ))}
          </div>
          <div className="col-4">
            <form onSubmit={handelCreateAddress}>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Enter your address"
                  ref={addressRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="landmark">Landmark</label>
                <input
                  type="text"
                  className="form-control"
                  id="landmark"
                  placeholder="Enter a landmark (optional)"
                  ref={landmarkRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="mobile"
                  placeholder="Enter your mobile number"
                  ref={mobileRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  ref={nameRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  placeholder="Enter your pincode"
                  ref={pincodeRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  placeholder="Enter your state"
                  ref={stateRef}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoPage;
