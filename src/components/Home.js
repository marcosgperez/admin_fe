import React from "react";
import EventCalendar from "../jsx/components/AppsMenu/Calendar/EventCalendar";
import { connect } from "react-redux";
import { getRoomsAction, getRoomCountAction } from "../store/actions/RoomsActions";

import TasksListFilter from "../jsx/components/Dashboard/TasksListFilter";
import TasksList from "../jsx/components/Dashboard/TasksList";
import { Link } from 'react-router-dom';

const Home = ({ getRoomsAction, roomsData, getRoomCountAction, isAdmin, roomsCount }) => {
  // GET ROOMS & ROOM COUNT
  React.useEffect(() => {
    getRoomsAction()
    getRoomCountAction()
  }, [])
  const [filter, setFilter] = React.useState("All")
  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }

  return (
    <>
      <div className="row Home">
        <div className="col-xl-12">
          <div className="row desktopCards d-none d-md-flex">
            <div className="col-xl-3 col-sm-6">
              <Link to={"/task/new-task"} className='w-max-content'>
                <div className="card booking card-task">
                  <div className="card-body ">
                    <div className="booking-status d-flex align-items-center">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="20"
                          viewBox="0 0 28 20"
                        >
                          <path
                            d="M27,14V7a1,1,0,0,0-1-1H6A1,1,0,0,0,5,7v7a3,3,0,0,0-3,3v8a1,1,0,0,0,2,0V24H28v1a1,1,0,0,0,2,0V17A3,3,0,0,0,27,14ZM7,8H25v6H24V12a2,2,0,0,0-2-2H19a2,2,0,0,0-2,2v2H15V12a2,2,0,0,0-2-2H10a2,2,0,0,0-2,2v2H7Zm12,6V12h3v2Zm-9,0V12h3v2ZM4,17a1,1,0,0,1,1-1H27a1,1,0,0,1,1,1v5H4Z"
                            transform="translate(-2 -6)"
                            fill="var(--primary)"
                          />
                        </svg>
                      </span>
                      <div className="ms-4">
                        {/* <h2 className="mb-0 font-w600">{roomsData?.available ? roomsData?.available : "..."}</h2> */}
                        <p className="mb-0 text-nowrap">New Task</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="card booking">
                <div className="card-body">
                  <div className="booking-status d-flex align-items-center">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="20"
                        viewBox="0 0 28 20"
                      >
                        <path
                          d="M27,14V7a1,1,0,0,0-1-1H6A1,1,0,0,0,5,7v7a3,3,0,0,0-3,3v8a1,1,0,0,0,2,0V24H28v1a1,1,0,0,0,2,0V17A3,3,0,0,0,27,14ZM7,8H25v6H24V12a2,2,0,0,0-2-2H19a2,2,0,0,0-2,2v2H15V12a2,2,0,0,0-2-2H10a2,2,0,0,0-2,2v2H7Zm12,6V12h3v2Zm-9,0V12h3v2ZM4,17a1,1,0,0,1,1-1H27a1,1,0,0,1,1,1v5H4Z"
                          transform="translate(-2 -6)"
                          fill="var(--primary)"
                        />
                      </svg>
                    </span>
                    <div className="ms-4">
                      <h2 className="mb-0 font-w600">{roomsCount?.available}</h2>
                      <p className="mb-0 text-nowrap ">Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="card booking">
                <div className="card-body">
                  <div className="booking-status d-flex align-items-center">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                      >
                        <path
                          data-name="Path 1957"
                          d="M129.035,178.842v2.8a5.6,5.6,0,0,0,5.6,5.6h14a5.6,5.6,0,0,0,5.6-5.6v-16.8a5.6,5.6,0,0,0-5.6-5.6h-14a5.6,5.6,0,0,0-5.6,5.6v2.8a1.4,1.4,0,0,0,2.8,0v-2.8a2.8,2.8,0,0,1,2.8-2.8h14a2.8,2.8,0,0,1,2.8,2.8v16.8a2.8,2.8,0,0,1-2.8,2.8h-14a2.8,2.8,0,0,1-2.8-2.8v-2.8a1.4,1.4,0,0,0-2.8,0Zm10.62-7-1.81-1.809a1.4,1.4,0,1,1,1.98-1.981l4.2,4.2a1.4,1.4,0,0,1,0,1.981l-4.2,4.2a1.4,1.4,0,1,1-1.98-1.981l1.81-1.81h-12.02a1.4,1.4,0,1,1,0-2.8Z"
                          transform="translate(-126.235 -159.242)"
                          fill="var(--primary)"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </span>
                    <div className="ms-4">
                      <h2 className="mb-0 font-w600">{roomsCount?.available}</h2>
                      <p className="mb-0">Check In</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="card booking">
                <div className="card-body">
                  <div className="booking-status d-flex align-items-center">
                    <span>
                      <svg
                        id="_009-log-out"
                        data-name="009-log-out"
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                      >
                        <path
                          data-name="Path 1957"
                          d="M151.435,178.842v2.8a5.6,5.6,0,0,1-5.6,5.6h-14a5.6,5.6,0,0,1-5.6-5.6v-16.8a5.6,5.6,0,0,1,5.6-5.6h14a5.6,5.6,0,0,1,5.6,5.6v2.8a1.4,1.4,0,0,1-2.8,0v-2.8a2.8,2.8,0,0,0-2.8-2.8h-14a2.8,2.8,0,0,0-2.8,2.8v16.8a2.8,2.8,0,0,0,2.8,2.8h14a2.8,2.8,0,0,0,2.8-2.8v-2.8a1.4,1.4,0,0,1,2.8,0Zm-10.62-7,1.81-1.809a1.4,1.4,0,1,0-1.98-1.981l-4.2,4.2a1.4,1.4,0,0,0,0,1.981l4.2,4.2a1.4,1.4,0,1,0,1.98-1.981l-1.81-1.81h12.02a1.4,1.4,0,1,0,0-2.8Z"
                          transform="translate(-126.235 -159.242)"
                          fill="var(--primary)"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </span>
                    <div className="ms-4">
                      <h2 className="mb-0 font-w600">{roomsCount?.available}</h2>
                      <p className="mb-0">Check Out</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mobileCards d-flex d-md-none">

            <div className="col-md-12" >
              <div className="mobileCard" style={{ display: "flex" }} >
                <div className="left" style={{ width: "50%" }} >
                  <Link to={"/task/new-task"} style={{ padding: "0px", margin: "0px" }} >
                    <div className="card booking card-task" style={{ borderRadius: "8px 0px 0px 8px", height: "109px" }}>
                      <div className="card-body">
                        <div className="booking-status d-flex align-items-center">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="28"
                              height="20"
                              viewBox="0 0 28 20"
                            >
                              <path
                                d="M27,14V7a1,1,0,0,0-1-1H6A1,1,0,0,0,5,7v7a3,3,0,0,0-3,3v8a1,1,0,0,0,2,0V24H28v1a1,1,0,0,0,2,0V17A3,3,0,0,0,27,14ZM7,8H25v6H24V12a2,2,0,0,0-2-2H19a2,2,0,0,0-2,2v2H15V12a2,2,0,0,0-2-2H10a2,2,0,0,0-2,2v2H7Zm12,6V12h3v2Zm-9,0V12h3v2ZM4,17a1,1,0,0,1,1-1H27a1,1,0,0,1,1,1v5H4Z"
                                transform="translate(-2 -6)"
                                fill="var(--primary)"
                              />
                            </svg>
                          </span>
                          <div className="ms-4">
                            {/* <h2 className="mb-0 font-w600">{roomsData?.available ? roomsData?.available : "..."}</h2> */}
                            <p className="mb-0 text-nowrap">New Task</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="rigth" style={{ width: "50%" }}>
                  <div className="card booking" style={{ borderRadius: "0px 8px 8px 0px" }}>
                    <div className="card-body">
                      <div className="booking-status d-flex" style={{ justifyContent: "flex-end" }}>
                        <div style={{ marginRight: "10px", textAlign: "end", }}>
                          <h2 className="mb-0 ">{roomsCount?.unavailable}</h2>
                          <p className="mb-0 " style={{ margin: "0px", fontWeight: 400, fontSize: "10px", paddingTop: "5px" }}>unavailable</p>
                        </div>

                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="20"
                            viewBox="0 0 28 20"
                          >
                            <path
                              d="M27,14V7a1,1,0,0,0-1-1H6A1,1,0,0,0,5,7v7a3,3,0,0,0-3,3v8a1,1,0,0,0,2,0V24H28v1a1,1,0,0,0,2,0V17A3,3,0,0,0,27,14ZM7,8H25v6H24V12a2,2,0,0,0-2-2H19a2,2,0,0,0-2,2v2H15V12a2,2,0,0,0-2-2H10a2,2,0,0,0-2,2v2H7Zm12,6V12h3v2Zm-9,0V12h3v2ZM4,17a1,1,0,0,1,1-1H27a1,1,0,0,1,1,1v5H4Z"
                              transform="translate(-2 -6)"
                              fill="var(--primary)"
                            />
                          </svg>
                        </span>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mobileCards d-flex d-md-none">
            <div className="col-md-12" >
              <div className="mobileCard" style={{ display: "flex" }} >

                <div className="left" style={{ width: "50%" }} >
                  <div className="card booking" style={{ borderRadius: "8px 0px 0px 8px" }}>
                    <div className="card-body">
                      <div className="booking-status d-flex align-items-center">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="20"
                            viewBox="0 0 28 20"
                          >
                            <path
                              d="M27,14V7a1,1,0,0,0-1-1H6A1,1,0,0,0,5,7v7a3,3,0,0,0-3,3v8a1,1,0,0,0,2,0V24H28v1a1,1,0,0,0,2,0V17A3,3,0,0,0,27,14ZM7,8H25v6H24V12a2,2,0,0,0-2-2H19a2,2,0,0,0-2,2v2H15V12a2,2,0,0,0-2-2H10a2,2,0,0,0-2,2v2H7Zm12,6V12h3v2Zm-9,0V12h3v2ZM4,17a1,1,0,0,1,1-1H27a1,1,0,0,1,1,1v5H4Z"
                              transform="translate(-2 -6)"
                              fill="var(--primary)"
                            />
                          </svg>
                        </span>
                        <div style={{ marginLeft: "10px" }}>
                          <h2 className="mb-0 ">{roomsCount?.available}</h2>
                          <p className="mb-0 " style={{ margin: "0px", fontWeight: 400, fontSize: "10px" }}>Available</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rigth" style={{ width: "50%" }}>
                  <div className="card booking" style={{ borderRadius: "0px 8px 8px 0px" }}>
                    <div className="card-body">
                      <div className="booking-status d-flex" style={{ justifyContent: "flex-end" }}>
                        <div style={{ marginRight: "10px", textAlign: "end", }}>
                          <h2 className="mb-0 ">{roomsCount?.available}</h2>
                          <p className="mb-0 " style={{ margin: "0px", fontWeight: 400, fontSize: "10px", paddingTop: "5px" }}>Available</p>
                        </div>

                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="20"
                            viewBox="0 0 28 20"
                          >
                            <path
                              d="M27,14V7a1,1,0,0,0-1-1H6A1,1,0,0,0,5,7v7a3,3,0,0,0-3,3v8a1,1,0,0,0,2,0V24H28v1a1,1,0,0,0,2,0V17A3,3,0,0,0,27,14ZM7,8H25v6H24V12a2,2,0,0,0-2-2H19a2,2,0,0,0-2,2v2H15V12a2,2,0,0,0-2-2H10a2,2,0,0,0-2,2v2H7Zm12,6V12h3v2Zm-9,0V12h3v2ZM4,17a1,1,0,0,1,1-1H27a1,1,0,0,1,1,1v5H4Z"
                              transform="translate(-2 -6)"
                              fill="var(--primary)"
                            />
                          </svg>
                        </span>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-end">
            <div className={"col-xl-12"}>
              <TasksListFilter handleClick={changeFilter}></TasksListFilter>
              <TasksList filter={filter}></TasksList>
            </div>
            <div className={isAdmin ? "d-none d-md-block col-xl-12 calendar" : "d-none"}>
              <EventCalendar />
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

const mapStateToProps = (rootState) => {
  return {
    roomsData: rootState.roomsData,
    isAdmin: rootState.authData.user && rootState.authData.user.user_type_id == 1,
    roomsCount: rootState.roomsData.roomsCount
  }
}

const mapDispatchToProps = {
  getRoomsAction,
  getRoomCountAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
