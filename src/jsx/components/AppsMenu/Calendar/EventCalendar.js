import React, { Component } from "react";
import { Col, Row, Card } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { getEventsAction } from "../../../../store/actions/EventsActions";
import { connect } from 'react-redux';
const EventCalendar = ({ eventsData, getEventsAction }) => {
   const { loading, error, events } = eventsData
   const [modalData, setModalData] = React.useState();

   React.useEffect(() => {
      getEventsAction()
   }, [])

   const calendarComponentRef = React.useRef();
   const calendarEventsRef = React.useRef({});

   console.log(events, "eventos")

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
      // let admin = true
      // Alert.fire({
      //    title: eventClick.event.title,
      //    html:
      //       `<div className="table-responsive">
      // <table className="table">
      // <tbody>
      // <tr >
      // <td>Title</td>
      // <td><strong>` +
      //       eventClick.event.title +
      //       `</strong></td>
      // </tr>
      // <tr >
      // <td>Start Time</td>
      // <td><strong>
      // ` +
      //       eventClick.event.start +
      //       `
      // </strong></td>
      // </tr>
      // </tbody>
      // </table>
      // </div>`,

      //    showCancelButton: true,
      //    showDenyButton: true,
      //    showConfirmButton: admin,
      //    confirmButtonColor: "#c96161",
      //    cancelButtonColor: "#fcaea9",
      //    confirmButtonText: "Remove Event",
      //    cancelButtonText: "Close",
      //    denyButtonText: "go to task",
      //    denyButtonColor: "#c96161"
      // }).then((result) => {
      //    if (result.value) {
      //       eventClick.event.remove(); // It will remove event from the calendar
      //       Alert.fire("Deleted!", "Your Event has been deleted.", "success");
      //    }
      // });
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
         // itemSelector: ".fc-event",
         eventData: function (eventEl) {
            let title = event.title;
            let id = event.id;
            return {
               title: title,
               id: id,
            };
         },
      });
      return event
   }

   let admin = true
   const Modal = () => {
      if (!modalData) return <></>
      const { title, start, id } = modalData
      console.log("Barto", title, start, id)
      return (
         <div className="ModalWrapper">
            <div className="ModalMask"></div>
            <div className="Modal">
               <div className="table-responsive">
                  <table className="table">
                     <tbody>
                        <tr >
                           <td>Title</td>
                           <td><strong>{title}</strong></td>
                        </tr>
                        <tr >
                           <td>Start Time</td>
                           <td><strong>{start.toDateString()}</strong></td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div className="ModalActions">
                  <button onClick={() => setModalData()}>Close</button>
               </div>
            </div>
         </div>
      )
   }
   if (admin && loading === false) {
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
                                 {events.map((event) => (
                                    <div draggable={true} ref={(ref) => createRef(event, ref)} data-id={event.id} style={{ width: "fit-content", height: "50px" }}
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
                              // weekends={this.state.calendarWeekends}
                              events={calendarEvents}
                              // eventDrop={drop}
                              // drop={drop}
                              eventReceive={console.log}
                              eventClick={eventClick}
                           // selectable={true}
                           />
                        </div>
                     </Card.Body>
                  </Card>
               </div>
            </div>

         </div>
      );
   }
   if (loading === false && admin === false)
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
                           {events.map((event) => (
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
   console.log(rootState, "rootState")
   return {
      eventsData: rootState.eventsData
   }
}

const mapDispatchToProps = {
   getEventsAction
}
export default connect(mapStateToProps, mapDispatchToProps)(EventCalendar);