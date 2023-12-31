import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import { linkData } from "../../routes";
/// Image
import profile from "../../../images/user.jpg";
import avatar from "../../../images/avatar/1.jpg";
import { Dropdown } from "react-bootstrap";
import LogoutPage from './Logout';
import { connect } from "react-redux"
import { getUserTypesAction } from "../../../store/actions/AuthActions";
import { generateLetterByName, generateColorFromName } from "../../../helpers"

const Header = ({ isAdmin, onNote, authData, typesData, getUserTypesAction, title, notifications }) => {
	// const [searchBut, setSearchBut] = useState(false);
	const location = useLocation()
	const { loading, user } = authData

	// GET USERTYPES
	React.useEffect(() => {
		getUserTypesAction()
	}, [])

	const grabTitleFromUrl = () => {
		const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
		const splitPath = location.pathname.split("/");
		const filtered = splitPath.filter(p => p != "")
		if (filtered.length === 0) return "Dashboard"
		return filtered.map(capitalize).join(": ")
	}

	return (
		<div className={isAdmin ? "header border-bottom" : "header header-employee"}>
			<div className="header-content">
				<nav className="navbar navbar-expand">
					<div className="collapse navbar-collapse justify-content-between">
						<div className="header-left">
							{!isAdmin && (<img src="/logoNoLetras.png" style={{ width: "40px", marginLeft: "10px" }}></img>)}
							<div
								className="dashboard_bar"
								style={{ textTransform: "capitalize" }}
							>
								{title ? title : grabTitleFromUrl()}
							</div>
						</div>
						<ul className="navbar-nav header-right">
							<Dropdown as="li" className="nav-item dropdown notification_dropdown">
								<Dropdown.Toggle className="nav-link i-false c-pointer" variant="" as="a">
									<svg xmlns="http://www.w3.org/2000/svg" width="19.375" height="24" viewBox="0 0 19.375 24">
										<g id="_006-notification" data-name="006-notification" transform="translate(-341.252 -61.547)">
											<path id="Path_1954" data-name="Path 1954" d="M349.741,65.233V62.747a1.2,1.2,0,1,1,2.4,0v2.486a8.4,8.4,0,0,1,7.2,8.314v4.517l.971,1.942a3,3,0,0,1-2.683,4.342h-5.488a1.2,1.2,0,1,1-2.4,0h-5.488a3,3,0,0,1-2.683-4.342l.971-1.942V73.547a8.4,8.4,0,0,1,7.2-8.314Zm1.2,2.314a6,6,0,0,0-6,6v4.8a1.208,1.208,0,0,1-.127.536l-1.1,2.195a.6.6,0,0,0,.538.869h13.375a.6.6,0,0,0,.536-.869l-1.1-2.195a1.206,1.206,0,0,1-.126-.536v-4.8a6,6,0,0,0-6-6Z" transform="translate(0 0)" fill="#135846" fill-rule="evenodd" />
										</g>
									</svg>

									{notifications.length ? (<span className="badge light text-white bg-primary rounded-circle"><b className="pt-1">{notifications.length}</b></span>) : <></>}
								</Dropdown.Toggle>
								<Dropdown.Menu align="right" className="mt-2 dropdown-menu dropdown-menu-end">
									<PerfectScrollbar className="widget-media dlab-scroll p-3 height380 justify-content-start">
										{notifications.map((notification, index) => {
											let link = ""
											const isTask = notification.ref_type == "task"

											if (isTask) link = "/task/" + notification.ref_id

											return (
												<Dropdown.Item className="dropdown-item pt-3">
													<Link
														key={index}
														className=""
														to={link}
													>
														<div className="d-flex align-items-center gap-2">
															<div className="media-thumb">
																{isTask ? (
																	<div><p>{notification.ref_id}</p></div>
																) : <></>}
															</div>
															<div className="media-body">
																<h6 className="mt-0 mb-0">{notification.name}</h6>
																<p className="mb-0">{notification.description}</p>
															</div>
														</div>
														<hr className="mb-1" />
													</Link>
												</Dropdown.Item>
											)
										})}

									</PerfectScrollbar>
									<Link className="all-notification " to="#">
										<p className="d-none">See all notifications <i className="ti-arrow-right" /></p>
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
											<li>
												<div className="timeline-badge primary" />
												<Link
													className="timeline-panel c-pointer text-muted"
													to="#"
												>
													<span>10 minutes ago</span>
													<h6 className="mb-0">
														Youtube, a video-sharing website, goes live{" "}
														<strong className="text-primary">$500</strong>.
													</h6>
												</Link>
											</li>
											<li>
												<div className="timeline-badge info"></div>
												<Link
													className="timeline-panel c-pointer text-muted"
													to="#"
												>
													<span>20 minutes ago</span>
													<h6 className="mb-0">
														New order placed{" "}
														<strong className="text-info">#XF-2356.</strong>
													</h6>
													<p className="mb-0">
														Quisque a consequat ante Sit amet magna at
														volutapt...
													</p>
												</Link>
											</li>
											<li>
												<div className="timeline-badge danger"></div>
												<Link
													className="timeline-panel c-pointer text-muted"
													to="#"
												>
													<span>30 minutes ago</span>
													<h6 className="mb-0">
														john just buy your product{" "}
														<strong className="text-warning">Sell $250</strong>
													</h6>
												</Link>
											</li>
											<li>
												<div className="timeline-badge success"></div>
												<Link
													className="timeline-panel c-pointer text-muted"
													to="#"
												>
													<span>15 minutes ago</span>
													<h6 className="mb-0">
														StumbleUpon is acquired by eBay.{" "}
													</h6>
												</Link>
											</li>
											<li>
												<div className="timeline-badge warning"></div>
												<Link
													className="timeline-panel c-pointer text-muted"
													to="#"
												>
													<span>20 minutes ago</span>
													<h6 className="mb-0">
														Mashable, a news website and blog, goes live.
													</h6>
												</Link>
											</li>
											<li>
												<div className="timeline-badge dark"></div>
												<Link
													className="timeline-panel c-pointer text-muted"
													to="#"
												>
													<span>20 minutes ago</span>
													<h6 className="mb-0">
														Mashable, a news website and blog, goes live.
													</h6>
												</Link>
											</li>
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
									<div className="staffPic" style={{ backgroundColor: `${generateColorFromName(user.name)}` }}><p>{generateLetterByName(user.name)}{generateLetterByName(user.surname)}</p></div>
								</Dropdown.Toggle>
								<Dropdown.Menu align="right" className="mt-3 dropdown-menu dropdown-menu-end">
									{/* <Link to="/app-profile" className="dropdown-item ai-icon">
										<svg
											id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary me-1"
											width={18} height={18} viewBox="0 0 24 24" fill="none"
											stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
										>
											<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
											<circle cx={12} cy={7} r={4} />
										</svg>
										<span className="ms-2">Profile </span>
									</Link>
									<Link to="/email-inbox" className="dropdown-item ai-icon">
										<svg
											id="icon-inbox" xmlns="http://www.w3.org/2000/svg" className="text-success me-1" width={18}
											height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
											strokeLinecap="round" strokeLinejoin="round"
										>
											<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
											<polyline points="22,6 12,13 2,6" />
										</svg>
										<span className="ms-2">Inbox </span>
									</Link> */}
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
		authData: rootState.authData,
		typesData: rootState.authData.userTypes,
		notifications: rootState.authData.notifications
	}
}
const mapDispatchToProps = {
	getUserTypesAction
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
