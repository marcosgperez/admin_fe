import React, { Component } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import TaskList from "../../Dashboard/RoomList";
class EventCalendar extends Component {
   state = {
      calendarEvents: [
         {
            title: "Atlanta Monster",
            start: new Date("20123-04-04 00:00"),
            id: "99999998",
         },
         {
            title: "Atlanta Monster",
            start: new Date("2023-04-14 00:00"),
            id: "99999998",
         },
         {
            title: "My Favorite Murder",
            start: new Date("2023-04-25 10:00"),
            id: "99999999",
         },
         {
            title: "My Favorite Murder",
            start: new Date("2023-05-01 10:00"),
            id: "99999999",
         },
         {
            title: "My Favorite Murder",
            start: new Date("2023-05-11 10:00"),
            id: "99999999",
         },
         {
            title: "My Favorite Murder",
            start: new Date("2023-05-20 12:00"),
            id: "99999999",
         },
         {
            title: "My Favorite Murder",
            start: new Date("2023-05-25 09:00"),
            id: "99999999",
         },
      ],
      events: [
         { title: "Event 1", id: "1" },
         { title: "Event 2", id: "2" },
         { title: "Event 3", id: "3" },
         { title: "Event 4", id: "4" },
         { title: "Event 5", id: "5" },
         { title: "Event 5", id: "5" },
         { title: "Event 5", id: "5" },
         { title: "Event 5", id: "5" },
      ],
   };

   /**
    * adding dragable properties to external events through javascript
    */
   componentDidMount() {
      let draggableEl = document.getElementById("external-events");
      new Draggable(draggableEl, {
         itemSelector: ".fc-event",
         eventData: function (eventEl) {
            let title = eventEl.getAttribute("title");
            let id = eventEl.getAttribute("data");
            return {
               title: title,
               id: id,
            };
         },
      });
   }


   /**
    * when we click on event we are displaying event details
    */
   eventClick = (eventClick) => {

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
         confirmButtonColor: "#d33",
         cancelButtonColor: "#dbccbf",
         confirmButtonText: "Remove Event",
         denyButtonText: "Go to Event",
         cancelButtonText: "Close",
      }).then((result) => {
         if (result.value) {
            eventClick.event.remove(); // It will remove event from the calendar
            Alert.fire("Deleted!", "Your Event has been deleted.", "success");
         }
      });


   }

   render() {
      return (
         <div className="animated fadeIn demo-app">
            <Row className="justify-content-end" >
               <div className="col-xl-6">
                  <TaskList/>
               </div>
               <div className="col-xl-6">
                  <Card style={{height:"1000px"}}> 
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
                              ref={this.calendarComponentRef}
                              weekends={this.state.calendarWeekends}
                              events={this.state.calendarEvents}
                              eventDrop={this.drop}
                              // drop={this.drop}
                              eventReceive={this.eventReceive}
                              eventClick={this.eventClick}
                              selectable={true}
                           />
                           {/* <CalendarEvent title={"no c bro"} start={"NO C BRO;AYER CREO"}/> */}
                        </div>
                     </Card.Body>
                  </Card>
               </div>

            </Row>
            <Row style={{ height: "200px" }} className="justify-content-end">
               <div className="col-xl-6">
                  <Card>
                     <div className="card-header border-0 pb-0">
                        <h4 className="text-black fs-20 mb-0">Events</h4>
                     </div>
                     <Card.Body style={{ overflow: "auto" }}>
                        <div style={{ display: "flex" }} id="external-events">
                           {this.state.events.map((event) => (
                              <div style={{ minWidth: "140px", height: "50px" }}
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
}

export default EventCalendar;
