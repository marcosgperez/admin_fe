import Home from "../components/Home"
import GuestList from "./components/Dashboard/GuestList";
import GuestDetails from "./components/Dashboard/GuestDetails";
import ConciergeList from "./components/Dashboard/ConciergeList";
import RoomList from "./components/Dashboard/RoomList";
import Reviews from "./components/Dashboard/Reviews";
import TaskDetail from "./pages/TaskDetail";
import Tasks from "./pages/Tasks";

import Facilities from "./pages/Facilities";
import NewTask from "./components/Dashboard/NewTask";
import NewStaff from "./components/Dashboard/NewStaff";
import NewFacilitie from "./components/Dashboard/NewFacilitie";
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
        iconStyle: <i className="fas fa-chart-line"></i>,
        to: 'tasks',
    },

    // staff
    {
        title: 'Staff',
        classsChange: 'mm-collapse',
        iconStyle: <i className="fas fa-table"></i>,
        to: "staff"
    },
    // Facilities
    {
        title: 'Facilities',
        classsChange: 'mm-collapse',
        iconStyle: <i className="fas fa-table"></i>,
        to: "facilities"
    },

    // urls
    { url: "/", component: <Home /> },
    { url: "tasks/new-task", component: <NewTask /> },
    { url: "staff/new-staff", component: <NewStaff /> },
    { url: "facilities/new-facilitie", component: <NewFacilitie /> },
    { url: "task/:taskId", component: <Reviews /> },
    { url: "employee/:employeeId", component: <Reviews /> },
    { url: "guest-list", component: <GuestList /> },
    { url: "guest-details", component: <GuestDetails /> },
    { url: "staff", component: <ConciergeList /> },
    { url: "room-list", component: <RoomList /> },
    { url: "reviews", component: <Reviews /> },
    { url: "tasks", component: <Tasks /> },
    { url: "task-detail", component: <TaskDetail /> },
    { url: "facilities", component: <Facilities /> },

]

