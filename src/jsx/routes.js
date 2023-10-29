import Home from "../components/Home"
import StaffList from "./components/Dashboard/StaffList";

import Tasks from "./pages/Tasks";

import TaskById from "./components/Dashboard/NewTask";
import StaffById from "./components/Dashboard/NewStaff";

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
    // Facilities
    // {
    //     title: 'Facilities',
    //     classsChange: 'mm-collapse',
    //     iconStyle: <i className="fas fa-table"></i>,
    //     to: "facilities"
    // },

    // urls
    { url: "/", component: <Home /> },
    // { url: "tasks/new-task", component: <TaskById /> },
    // { url: "staff/new-staff", component: <StaffById /> },
    // { url: "facilities/new-facilitie", component: <FacilitieById /> },
    { url: "task/:taskId", component: <TaskById /> },
    { url: "staff/:staffId", component: <StaffById /> },
    // { url: "facilitie/:facilitieId", component: <FacilitieById /> },
    // { url: "employee/:employeeId", component: <Reviews /> },
    // { url: "guest-list", component: <GuestList /> },
    // { url: "guest-details", component: <GuestDetails /> },
    { url: "staff", component: <StaffList /> },
    // { url: "room-list", component: <RoomList /> },
    // { url: "reviews", component: <Reviews /> },
    { url: "tasks", component: <Tasks /> },
    // { url: "task-detail", component: <TaskDetail/> },
    // { url: "facilities", component: <Facilities /> },

]

