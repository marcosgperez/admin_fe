import Home from "../components/Home"
import StaffList from "./components/Dashboard/StaffList";
import RoomList from "./components/Dashboard/RoomList";

import Tasks from "./pages/Tasks";

import TaskById from "./components/Dashboard/NewTask";
import StaffById from "./components/Dashboard/NewStaff";
import RoomById from "./components/Dashboard/NewRoom";

// import TaskList from "./Dashboard/RoomList";
export const linkData = [
    //Dashboard
    {
        title: 'Dashboard',
        classsChange: 'mm-collapse',
        iconStyle: <i className="fas fa-home" />,
        to: "/"
    },

    //Tasks
    {
        title: 'Tasks',
        classsChange: 'mm-collapse',
        iconStyle: <i className="fas fa-broom"></i>,
        to: 'tasks',
    },

    // staff
    {
        title: 'Staff',
        classsChange: 'mm-collapse',
        iconStyle: <i className="fas fa-table"></i>,
        to: "staff"
    },

    {
        title: 'Rooms',
        classsChange: 'mm-collapse',
        iconStyle: <i className="fas fa-door-open"></i>,
        to: "rooms"
    },
  
    { url: "/", component: <Home /> },
  
    { url: "task/:taskId", component: <TaskById /> },
    { url: "staff/:staffId", component: <StaffById /> },
    { url: "rooms/:roomId", component: <RoomById /> },

    { url: "staff", component: <StaffList /> },

    { url: "tasks", component: <Tasks /> },

    { url: "rooms", component: <RoomList /> }


]

