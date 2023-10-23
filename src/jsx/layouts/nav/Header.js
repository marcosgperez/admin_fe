import React, { useState } from "react";

import { Link, json } from "react-router-dom";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import { linkData } from "../../routes";
/// Image
import profile from "../../../images/user.jpg";
import avatar from "../../../images/avatar/1.jpg";
import { Dropdown } from "react-bootstrap";
import LogoutPage from './Logout';
import { connect } from "react-redux"

const Header = ({ onNote, authData }) => {
	const [searchBut, setSearchBut] = useState(false);
	var path = window.location.pathname.split("/");
	const pathNotSplited = path[path.length - 1]
	const singleLinkData = linkData.filter((data) => data.url == pathNotSplited);

	const { loading, user } = authData
	console.log(user, "user")

	if (singleLinkData.length > 0 && singleLinkData[0].name) {
		//EXISTE LA DATA DE LA URL EN LINKED DATA
		var finalName = [singleLinkData[0].name]
	} else {

		var name = pathNotSplited.split("-");
		var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
		var finalName = filterName.includes("app")
			? filterName.filter((f) => f !== "app")
			: filterName.includes("ui")
				? filterName.filter((f) => f !== "ui")
				: filterName.includes("uc")
					? filterName.filter((f) => f !== "uc")
					: filterName.includes("basic")
						? filterName.filter((f) => f !== "basic")
						: filterName.includes("jquery")
							? filterName.filter((f) => f !== "jquery")
							: filterName.includes("table")
								? filterName.filter((f) => f !== "table")
								: filterName.includes("page")
									? filterName.filter((f) => f !== "page")
									: filterName.includes("email")
										? filterName.filter((f) => f !== "email")
										: filterName.includes("ecom")
											? filterName.filter((f) => f !== "ecom")
											: filterName.includes("chart")
												? filterName.filter((f) => f !== "chart")
												: filterName.includes("editor")
													? filterName.filter((f) => f !== "editor")
													: filterName;
	}
	return (
		<div className="header border-bottom">
			<div className="header-content">
				<nav className="navbar navbar-expand">
					<div className="collapse navbar-collapse justify-content-between">
						<div className="header-left">
							<div
								className="dashboard_bar"
								style={{ textTransform: "capitalize" }}
							>
								{finalName.join(" ").length === 0 ? "Dashboard"
									: finalName.join(" ") === "dashboard dark"
										? "Dashboard"
										: finalName.join(" ")}
							</div>
						</div>
						{/* <div className="nav-item d-flex align-items-center">
				<div className="input-group search-area">
					<input type="text" 
						className={`form-control ${searchBut ? "active" : ""}`}
						placeholder="Search.." 
					/>
					<span className="input-group-text" onClick={() => setSearchBut(!searchBut)}>
						<Link to={"#"}><i className="flaticon-381-search-2"></i></Link>
					</span>
				</div>
			</div>  */}
						<ul className="navbar-nav header-right">

							{/* <Dropdown
					as="li"
					className="nav-item dropdown notification_dropdown "
				  >
					<Dropdown.Toggle
					  variant=""
					  as="a"
					  className="nav-link bell bell-link i-false c-pointer"
					  onClick={() => onNote()}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="26.667" height="24" viewBox="0 0 26.667 24">
						  <g id="_014-mail" data-name="014-mail" transform="translate(0 -21.833)">
							<path id="Path_1962" data-name="Path 1962" d="M26.373,26.526A6.667,6.667,0,0,0,20,21.833H6.667A6.667,6.667,0,0,0,.293,26.526,6.931,6.931,0,0,0,0,28.5V39.166a6.669,6.669,0,0,0,6.667,6.667H20a6.669,6.669,0,0,0,6.667-6.667V28.5A6.928,6.928,0,0,0,26.373,26.526ZM6.667,24.5H20a4.011,4.011,0,0,1,3.947,3.36L13.333,33.646,2.72,27.86A4.011,4.011,0,0,1,6.667,24.5ZM24,39.166a4.012,4.012,0,0,1-4,4H6.667a4.012,4.012,0,0,1-4-4V30.873L12.693,36.34a1.357,1.357,0,0,0,1.28,0L24,30.873Z" transform="translate(0 0)" fill="#135846"/>
						  </g>
						</svg>
						<span className="badge light text-white bg-primary rounded-circle">76</span>
					</Dropdown.Toggle>
				</Dropdown>	 */}
							<Dropdown as="li" className="nav-item dropdown notification_dropdown">
								<Dropdown.Toggle className="nav-link i-false c-pointer" variant="" as="a">
									<svg xmlns="http://www.w3.org/2000/svg" width="19.375" height="24" viewBox="0 0 19.375 24">
										<g id="_006-notification" data-name="006-notification" transform="translate(-341.252 -61.547)">
											<path id="Path_1954" data-name="Path 1954" d="M349.741,65.233V62.747a1.2,1.2,0,1,1,2.4,0v2.486a8.4,8.4,0,0,1,7.2,8.314v4.517l.971,1.942a3,3,0,0,1-2.683,4.342h-5.488a1.2,1.2,0,1,1-2.4,0h-5.488a3,3,0,0,1-2.683-4.342l.971-1.942V73.547a8.4,8.4,0,0,1,7.2-8.314Zm1.2,2.314a6,6,0,0,0-6,6v4.8a1.208,1.208,0,0,1-.127.536l-1.1,2.195a.6.6,0,0,0,.538.869h13.375a.6.6,0,0,0,.536-.869l-1.1-2.195a1.206,1.206,0,0,1-.126-.536v-4.8a6,6,0,0,0-6-6Z" transform="translate(0 0)" fill="#135846" fill-rule="evenodd" />
										</g>
									</svg>

									<span className="badge light text-white bg-primary rounded-circle">4</span>
								</Dropdown.Toggle>
								<Dropdown.Menu align="right" className="mt-2 dropdown-menu dropdown-menu-end">
									<PerfectScrollbar className="widget-media dlab-scroll p-3 height380">


										<div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
											<div
												className="ps__thumb-x"
												tabIndex={0}
												style={{ left: 0, width: 0 }}
											/>
										</div>
										<div className="ps__rail-y" style={{ top: 0, right: 0 }}>
											<div
												className="ps__thumb-y"
												tabIndex={0}
												style={{ top: 0, height: 0 }}
											/>
										</div>
									</PerfectScrollbar>
									<Link className="all-notification" to="#">
										See all notifications <i className="ti-arrow-right" />
									</Link>
								</Dropdown.Menu>
							</Dropdown>
							<Dropdown
								as="li"
								className="nav-item  notification_dropdown "
							>
								<Dropdown.Menu align="right" className="mt-4 dropdown-menu dropdown-menu-end">
									<PerfectScrollbar className="widget-timeline dlab-scroll style-1 ps p-3 height370">
										<ul className="timeline">

										</ul>
										<div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
											<div
												className="ps__thumb-x"
												tabIndex={0}
												style={{ left: 0, width: 0 }}
											/>
										</div>
										<div className="ps__rail-y" style={{ top: 0, right: 0 }}>
											<div
												className="ps__thumb-y"
												tabIndex={0}
												style={{ top: 0, height: 0 }}
											/>
										</div>
									</PerfectScrollbar>
								</Dropdown.Menu>
							</Dropdown>

							<Dropdown as="li" className="nav-item dropdown header-profile">
								<Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
									<img src={profile} width={20} alt="" />
								</Dropdown.Toggle>
								<Dropdown.Menu align="right" className="mt-3 dropdown-menu dropdown-menu-end">
									<LogoutPage />
								</Dropdown.Menu>
							</Dropdown>
						</ul>
					</div>
				</nav>
			</div>
		</div>
	);
};

const mapStateToProps = (rootState) => {
	return {
		authData: rootState.authData
	}
}
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
