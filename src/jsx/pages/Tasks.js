import React from "react";
import TasksList from "../components/Dashboard/TasksList";
import TasksListFilter from "../components/Dashboard/TasksListFilter";

const Tasks = () => {
    const [filter, setFilter] = React.useState("All")
    const changeFilter = (newFilter) => {
        setFilter(newFilter)
    }
    return (
        <div className="row">
            <div className="col-xl-12" >
                <TasksListFilter handleClick={changeFilter}></TasksListFilter>
                <TasksList filter={filter}></TasksList>
            </div>
        </div>
    )
}
export default Tasks