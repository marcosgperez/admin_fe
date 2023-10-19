import Home from "../components/Home"
import DashboardDark from "./components/Dashboard/DashboardDark";
import GuestList from "./components/Dashboard/GuestList";
import GuestDetails from "./components/Dashboard/GuestDetails";
import ConciergeList from "./components/Dashboard/ConciergeList";
import RoomList from "./components/Dashboard/RoomList";
import Reviews from "./components/Dashboard/Reviews";
import RechartJs from "./components/charts/rechart";
import Todo from "./pages/Todo";
import FilteringTable from "./components/table/FilteringTable/FilteringTable";
import SortingTable from "./components/table/SortingTable/SortingTable";
import BootstrapTable from "./components/table/BootstrapTable";
import TaskList from "./components/Dashboard/RoomList";
import TaskDetail from "./pages/TaskDetail";
import Tasks from "./pages/Tasks";
import Facilities from "./pages/Facilities";
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
    // {
    //     title: 'Tasks Id',
    //     classsChange: 'mm-collapse',
    //     iconStyle: <i className="fas fa-chart-line"></i>,
    //     to: 'task/:taskId',
    // },


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
    { url: "/:taskId", component: <Reviews /> },
    { url: "guest-list", component: <GuestList /> },
    { url: "guest-details", component: <GuestDetails /> },
    { url: "staff", component: <ConciergeList /> },
    { url: "room-list", component: <RoomList /> },
    { url: "reviews", component: <Reviews /> },
    { url: "tasks", component: <Tasks /> },
    { url: "task-detail", component: <TaskDetail /> },
    { url: "facilities", component: <Facilities /> },

]

