import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Tab, Nav } from "react-bootstrap";

///Import
import room4 from './../../../images/room/room4.jpg';
import Available from './Room/Available';
import Booked from './Room/Booked';

import { connect } from 'react-redux';
import { getUsers, getUserByIDAction } from '../../../store/actions/AuthActions';



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

const TaskById = ({ users, getUsers, getUserByIDAction, userById }) => {


    // GET USERS & USER-BY-ID
    React.useEffect(() => {
        getUsers()
        getUserByIDAction()
    }, [])

    React.useEffect(() => {
        console.log("users", users, "userByID", userById)
    }, [users])
    console.log(userById, "userById")
    const [show, setShow] = useState("onProgress")
    return (
        <>
            <Tab.Container defaultActiveKey="All" >
                <div className="row form">

                    <div className='statusContainer' >
                        <div>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="customCheckBox1"
                                defaultChecked

                            />
                            <label
                                className="form-check-label"
                                htmlFor="customCheckBox1"
                            >
                                On Progress
                            </label>
                        </div>


                        <div>
                            <input
                                type="checkbox"
                                defaultChecked
                                className="form-check-input"
                                id="customCheckBox2"
                                required
                            />
                            <label
                                className="form-check-label"
                                htmlFor="customCheckBox2"
                            >
                                Done
                            </label>
                        </div>

                        <div>
                            <input
                                type="checkbox"
                                defaultChecked
                                className="form-check-input"
                                id="customCheckBox3"
                                required
                            />
                            <label
                                className="form-check-label"
                                htmlFor="customCheckBox3"
                            >
                                Not Finished
                            </label>
                        </div>

                    </div>
                    <div className="col-xl-12">

                        <div className="card formCard" style={{ heigth: "20px" }} >
                            <div className="card-body p-0">
                                <Tab.Content >
                                    <Tab.Pane eventKey="All">
                                        <div className="table-responsive">
                                            <div id="room_wrapper" className="dataTables_wrapper no-footer">
                                                <div className={"tableContainer"} style={{ width: "100%", alignItems: "center" }} >

                                                    <div className="basic-form">
                                                        <form onSubmit={(e) => e.preventDefault()}>
                                                            <div className='row formRow' >
                                                                <div className='imageContainer'>
                                                                    <div style={{ backgroundImage: `${room4}` }} className='image' ></div>
                                                                </div>
                                                                <div className=' inputs'>

                                                                    <div className='rigth'>
                                                                        <div>
                                                                            <p>
                                                                                Name
                                                                            </p>
                                                                            <input></input>
                                                                        </div>

                                                                        <div>
                                                                            <p>Type</p>
                                                                            <input></input>
                                                                        </div>
                                                                    </div>
                                                                    <div className='left' >
                                                                        <div>
                                                                            <p>Asigned To</p>
                                                                            <input></input>
                                                                        </div>

                                                                        <div>
                                                                            <p>Started on</p>
                                                                            <input></input>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div>
                                                        <textarea
                                                            className='formTextArea '
                                                            rows="8"
                                                            id="comment"
                                                        ></textarea>


                                                        <div className='saveContainer'>
                                                            <button>
                                                                Save
                                                            </button>

                                                            <button>
                                                                Cancel
                                                            </button>

                                                            <button id='delete'>
                                                                Delete
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Available">
                                        <Available />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Booked">
                                        <Booked />
                                    </Tab.Pane>
                                </Tab.Content>
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
        loading: state.authData.loading,
        users: state.authData.users,
        userById: state.authData.userByID
    };
};

const mapDispatchToProps = {
    getUsers,
    getUserByIDAction
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskById);
