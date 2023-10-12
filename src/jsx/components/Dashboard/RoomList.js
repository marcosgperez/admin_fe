import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Dropdown, Tab, Nav } from 'react-bootstrap';

import room4 from './../../../images/room/room4.jpg';
import room5 from './../../../images/room/room5.jpg';
import room6 from './../../../images/room/room6.jpg';
import room7 from './../../../images/room/room7.jpg';
//import GuestCarousel from './Room/GuestCarousel';

import Available from './Room/Available';
import Booked from './Room/Booked';

const DropdownBlog = () => {
	return (
		<>
			<Dropdown className="dropdown">
				<Dropdown.Toggle as="div" className="btn-link i-false" data-bs-toggle="dropdown" aria-expanded="false">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12Z" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12Z" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</Dropdown.Toggle>
				<Dropdown.Menu className="dropdown-menu">
					<Dropdown.Item className="dropdown-item">Edit</Dropdown.Item>
					<Dropdown.Item className="dropdown-item">Delete</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}


const RoomList = () => {
	const [selectBtn, setSelectBtn] = useState("Newest");
	const [data, setData] = useState(
		document.querySelectorAll("#room_wrapper tbody tr")
	);
	const sort = 10;
	const activePag = useRef(0);
	const [test, settest] = useState(0);

	// Active data
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			if (i >= frist && i < sec) {
				data[i].classList.remove("d-none");
			} else {
				data[i].classList.add("d-none");
			}
		}
	};
	// use effect
	useEffect(() => {
		setData(document.querySelectorAll("#room_wrapper tbody tr"));
		//chackboxFun();
	}, [test]);


	// Active pagginarion
	activePag.current === 0 && chageData(0, sort);
	// paggination
	let paggination = Array(Math.ceil(data.length / sort))
		.fill()
		.map((_, i) => i + 1);

	// Active paggination & chage data
	const onClick = (i) => {
		activePag.current = i;
		chageData(activePag.current * sort, (activePag.current + 1) * sort);
		settest(i);
	};


	const chackbox = document.querySelectorAll(".sorting_7 input");
	const motherChackBox = document.querySelector(".sorting_asc_7 input");
	// console.log(document.querySelectorAll(".sorting_1 input")[0].checked);
	const chackboxFun = (type) => {
		for (let i = 0; i < chackbox.length; i++) {
			const element = chackbox[i];
			if (type === "all") {
				if (motherChackBox.checked) {
					element.checked = true;
				} else {
					element.checked = false;
				}
			} else {
				if (!element.checked) {
					motherChackBox.checked = false;
					break;
				} else {
					motherChackBox.checked = true;
				}
			}
		}
	};
	return (
		<>
			<Tab.Container defaultActiveKey="All">
				<div className="row mt-4">
					<div className="col-xl-12">
						<div className="card">
							<div className="card-body p-0">
								<Tab.Content>
									<Tab.Pane eventKey="All" id='roomListTable'>
										<div className="table-responsive">
											<div id="room_wrapper" className="dataTables_wrapper no-footer">
												<table className="table card-table display mb-4 dataTablesCard booking-table room-list-tbl dataTable no-footer">

													<div role="row" >
														<div className='col-xl-12 d-flex  roomListHeader'>
															<div className="sorting_asc_7 bg-none" >
																<div className="form-check  style-1">
																	<input type="checkbox" onClick={() => chackboxFun("all")} className="form-check-input" id="checkAll" required="" />
																</div>
															</div>
															<div className='roomHeaderList'></div>
															<div className='roomHeaderList'>Name</div>
															<div className='roomHeaderList'>Type</div>
															<div className='roomHeaderList'>Assigned</div>
															<div className='roomHeaderList'>Date</div>
															<div className='roomHeaderList'>Time</div>
															<div className='roomHeaderList'>Status</div>
														</div>
													</div>
													<div className='row'>
														<div className="col-xl-12 d-flex roomListRow ">
															<div className="sorting_asc_7 bg-none" >
																<div className="form-check  style-1">
																	<input type="checkbox" onClick={() => chackboxFun("all")} className="form-check-input" id="checkAll" required="" />
																</div>
															</div>
															<div className="room-list-bx d-flex align-items-center">
																<img className="me-3 rounded" src={room4} alt="" />
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>Deluxe</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>Cleaning</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>John Doe</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>10/10/23</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>9:13</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<Link to={"#"} className="btn btn-success btn-sm">AVAILABLE</Link>
															</div>
															{/* <td><DropdownBlog /></td> */}
														</div>
													</div>
													<div className='row'>
														<div className="col-xl-12 d-flex roomListRow ">
															<div className="sorting_asc_7 bg-none" >
																<div className="form-check  style-1">
																	<input type="checkbox" onClick={() => chackboxFun("all")} className="form-check-input" id="checkAll" required="" />
																</div>
															</div>
															<div className="room-list-bx d-flex align-items-center">
																<img className="me-3 rounded" src={room4} alt="" />
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>Deluxe</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>Cleaning</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>John Doe</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>10/10/23</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>9:13</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<Link to={"#"} className="btn btn-success btn-sm">AVAILABLE</Link>
															</div>
															{/* <td><DropdownBlog /></td> */}
														</div>
													</div><div className='row'>
														<div className="col-xl-12 d-flex roomListRow ">
															<div className="sorting_asc_7 bg-none" >
																<div className="form-check  style-1">
																	<input type="checkbox" onClick={() => chackboxFun("all")} className="form-check-input" id="checkAll" required="" />
																</div>
															</div>
															<div className="room-list-bx d-flex align-items-center">
																<img className="me-3 rounded" src={room4} alt="" />
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>Deluxe</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>Cleaning</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>John Doe</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>10/10/23</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>9:13</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<Link to={"#"} className="btn btn-success btn-sm">AVAILABLE</Link>
															</div>
															{/* <td><DropdownBlog /></td> */}
														</div>
													</div><div className='row'>
														<div className="col-xl-12 d-flex roomListRow ">
															<div className="sorting_asc_7 bg-none" >
																<div className="form-check  style-1">
																	<input type="checkbox" onClick={() => chackboxFun("all")} className="form-check-input" id="checkAll" required="" />
																</div>
															</div>
															<div className="room-list-bx d-flex align-items-center">
																<img className="me-3 rounded" src={room4} alt="" />
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>Deluxe</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>Cleaning</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>John Doe</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>10/10/23</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<div>
																	<span className=" fs-16 font-w500 text-nowrap"> <p>9:13</p> </span>
																</div>
															</div>
															<div className='roomListRowItem'>
																<Link to={"#"} className="btn btn-success btn-sm">AVAILABLE</Link>
															</div>
															{/* <td><DropdownBlog /></td> */}
														</div>
													</div>
												</table>
												<div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3">
													<div className="dataTables_info">
														Showing {activePag.current * sort + 1} to{" "}
														{data.length > (activePag.current + 1) * sort
															? (activePag.current + 1) * sort
															: data.length}{" "}
														of {data.length} entries
													</div>
													<div
														className="dataTables_paginate paging_simple_numbers mb-0"
														id="example2_paginate"
													>
														<Link
															className="paginate_button previous disabled"
															to="/room-list"
															onClick={() =>
																activePag.current > 0 &&
																onClick(activePag.current - 1)
															}
														>
															<i className="fa fa-angle-double-left"></i> Previous
														</Link>
														<span>
															{paggination.map((number, i) => (
																<Link key={i} to="/room-list"
																	className={`paginate_button  ${activePag.current === i ? "current" : ""
																		} `}
																	onClick={() => onClick(i)}
																>
																	{number}
																</Link>
															))}
														</span>

														<Link
															className="paginate_button next"
															to="/room-list"
															onClick={() =>
																activePag.current + 1 < paggination.length &&
																onClick(activePag.current + 1)
															}
														>
															Next <i className="fa fa-angle-double-right"></i>
														</Link>
													</div>
												</div>
											</div>
										</div>
									</Tab.Pane>
									<Tab.Pane eventKey="Available">
										<Available />
									</Tab.Pane>
									<Tab.Pane eventKey="Booked">
										<Booked />
									</Tab.Pane>
								</Tab.Content>
							</div>
						</div>
					</div>
				</div>
			</Tab.Container>
		</>
	)
}
export default RoomList;