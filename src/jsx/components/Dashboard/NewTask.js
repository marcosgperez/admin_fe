import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab } from "react-bootstrap";
import { connect } from 'react-redux';
import { getTaskByID, updateTaskByID, createTask, getTasks } from '../../../store/actions/TasksActions';
import { getUserTypesAction, getUsers } from '../../../store/actions/AuthActions';
import { getRoomsAction, getRoomsTypesAction } from '../../../store/actions/RoomsActions';
import { Loader } from '../Loader';
import { parseDescriptionForConversation, concatDescriptionForConversation } from "../../../helpers";


const ITEMS = [
    { id: 0, name: "Item 1" },
    { id: 1, name: "Item 2" },
    { id: 2, name: "algo 3" },
    { id: 3, name: "algo 4" },
    { id: 4, name: "Item 5" },
    { id: 5, name: "Item 6" },
    { id: 6, name: "Item 7" },
    { id: 7, name: "Item 8" }
]

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

const TaskById = ({
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
    getRoomsAction,
    getRoomsTypesAction,
    rooms,
    roomTypes
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
    const [id, setId] = React.useState(undefined)
    const [isNew, setIsNew] = React.useState(true)
    const [status, setStatus] = useState(["Completed", "Pending"])
    const [isUpdating, setIsUpdating] = React.useState(false)

    const changeFormProp = (prop, value) => {
        console.log("cambio combo", prop, value)
        setInfoTask({ ...infoTask, [prop]: value })
    }
    const addPersonToDescription = (str) => {
        return `${user.name} ${user.surname}:\n${str}`
    }
    const sendForm = () => {
        setIsUpdating(true)
        const newInfoTask = { ...infoTask }
        console.log(newInfoTask.asigned_room, "ACA ESTA EL ASIGNED ROOM ENVIADO EN EL FORM")
        delete newInfoTask.created_at;
        newInfoTask.type = String(newInfoTask.type)
        newInfoTask.is_completed = newInfoTask.status === "Completed" ? 1 : 0;
        delete newInfoTask.status;
        const [conversation, _description] = parseDescriptionForConversation(infoTask.description)
        newInfoTask.description = concatDescriptionForConversation(conversation, addPersonToDescription(newInfoTask.newDescription))
        delete newInfoTask.newDescription;
        console.log(infoTask, "from send form")

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
    const [conversation, _description] = parseDescriptionForConversation(infoTask.description)

    React.useEffect(() => {
        const splitedPathname = location.pathname.split("/")
        const _id = splitedPathname[splitedPathname.length - 1];
        if (_id != "new-task") {
            setId(_id)
            setIsNew(false)
        }
        else setIsNew(true)
    }, [location])

    React.useEffect(() => {
        if (id) getTaskByID(id)
        console.log(getTaskByID(id), "get task by id")
    }, [id])

    React.useEffect(() => {

        console.log(infoTask.asigned_room, "cambio infotask")
    }, [infoTask.asigned_room])

    React.useEffect(() => {
        getTaskTypes()
        getUsers()
        getRoomsAction()
        getRoomsTypesAction()
    }, [])

    React.useEffect(() => {
        if (taskById && !loadingTaskById && !isNew) setInfoTask(buildTaskData({ ...taskById }))
        console.log(taskById, "ACA ESTA LA TASK BY ID")
        console.log(infoTask, "INFO TASK SETEADA")
    }, [taskById, loadingTaskById])

    React.useEffect(() => {
        if (taskById && !loadingTaskById && !isNew) setInfoTask(buildTaskData({ ...taskById }))
    }, [])

    React.useEffect(() => {
        if (isUpdating && !loadingTaskById) navigate("/tasks")
    }, [loadingTaskById])

    // const test = (e) => {
    //     changeFormProp("type", Number(e.target.value))
    //     console.log(e.target.value)
    // }
    console.log(taskById, "task by id")
    return (
        <>
            <Tab.Container defaultActiveKey="All" >
                <div className="row form">
                    <div className="col-xl-12">
                        <div className="customCard booking" style={{ heigth: "20px" }} >
                            <div style={{ overflow: "auto" }} className="card-body p-3">
                                <div className="table-responsive overflow-x-hidden">
                                    <div className="dataTables_wrapper no-footer">
                                        {(loadingTaskById || !rooms || !infoTask) ? (<Loader />) : (
                                            <div className={"tableContainer"} style={{ width: "100%", alignItems: "center" }} >
                                                <div className="basic-form">
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                        <div className='row formRow' >
                                                            <div className='taskInputs inputs'>
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
                                                                    <div className=''>
                                                                        <p>Room</p>
                                                                        <ComboSelector onChange={(e) => changeFormProp("asigned_room", Number(e))} defaultValue={taskById ? taskById.asigned_room : null} items={rooms} />
                                                                        {/* <select
                                                                            value={infoTask.asigned_room !== undefined ? infoTask.asigned_room : ""}
                                                                            className="form-control form-control-lg"
                                                                            // onChange={console.log(e.target.value, "ROOM ID")}
                                                                            onChange={(e) => changeFormProp("asigned_room", e.target.value)}
                                                                        >
                                                                            {rooms.map(u => (
                                                                                <option value={u.id} key={u.id}>{u.name}</option>
                                                                            ))}
                                                                        </select> */}
                                                                    </div>
                                                                    {/* <div className=''>
                                                                        <p>ALgo COmboSelector de juani</p>
                                                                        <ComboSelector onChange={(e) => console.log(e)} defaultValue={3} items={ITEMS} />
                                                                    </div> */}
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="mb-3 d-none">
                                                            <input className="form-control" type="file" id="formFile" />
                                                        </div>
                                                        <div className='convoContainer'>
                                                            {conversation.map(c => (
                                                                <div className='row formRow' >
                                                                    <p>{c}</p>
                                                                </div>
                                                            ))}
                                                        </div>
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
    console.log("rootState", state)
    return {
        loadingTaskById: state.tasksData.loadingTaskById,
        loadingTaskTypes: state.authData.loadingUserTypes,
        taskById: state.tasksData.taskByID,
        taskTypes: state.authData.userTypes,
        users: state.authData.users,
        user: state.authData.user,
        rooms: state.roomsData.rooms,
        roomTypes: state.roomsData.roomsTypes

    };
};

const mapDispatchToProps = {
    getTaskByID,
    getTaskTypes: getUserTypesAction,
    updateTaskByID,
    createTask,
    getUsers,
    getRoomsAction,
    getRoomsTypesAction
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskById);


export const ComboSelector = ({ onChange, items, defaultValue }) => {
    const [active, setActive] = React.useState(false)
    const [activeItem, setActiveItem] = React.useState(defaultValue)
    const [filter, setFilter] = React.useState(undefined)
    console.log(items, "items from combo")
    const grabItemSelected = () => {
        const itemsFiltered = items.filter(i => i.id == activeItem)
        if (itemsFiltered.length == undefined) {
            return "no items"
        }
        else {
            console.log(itemsFiltered, "itemsFiltered")
            return itemsFiltered[0].name
        }
    }
    const haveDefaultValue = !(activeItem == undefined)
    const filterQuery = (item) => {
        if (!filter) return true
        else return item.name.toLowerCase().includes(filter.toLowerCase())
    }

    return (
        <div className={`ComboSelector ${active ? "active" : ""}`}>
            {/* issue aca */}
            <div className='value' onClick={() => setActive(true)}>
                {active ? (
                    <input className='testing' type='text' defaultValue={haveDefaultValue ? grabItemSelected() : ""} onChange={(e) => setFilter(e.target.value)} />
                ) : (
                    haveDefaultValue ? grabItemSelected() : "Please select an item"
                )}
            </div>
            {/* issue aca */}

            <div className='options'>
                {items.filter(filterQuery).map(i => (
                    <div className='option' key={i.id} onClick={() => {
                        onChange(i.id)
                        setActiveItem(i.id)
                        setActive(false)
                    }}>
                        {i.name}
                    </div>
                ))}
            </div>
        </div>
    )

}