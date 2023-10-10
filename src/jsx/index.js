import React, { useContext } from "react";

/// React router dom
import { Routes, Route, Outlet } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";
/// Dashboard
import DashboardDark from "./components/Dashboard/DashboardDark";
/// Pages
import LockScreen from "./pages/LockScreen";

import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import { ThemeContext } from "../context/ThemeContext";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "../components/Login";
import { linkData } from "./routes";

const Markup = () => {
  // const { menuToggle } = useContext(ThemeContext);

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>


      <Routes>
        <Route path="page-lock-screen" element={<LockScreen />} />
        <Route path="page-error-400" element={<DashboardDark />} />
        <Route path="page-error-403" element={<Error403 />} />
        <Route path="page-error-404" element={<Error404 />} />
        <Route path="page-error-500" element={<Error500 />} />
        <Route path="page-error-503" element={<Error503 />} />
        <Route path='/login' element={<Login />} />
        <Route path='/page-register' element={<signUp />} />
        <Route path='/page-forgot-password' element={<ForgotPassword />} />
        <Route path='/DashBoard-dark' element={<DashboardDark />} />
        <Route element={<MainLayout />}>
          {linkData.map((data, i) => {
            if (data.url) {
              console.log(data.url, "URLS")
              return (
                <Route
                  key={i}
                  exact
                  path={`${data.url}`}
                  element={data.component}
                />
              )
            } else { return null; }
          })}

        </Route>
      </Routes>
      <ScrollToTop />
    </>
  );
};

function MainLayout() {
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return (
    <div
      id="main-wrapper"
      className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${menuToggle ? "menu-toggle" : ""
        }`}
    >
      <Nav />
      <div
        className="content-body"
        style={{ minHeight: window.screen.height - 45 }}
      >
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Markup;
