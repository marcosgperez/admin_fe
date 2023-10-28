import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Tab, Nav } from "react-bootstrap";

import { connect } from 'react-redux';
import { getUsers, getUserTypesAction } from '../../../store/actions/AuthActions';
import { LabelBtns } from '../../../components/LabelBtns';
import { Loader } from '../Loader';

const buildUserData = (userFromAPI) => {
	return {
		id: userFromAPI.id,
		name: userFromAPI.name,
		user_type_id: userFromAPI.user_type_id,
		email: userFromAPI.email,
		days: "-",
		hours: "-",
		contact: "-",
		status: "Active"
	}
}

const StaffList = ({ users, getUsers, getUserTypes, userTypes, loadingUsers, loadingUserTypes }) => {

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
		getUsers()
		getUserTypes()
	}, [])

	const buildTypeNameFromId = (id) => {
		if(userTypes.length == 0) return "-";
		const userType = userTypes.find((userType) => userType.id == id)
		return userType.name
	}

	return (
		<>
			<Tab.Container defaultActiveKey="All" >
				<div className="row">
					<div className='buttonContainer' >
						<Link to={"/staff/new-staff"} className='w-max-content'>
							+ New Employee
						</Link>
					</div>
					<div className="col-xl-12">
						<div className="card roomListCard" style={{ heigth: "20px" }} >
							<div style={{ overflow: "auto" }} className="card-body p-0">
								<Tab.Content style={{ minWidth: "850px", heigth: "200px" }}>
									<Tab.Pane eventKey="All">
										<div className={"table-responsive "}>
											<div id="room_wrapper" className="dataTables_wrapper no-footer">
												<div className={"tableContainer"} style={{ width: "100%", alignItems: "center" }} >
													<div style={{ fontSize: "30px", paddingTop: "20px", paddingLeft: "20px", fontWeight: "500" }} >Staff</div>
													<div className={"tableHeader"} style={{ display: "flex", justifyContent: "space-between", borderBottom: "3px solid #828282", color: "black", fontWeigth: "500" }}>
														<div style={{ width: "20%", justifyContent: "center", textAlign: "start", fontSize: "20px", fontWeight: "600", margin: "5px", padding: "10px 0px 10px 20px" }}>Name</div>
														<div style={{ width: "30%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Job Description</div>
														<div style={{ width: "30%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Contact</div>
														<div style={{ width: "20%", justifyContent: "center", textAlign: "start", fontSize: "20px", padding: "10px 0px", fontWeight: "600", margin: "5px" }}>Status</div>
													</div>
													{!loadingUsers && !loadingUserTypes && users.length ? (
														<div className={"tableBody"} style={{ padding: "10px 0px" }} >
															{users.map(buildUserData).map((t, i) => {
																return (
																	<Link to={`/staff/${t.id}`} key={t.id} >
																		<div className={"tableRow"} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "10px 0px", textSelect: "none" }}>
																			{/* <div style={{ width: "0.00005%", display: "flex", alignItems: "center", justifyContent: "end", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>
																			</div> */}
																			<div style={{ width: "20%", display: "flex", padding: "0px 0px 0px 20px", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>
																				<p style={{ marginBottom: "0px" }}>
																					{t.name}
																				</p>
																			</div>
																			<div style={{ width: "30%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>{buildTypeNameFromId(t.user_type_id)}</div>
																			<div style={{ width: "30%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>{t.email}</div>
																			<div style={{ width: "20%", display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}><LabelBtns extraClassName="m-1 w-max-content" state={t.status}/></div>
																		</div>
																	</Link>
																)
															})}
														</div>
													): (<p className='p-1'><Loader /></p>)}
												</div>
											</div>
										</div>
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
// export { DropdownBlog };

const mapStateToProps = (state) => {
	return {
		loadingUsers: state.authData.loadingUsers,
		loadingUserTypes: state.authData.loadingUserTypes,
		users: state.authData.users,
		userTypes: state.authData.userTypes,
		userById: state.authData.userByID
	};
};

const mapDispatchToProps = {
	getUsers,
	getUserTypes: getUserTypesAction
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffList);







