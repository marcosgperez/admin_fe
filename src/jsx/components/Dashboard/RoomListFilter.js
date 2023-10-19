import React from "react";
import { Dropdown, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState } from "react";
const RoomListFilter = () => {
    const [selectBtn, setSelectBtn] = useState("Newest");
    let admin = false
    return (

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
                        <Nav.Link className="nav-link" eventKey="Maintainance">Maintainance</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="nav-item">
                        <Nav.Link className="nav-link" eventKey="Other">Other Facilities </Nav.Link>
                    </Nav.Item>

                </Nav>
            </div>
            <div className="d-flex align-items-center mb-2">
                <Link to={"#"} className={admin?"btn btn-secondary" :"btn btn-secondary d-none"}>+ New Task</Link>
                <div className={admin?"newest ms-3" : "d-none" }>
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
    )
}
export default RoomListFilter