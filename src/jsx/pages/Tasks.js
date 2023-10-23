import react from "react-select";
import RoomList from "../components/Dashboard/RoomList";
import RoomListFilter from "../components/Dashboard/RoomListFilter";
import { useState, useEffect } from "react";
const Tasks = () => {
    const [filter, setFilter] = useState("all")
    const changeFilter = (newFilter) => {
        setFilter(newFilter)
    }
    useEffect(() => {
        console.log(filter, "filter")
    }, [filter])
    return (
        <div className="row">
            <div className="col-xl-12" >
                <RoomListFilter handleClick={changeFilter}></RoomListFilter>
                <RoomList filter={filter} ></RoomList>
            </div>
        </div>
    )
}
export default Tasks