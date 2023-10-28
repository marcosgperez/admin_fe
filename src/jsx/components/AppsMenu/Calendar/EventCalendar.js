import React, { Component } from "react";
import { Col, Row, Card } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import { Link } from "react-router-dom";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { getEventsAction, deleteEvents, updateEvents } from "../../../../store/actions/EventsActions";
import { connect } from 'react-redux';
const EventCalendar = ({ eventsData, getEventsAction, updateEvents, isAdmin }) => {
   const { loading, error, events } = eventsData
   const [modalData, setModalData] = React.useState();
   const [_events, set_Events] = React.useState()
   React.useEffect(() => {
      getEventsAction()
   }, [])
   React.useEffect(() => {
      set_Events(events)
   }, [events])


   const removeEvent = (id) => {
      let events = _events.filter((current) => current.id !== id)
      set_Events(events)
      updateEvents(_events)
      setModalData()
   };


   const calendarComponentRef = React.useRef();
   const calendarEventsRef = React.useRef({});


   React.useEffect(() => {
      getEventsAction()
   }, [])
   const [calendarEvents, setCalendarEvents] = React.useState(events)
   const eventClick = (eventClick) => {
      setModalData({
         id: eventClick.event.id,
         title: eventClick.event.title,
         start: eventClick.event.start,
      })

   };

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
      const { title, start, id } = modalData
      return (
         <div className="ModalWrapper">
            <div className="ModalMask"></div>
            <div className="Modal">
               <div className="table-responsive">
                  <div className="titleContainer">
                     <div>{title}</div>
                  </div>
                  <table className="table">
                     <tbody>
                        <tr >
                           <td className="modalTd" >Title</td>
                           <td className="modalTd" ><strong>{title}</strong></td>
                        </tr>
                        <tr >
                           <td className="modalTd" >Start Time</td>
                           <td className="modalTd" ><strong>{start.toDateString()}</strong></td>
                        </tr>
                     </tbody>
                  </table>
                  <div className="ModalActions">
                     <Link className="modalGo" >Go to task</Link>
                     <button className="modalRemove" onClick={() => removeEvent(1)}>Remove Task</button>
                     <button className="modalClose" onClick={() => setModalData()}>Close</button>
                  </div>
               </div>
            </div>
         </div>
      )
   }
   if (isAdmin && !loading && _events !== undefined) {
      return (
         <div className="animated fadeIn demo-app justify-content-end">
            <Modal />
            <div className="row" style={{ justifyContent: "end" }}>
               <div className="col-xl-12 col-sm-12" >
                  <Row style={{ height: "200px" }} className="justify-content-end">
                     <div className="col-xl-12" >
                        <Card >
                           <div className="card-header border-0 pb-0">
                              <h4 className="text-black fs-20 mb-0">Events</h4>
                           </div>
                           <Card.Body style={{ overflow: "scroll" }}>
                              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "start" }} id="external-events">
                                 {
                                    _events !== undefined && _events.map((event) => (
                                       <div
                                          draggable={true}
                                          ref={(ref) => createRef(event, ref)}
                                          data-id={event.id}
                                          style={{ width: "fit-content", height: "50px" }}
                                          className="fc-event mt-0 ms-0 mb-2 btn btn-block btn-primary"
                                          title={event.title}
                                          data={event.id}
                                          key={event.id}
                                       >
                                          {event.title}
                                       </div>
                                    ))
                                 }
                              </div>
                           </Card.Body>
                        </Card>
                     </div>
                  </Row>
                  <Card>
                     <Card.Body>
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
                              eventReceive={console.log}
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
   if (loading === false && isAdmin === false && _events !== undefined)
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

               <Col lg={9}>
                  <Card>
                     <Card.Body>
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
                              // weekends={this.state.calendarWeekends}
                              events={calendarEvents}
                              // eventDrop={this.drop}
                              // drop={this.drop}
                              // eventReceive={this.eventReceive}
                              eventClick={eventClick}
                           // selectable={true}
                           />
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
      eventsData: rootState.eventsData,
      isAdmin: rootState.authData.user && rootState.authData.user.user_type_id == 1

   }
}

const mapDispatchToProps = {
   getEventsAction,
   deleteEvents,
   updateEvents
}
export default connect(mapStateToProps, mapDispatchToProps)(EventCalendar);