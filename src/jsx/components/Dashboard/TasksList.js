import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Tab, Nav } from "react-bootstrap";
import { capitalize } from '../../../helpers';
import { connect } from 'react-redux';
import { getUserTypesAction, getUsers } from '../../../store/actions/AuthActions';
import { getTasks } from '../../../store/actions/TasksActions';
import { LabelBtns } from '../../../components/LabelBtns';
import { Loader } from '../Loader';

const buildTaskData = (taskFromApi) => {
	return {
		id: taskFromApi.id,
		name: taskFromApi.name,
		type: taskFromApi.type,
		email: taskFromApi.email,
		asigned_room: taskFromApi.asigned_room,
		asigned_to: taskFromApi.asigned_to,
		created_at: taskFromApi.created_at,
		description: taskFromApi.description,
		photo: taskFromApi.photo,
		is_completed: taskFromApi.is_completed,
		status: taskFromApi.is_completed ? "Completed" : "Pending"
	}
}

const TaskList = ({ isAdmin, user, filter, tasks, getTasks, getTaskTypes, getUsers, users, taskTypes, loadingTasks, loadingTaskTypes }) => {

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

	// GET USERS & USER-BY-ID
	React.useEffect(() => {

		getTaskTypes()
		getUsers();
	}, [])

	const buildTypeNameFromId = (id) => {
		if (taskTypes.length == 0) return "-";
		const taskType = taskTypes.find((taskType) => taskType.id == id)
		return (taskType) ? capitalize(taskType.name) : "-"
	}

	const buildNameFromAsignationId = (id) => {
		if (users.length == 0) return "-";
		const user = users.find((user) => user.id == id)
		return (user) ? capitalize(user.name) : "-"
	}

	const buildRoomFromRoomId = (id) => {
		return "-"
	}

	React.useEffect(() => {
		if (filter) {
			if (filter == "All" && isAdmin) getTasks()
			else {
				if (isAdmin) getTasks(filter);
				else if (filter != "All") getTasks(filter, user.id);
			}
		}
	}, [filter])

	const buildTabsWithTaskTypes = () => {
		if (taskTypes.length == 0) return [];
		else return [...taskTypes].map(t => ({ id: t.id, name: t.name }))
	}

	return (
		<>
			<Tab.Container activeKey={filter} defaultActiveKey={isAdmin ? "All" : ""} >
				<div className="row">
					<div className="col-xl-12">
						<div className="card roomListCard" style={{ heigth: "20px" }} >
							<div style={{ overflow: "auto" }} className="card-body p-0">
								<Tab.Content style={{ minWidth: "850px", heigth: "200px" }}>
									<Tab.Pane eventKey="All">
										<div className={"table-responsive "}>
											<div id="room_wrapper" className="dataTables_wrapper no-footer">
												<div className={"tableContainer"} style={{ width: "100%", alignItems: "center" }} >
													<div style={{ fontSize: "30px", paddingTop: "20px", paddingLeft: "20px", fontWeight: "500" }} >Tasks</div>
													<div className={"tableHeader"} style={{ display: "flex", justifyContent: "space-between", borderBottom: "3px solid #828282", color: "black", fontWeigth: "500" }}>
														<div style={{ width: "20%", justifyContent: "center", textAlign: "start", fontSize: "20px", fontWeight: "600", margin: "5px", padding: "10px 0px 10px 20px" }}>Name</div>
														<div style={{ width: "15%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Type</div>
														<div style={{ width: "15%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Assigned</div>
														<div style={{ width: "15%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Created At</div>
														<div style={{ width: "15%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Room</div>
														<div style={{ width: "20%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Status</div>
													</div>
													{!loadingTasks && !loadingTaskTypes && tasks.length ? (
														<div className={"tableBody"} style={{ padding: "10px 0px" }} >
															{tasks.map(buildTaskData).map((t, i) => {

																return (
																	<Link to={`/task/${t.id}`} key={t.id} >
																		<div className={"tableRow"} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "10px 0px", textSelect: "none" }}>
																			<div style={{ width: "20%", display: "flex", padding: "0px 0px 0px 20px", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>
																				<p style={{ marginBottom: "0px" }}>
																					{t.name}
																				</p>
																			</div>
																			<div style={{ width: "15%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>{buildTypeNameFromId(t.type)}</div>
																			<div style={{ width: "15%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>{buildNameFromAsignationId(t.asigned_to)}</div>
																			<div style={{ width: "15%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>{new Date(t.created_at).toLocaleDateString()}</div>
																			<div style={{ width: "15%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>{buildRoomFromRoomId(t.asigned_room)}</div>
																			<div style={{ width: "20%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}><LabelBtns extraClassName="m-1 w-max-content" state={t.status} /></div>
																		</div>
																	</Link>
																)
															})}
														</div>
													) : (<p className='p-1'><Loader /></p>)}
												</div>
											</div>
										</div>
									</Tab.Pane>
									{buildTabsWithTaskTypes().map(t => (
										<Tab.Pane key={t.id} eventKey={t.id}>
											<div className={"table-responsive "}>
												<div id="room_wrapper" className="dataTables_wrapper no-footer">
													<div className={"tableContainer"} style={{ width: "100%", alignItems: "center" }} >
														<div style={{ fontSize: "30px", paddingTop: "20px", paddingLeft: "20px", fontWeight: "500" }} >Tasks {t.name}</div>
														<div className={"tableHeader"} style={{ display: "flex", justifyContent: "space-between", borderBottom: "3px solid #828282", color: "black", fontWeigth: "500" }}>
															<div style={{ width: "20%", justifyContent: "center", textAlign: "start", fontSize: "20px", fontWeight: "600", margin: "5px", padding: "10px 0px 10px 20px" }}>Name</div>
															<div style={{ width: "15%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Assigned</div>
															<div style={{ width: "15%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Created At</div>
															<div style={{ width: "15%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Room</div>
															<div style={{ width: "20%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Status</div>
														</div>
														{!loadingTasks && !loadingTaskTypes && tasks.length ? (
															<div className={"tableBody"} style={{ padding: "10px 0px" }} >
																{tasks.map(buildTaskData).map((t, i) => {
																	return (
																		<Link to={`/task/${t.id}`} key={t.id} >
																			<div className={"tableRow"} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "10px 0px", textSelect: "none" }}>
																				{/* <div style={{ width: "0.00005%", display: "flex", alignItems: "center", justifyContent: "end", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>
																			</div> */}
																				<div style={{ width: "20%", display: "flex", padding: "0px 0px 0px 20px", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>
																					<p style={{ marginBottom: "0px" }}>
																						{t.name}
																					</p>
																				</div>
																				<div style={{ width: "15%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>{buildNameFromAsignationId(t.asigned_to)}</div>
																				<div style={{ width: "15%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>{new Date(t.created_at).toLocaleDateString()}</div>
																				<div style={{ width: "15%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>{buildRoomFromRoomId(t.asigned_room)}</div>
																				<div style={{ width: "20%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}><LabelBtns extraClassName="m-1 w-max-content" state={t.status} /></div>
																			</div>
																		</Link>
																	)
																})}
															</div>
														) : (<p className='p-1'><Loader /></p>)}
													</div>
												</div>
											</div>
										</Tab.Pane>
									))}
								</Tab.Content>
							</div>
						</div>
					</div>
				</div>
			</Tab.Container>
		</>
	)
}
// export { DropdownBlog };

const mapStateToProps = (state) => {
	return {
		loadingTasks: state.authData.loadingTasks,
		loadingTaskTypes: state.authData.loadingUserTypes,
		// deberia ser tasks.data pero tira reading undefined de length aunque tenga la data
		tasks: state.tasksData.tasks,
		users: state.authData.users,
		taskTypes: state.authData.userTypes,
		taskById: state.tasksData.taskById,
		user: state.authData.user,
		isAdmin: state.authData.user && state.authData.user.user_type_id == 1

	};
};

const mapDispatchToProps = {
	getTasks,
	getUsers,
	getTaskTypes: getUserTypesAction
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);







