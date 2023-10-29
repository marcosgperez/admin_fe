import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab } from "react-bootstrap";
import { connect } from 'react-redux';
import { getTaskByID, updateTaskByID, createTask } from '../../../store/actions/TasksActions';
import { getUserTypesAction, getUsers } from '../../../store/actions/AuthActions';
import { Loader } from '../Loader';
import { parseDescriptionForConversation, concatDescriptionForConversation } from "../../../helpers";

const buildTaskData = (taskFromApi) => {
    return {
        id: taskFromApi.id,
        name: taskFromApi.name,
        type: taskFromApi.type,
        asigned_room: taskFromApi.asigned_room,
        asigned_to: taskFromApi.asigned_to,
        created_at: taskFromApi.created_at,
        description: taskFromApi.description,
        photo: taskFromApi.photo,
        is_completed: taskFromApi.is_completed,
        status: taskFromApi.is_completed ? "Completed" : "Pending"
    }
}

const TaskfById = ({
    user,
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
        asigned_room: 1,
        asigned_to: 1,
        created_at: new Date().toLocaleDateString(),
        description: "",
        photo: "",
        status: "Pending",
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
        if (_id != "new-task") {
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
        if (isUpdating && !loadingTaskById) navigate("/tasks")
    }, [loadingTaskById])

    const addPersonToDescription = (str) => {
        return `${user.name} ${user.surname}:\n${str}`
    } 
    const sendForm = () => {
        setIsUpdating(true)
        const newInfoTask = { ...infoTask }
        delete newInfoTask.created_at;
        newInfoTask.type = String(newInfoTask.type)
        newInfoTask.is_completed = newInfoTask.status === "Completed" ? 1 : 0;
        delete newInfoTask.status;
        const [conversation, _description] = parseDescriptionForConversation(infoTask.description)
        newInfoTask.description = concatDescriptionForConversation(conversation, addPersonToDescription(newInfoTask.newDescription))
        delete newInfoTask.newDescription;

        if (infoTask.id) updateTaskByID(newInfoTask)
        else createTask(newInfoTask)
    }
    const checkIfDisabled = () => {
        let disabled = true;
        if (
            infoTask.name && 
            infoTask.status && 
            infoTask.type && 
            infoTask.asigned_room && 
            infoTask.asigned_to 
            ) disabled = false;
        return disabled

    }
    const [status, setStatus] = useState(["Completed", "Pending"])

    const [conversation, _description] = parseDescriptionForConversation(infoTask.description)

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
                                                        {conversation.map(c => (
                                                            <div className='row formRow' >
                                                                <p>{c}</p>
                                                            </div>
                                                        ))}
                                                        <textarea
                                                            defaultValue={_description}
                                                            className='formTextArea'
                                                            onChange={(e) => changeFormProp("newDescription", e.target.value)}
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
        users: state.authData.users,
        user: state.authData.user
    };
};

const mapDispatchToProps = {
    getTaskByID,
    getTaskTypes: getUserTypesAction,
    updateTaskByID,
    createTask,
    getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskfById);
