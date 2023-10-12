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
        to: 'task',
    },

    // staff
    {
        title: 'Staff',
        classsChange: 'mm-collapse',
        iconStyle: <i className="fas fa-table"></i>,
        to: "table-sorting"
    },
    // Facilities
    {
        title: 'Facilities',
        classsChange: 'mm-collapse',
        iconStyle: <i className="fas fa-table"></i>,
        to: "concierge-list"
    },

    // urls
    { url: "/", component: <Home /> },
    { url: "dashboard-dark", component: <DashboardDark /> },
    { url: "guest-list", component: <GuestList /> },
    { url: "guest-details", component: <GuestDetails /> },
    { url: "concierge-list", component: <ConciergeList /> },
    { url: "room-list", component: <RoomList /> },
    { url: "reviews", component: <Reviews /> },
    { url: "task", component: <TaskList /> },
    /// Chart
    { url: "chart-rechart", component: <RechartJs /> },
    // Todo
    { url: "todo", component: <Todo /> },
    /// table
    { url: "table-filtering", component: <FilteringTable /> },
    { url: "table-sorting", component: <SortingTable /> },

    { url: "table-bootstrap-basic", component: <BootstrapTable /> },
]

