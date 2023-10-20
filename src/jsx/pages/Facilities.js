import React from "react";
import RoomListFilter from "../components/Dashboard/RoomListFilter";
import RoomList from "../components/Dashboard/RoomList";
import { Dropdown, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState } from "react";
const Facilities = () => {
    const [selectBtn, setSelectBtn] = useState("Newest");
    const [searchBut, setSearchBut] = useState(false);
    const admin = true
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
                                <Nav.Link className="nav-link" eventKey="HouseKeeping">HouseKeeping</Nav.Link>
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
                    </div>
                </div>
                <RoomList></RoomList>
            </div>
        </div>
    )
}
export default Facilities