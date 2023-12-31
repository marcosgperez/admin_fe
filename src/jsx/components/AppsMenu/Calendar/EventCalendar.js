import React, { Component } from "react";
import { Col, Row, Card } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import { Link } from "react-router-dom";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { getRoomsAction } from "../../../../store/actions/RoomsActions";
import { getEventsAction, deleteEventByID, createEvent, updateEventByID } from "../../../../store/actions/EventsActions";
import { connect } from 'react-redux';
import { ComboSelector } from "../../../components/Dashboard/NewTask";

export const dataEvent = {
   name: "",
   start: "",
   id: 1,
   task: "string",
   task_to: 1,
   room: 1,
   description: ""

}

const EventCalendar = ({ users, events, getEventsAction, updateEventByID, loadingById, createEvent, isAdmin, removeEvent, rooms, getRoomsAction }) => {

   const calendarComponentRef = React.useRef();
   const calendarEventsRef = React.useRef({});
   const [calendarEvents, setCalendarEvents] = React.useState(events)
   const [modalData, setModalData] = React.useState();
   const [creationModalData, setCreationModalData] = React.useState(null);


   const [_events, setEvents] = React.useState([
      { id: 1, title: "CheckOut" },
      { id: 2, title: "CheckIn" },
      { id: 3, title: "Cleaning" },
      { id: 4, title: "Mantainance" },

   ])



   React.useEffect((a, b) => {
      if (!loadingById) getEventsAction()
   }, [loadingById])

   React.useEffect(() => {
      const parseEventsForComponent = (event) => {
         return {
            ...event,
            title: event.name,
            date: event.date.split(" ")[0]
         }
      }
      setCalendarEvents([...events].map(parseEventsForComponent))
   }, [events])

   console.log(calendarEvents, "CALENDAREVENTS")

   const eventClick = (eventClick) => {
      console.log("EVENTCLICK", eventClick)
      setModalData({
         id: eventClick.event.id,
         title: eventClick.event.title,
         start: eventClick.event.start,
         description: eventClick.event.description
      })

   };

   const dropEvent = (event) => {
      const def = event.event._def
      const instance = event.event._instance

      const date = instance.range.end.getDate();
      const month = instance.range.end.getMonth() + 1;
      const year = instance.range.end.getFullYear();
      const updateEvent = {}
      updateEvent.title = def.title;
      updateEvent.date = `${year}-${month}-${date}`;
      updateEvent.asigned_to = 1;
      updateEvent.type = updateEvent.title;
      updateEvent.defId = def.defId;
      updateEvent.description = def.description;
      updateEvent.asigned_to = def.asigned_to;


      setCreationModalData({ ...updateEvent })
   };



   const deleteEventFromCalendar = (event) => {
      const calendarApi = calendarComponentRef.current.getApi();
      const events = calendarApi.getEvents()
      const eventToDelete = events.find((e) => e._def.defId == event.defId)
      if (eventToDelete) eventToDelete.remove()

   }

   const changeEvent = (event) => {
      const def = event.event._def
      const instance = event.event._instance
      const { extendedProps } = def

      if (def.publicId, instance && instance.range && instance.range.end) {
         const updateEvent = { ...extendedProps }
         const date = instance.range.end.getDate();
         const month = instance.range.end.getMonth() + 1;
         const year = instance.range.end.getFullYear();

         updateEvent.date = `${year}-${month}-${date}`
         updateEvent.id = Number(def.publicId)
         updateEventByID(updateEvent)
      }

   };

   const submitNewEvent = (data) => {
      if (!data) return
      else {
         console.log("data to send", data)
         createEvent(data)
         setCreationModalData()
      }
   }


   const createRef = (event, ref) => {
      if (ref) {
         if (!calendarEventsRef.current[event.id]) {
            createDragOption(event, ref)
            calendarEventsRef.current[event.id] = ref
         }
      }
   }

   const createDragOption = (event, target) => {
      new Draggable(target, {
         eventData: function (eventEl) {
            let title = event.title;
            let id = event.id;
            return {
               title: title,
               // id: id,
            };
         },
      });
      return event
   }

   const Modal = () => {
      if (!modalData) return <></>
      const modalInfoData = events.filter((e) => e.id == modalData.id)[0]
      if (!modalInfoData) return <></>

      const { name, created_at, id, task, task_to, room, description, asigned_room, asigned_to, type } = modalInfoData
      console.log(modalData, modalInfoData, "MODALDATA")
      return (
         <div className="ModalWrapper">
            <div className="ModalMask"></div>
            <div className="Modal">
               <div className="table-responsive">
                  <div className="titleContainer">
                     <div>{name}</div>
                  </div>
                  <table className="table">
                     <tbody>
                        <tr >
                           <td className="modalTd" >Title</td>
                        </tr>
                        <tr >
                           <td className="modalTd" >Type</td>
                           <td className="modalTd" ><strong>{type}</strong></td>
                        </tr>
                        <tr >
                           <td className="modalTd" >Start Time</td>
                           <td className="modalTd" ><strong>{new Date(created_at).toDateString()}</strong></td>
                        </tr>
                        <tr >
                           <td className="modalTd" >Asigned To</td>
                           <td className="modalTd" ><strong>{asigned_to}</strong></td>
                        </tr>
                        {users.length && (
                           <tr>
                              <td className="modalTd" >Asigned To</td>
                              <td className="modalTd" >
                                 <p><b>{graUserName(asigned_to)}</b></p>
                              </td>
                           </tr>
                        )}
                        <tr>
                           <td>
                              <p>Room</p>
                           </td>
                           <td>
                              <p><b>{grabRoomName(asigned_room)}</b></p>
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <p>Description</p>
                           </td>
                           <td>
                              <p>
                                 <i>{description ? description : "-"}</i>
                              </p>
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  <div className="ModalActions mt-2">
                     {task_to && (<Link to={`/task/${task_to}`} >Go to task</Link>)}

                     <button className="modalRemove" onClick={() => {
                        removeEvent(modalData);
                        setModalData();
                     }}>Remove Task</button>
                     <button className="modalRemove" onClick={() => setModalData()}>Close</button>
                  </div>
               </div>
            </div>
         </div >
      )
   }

   const grabRoomName = (roomID) => {
      const find = rooms.find(r => r.id == roomID)
      if (find) return find.name
      return "-"
   }

   const graUserName = (userID) => {
      console.log("asigned_to", userID,users)
      const find = users.find(u => u.id == userID)
      if (find) return find.name
      return "-"
   }

   const CreationModal = ({ onSubmit, data }) => {
      const [_data, setData] = React.useState({ ...data })

      const dataChange = (prop, value) => {
         setData({ ..._data, [prop]: value })
      }

      const { name, date, asigned_to, type, asigned_room } = _data
      console.log(_data, "CREATIONMODALDATA")
      return (
         <div className="ModalWrapper">
            <div className="ModalMask"></div>
            <div className="Modal">
               <div className="table-responsive">

                  <table className="table">
                     <tbody>
                        <tr >
                           <td className="modalTd" >name</td>
                           <td className="modalTd" >
                              <input className="gesto-input" type="text" value={name} onChange={(e) => dataChange("name", e.target.value)} />
                           </td>
                        </tr>
                        <tr >
                           <td className="modalTd" >Type</td>
                           <td className="modalTd" ><strong>{type}</strong></td>
                        </tr>
                        <tr >
                           <td className="modalTd" >Start Time</td>
                           <td className="modalTd" ><strong>{date}</strong></td>
                        </tr>
                        {users.length && (
                           <tr>
                              <td className="modalTd" >Asigned To</td>
                              <td className="modalTd" >
                                 <select
                                    value={asigned_to}
                                    className="form-control form-control-lg"
                                    onChange={(e) => dataChange("asigned_to", Number(e.target.value))}
                                 >
                                    <option disabled selected>Select an option</option>
                                    {users.map(u => (
                                       <option value={u.id} key={u.id}>{u.name}</option>
                                    ))}
                                 </select>
                              </td>
                           </tr>
                        )}
                        <tr>
                           <td className="modalTd" >Room</td>
                           <td className="modalTd" >
                              {rooms.length && (

                                 <ComboSelector
                                    value={asigned_room}
                                    defaultValue={asigned_room}
                                    onChange={(e) => dataChange("asigned_room", Number(e))}
                                    items={rooms}
                                 />
                              )}
                           </td>
                        </tr>
                        <tr >
                           <td className="modalTd" >Description</td>
                           <td className="modalTd" ><textarea className="formTextArea" onChange={(e) => dataChange("description", e.target.value)}></textarea></td>
                        </tr>
                     </tbody>
                  </table>
                  <div className="ModalActions mt-2">
                     <button type="button" className="modalRemove" onClick={() => {
                        setCreationModalData();
                        deleteEventFromCalendar(creationModalData);
                     }}>Cancel</button>

                     <button type="button" className="modalRemove" onClick={() => {
                        onSubmit(_data);
                        deleteEventFromCalendar(creationModalData);
                     }}>Save</button>

                  </div>
               </div>
            </div>
         </div >
      )
   }
   if (isAdmin) {
      return (
         <div className="animated fadeIn demo-app justify-content-end">
            <Modal />
            {creationModalData && (
               <CreationModal data={creationModalData} onSubmit={submitNewEvent} />)
            }
            <div className="row" style={{ justifyContent: "end" }}>
               <div className="col-xl-12 col-sm-12" >
                  <Card>
                     <Card.Body>
                        <div id="external-events" style={{ display: "flex" }}>
                           {_events.map((event) => (
                              <div
                                 draggable={true}
                                 ref={(ref) => createRef(event, ref)}
                                 data-id={event.id}
                                 style={{
                                    width: "fit-content", height: "50px", display: " flex",
                                    justifyContent: " center",
                                    alignItems: " center"
                                 }}
                                 className="fc-event mt-0 ms-0 mb-2 btn btn-block btn-primary eventButton"
                                 title={event.title}
                                 data={event.title}
                                 key={event.title}
                              >
                                 {event.title}
                              </div>
                           ))}
                        </div>
                        <div className="demo-app-calendar" id="mycalendartest">
                           <FullCalendar
                              defaultView="dayGridMonth"
                              header={{
                                 left: "prev,next today",
                                 center: "title",
                                 right:
                                    "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                              }}
                              rerenderDelay={10}
                              eventDurationEditable={false}
                              editable={true}
                              droppable={true}
                              plugins={[
                                 dayGridPlugin,
                                 timeGridPlugin,
                                 interactionPlugin,
                              ]}
                              ref={calendarComponentRef}
                              events={calendarEvents}
                              eventReceive={dropEvent}
                              eventChange={changeEvent}
                              eventClick={eventClick}
                           />
                        </div>
                     </Card.Body>
                  </Card>
               </div>
            </div>

         </div>

      );
   }

   return (
      <div className="animated fadeIn demo-app">
         <Row>
            <Col lg={3}>
               <Card>
                  <div className="card-header border-0 pb-0">
                     <h4 className="text-black fs-20 mb-0">Events</h4>
                  </div>
                  <Card.Body>
                     <div id="external-events">
                        {_events.map((event) => (
                           <div
                              className="fc-event mt-0 ms-0 mb-2 btn btn-block btn-primary"
                              title={event.title}
                              data={event.id}
                              key={event.id}
                           >
                              {event.title}
                           </div>
                        ))}
                     </div>
                  </Card.Body>
               </Card>
            </Col>


         </Row>
      </div>
   )
}
const mapStateToProps = (rootState) => {
   return {
      users: rootState.authData.users,
      events: rootState.eventsData.events,
      loadingById: rootState.eventsData.loadingById,
      isAdmin: rootState.authData.user && rootState.authData.user.user_type_id == 1,
      rooms: rootState.roomsData.rooms
   }
}

const mapDispatchToProps = {
   getEventsAction,
   createEvent: createEvent,
   updateEventByID,
   removeEvent: deleteEventByID,
   getRoomsAction

}
export default connect(mapStateToProps, mapDispatchToProps)(EventCalendar);