import React from "react";
import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { getFacilitiesAction } from "../../store/actions/FacilitiesActions";
import room4 from './../../images/room/room4.jpg';
const Facilities = ({ facilitiesData, getFacilitiesAction }) => {
    const [selectBtn, setSelectBtn] = useState("Newest");
    const [searchBut, setSearchBut] = useState(false);
    const admin = true
    const [filter, setFilter] = useState("all")

    const changeFilter = (changeTo) => {
        setFilter(changeTo)
    }

    const { loading, error, facilities } = facilitiesData
    React.useEffect(() => {
        getFacilitiesAction()
    }, [])
    console.log(facilities, "facilities")

    return (
        <div className="row">
            <div className="col-xl-12 card" >
                <div className="mt-4 d-flex justify-content-between align-items-center flex-wrap">
                    <div className="card-action coin-tabs mb-2">
                        <Nav as="ul" className="nav nav-tabs" role="tablist">
                            <Nav.Item as="li" className="nav-item">
                                <Nav.Link className="nav-link" eventKey="All" onClick={() => changeFilter("all")} >See All</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li" className="nav-item">
                                <Nav.Link className="nav-link" eventKey="HouseKeeping" onClick={() => changeFilter("houseKeeping")} >HouseKeeping</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li" className="nav-item">
                                <Nav.Link className="nav-link" eventKey="Maintainance" onClick={() => changeFilter("maintainance")} >Maintainance</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li" className="nav-item">
                                <Nav.Link className="nav-link" eventKey="other" onClick={() => changeFilter("other")} >Other</Nav.Link>
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

                <div className={"tableBody"} style={{ padding: "10px 0px" }} >



                    {facilities.map((f, i) => {
                        if (loading === false) {
                            if (f.type === filter || filter === "all")
                                return (
                                    <Link key={`task-${f.id}`} to={`/task/:${f.id}`}>
                                        <div className={"tableRow"} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "10px 0px", textSelect: "none" }}>
                                            {/* <div style={{ width: "0.00005%", display: "flex", alignItems: "center", justifyContent: "end", textAlign: "start", fontSize: "16px", fontWeight: "500", margin: "5px" }}>
																				</div> */}
                                            <div className="rowName">
                                                <img alt={"idk bruh0"} src={room4} className="rowImage" ></img>
                                                <p style={{ marginBottom: "0px", marginLeft: "20px" }}>
                                                    {f.name}
                                                </p>
                                            </div>
                                            <div className="rowItem" >{f.type}</div>
                                            <div className="rowItem" >{f.assigned}</div>
                                            <div className="rowItem" >{f.date}</div>
                                            <div className="rowItem" >{f.time}</div>
                                            <div className="rowItem" >
                                                <Link to={"#"} style={{ width: "fit-content" }} className={`rowBtn-${f.status}`}>{f.status.replace("-", " ")}</Link>
                                            </div>
                                        </div>
                                    </Link>
                                )
                        }
                    })}
                </div>

            </div>
        </div>
    )
}


const mapStateToProps = (rootState) => {
    return {
        facilitiesData: rootState.facilitiesData
    }
}

const mapDispatchToProps = {
    getFacilitiesAction
}


export default connect(mapStateToProps, mapDispatchToProps)(Facilities)