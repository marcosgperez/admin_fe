import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab } from "react-bootstrap";
import { connect } from 'react-redux';
import { getTaskByID, updateTaskByID, createTask } from '../../../store/actions/TasksActions';
import { getUserTypesAction, getUsers } from '../../../store/actions/AuthActions';
import { Loader } from '../Loader';


const buildTaskData = (taskFromApi) => {
    console.log("taskFromApi", taskFromApi)
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

const StaffById = ({
    getTaskByID,
    getUsers,
    users,
    taskTypes,
    updateTaskByID,
    taskById,
    loadingTaskById,
    createTask,
    getTaskTypes,
}) => {
    const location = useLocation();
    let navigate = useNavigate();

    const [infoTask, setInfoTask] = React.useState({
        id: "",
        name: "",
        type: 1,
        email: "",
        asigned_room: "",
        asigned_to: "",
        created_at: new Date().toLocaleDateString(),
        description: "",
        photo: "",
        is_completed: "Pending",
        status: "",
    })
    const [id, setId] = React.useState()
    const [isNew, setIsNew] = React.useState(true)

    const [isUpdating, setIsUpdating] = React.useState(false)

    const changeFormProp = (prop, value) => {
        setInfoTask({ ...infoTask, [prop]: value })
    }

    useEffect(() => {
        const splitedPathname = location.pathname.split("/")
        const _id = splitedPathname[splitedPathname.length - 1];
        if (_id != "new-staff") {
            setId(_id)
            setIsNew(false)
        }
        else setIsNew(true)

    }, [location])

    useEffect(() => {
        if (id) getTaskByID(id)
    }, [id])

    useEffect(() => {
        getTaskTypes()
        getUsers()
    }, [])

    // Active pagginarion

    React.useEffect(() => {
        if (taskById && !loadingTaskById && !isNew) setInfoTask(buildTaskData({ ...taskById }))
    }, [taskById, loadingTaskById])

    React.useEffect(() => {
        if (isUpdating && !loadingTaskById) navigate("/staff")
    }, [loadingTaskById])

    const sendForm = () => {
        setIsUpdating(true)
        const newInfoTask = { ...infoTask }
        delete newInfoTask.created_at;

        const userType = taskTypes.find(u => u.id == newInfoTask.user_type_id)
        newInfoTask.user_type = userType.name
        delete newInfoTask.user_type_id

        if (infoTask.id) updateTaskByID(newInfoTask)
        else createTask(newInfoTask)
    }
    const checkIfDisabled = () => {
        let disabled = true;
        if (infoTask.name && infoTask.surname && infoTask.username && infoTask.user_type_id && infoTask.email && (!isNew || infoTask.password)) disabled = false;
        return disabled
    }
    const [status, setStatus] = useState(["Completed", "Pending"])
    return (
        <>
            <Tab.Container defaultActiveKey="All" >
                <div className="row form">
                    <div className="col-xl-12">
                        <div className="customCard booking" style={{ heigth: "20px" }} >
                            <div style={{ overflow: "auto" }} className="card-body p-3">
                                <div className="table-responsive overflow-x-hidden">
                                    <div className="dataTables_wrapper no-footer">
                                        {(loadingTaskById) ? (<Loader />) : (
                                            <div className={"tableContainer"} style={{ width: "100%", alignItems: "center" }} >
                                                <div className="basic-form">
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                        <div className='row formRow' >
                                                            <div className=' inputs'>
                                                                <div className='right'>
                                                                    <div>
                                                                        <p>Name</p>
                                                                        <input value={infoTask.name} onChange={(e) => changeFormProp("name", e.target.value)} />
                                                                    </div>
                                                                    <div className=''>
                                                                        <p>Status</p>
                                                                        <select
                                                                            value={infoTask.status}
                                                                            className="form-control form-control-lg"
                                                                            onChange={(e) => changeFormProp("status", (e.target.value))}
                                                                        >
                                                                            {status.map(u => (
                                                                                <option value={u.id} key={u.id}>{u}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>

                                                                    <div className=''>
                                                                        <p>Assigned To</p>
                                                                        <select
                                                                            value={infoTask.asigned_to}
                                                                            className="form-control form-control-lg"
                                                                            onChange={(e) => changeFormProp("asigned_to", Number(e.target.value))}
                                                                        >
                                                                            {users.map(u => (
                                                                                <option value={u.id} key={u.id}>{u.name}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className='left' >
                                                                    <div>
                                                                        <p>Creation Date</p>
                                                                        <input value={new Date(infoTask.created_at).toLocaleDateString()} disabled="true" />
                                                                    </div>
                                                                    <div className=''>
                                                                        <p>Type</p>
                                                                        <select
                                                                            value={infoTask.type}
                                                                            className="form-control form-control-lg"
                                                                            onChange={(e) => changeFormProp("type", Number(e.target.value))}
                                                                        >
                                                                            {taskTypes.map(u => (
                                                                                <option value={u.id} key={u.id}>{u.name}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="mb-3 d-none">
                                                            <input className="form-control" type="file" id="formFile" />
                                                        </div>
                                                        <textarea
                                                            value={infoTask.description}
                                                            className='formTextArea'
                                                            onChange={(e) => changeFormProp("description", e.target.value)}
                                                            rows="8"
                                                            id="comment"
                                                        ></textarea>
                                                        <div className="col-12">
                                                            <div className='saveContainer mt-2' >
                                                                <button className={checkIfDisabled() ? "disabled" : ""} disabled={checkIfDisabled()} type="button" onClick={sendForm}>Save</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </Tab.Container >
        </>
    )
}


const mapStateToProps = (state) => {
    console.log(state, "state PAAA")
    return {
        loadingTaskById: state.tasksData.loadingTaskById,
        loadingTaskTypes: state.authData.loadingUserTypes,
        taskById: state.tasksData.taskByID,
        taskTypes: state.authData.userTypes,
        users: state.authData.users
    };
};

const mapDispatchToProps = {
    getTaskByID,
    getTaskTypes: getUserTypesAction,
    updateTaskByID,
    createTask,
    getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffById);
