import React, { useState, useRef, useEffect } from 'react';

import room4 from './../../../images/room/room4.jpg';
import { LabelBtns } from '../../../components/LabelBtns';
import { Dropdown, Tab, Nav } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const DropdownBlog = ({ onEdit, onDelete }) => {
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
					<Dropdown.Item onClick={() => onEdit()} className="dropdown-item">Edit</Dropdown.Item>
					<Dropdown.Item onClick={() => onDelete()} className="dropdown-item">Delete</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}

const buildTaskData = (taskFromAPI) => {
	return {
		id: "1",
		name: "Task Name ",
		room: "Room 1",
		contact: "-",
		status: "Available",
		asignation: "Pedra"
	}
}

const TaskTable = ({ items }) => {
	let navigate = useNavigate();
	const [data, setData] = useState(
		document.querySelectorAll("#available_wrapper tbody tr")
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
		setData(document.querySelectorAll("#available_wrapper tbody tr"));
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

	const chackbox = document.querySelectorAll(".sorting_9 input");
	const motherChackBox = document.querySelector(".sorting_asc9 input");
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


	const onEdit = (task) => {
		navigate("/task/"+task.id)
	}
	
	const onDelete = (task) => {
		alert("deleting")
	}

	return (
		<>
			<div className="table-responsive" style={{ minWidth: "1000px" }}>
				<div id="available_wrapper" className="dataTables_wrapper no-footer">
					<table className="table card-table display mb-4 dataTablesCard booking-table room-list-tbl dataTable no-footer">
						<thead>
							<tr role="row">
								<th className="sorting_asc9 bg-none" >
									<div className="form-check  style-1">
										<input type="checkbox" onClick={() => chackboxFun("all")} className="form-check-input" id="checkAll" required="" />
									</div>
								</th>
								<th>Task Name</th>
								<th>Room</th>
								<th>Assignation</th>
								<th>Status</th>
								<th className="bg-none"></th>
							</tr>
						</thead>


						<tbody>
							{items.map(buildTaskData).map((t, i) => (
								<tr className="odd">
									<td className="sorting_9">
										<div className="form-check  style-1">
											<input type="checkbox" onClick={() => chackboxFun()}
												className="form-check-input" id="customCheckBox25" required=""
											/>
										</div>
									</td>
									<td>
										<div className="room-list-bx d-flex align-items-center">
											<img className="me-3 rounded" src={room4} alt="" />
											<div>
												<span className=" text-secondary fs-14 d-block"># {t.id}</span>
												<span className=" fs-16 font-w500 text-nowrap">{t.name}</span>
											</div>
										</div>
									</td>
									<td className="">
										<span className="fs-16 font-w500 text-nowrap">{t.room}</span>
									</td>
									<td className="">
										<span className="fs-16 font-w500 text-nowrap">{t.asignation}</span>
									</td>
									<td>
										<LabelBtns state={t.status} />
									</td>
									<td><DropdownBlog onEdit={() => onEdit(t)} onDelete={() => onDelete(t)} /></td>
								</tr>
							))}

						</tbody>
					</table>
					<div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3">
						<div className="dataTables_info">
							Showing {activePag.current * sort + 1} to{" "}
							{data.length > (activePag.current + 1) * sort
								? (activePag.current + 1) * sort
								: data.length}{" "}
							of {data.length} entries
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default TaskTable;