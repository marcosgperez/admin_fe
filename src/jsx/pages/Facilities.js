import React from "react";
import RoomListFilter from "../components/Dashboard/RoomListFilter";
import RoomList from "../components/Dashboard/RoomList";
import { Dropdown, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState } from "react";
const Facilities = () => {
    const [selectBtn, setSelectBtn] = useState("Newest");
    const [searchBut, setSearchBut] = useState(false);
    return (
        <div className="row">
            <div className="col-xl-12" >


                <div className="mt-4 d-flex justify-content-between align-items-center flex-wrap">
                    <div className="card-action coin-tabs mb-2">
                        <Nav as="ul" className="nav nav-tabs" role="tablist">
                            <Nav.Item as="li" className="nav-item">
                                <Nav.Link className="nav-link" eventKey="All">See All</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li" className="nav-item">
                                <Nav.Link className="nav-link" eventKey="Available">HouseKeeping</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li" className="nav-item">
                                <Nav.Link className="nav-link" eventKey="Booked">Maintainance</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                        <div className="nav-item d-flex align-items-Start">
                            <div className="input-group search-area">
                                <input type="text"
                                    className={`form-control ${searchBut ? "active" : ""}`}
                                    placeholder="Search.."
                                />
                                <span className="input-group-text" onClick={() => setSearchBut(!searchBut)}>
                                    <Link to={"#"}><i className="flaticon-381-search-2"></i></Link>
                                </span>
                            </div>
                        </div>
                        <Link style={{marginLeft:"30px"}} to={"#"} className="btn btn-secondary">+ New Task</Link>
                        <div className="newest ms-3">
                            <Dropdown>
                                <Dropdown.Toggle as="div" className=" btn-select-drop default-select btn i-false">
                                    {selectBtn} <i className="fas fa-angle-down ms-2 "></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setSelectBtn("Oldest")} eventKey="All">Oldest</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectBtn("Newest")} eventKey="All">Newest</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <RoomList></RoomList>
            </div>
        </div>
    )
}
export default Facilities