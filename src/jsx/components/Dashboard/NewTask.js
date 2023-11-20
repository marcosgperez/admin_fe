import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab } from "react-bootstrap";
import { connect } from 'react-redux';
import { getTaskByID, updateTaskByID, createTask, getTasks } from '../../../store/actions/TasksActions';
import { getUserTypesAction, getUsers, getNotificationsAction, readNotificationsAction } from '../../../store/actions/AuthActions';
import { getRoomsAction, getRoomsTypesAction } from '../../../store/actions/RoomsActions';
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
    isAdmin,
    roomTypes,
    notifications,
    getNotificationsAction,
    readNotificationsAction,
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

    function getBase64(file, callback) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callback(reader.result);
        };
        reader.onerror = function (error) {
            callback(null);
        };
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        getBase64(file, (data) => {
            setInfoTask({ ...infoTask, photo: data })
        });
    };

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
        if (!newInfoTask.photo) delete newInfoTask.photo;
        newInfoTask.type = String(newInfoTask.type)
        newInfoTask.is_completed = newInfoTask.status === "Completed" ? 1 : 0;
        delete newInfoTask.status;
        if (!newInfoTask.newDescription || newInfoTask.newDescription.length < 1) {
            delete newInfoTask.description;
        } else {
            const [conversation, _description] = parseDescriptionForConversation(infoTask.description)
            newInfoTask.description = concatDescriptionForConversation(conversation, addPersonToDescription(newInfoTask.newDescription))
        }
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
            // check if id is inside notification array checking ref_type == "task" and ref_id
            const notification = notifications.filter(n => n.ref_type == "task" && n.ref_id == _id)
            if (notification.length) {
                readNotificationsAction([notification[0].id]);
                setTimeout(() => {
                    const id = user.user_type_id == 1 ? 0 : user.id
                    getNotificationsAction(id)
                }, 300);
            }
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
        if (taskById && !loadingTaskById && !isNew) setInfoTask(buildTaskData({ ...taskById }))
    }, [])

    React.useEffect(() => {
        if (taskById && !loadingTaskById && !isNew) setInfoTask(buildTaskData({ ...taskById }))
        console.log(taskById, "ACA ESTA LA TASK BY ID")
        console.log(infoTask, "INFO TASK SETEADA")
    }, [taskById, loadingTaskById])


    React.useEffect(() => {
        if (isUpdating && !loadingTaskById) navigate(isAdmin ? "/tasks" : "/")
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
                                                                            <option disabled selected>Select an option</option>
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
                                                                            <option disabled selected>Select an option</option>
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
                                                                            <option disabled selected>Select an option</option>
                                                                            {taskTypes.map(u => (
                                                                                <option value={u.id} key={u.id}>{u.name}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                    <div className=''>
                                                                        <p>Room</p>
                                                                        <ComboSelector onChange={(e) => changeFormProp("asigned_room", Number(e))} defaultValue={taskById ? taskById.asigned_room : null} items={rooms} />

                                                                    </div>
                                                                    <div className=''>
                                                                        <p>Image</p>
                                                                        <input type='file' multiple={false} accept="image/*" onChange={(e) => handleImageChange(e)} />
                                                                        <div className='m-4 mt-0'>
                                                                            {infoTask.photo && <img src={infoTask.photo} style={{ objectFit: "contain", width: "100%", height: "400px" }} />}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className='m-5'>

                                                            <div className='convoContainer'>
                                                                {conversation.map(c => (
                                                                    <div className='row formRow' >
                                                                        <p>{c}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div >
                                                                <p><b>Comments:</b></p>
                                                            </div>
                                                            <textarea
                                                                defaultValue={_description}
                                                                className='formTextArea'
                                                                onChange={(e) => changeFormProp("newDescription", e.target.value)}
                                                                rows="8"
                                                                id="comment"
                                                            ></textarea>
                                                        </div>

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
    return {
        isAdmin: state.authData.user && state.authData.user.user_type_id == 1,
        loadingTaskById: state.tasksData.loadingTaskById,
        loadingTaskTypes: state.authData.loadingUserTypes,
        taskById: state.tasksData.taskByID,
        taskTypes: state.authData.userTypes,
        users: state.authData.users,
        user: state.authData.user,
        rooms: state.roomsData.rooms,
        roomTypes: state.roomsData.roomsTypes,
        notifications: state.authData.notifications
    };
};

const mapDispatchToProps = {
    getNotificationsAction,
    readNotificationsAction,
    getTaskByID,
    getTaskTypes: getUserTypesAction,
    updateTaskByID,
    createTask,
    getUsers,
    getRoomsAction,
    getRoomsTypesAction
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskById);

export const ComboSelector = ({ onChange, items, defaultValue, value }) => {
    const [active, setActive] = React.useState(false)
    const [activeItem, setActiveItem] = React.useState(value || defaultValue)
    const [filter, setFilter] = React.useState(undefined)
    const grabItemSelected = () => {
        console.log("activeItem", activeItem, items)
        const itemsFiltered = items.filter(i => i.id == activeItem)
        if (itemsFiltered.length < 1) {
            return "no items"
        }
        else {
            return itemsFiltered[0].name
        }
    }
    const haveDefaultValue = !(activeItem == undefined)
    const filterQuery = (item) => {
        if (!filter) return true
        else return item.name.toLowerCase().includes(filter.toLowerCase())
    }
    React.useEffect(() => {
        if (value) setActiveItem(value)
    }, [value])

    return (
        <div className={`ComboSelector ${active ? "active" : ""}`}>
            {/* issue aca */}
            <div className='value' onClick={() => setActive(true)}>
                {active ? (
                    <input className='input-value' type='text' defaultValue={haveDefaultValue ? grabItemSelected() : ""} onChange={(e) => setFilter(e.target.value)} />
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