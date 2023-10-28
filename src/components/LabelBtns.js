import React from "react";

export const LabelBtns = ({state, extraClassName = ""}) => {
    const matchState = {
        "On Progress": "rowBtn-On-Progress",
        "Done" : "rowBtn-Done",
        "Not finished" : "rowBtn-Not-finished",

        "Available" : "btn btn-success",
        
        "Active" : "rowBtn-Done",
        "Inactive" : "rowBtn-Not-finished",

        "Completed" : "rowBtn-Done",
        "Pending" : "rowBtn-On-Progress",
    }

    return (<label className={`${matchState[state]} ${extraClassName}`}>{state}</label>)
}