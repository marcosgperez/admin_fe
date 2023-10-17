import react from "react-select";
import RoomList from "../components/Dashboard/RoomList";
import RoomListFilter from "../components/Dashboard/RoomListFilter";
const Tasks = () => {
    
    
    return (
        <div className="row">
            <div className="col-xl-12" >
                <RoomListFilter></RoomListFilter>
                <RoomList></RoomList>
            </div>
        </div>
    )
}
export default Tasks