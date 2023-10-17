import React from "react";
import { Dropdown, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState } from "react";
const RoomListFilter = () => {
    const [selectBtn, setSelectBtn] = useState("Newest");
    return (

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
                    <Nav.Item as="li" className="nav-item">
                        <Nav.Link className="nav-link" eventKey="Booked">Other Facilities </Nav.Link>
                    </Nav.Item>

                </Nav>
            </div>
            <div className="d-flex align-items-center mb-2">
                <Link to={"#"} className="btn btn-secondary">+ New Task</Link>
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
    )
}
export default RoomListFilter