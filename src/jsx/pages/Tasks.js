import React from "react";
import TasksList from "../components/Dashboard/TasksList";
import TasksListFilter from "../components/Dashboard/TasksListFilter";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

const Tasks = ({ isAdmin }) => {
    const [filter, setFilter] = React.useState("All")
   
    const changeFilter = (newFilter) => {
        setFilter(newFilter)
    }
  
    return (
        <div className="row">
            {isAdmin && (
                <div className='buttonContainer' >
                    <Link to={"/task/new-task"} className='w-max-content'>
                        + New Task
                    </Link>
                </div>
            )}
            <div className="col-xl-12" >
              
                <TasksListFilter handleClick={changeFilter}></TasksListFilter>
                <TasksList filter={filter}></TasksList>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        isAdmin: state.authData.user && state.authData.user.user_type_id == 1

    };
};

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);






