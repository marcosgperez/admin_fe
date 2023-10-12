import React from "react"


const CalendarEvent = ({ title, start }) => {
    return (
        <div className="modalContainer">
            <div className="modalTexts">
                <div className="titleContainer">
                    Title:{title}
                </div>
                <div className="startContainer">
                    Start:{start}
                </div>

                <div className="startContainer">
                    Time:"GMT-3"
                </div>
            </div>
            <div className="modalButtons">
                <button >Go To Event</button>
                <button >Remove Event</button>
                <button >Close</button>
            </div>
        </div>
    )
}

export default CalendarEvent