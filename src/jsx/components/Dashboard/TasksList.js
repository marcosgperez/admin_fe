import React, { useState, useRef, useEffect } from 'react';
import { Link, json } from 'react-router-dom';
import { Dropdown, Tab, Nav } from "react-bootstrap";
import { capitalize } from '../../../helpers';
import { connect } from 'react-redux';
import { getUserTypesAction, getUsers } from '../../../store/actions/AuthActions';
import { getTasks } from '../../../store/actions/TasksActions';
import { LabelBtns } from '../../../components/LabelBtns';
import { Loader } from '../Loader';
import SeacrhBar from './SearchBar';
import { getRoomsAction } from '../../../store/actions/RoomsActions';
import Glide from '@glidejs/glide'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

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

const TaskList = ({ isAdmin, user, filter, tasks, getTasks, getTaskTypes, rooms, getRooms, getUsers, users, taskTypes, loadingTasks, loadingTaskTypes }) => {
	const [taskList, setTaskList] = useState([])
	const [searcher, setSearcher] = useState("")

	// GET USERS & USER-BY-ID
	React.useEffect(() => {
		getUsers();
		getRooms();
	}, [])

	React.useEffect(() => {
		console.log("Que entro aca task",tasks)
		setTaskList(tasks)
	}, [tasks])


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
		if (rooms.length == 0) return "-";
		const room = rooms.find((room) => room.id == id)
		return (room) ? capitalize(room.name) : "-"
	}

	const buildTabsWithTaskTypes = () => {
		if (taskTypes.length == 0) return [];
		else return [...taskTypes].map(t => ({ id: t.id, name: t.name }))
	}

	const filterSearch = (task) => {
		if (searcher == "") return true;
		else {
			const name = task.name.toLowerCase();
			const status = task.status.toLowerCase();
			const type = buildTypeNameFromId(task.type).toLowerCase();
			const room = buildRoomFromRoomId(task.asigned_room).toLowerCase();
			const assigned = buildNameFromAsignationId(task.asigned_to).toLowerCase();
			const created = new Date(task.created_at).toLocaleDateString().toLowerCase();
			const search = searcher.toLowerCase();
			return (name.includes(search) || status.includes(search) || type.includes(search) || room.includes(search) || assigned.includes(search) || created.includes(search))
		}
	}
	React.useEffect(() => {
		console.log("QUE ENTRO ACA?", isAdmin, filter)
		if (filter) {
			if (filter == "All" && isAdmin) getTasks()
			else {
				if (isAdmin) getTasks(filter);
				else if (filter != "All") getTasks(undefined, user.id);
			}
		}
	}, [filter, user])

	const DesktopAllTable = (
		<div className={"table-responsive "}>
			<div id="room_wrapper" className="dataTables_wrapper no-footer">
				<div className={"tableContainer"} style={{ width: "100%", alignItems: "center" }} >
					<div className='d-flex align-items-center justify-content-between'>
						<div style={{ fontSize: "30px", paddingTop: "20px", paddingLeft: "20px", fontWeight: "500" }} >
							<legend>({loadingTasks ? "-" : taskList.map(buildTaskData).filter(filterSearch).length})</legend>
							Tasks
						</div>
						<div className='searcher pe-2' >
							<input className='gesto-input' type='text' value={searcher} onChange={(e) => setSearcher(e.target.value)} />
						</div>
					</div>

					<div className={"tableHeader"} style={{ display: "flex", justifyContent: "space-between", borderBottom: "3px solid #828282", color: "black", fontWeigth: "500" }}>
						<div style={{ width: "20%", justifyContent: "center", textAlign: "start", fontSize: "20px", fontWeight: "600", margin: "5px", padding: "10px 0px 10px 20px" }}>Name</div>
						<div style={{ width: "15%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Type</div>
						<div style={{ width: "20%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Status</div>
						<div style={{ width: "15%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Room</div>
						<div style={{ width: "15%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Assigned</div>
						<div style={{ width: "15%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Created At</div>
					</div>
					{!loadingTasks && !loadingTaskTypes && tasks.length ? (
						<div className={"tableBody"} style={{ padding: "10px 0px" }}  >
							{taskList.map(buildTaskData).filter(filterSearch).map((t, i) => {
								return (
									<Link to={`/task/${t.id}`} key={t.id} >
										<div className={"tableRow"} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "10px 0px", textSelect: "none" }}>
											<div className="text-no-scape" style={{ width: "20%", display: "flex", padding: "0px 0px 0px 20px", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>
												<p style={{ marginBottom: "0px" }}>
													{t.name}
												</p>
											</div>
											<div className="text-no-scape" style={{ width: "15%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}><p>{buildTypeNameFromId(t.type)}</p></div>
											<div className="text-no-scape" style={{ width: "20%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}><LabelBtns extraClassName="m-1 w-max-content" state={t.status} /></div>
											<div className="text-no-scape" style={{ width: "15%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}><p>{buildRoomFromRoomId(t.asigned_room)}</p></div>
											<div className="text-no-scape" style={{ width: "15%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}><p>{buildNameFromAsignationId(t.asigned_to)}</p></div>
											<div className="text-no-scape" style={{ width: "15%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}><p>{new Date(t.created_at).toLocaleDateString()}</p></div>
										</div>
									</Link>
								)
							})}
						</div>
					) : (<p className='p-1'><Loader /></p>)}
				</div>
			</div>
		</div>
	)

	const MobileAllCards = (
		<div className='Task-Card-Holder'>
			{!loadingTasks && !loadingTaskTypes && tasks.length ? (
				<div className="slider" style={{ padding: "10px 0px" }} >
					<div data-glide-el="track" className="track">
						<div className='slides w-100 text-center'>
							<Carousel showArrows={true} showIndicators={false} centerMode={true} swipeable={true}>
								{taskList.map(buildTaskData).filter(filterSearch).map((t, i) => {
									return (
										<div className={"card slide"} key={`MobileAllCards-${i}`}>
											<div className={"card-body d-flex flex-column align-items-center"} >
												<div className="text-no-scape"><LabelBtns extraClassName="m-1 w-max-content" state={t.status} /></div>
												<label className='mt-2 mb-1'><b>Name</b></label>
												<div className="text-no-scape"><p style={{ marginBottom: "0px" }}>{t.name}</p></div>
												<label className='mt-2 mb-1'><b>Created At</b></label>
												<div className="text-no-scape"><p>{new Date(t.created_at).toLocaleDateString()}</p></div>
												<label className='mt-2 mb-1'><b>Type</b></label>
												<div className="text-no-scape"><p>{buildTypeNameFromId(t.type)}</p></div>
												<label className='mt-2 mb-1'><b>Room</b></label>
												<div className="text-no-scape"><p>{buildRoomFromRoomId(t.asigned_room)}</p></div>
												<label className='mt-2 mb-1'><b>Assigned</b></label>
												<div className="text-no-scape"><p>{buildNameFromAsignationId(t.asigned_to)}</p></div>
												<Link to={`/task/${t.id}`} key={t.id} >
													<div className='label-button'>
														<p>Go to task</p>
													</div>
												</Link>
											</div>
										</div>
									)
								})}
							</Carousel>
						</div>
					</div>
				</div>
			) : (<p className='p-1'><Loader /></p>)}
		</div>
	);
	const DesktopTable = (t) => (
		<div className={"table-responsive "}>
			<div id="room_wrapper" className="dataTables_wrapper no-footer">
				<div className={"tableContainer"} style={{ width: "100%", alignItems: "center" }} >
					<div className='d-flex align-items-center justify-content-between'>
						<div style={{ fontSize: "30px", paddingTop: "20px", paddingLeft: "20px", fontWeight: "500" }} >
							<legend>({loadingTasks ? "-" : tasks.map(buildTaskData).filter(filterSearch).length})</legend>
							Tasks {t.name}
						</div>
						<div className='searcher pe-2' >
							<input className='gesto-input' type='text' value={searcher} onChange={(e) => setSearcher(e.target.value)} />
						</div>
					</div>

					<div className={"tableHeader"} style={{ display: "flex", justifyContent: "space-between", borderBottom: "3px solid #828282", color: "black", fontWeigth: "500" }}>
						<div style={{ width: "20%", justifyContent: "center", textAlign: "start", fontSize: "20px", fontWeight: "600", margin: "5px", padding: "10px 0px 10px 20px" }}>Name</div>
						<div style={{ width: "20%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Status</div>
						<div style={{ width: "15%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Room</div>
						<div style={{ width: "15%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Assigned</div>
						<div style={{ width: "15%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Created At</div>
					</div>
					{!loadingTasks && !loadingTaskTypes && tasks.length ? (
						<div className={"tableBody"} style={{ padding: "10px 0px" }} >
							{tasks.map(buildTaskData).filter(filterSearch).map((t, i) => {
								return (
									<Link to={`/task/${t.id}`} key={t.id} >
										<div className={"tableRow"} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "10px 0px", textSelect: "none" }}>
											{/* <div style={{ width: "0.00005%", display: "flex", alignItems: "center", justifyContent: "end", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>
																			</div> */}
											<div className="text-no-scape" style={{ width: "20%", display: "flex", padding: "0px 0px 0px 20px", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>
												<p style={{ marginBottom: "0px" }}>
													{t.name}
												</p>
											</div>
											<div className="text-no-scape" style={{ width: "20%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}><LabelBtns extraClassName="m-1 w-max-content" state={t.status} /></div>
											<div className="text-no-scape" style={{ width: "15%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}><p>{buildRoomFromRoomId(t.asigned_room)}</p></div>
											<div className="text-no-scape" style={{ width: "15%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}><p>{buildNameFromAsignationId(t.asigned_to)}</p></div>
											<div className="text-no-scape" style={{ width: "15%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}><p>{new Date(t.created_at).toLocaleDateString()}</p></div>
										</div>
									</Link>
								)
							})}
						</div>
					) : (<p className='p-1'><Loader /></p>)}
				</div>
			</div>
		</div>
	)

	const MobileCards = (table) => (
		<div className='Task-Card-Holder'>
			{!loadingTasks && !loadingTaskTypes && tasks.length ? (
				<div className="slider" style={{ padding: "10px 0px" }} >
					<div className="track">
						<div className='slides'>

						<Carousel showArrows={true} showIndicators={false} centerMode={true} swipeable={true}>
							{tasks.map(buildTaskData).filter(filterSearch).map((t, i) => {
								return (
									<div className={"card slide"} key={`MobileAllCards-${table.id}-${i}`}>
										<div className={"card-body d-flex flex-column align-items-center"} >
											<div className="text-no-scape"><LabelBtns extraClassName="m-1 w-max-content" state={t.status} /></div>
											<label className='mt-2 mb-1'><b>Name</b></label>
											<div className="text-no-scape"><p style={{ marginBottom: "0px" }}>{t.name}</p></div>
											<label className='mt-2 mb-1'><b>Created At</b></label>
											<div className="text-no-scape"><p>{new Date(t.created_at).toLocaleDateString()}</p></div>
											<label className='mt-2 mb-1'><b>Type</b></label>
											<div className="text-no-scape"><p>{buildTypeNameFromId(t.type)}</p></div>
											<label className='mt-2 mb-1'><b>Room</b></label>
											<div className="text-no-scape"><p>{buildRoomFromRoomId(t.asigned_room)}</p></div>
											<label className='mt-2 mb-1'><b>Assigned</b></label>
											<div className="text-no-scape"><p>{buildNameFromAsignationId(t.asigned_to)}</p></div>
											<Link to={`/task/${t.id}`} key={t.id} >
												<div className='label-button'>
													<p>Go to task</p>
												</div>
											</Link>
										</div>
									</div>
								)
							})}
						</Carousel>
					</div>
				</div>
				</div>
	) : (<p className='p-1'><Loader /></p>)
}
		</div >
	);

return (
	<>
		<Tab.Container activeKey={filter} defaultActiveKey={isAdmin ? "All" : ""} >
			<div className="row Tasks">
				<div className="col-xl-12">
					<div className='d-none d-md-flex'>
						<div className={`card roomListCard`} style={{ heigth: "20px" }} >
							<div style={{ overflow: "auto" }} className="card-body p-0">
								<Tab.Content style={{ minWidth: "850px", heigth: "200px" }}>
									<Tab.Pane eventKey="All">
										<div className='d-none d-md-block w-100'>
											{DesktopAllTable}
										</div>
									</Tab.Pane>
									{buildTabsWithTaskTypes().map(t => (
										<Tab.Pane key={t.id} eventKey={t.id}>
											<div className='d-none d-md-block w-100'>
												{DesktopTable(t)}
											</div>
										</Tab.Pane>
									))}
								</Tab.Content>
							</div>
						</div>

					</div>
					<div className='d-flex d-md-none'>
						<div className={`roomListCard`} style={{ heigth: "20px" }} >
							<div style={{ overflow: "auto" }} className="card-body p-0">
								<Tab.Content style={{ minWidth: "0", heigth: "200px" }}>
									<Tab.Pane eventKey="All">
										<div className='d-block d-md-none w-100'>
											{MobileAllCards}
										</div>
									</Tab.Pane>
									{buildTabsWithTaskTypes().map(t => (
										<Tab.Pane key={t.id} eventKey={t.id}>
											<div className='d-block d-md-none w-100'>
												{MobileCards(t)}
											</div>
										</Tab.Pane>
									))}
								</Tab.Content>
							</div>
						</div>

					</div>
				</div>
			</div>
		</Tab.Container>

		{/* <div id="mobileTaskList" className="carousel slide" data-bs-ride="carousel">
				<div className="carousel-inner">
					{!loadingTasks && !loadingTaskTypes && taskList.length ? (
						<div className={"tableBody"} style={{ padding: "10px 0px" }} >
							{taskList.map(buildTaskData).map((t, i) => {
								return (
									<div className='carousel-item' style={{ height: "50px" }}>
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
									</div>
								)
							})}
						</div>
					) : (<p className='p-1'><Loader /></p>)}
				</div>
				<button style={{ backgroundColor: "red" }} className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button style={{ backgroundColor: "red" }} className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div> */}
	</>
)
}
// export { DropdownBlog };

const mapStateToProps = (state) => {
	console.log("que entro aca statee", state.tasksData)
	return {

		loadingTasks: state.tasksData.loadingTasks,
		tasks: state.tasksData.tasks,

		rooms: state.roomsData.rooms,

		loadingTaskTypes: state.authData.loadingUserTypes,
		taskTypes: state.authData.userTypes,

		users: state.authData.users,
		user: state.authData.user,
		isAdmin: state.authData.user && state.authData.user.user_type_id == 1

	};
};

const mapDispatchToProps = {
	getTasks,
	getUsers,
	getTaskTypes: getUserTypesAction,
	getRooms: getRoomsAction
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);







