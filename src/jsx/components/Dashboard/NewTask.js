import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab } from "react-bootstrap";
import { connect } from 'react-redux';
import { getTaskByID, updateTaskByID, createTask } from '../../../store/actions/TasksActions';
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
    console.log(taskFromApi, "LALALALA")
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

    const [_rooms, set_Rooms] = useState([{ id: 4, name: "test" }])
    const [infoTask, setInfoTask] = React.useState({
        id: "",
        name: "",
        type: 1,
        asigned_room: 3,
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
        setInfoTask({ ...infoTask, [prop]: value })
    }
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
    }, [id])

    React.useEffect(() => {
        getTaskTypes()
        getUsers()
        getRoomsAction()
        getRoomsTypesAction()
        set_Rooms(rooms)
    }, [])

    React.useEffect(() => {
        set_Rooms(rooms)
        console.log("SETEAMOS LOS ROOMS EN USE STATE", _rooms)
    }, [rooms])


    // React.useEffect(() => {
    //     if (taskById && !loadingTaskById && !isNew) setInfoTask(buildTaskData({ ...taskById }))
    // }, [taskById, loadingTaskById])

    // React.useEffect(() => {
    //     if (taskById && !loadingTaskById && !isNew) setInfoTask(buildTaskData({ ...taskById }))
    // }, [])

    // React.useEffect(() => {
    //     if (isUpdating && !loadingTaskById) navigate("/tasks")
    // }, [loadingTaskById])

    React.useEffect(() => {
        console.log(rooms, "ROOMS DE LA API")
    }, [rooms])

    // const test = (e) => {
    //     changeFormProp("type", Number(e.target.value))
    //     console.log(e.target.value)
    // }

    return (
        <>
            <Tab.Container defaultActiveKey="All" >
                <div className="row form">
                    <div className="col-xl-12">
                        <div className="customCard booking" style={{ heigth: "20px" }} >
                            <div style={{ overflow: "auto" }} className="card-body p-3">
                                <div className="table-responsive overflow-x-hidden">
                                    <div className="dataTables_wrapper no-footer">
                                        {(loadingTaskById || !rooms) ? (<Loader />) : (
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
                                                                        <ComboSelector onChange={(e) => console.log(e, "parametro e de combo sleector")} defaultValue={infoTask.asigned_room} items={_rooms} />
                                                                        {/* <select
                                                                            value={infoTask.asigned_room !== undefined ? infoTask.asigned_room : ""}
                                                                            className="form-control form-control-lg"
                                                                            onChange={console.log(e.target.value, "ROOM ID")}
                                                                        onChange={(e) => }
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
    // console.log(state, "state PAAA")
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
    console.log(items, "ITEMS entra en COMBO")
    console.log("TEST -1", [].lenght)
    const [active, setActive] = React.useState(false)
    const [activeItem, setActiveItem] = React.useState(defaultValue)
    const [filter, setFilter] = React.useState(undefined)
    console.log("default value (assigned room) ", defaultValue)

    const grabItemSelected = () => {
         console.log(items, "items que entran al filter")
         const itemsFiltered = items.filter(i => i.id == activeItem)
         if (itemsFiltered.length == undefined) {
            return "no items"
        }
        else return itemsFiltered[0].name
    }

    const haveDefaultValue = !(activeItem == undefined)
    console.log(haveDefaultValue, "HAVE DEFAULT VALUE LOG")
    const filterQuery = (item) => {
        if (!filter) return true
        else return item.name.toLowerCase().includes(filter.toLowerCase())
    }

    React.useEffect(() => {
        setFilter(undefined)
    }, [active])


    return (
        <div className={`ComboSelector ${active ? "active" : ""}`}>
            <div className='value' onClick={() => setActive(true)}>
                {active ? (
                    <input className='testing' type='text' defaultValue={haveDefaultValue ? grabItemSelected() : ""} onChange={(e) => setFilter(e.target.value)} />
                ) : (
                    haveDefaultValue ? grabItemSelected() : "Please select an item"
                )}
            </div>
            <div className='options'>
                {items.filter(filterQuery).map(i => (
                    <div className='option' onClick={() => {
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