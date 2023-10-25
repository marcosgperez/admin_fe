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


const FacilitieById = ({ users, getUsers, getUserByIDAction, userById }) => {

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
    // console.log(document.querySelectorAll(".sorting_1 input")[0].checked);
    const chackboxFun = (type) => {
        for (let i = 0; i < chackbox.length; i++) {
            const element = chackbox[i];
            if (type === "all") {
                if (motherChackBox.checked) {
                    element.checked = true;
                } else {
                    element.checked = false;
                }
            } else {
                if (!element.checked) {
                    motherChackBox.checked = false;
                    break;
                } else {
                    motherChackBox.checked = true;
                }
            }
        }
    };
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
                    <div className="col-xl-12">
                        <div className="card formCard" style={{ heigth: "20px" }} >
                            <div style={{ overflow: "auto" }} className="card-body p-0">
                                <Tab.Content style={{ minWidth: "650px", heigth: "200px" }} >
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



                                                    <div className="mb-3">
                                                        <input className="form-control" type="file" id="formFile" />
                                                    </div>
                                                    <textarea
                                                        className='formTextArea '
                                                        rows="8"
                                                        id="comment"
                                                    ></textarea>
                                                    <div className='saveContainer' >
                                                        <button>Save</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(FacilitieById);
