import React from "react";
import TasksList from "../components/Dashboard/TasksList";
import TasksListFilter from "../components/Dashboard/TasksListFilter";
import { Link } from 'react-router-dom';

const Tasks = () => {
    const [filter, setFilter] = React.useState("All")
    const changeFilter = (newFilter) => {
        setFilter(newFilter)
    }
    return (
        <div className="row">
            <div className='buttonContainer' >
              <Link to={"/task/new-task"} className='w-max-content'>
                + New Task
              </Link>
            </div>
            <div className="col-xl-12" >
                <TasksListFilter handleClick={changeFilter}></TasksListFilter>
                <TasksList filter={filter}></TasksList>
            </div>
        </div>
    )
}
export default Tasks