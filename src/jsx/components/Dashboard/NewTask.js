import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab } from "react-bootstrap";
import { connect } from 'react-redux';
import { getTaskByID, updateTaskByID, createTask, getTaskTypes } from '../../../store/actions/TasksActions';
import { getUserTypesAction, getUsers } from '../../../store/actions/AuthActions';
import { generateColorFromName, generateLetterByName } from '../../../helpers';
import { Loader } from '../Loader';

const StaffById = ({ getTaskByID, getUsers, users, taskTypes, updateTaskByID, userById, loadingTaskById, createTask, getTaskTypes, userTypes }) => {
    const location = useLocation();
    let navigate = useNavigate();

    const [infoTask, setInfoTask] = React.useState({
        name: "",
        surname: "",
        user_type_id: 1,
        status: "",
        created_at: new Date().toLocaleDateString(),
        assigned: ""
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
        getUserTypesAction()
        getUsers()
    }, [])

    // Active pagginarion

    React.useEffect(() => {
        if (userById && !loadingTaskById && !isNew) setInfoTask({ ...userById })
    }, [userById, loadingTaskById])

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
    const [status, setStatus] = useState(["Active", "Done", "Not Finished"])
    return (
        <>
            <Tab.Container defaultActiveKey="All" >
                <div className="row form">
                    <div className="col-xl-12">
                        <div className="customCard booking" style={{ heigth: "20px" }} >
                            <div style={{ overflow: "auto" }} className="card-body p-3">
                                <div className="table-responsive">
                                    <div className="dataTables_wrapper no-footer">
                                        {(loadingTaskById) ? (<Loader />) : (
                                            <div className={"tableContainer"} style={{ width: "100%", alignItems: "center" }} >
                                                <div className="basic-form">
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                        <div className='row formRow' >
                                                            <div className='imageContainer withLetters' style={{ backgroundColor: `${generateColorFromName(infoTask.name)}` }}>
                                                                <div className='image'>
                                                                    <p>{generateLetterByName(infoTask.name)}{generateLetterByName(infoTask.surname)}</p>
                                                                </div>
                                                            </div>
                                                            <div className=' inputs'>
                                                                <div className='right'>
                                                                    <div>
                                                                        <p>Taskname</p>
                                                                        <input value={infoTask.username} onChange={(e) => changeFormProp("username", e.target.value)} />
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
                                                                            value={infoTask.assigned}
                                                                            className="form-control form-control-lg"
                                                                            onChange={(e) => changeFormProp("assigned", Number(e.target.value))}
                                                                        >
                                                                            {users.filter((user) => user.user_type_id === infoTask.user_type_id).map(u => (
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
                                                                            value={infoTask.user_type_id}
                                                                            className="form-control form-control-lg"
                                                                            onChange={(e) => changeFormProp("user_type_id", Number(e.target.value))}
                                                                        >
                                                                            {userTypes.map(u => (
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
                                                            className='formTextArea'
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
        loadingTaskTypes: state.tasksData.loadingTaskTypes,
        taskById: state.tasksData.taskByID,
        taskTypes: state.tasksData.taskTypes,
        userTypes: state.authData.userTypes,
        users: state.authData.users
    };
};

const mapDispatchToProps = {
    getTaskByID,
    getTaskTypes,
    getUserTypesAction,
    updateTaskByID,
    createTask,
    getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffById);
