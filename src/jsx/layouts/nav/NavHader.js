import React, { Fragment, useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";

export function NavMenuToggle() {
	setTimeout(() => {
		let mainwrapper = document.querySelector("#main-wrapper");
		if (mainwrapper.classList.contains('menu-toggle')) {
			mainwrapper.classList.remove("menu-toggle");
		} else {
			mainwrapper.classList.add("menu-toggle");
		}
	}, 200);
}

const NavHader = () => {
	const [toggle, setToggle] = useState(false);
	const { navigationHader, openMenuToggle, background } = useContext(
		ThemeContext
	);
	const width = window.innerWidth
	return (
		<div className="nav-header">
			<Link to="/" className="brand-logo">
				
					<img src="/logoNoLetras.png" style={ width<900? {width:"40px"} : {width:"80px"}}></img>
			</Link>

			<div
				className="nav-control"
				onClick={() => {
					setToggle(!toggle);
					NavMenuToggle();
				}}
			>
				<div className={`hamburger ${toggle ? "is-active" : ""}`}>
					<span className="line"></span>
					<span className="line"></span>
					<span className="line"></span>
				</div>
			</div>
		</div>
	);
};

export default NavHader;
