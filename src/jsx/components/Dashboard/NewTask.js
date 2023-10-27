import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Tab, Nav } from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '../Loader';
///Import
import room4 from './../../../images/room/room4.jpg';

import { connect } from 'react-redux';
import { getTasks, getTaskByID } from '../../../store/actions/TasksActions';
import {  getUserByIDAction } from '../../../store/actions/AuthActions';

const TaskById = ({ getTaskByID, taskById , loadingTaskById , updateTaskByIDAction, createTaskAction }) => {
    const location = useLocation();
    let navigate = useNavigate();

    const [infoTask, setInfoTask] = React.useState({
        name: "",
        surname: "",
        task_type_id: 1,
        created_at: new Date().toLocaleDateString()
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


    // Active pagginarion

    React.useEffect(() => {
        if (taskById && !loadingTaskById && !isNew) setInfoTask({ ...taskById })
    }, [taskById, loadingTaskById])

    React.useEffect(() => {
        if (isUpdating && !loadingTaskById) navigate("/task")
    }, [loadingTaskById])

    const sendForm = () => {
        setIsUpdating(true)
        const newInfoTask = {...infoTask}
        delete newInfoTask.created_at;
     
        if (infoTask.id) updateTaskByIDAction(newInfoTask)
        else createTaskAction(newInfoTask)
    }

    const checkIfDisabled = () => {
        let disabled = true;
        if(infoTask.name && infoTask.surname && infoTask.taskname && infoTask.task_type_id && infoTask.email && (!isNew || infoTask.password)) disabled = false;
        return disabled
    }
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
                                                            <div className=' inputs'>
                                                                <div className='right'>
                                                                    <div>
                                                                        <p>Name</p>
                                                                        <input value={infoTask.name} onChange={(e) => changeFormProp("name", e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        <p>Suername</p>
                                                                        <input value={infoTask.surname} onChange={(e) => changeFormProp("surname", e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        <p>Username</p>
                                                                        <input value={infoTask.taskname} onChange={(e) => changeFormProp("taskname", e.target.value)} />
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className='left' >
                                                                    <div>
                                                                        <p>Creation Date</p>
                                                                        <input value={new Date(infoTask.created_at).toLocaleDateString()} disabled="true" />
                                                                    </div>
                                                                    <div>
                                                                        <p>Email</p>
                                                                        <input value={infoTask.email} onChange={(e) => changeFormProp("email", e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        <p>Password</p>
                                                                        <input type='password' disabled={!isNew} value={!isNew ? "******" : infoTask.password} onChange={(e) => changeFormProp("password", e.target.value)} />
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
                                                                <button className={ checkIfDisabled() ? "disabled" : ""} disabled={checkIfDisabled()}type="button" onClick={sendForm}>Save</button>
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
        tasks: state.tasksData.tasks,
        taskById: state.tasksData.taskByID
    };
};

const mapDispatchToProps = {
    getTasks,
    getTaskByID,
    updateTaskByIDAction: () => {}, // PËNDING
    createTaskAction: () => {} // PËNDING
    /*
    getUserByIDAction,
    getUserTypesAction,
    updateUserByIDAction,
    createUserAction
    */
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskById);
