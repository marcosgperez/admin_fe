import React, { Component } from "react";
import { Col, Row, Card } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import EmployeeEventCalendar from "./EmployeeEventCalendar";

const EventCalendar = () => {
   const calendarComponentRef = React.useRef();
   const calendarEventsRef = React.useRef({});

   const [calendarEvents, setCalendarEvents] = React.useState([
      {
         title: "Atlanta Monster",
         start: new Date("20123-04-04 00:00"),
         id: "99999998",
      },
      {
         title: "Atlanta Monster",
         start: new Date("2023-04-14 00:00"),
         id: "99999997",
      },
      {
         title: "My Favorite Murder",
         start: new Date("2023-04-25 10:00"),
         id: "99999996",
      },
      {
         title: "My Favorite Murder",
         start: new Date("2023-05-01 10:00"),
         id: "99999995",
      },
      {
         title: "My Favorite Murder",
         start: new Date("2023-05-11 10:00"),
         id: "99999994",
      },
      {
         title: "My Favorite Murder",
         start: new Date("2023-05-20 12:00"),
         id: "99999993",
      },
      {
         title: "My Favorite Murder",
         start: new Date("2023-05-25 09:00"),
         id: "99999992",
      },
   ])
   const [events, setEvents] = React.useState([
      { title: "Event 1", id: "1" },
      { title: "Event 2", id: "2" },
      { title: "Event 3", id: "3" },
      { title: "Event 4", id: "4" },
      { title: "Event 5", id: "5" },
      { title: "Event 6", id: "6" },
      { title: "Event 7", id: "7" },

   ])


   /**
    * adding dragable properties to external events through javascript
    */
   React.useEffect(() => {
      setTimeout(() => {
         setEvents([
            { title: "Event 1", id: "1" },
            { title: "Event 2", id: "2" },
            { title: "Event 3", id: "3" },
            { title: "Event 4", id: "4" },
            { title: "Event 5", id: "5" },
            { title: "Event 6", id: "6" },
            { title: "Event 7", id: "7" },
            { title: "Event 8", id: "8" },
         ])
      }, 2000)

   }, [])

   /**
    * when we click on event we are displaying event details
    */
   const eventClick = (eventClick) => {
      let admin = true
      Alert.fire({
         title: eventClick.event.title,
         html:
            `<div className="table-responsive">
      <table className="table">
      <tbody>
      <tr >
      <td>Title</td>
      <td><strong>` +
            eventClick.event.title +
            `</strong></td>
      </tr>
      <tr >
      <td>Start Time</td>
      <td><strong>
      ` +
            eventClick.event.start +
            `
      </strong></td>
      </tr>
      </tbody>
      </table>
      </div>`,

         showCancelButton: true,
         showDenyButton: true,
         showConfirmButton: admin,
         confirmButtonColor: "#c96161",
         cancelButtonColor: "#fcaea9",
         confirmButtonText: "Remove Event",
         cancelButtonText: "Close",
         denyButtonText: "go to task",
         denyButtonColor: "#c96161"
      }).then((result) => {
         if (result.value) {
            eventClick.event.remove(); // It will remove event from the calendar
            Alert.fire("Deleted!", "Your Event has been deleted.", "success");
         }
      });
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

   if (admin) {
      return (
         <div className="animated fadeIn demo-app justify-content-end">
            <div className="row" style={{ justifyContent: "end" }}>
               <div className="col-xl-12 col-sm-12" >
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
            <Row style={{ height: "200px" }} className="justify-content-end">
               <div className="col-xl-12" >
                  <Card >
                     <div className="card-header border-0 pb-0">
                        <h4 className="text-black fs-20 mb-0">Events</h4>
                     </div>
                     <Card.Body style={{ overflow: "scroll" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "start" }} id="external-events">
                           {events.map((event) => (
                              <div draggable={true} ref={(ref) => createRef(event, ref)} data-id={event.id} style={{ width: "fit-content", height: "50px", backgroundColor: "#c96161" }}
                                 
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

export default EventCalendar;