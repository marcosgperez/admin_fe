import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Dropdown, Tab, Nav } from 'react-bootstrap';
import room4 from './../../../images/room/room4.jpg';
import TasksTable from './TasksTable';

import { getTasksAction } from '../../../store/actions/TasksActions';

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

const builTaskData = (taskFromAPI) => {
	return {
		id: taskFromAPI.id,
		name: taskFromAPI.name,
		job: "Administrator",
		email: taskFromAPI.email,
		days: "-",
		hours: "-",
		contact: "-",
		status: "Active"
	}
}


const TasksList = ({ filter }) => {

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
			<Tab.Container activeKey={filter} defaultActiveKey={"All"}>
				<div className="row">
					<div className="col-xl-12">
						<div className="card">
							<div className="card-body p-0">
								<Tab.Content>
									<Tab.Pane eventKey="All" style={{ width: "100%", overflow: "auto" }}>
										<TasksTable items={[{}]} />
									</Tab.Pane>
									<Tab.Pane eventKey="HouseKeeping" style={{ width: "100%", overflow: "auto" }}>
										<TasksTable items={[{}, {}, {}, {}]} />
									</Tab.Pane>
									<Tab.Pane eventKey="Maintainance" style={{ width: "100%", overflow: "auto" }}>
										<TasksTable items={[{}, {}]} />
									</Tab.Pane>
									<Tab.Pane eventKey="Other">
										<div><p className='p-2 mb-2 ms-2'>Pending...</p></div>
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
export default TasksList;