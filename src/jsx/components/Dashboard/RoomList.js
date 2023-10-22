import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Dropdown, Tab, Nav } from 'react-bootstrap';
import room4 from './../../../images/room/room4.jpg';
import Available from './Room/Available';
import Booked from './Room/Booked';
import { getTasksAction } from './../../../store/actions/TasksActions';

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


const RoomList = ({ tasksData, getTasksAction }) => {
	const { loading, tasks, error } = tasksData;
	
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
	
	React.useEffect(() => {
		getTasksAction()
	},[])
	console.log(tasksData,"tasksData")
	
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
								<Tab.Content style={{ minWidth: "650px", heigth: "200px" }}>
									<Tab.Pane eventKey="All">
										<div className="table-responsive">
											<div id="room_wrapper" className="dataTables_wrapper no-footer">
												<div className={"tableContainer"} style={{ width: "100%", alignItems: "center" }} >
													<div style={{ fontSize: "30px", paddingTop: "20px", paddingLeft: "20px", fontWeight: "500" }} >Tasks</div>
													<div className={"tableHeader"}>
														{/* <div style={{ width: "0.5%", justifyContent: "center", textAlign: "start", fontSize: "16px", padding: "10px 0px", fontWeight: "500", margin: "5px" }}></div> */}
														<div className="headerName" >Name</div>
														<div className="headerItem" >Type</div>
														<div className="headerItem" >Assigned</div>
														<div className="headerItem" >Date</div>
														<div className="headerItem" >Time</div>
														<div className="headerItem" >Status</div>

													</div>
													{loading === false && tasks.length && (
														<div className={"tableBody"} style={{ padding: "10px 0px" }} >
															{tasks.map((t, i) => {
																return (
																	<Link key={`task-${t.id}`} to={`/task/:${t.id}`}>
																		<div className={"tableRow"} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "10px 0px", textSelect: "none" }}>
																			{/* <div style={{ width: "0.00005%", display: "flex", alignItems: "center", justifyContent: "end", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>
																			</div> */}
																			<div className="rowName">
																				<img alt={"idk bruh0"} src={room4} className="rowImage" ></img>
																				<p style={{ marginBottom: "0px", marginLeft: "20px" }}>
																					{t.name}
																				</p>
																			</div>
																			<div className="rowItem" >{t.type}</div>
																			<div className="rowItem" >{t.assigned}</div>
																			<div className="rowItem" >{t.date}</div>
																			<div className="rowItem" >{t.time}</div>
																			<div className="rowItem" >
																				<Link to={"#"} style={{ width: "fit-content" }} className={`rowBtn-${t.status}`}>{t.status.replace("-", " ")}</Link>
																			</div>
																		</div>
																	</Link>
																)
															})}
														</div>
													)}
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
const mapStateToProps = (rootState) => {
	console.log(rootState,"rootState")
	return {
		tasksData: rootState.tasksData
	}
}

const mapDispatchToProps = {
	getTasksAction
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);