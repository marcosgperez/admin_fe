import React, { Fragment, useState } from "react";
import SideBar from "./SideBar";
import NavHader from "./NavHader";
import Header from "./Header";
import ChatBox from "../ChatBox";
import { connect } from "react-redux";

const JobieNav = ({ title /*, onClick, ClickToAddEvent, onClick2, onClick3*/ }) => {
  const [toggle, setToggle] = useState("");
  const onClick = (name) => setToggle(toggle === name ? "" : name);
  return (
    <Fragment>
      <NavHader />
      <ChatBox onClick={() => onClick("chatbox")} toggle={toggle} />
      <Header
        // onNote={() => onClick("chatbox")}
        // onNotification={() => onClick("notification")}
        // onProfile={() => onClick("profile")}
        toggle={toggle}
        title={title}
        // onBox={() => onClick("box")}
        // onClick={() => ClickToAddEvent()}
      />
      <SideBar />
    </Fragment>
  );
};

export const mapStateToProps = (state) => {
  return {
    title: undefined // "state.layout.title"
  }
}

export default connect(mapStateToProps)(JobieNav);
