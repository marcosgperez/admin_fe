import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Dropdown, Tab, Nav } from 'react-bootstrap';
import room4 from './../../../images/room/room4.jpg';
import Available from './Room/Available';
import Booked from './Room/Booked';
import { getTasksAction } from './../../../store/actions/TasksActions';
import { getRoomsTypesAction } from './../../../store/actions/RoomsActions';

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


const RoomList = (filter) => {

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
				<div className="rowñ">
					<div className="col-xl-12">
						<div className="card">
							<div className="card-body p-0">
								<Tab.Content>
									<Tab.Pane eventKey="All">
										<div className="table-responsive">
											<div id="room_wrapper" className="dataTables_wrapper no-footer">
												<table className="table card-table display mb-4 dataTablesCard booking-table room-list-tbl dataTable no-footer">
													<thead>
														<tr role="row">
															<th className="sorting_asc_7 bg-none" >
																<div className="form-check  style-1">
																	<input type="checkbox" onClick={() => chackboxFun("all")} className="form-check-input" id="checkAll" required="" />
																</div>
															</th>
															<th>Name</th>
															<th>Type</th>
															<th>Assigned</th>
															<th>Date</th>
															<th>Time</th>
															<th>Status</th>
															<th className="bg-none"></th>
														</tr>
													</thead>
													<tbody>
														<Link to={"/task/1"}>
															<tr role="row" className="odd">
																<td className="sorting_7">
																	<div className="form-check   style-1">
																		<input type="checkbox" onClick={() => chackboxFun()}
																			className="form-check-input" id="customCheckBox21" required=""
																		/>
																	</div>
																</td>
																<td>
																	<div className="room-list-bx d-flex align-items-center">
																		<img className="me-3 rounded" src={room4} alt="" />
																		<div>
																			<span className=" text-secondary fs-14 d-block">#12341225</span>
																			<span className=" fs-16 font-w500 text-nowrap">Deluxe A-91234</span>
																		</div>
																	</div>
																</td>
																<td className="">
																	<span className="fs-16 font-w500 text-nowrap">Double Bed</span>
																</td>
																<td>
																	<div>

																		<span className="fs-16 font-w500">Floor A-1</span>
																	</div>
																</td>
																<td className="facility">
																	<div>
																		<span className="fs-16 comments">Joh Doe</span>
																	</div>
																</td>
																<td>
																	<div className="">
																		<span className="mb-2">Price</span>
																		<span className="font-w500">$145<small className="fs-14 ms-2">/night</small></span>
																	</div>
																</td>
																<td>
																	<Link to={"#"} className="btn btn-success btn-sm">AVAILABLE</Link>
																</td>
																<td><DropdownBlog /></td>
															</tr>
														</Link>

													</tbody>
												</table>

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