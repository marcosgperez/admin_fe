import React, { useEffect, useContext, useReducer, useState, useRef } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import { Collapse, Dropdown } from 'react-bootstrap';
/// Link
import { Link } from "react-router-dom";
import { MenuList } from './Menu';
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import { linkData } from "../../routes";
import { EmployeeLinkData } from "../../EmployeeRoutes";
import profile from "../../../images/user.jpg";
import { connect } from "react-redux"

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active: "",
  activeSubmenu: "",
}


const SideBar = ({ isAdmin }) => {
  var d = new Date();
  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
    ChangeIconSidebar
  } = useContext(ThemeContext);

  const [state, setState] = useReducer(reducer, initialState);

  //For scroll

  let handleheartBlast = document.querySelector('.heart');
  function heartBlast() {
    return handleheartBlast.classList.toggle("heart-blast");
  }

  const [hideOnScroll, setHideOnScroll] = useState(true)
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll]
  )
  const handleMenuActive = status => {
    setState({ active: status });
    if (state.active === status) {
      setState({ active: "" });
    }
  }
  const handleSubmenuActive = (status) => {
    setState({ activeSubmenu: status })
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" })
    }
  }
  // Menu dropdown list End

  /// Path
  let path = window.location.pathname;
  //path = path.split("/");
  //path = path[path.length - 1];
  /// Active menu

  let toMap = []

  if (isAdmin) {
    toMap = linkData
  } else {
    toMap = EmployeeLinkData
  }




  return (
    <div
      onMouseEnter={() => ChangeIconSidebar(true)}
      onMouseLeave={() => ChangeIconSidebar(false)}
      className={`dlabnav ${iconHover} ${sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
        ? hideOnScroll > 120
          ? "fixed"
          : ""
        : ""
        } sidebar `}
    >
      <PerfectScrollbar className="dlabnav-scroll">

        <ul className="metismenu" id="menu">


          {toMap.filter(t => t.title !== "Dashboard").filter(t=> t.title !== "Staff").map((data, index) => {
            let menuClass = data.classsChange;
            if (menuClass === "menu-title") {
              return (
                <li className={menuClass} key={index} >{data.title}</li>
              )
            } else {
              return (
                <li className={` ${state.active === data.title ? 'mm-active' : ''}`}
                  key={index}
                >

                  {data.content && data.content.length > 0 ?
                    <>
                      <Link to={"#"}
                        className="has-arrow"
                        onClick={() => { handleMenuActive(data.title) }}
                      >
                        {data.iconStyle}
                        <span className="nav-text">{data.title}</span>
                      </Link>
                      <Collapse in={state.active === data.title ? true : false}>
                        <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                          {data.content && data.content.map((data, index) => {
                            return (
                              <li key={index}
                                className={`${state.activeSubmenu === data.title ? "mm-active" : ""}`}
                              >
                                {data.content && data.content.length > 0 ?
                                  <>
                                    {/* <Link to={data.to} className={data.hasMenu ? 'has-arrow' : ''}
                                      onClick={() => { handleSubmenuActive(data.title) }}
                                    >
                                      {data.title}
                                    </Link> */}
                                    <Collapse in={state.activeSubmenu === data.title ? true : false}>
                                      <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                        {data.content && data.content.map((data, index) => {
                                          return (
                                            <>
                                              <li key={index}>
                                                <Link className={`${path === data.to ? "mm-active" : ""}`} to={data.to}>{data.title}</Link>
                                              </li>
                                            </>
                                          )
                                        })}
                                      </ul>
                                    </Collapse>
                                  </>
                                  :
                                  <Link to={data.to}>
                                    {data.title}
                                  </Link>
                                }

                              </li>

                            )
                          })}
                        </ul>
                      </Collapse>
                    </>
                    :
                    <Link to={data.to} >
                      {data.iconStyle}
                      <span className="nav-text">{data.title}</span>
                    </Link>
                  }

                </li>
              )
            }
          })}
        </ul>
        <div className="dropdown header-profile2 ">
        </div>
        <div className="copyright">
          <p className="text-center"><strong>Gesto Hotel Admin Dashboard</strong> © {d.getFullYear()} All Rights Reserved</p>
          <p className="fs-12 text-center">Made with <span className="heart" onClick={() => heartBlast()}></span> by [REDACTED]</p>
        </div>
      </PerfectScrollbar>
    </div>
  );
};


const mapStateToProps = (rootState) => {
  return {
    isAdmin: rootState.authData.user && rootState.authData.user.user_type_id == 1

  }
}

const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
