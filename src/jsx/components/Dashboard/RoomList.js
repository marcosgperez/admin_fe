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

// 	<th> Name</th >
// 	<th>Type</th>
// 	<th>Assigned</th>
// 	<th>Date</th>
// <th>Time</th>
// <th>Status</th>

const taskData = [
	{ id: 1, name: "room 201", type: "maintainance", assigned: "Joaquin Cerruti Lerech", date: "11/10/23", time: "10:32", button: "warning", status: "On Progress" },
	{ id: 2, name: "room 201", type: "maintainance", assigned: "John Doe", date: "11/10/23", time: "10:32", button: "success", status: "Done" },
	{ id: 3, name: "room 201", type: "maintainance", assigned: "John Doe", date: "11/10/23", time: "10:32", button: "success", status: "Done" },
	{ id: 4, name: "room 201", type: "maintainance", assigned: "John Doe", date: "11/10/23", time: "10:32", button: "warning", status: "On Progress" },
	{ id: 5, name: "room 201", type: "maintainance", assigned: "John Doe", date: "11/10/23", time: "10:32", button: "warning", status: "On Progress" },
	{ id: 6, name: "room 201", type: "maintainance", assigned: "John Doe", date: "11/10/23", time: "10:32", button: "success", status: "Done" },
	{ id: 7, name: "room 201", type: "maintainance", assigned: "John Doe", date: "11/10/23", time: "10:32", button: "warning", status: "On Progress" },
]

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
			<Tab.Container defaultActiveKey="All" >
				<div className="row">
					<div className="col-xl-12">
						<div className="card roomListCard" style={{ heigth: "20px" }} >
							<div style={{ overflow: "auto" }} className="card-body p-0">
								<Tab.Content style={{ minWidth: "650px", heigth: "200px" }} >
									<Tab.Pane eventKey="All">
										<div className="table-responsive">
											<div id="room_wrapper" className="dataTables_wrapper no-footer">
												<div className={"tableContainer"} style={{ width: "100%", alignItems: "center" }} >
													<div style={{ fontSize: "30px", paddingTop: "20px", paddingLeft: "20px", fontWeight: "500" }} >Tasks</div>
													<div className={"tableHeader"} style={{ display: "flex", justifyContent: "space-between", borderBottom: "3px solid #828282",color:"black",fontWeigth:"500" }}>
														{/* <div style={{ width: "0.5%", justifyContent: "center", textAlign: "start", fontSize: "16px", padding: "10px 0px", fontWeight: "500", margin: "5px" }}></div> */}
														<div style={{ width: "20%", justifyContent: "center", textAlign: "start", fontSize: "20px", fontWeight: "600", margin: "5px", padding: "10px 0px 10px 20px" }}>Name</div>
														<div style={{ width: "10%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Type</div>
														<div style={{ width: "10%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Assigned</div>
														<div style={{ width: "10%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Date</div>
														<div style={{ width: "10%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Time</div>
														<div style={{ width: "10%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Status</div>

													</div>


													<div className={"tableBody"} style={{padding:"10px 0px"}} >
														{taskData.map((t, i) => {
															return (
																<Link to={`/:${t.id}`}>
																	<div className={"tableRow"} style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
																		{/* <div style={{ width: "0.00005%", display: "flex", alignItems: "center", justifyContent: "end", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>
																		</div> */}
																		<div style={{ width: "20%", display: "flex", padding: "0px 0px 0px 20px", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>
																			<img alt={"idk bruh0"} src={room4} className="rowImage" ></img>
																			<p style={{ marginBottom: "0px", marginLeft: "20px" }}>
																				{t.name}
																			</p>
																		</div>
																		<div style={{ width: "10%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>{t.type}</div>
																		<div style={{ width: "10%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>{t.assigned}</div>
																		<div style={{ width: "10%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>{t.date}</div>
																		<div style={{ width: "10%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>{t.time}</div>
																		<div style={{ width: "10%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>
																			<Link to={"#"} style={{ width: "fit-content" }} className={`btn btn-${t.button} btn-sm}`}>{t.status}</Link>
																		</div>
																		{/* <div style={{ width: "5%", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", display:"flex",margin: "5px", alignItems:"center" }}><DropdownBlog></DropdownBlog></div> */}
																	</div>
																</Link>
															)
														})}
													</div>
												</div>
												{/* <div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3">
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
												</div> */}
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