import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Tab, Nav } from "react-bootstrap";

///Import
import room4 from './../../../images/room/room4.jpg';
import Available from './Room/Available';
import Booked from './Room/Booked';
const DropdownBlog = () => {
	return (
		<>
			<Dropdown className="dropdown">
				<Dropdown.Toggle as="div" className="btn-link i-false" >
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


const taskData = [
	{ name: "John Doe", job: "Maintainance", days: "Mon-Fri", hours: "9am to 5pm", contact: "11-111-1111", status: "Active" },
	{ name: "John Doe", job: "Maintainance", days: "Mon-Fri", hours: "9am to 5pm", contact: "11-111-1111", status: "Active" },
	{ name: "John Doe", job: "Maintainance", days: "Mon-Fri", hours: "9am to 5pm", contact: "11-111-1111", status: "Active" },
	{ name: "John Doe", job: "Maintainance", days: "Mon-Fri", hours: "9am to 5pm", contact: "11-111-1111", status: "Active" },
	{ name: "John Doe", job: "Maintainance", days: "Mon-Fri", hours: "9am to 5pm", contact: "11-111-1111", status: "Active" },
]

const DropDown = ({ status }) => {
	const [currentStatus, setCurrentStatus] = useState(status);
	const [open, setOpen] = useState(false);
	const [color, setColor] = useState("green")

	const selectOption = (changeTo, newColor) => {
		setCurrentStatus(changeTo)
		setOpen(false)
		setColor(newColor)
	}
	return (
		<div className="dropDown">
			<div onClick={() => setOpen(!open)} className="dropDownButton">
				<div>
					<p style={{ color }}>
						{currentStatus}
					</p>
				</div>
			</div>
			<div className={open ? "dropDownOptions" : "closed"}>
				<div className="active" onClick={() => selectOption("Active", "green")}>Active</div>
				<div className="inactive" onClick={() => selectOption("Inactive", "red")}>Inactive</div>
				<div className="break" onClick={() => selectOption("On Break", "#c7d106")}>On break</div>
			</div>
		</div>
	);
};
const ConciergeList = () => {
	const [selectBtn, setSelectBtn] = useState("Newest");

	const [data, setData] = useState(
		document.querySelectorAll("#concierge_wrapper tbody tr")
	);
	const sort = 5;
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
		setData(document.querySelectorAll("#concierge_wrapper tbody tr"));
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
	const chackbox = document.querySelectorAll(".sorting_1 input");
	const motherChackBox = document.querySelector(".sorting_asc input");
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
													<div style={{ fontSize: "30px", paddingTop: "20px", paddingLeft: "20px", fontWeight: "500" }} >Staff</div>
													<div className={"tableHeader"} style={{ display: "flex", justifyContent: "space-between", borderBottom: "3px solid #828282", color: "black", fontWeigth: "500" }}>
														<div style={{ width: "20%", justifyContent: "center", textAlign: "start", fontSize: "20px", fontWeight: "600", margin: "5px", padding: "10px 0px 10px 20px" }}>Name</div>
														<div style={{ width: "10%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Job Description</div>
														<div style={{ width: "10%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>schedule</div>
														<div style={{ width: "10%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>contact</div>
														<div style={{ width: "10%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Status</div>

													</div>
													<div className={"tableBody"} style={{ padding: "10px 0px" }} >
														{taskData.map((t, i) => {
															return (

																<div className={"tableRow"} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "10px 0px", textSelect: "none" }}>
																	{/* <div style={{ width: "0.00005%", display: "flex", alignItems: "center", justifyContent: "end", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>
																		</div> */}
																	<div style={{ width: "20%", display: "flex", padding: "0px 0px 0px 20px", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>
																		<img alt={"idk bruh0"} src={room4} className="rowImage" ></img>
																		<p style={{ marginBottom: "0px", marginLeft: "20px" }}>
																			{t.name}
																		</p>
																	</div>
																	<div style={{ width: "10%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>{t.job}</div>
																	<div style={{ width: "10%", display: "flex", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px", flexDirection: "column" }}>
																		<p style={{ marginBottom: "0px" }} >
																			{t.days}
																		</p>
																		<p style={{ marginBottom: "0px" }}>
																			{t.hours}
																		</p>
																	</div>
																	<div style={{ width: "10%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>{t.contact}</div>
																	<div style={{ width: "10%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}><DropDown status={t.status} /></div>
																</div>

															)
														})}
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
export { DropdownBlog };
export default ConciergeList;