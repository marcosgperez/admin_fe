import React, { useContext, useState } from "react";

/// React router dom
import { Routes, Route, Outlet } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";
import { connect } from "react-redux"
/// Layout
import JobieNav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";
import { ThemeContext } from "../context/ThemeContext";
import { linkData } from "./routes";
import { EmployeeLinkData } from "./EmployeeRoutes";

const Markup = ({ isAdmin }) => {
  // const { menuToggle } = useContext(ThemeContext);

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  const [toRead, setToRead] = useState([])

  React.useEffect(() => {
    if (isAdmin) {
      setToRead(linkData)
    } else {
      setToRead(EmployeeLinkData)
    }
  }, [])
  return (
    <>


      <Routes>

        <Route element={<MainLayout isAdmin={isAdmin} />}>
          {toRead.map((data, i) => {
            if (data.url) {
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

function MainLayout({ isAdmin }) {
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);

  return (
    <div
      id="main-wrapper"
      className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${menuToggle ? "menu-toggle" : ""
        }`}
    >
      <JobieNav isAdmin={isAdmin} />
      <div
        className={isAdmin ? "content-body" : "content-fluid content-body-employee"}
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
const mapStateToProps = (rootState) => {
  return {
    isAdmin: rootState.authData.user && rootState.authData.user.user_type_id == 1

  }
}

const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(Markup);
