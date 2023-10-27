import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Tab, Nav } from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '../Loader';
///Import
import room4 from './../../../images/room/room4.jpg';

import { connect } from 'react-redux';
import { getFacilities, getFacilitieByID } from '../../../store/actions/FacilitiesActions';
import {  getUserByIDAction } from '../../../store/actions/AuthActions';


const buildUserData = (userFromAPI) => {
    return {
        id: userFromAPI.id,
        name: userFromAPI.name,
        job: "Administrator",
        days: "-",
        hours: "-",
        contact: "-",
        status: "Active"
    }
}

const DropDown = ({ status }) => {
    const [currentStatus, setCurrentStatus] = useState(status);
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("green")

    const selectOption = (changeTo, newColor) => {
        setCurrentStatus(changeTo)
        setOpen(false)
        setColor(newColor)
    }

    return (
        <div className="dropDown">
            <div onClick={() => setOpen(!open)} className="dropDownButton">
                <div>
                    <p style={{ color }}>
                        {currentStatus}
                    </p>
                </div>
            </div>
            <div className={open ? "dropDownOptions" : "closed"}>
                <div className="active" onClick={() => selectOption("Active", "#7aa577")}>Active</div>
                <div className="inactive" onClick={() => selectOption("On progress", "#c96161")}>Inactive</div>
                <div className="break" onClick={() => selectOption("Not finished", "#ead681")}>On break</div>
            </div>
        </div>
    );
};

const TaskById = ({ facilities, getFacilities,getFacilitieById, taskById, loading }) => {
    const [infoTask, setInfoTask] = React.useState()
    const [isNew, setIsNew] = React.useState(false)
    const [isUpdating, setIsUpdating] = React.useState(false)
    const changeFormProp = (prop, value) => {
        setInfoTask({ ...infoTask, [prop]: value })
    }
    // GET USERS & USER-BY-ID
    React.useEffect(() => {
        getFacilities()
        getFacilitieByID()
    }, [])
    const location = useLocation();
    let navigate = useNavigate();
    useEffect(() => {
        const splitedPathname = location.pathname.split("/")
        const id = splitedPathname[splitedPathname.length - 1];
        if (id != "new") getFacilitieByID(id)
        else {
            setInfoTask({})
            setIsNew(isNew)
        }
    }, [location])


    // const sendForm = () => {
    //     setIsUpdating(true)
    //     if(infoTask.id) updateTaskByIDAction(infoUser)
    //     else console.log("NEW",infoUser)
    // }

    console.log(taskById, "userById")
    const [show, setShow] = useState("onProgress")
    return (
        <Tab.Container defaultActiveKey="All" >
            <div className="row form">
                <div className="col-xl-12">
                    <div className="customCard booking" style={{ heigth: "20px" }} >
                        <div style={{ overflow: "auto" }} className="card-body p-3">
                            <div className="table-responsive">
                                <div className="dataTables_wrapper no-footer">
                                    {(isNew || (loading || taskById || !infoTask)) ? (<Loader />) : (
                                        <div className={"tableContainer"} style={{ width: "100%", alignItems: "center" }} >
                                            <div className="basic-form">
                                                <form onSubmit={(e) => e.preventDefault()}>
                                                    <div className='row formRow' >
                                                        <div className='ms-0 ms-md-4 imageContainer withLetters' >
                                                            {/* <div className='image'>
                                                                    <p>{generateLetterByName(infoUser.name)}{generateLetterByName(infoUser.surname)}</p>
                                                                </div> */}
                                                        </div>
                                                        <div className=' inputs'>
                                                            <div className='right'>
                                                                <div>
                                                                    <p>Name</p>
                                                                    <input onChange={(e) => changeFormProp("name", e.target.value)} />
                                                                </div>
                                                                <div>
                                                                    <p>Suername</p>
                                                                    <input onChange={(e) => changeFormProp("surname", e.target.value)} />
                                                                </div>
                                                            </div>
                                                            <div className='left' >
                                                                <div>
                                                                    <p>Creation Date</p>
                                                                    <input disabled="true" />
                                                                </div>
                                                                <div>
                                                                    <p>Email</p>
                                                                    <input onChange={(e) => changeFormProp("email", e.target.value)} />
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
                                                            {/* <button type="button" onClick={sendForm}>Save</button> */}
                                                            <button type="button">Save</button>

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
    )
}


const mapStateToProps = (state) => {
    console.log(state, "state PAAA")
    return {
        loading: state.authData.loading,
        users: state.authData.users,
        taskById: state.authData.taskByID
    };
};

const mapDispatchToProps = {
    getFacilities,
    getFacilitieByID
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskById);
