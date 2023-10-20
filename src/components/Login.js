import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// image
import { ToastContainer } from "react-toastify";
import logo from "../images/logo-full.png";
import loginbg from "../images/pic1.png";


function Login(props) {
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  // const navigate = useNavigate();
  const [data, setData] = useState({
    email: "marcoss.g.perez@gmail.com",
    password: "123456",
  });
  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (data.email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (data.password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }
    // dispatch(loadingToggleAction(true));
    // dispatch(loginAction(data, navigate));
  }

  return (
    <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
      <ToastContainer />
      <div className="login-aside text-center  d-flex flex-column flex-row-auto">
        <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <div className="text-center mb-4 pt-5">
            <img src={logo} alt="" />
          </div>
          <h3 className="mb-2">Welcome back!</h3>
          <p>
            User Experience & Interface Design <br />
            Strategy SaaS Solutions
          </p>
        </div>
        <div
          className="aside-image"
          style={{ backgroundImage: "url(" + loginbg + ")" }}
        ></div>
      </div>
      <div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
        <div className="d-flex justify-content-center h-100 align-items-center">
          <div className="authincation-content style-2">
            <div className="row no-gutters">
              <div className="col-xl-12 tab-content">
                <div id="sign-in" className="auth-form   form-validation">
                  {props.successMessage && (
                    <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                      {props.successMessage}
                    </div>
                  )}
                  <form onSubmit={onLogin} className="form-validate">
                    <h3 className="text-center mb-4 text-black">
                      Sign in your account
                    </h3>
                    <div className="form-group mb-3">
                      <label className="mb-1" htmlFor="val-email">
                        <strong>Email</strong>
                      </label>
                      <div>
                        <input
                          type="email"
                          className="form-control"
                          value={data.email}
                          name="email"
                          onChange={(e) => handleData(e)}
                          placeholder="Type Your Email Address"
                        />
                      </div>
                      {errors.email && (
                        <div className="text-danger fs-12">{errors.email}</div>
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <label className="mb-1">
                        <strong>Password</strong>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={data.password}
                        placeholder="Type Your Password"
                        name="password"
                        onChange={(e) => handleData(e)}
                      />
                      {errors.password && (
                        <div className="text-danger fs-12">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className="form-row d-flex justify-content-between mt-4 mb-2">
                      <div className="form-group mb-3">
                        <div className="custom-control custom-checkbox ml-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="basic_checkbox_1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                          >
                            Remember my preference
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="text-center form-group mb-3">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div className="new-account mt-3">
                    <p>
                      Don't have an account?{" "}
                      <Link className="text-primary" to="/page-register">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
