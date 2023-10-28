import Home from "../components/Home"
import DashboardDark from "./components/Dashboard/DashboardDark";
import GuestList from "./components/Dashboard/GuestList";
import GuestDetails from "./components/Dashboard/GuestDetails";
import StaffList from "./components/Dashboard/StaffList";
import TasksList from "./components/Dashboard/TasksList";
import Reviews from "./components/Dashboard/Reviews";
import RechartJs from "./components/charts/rechart";
import Todo from "./pages/Todo";
import FilteringTable from "./components/table/FilteringTable/FilteringTable";
import SortingTable from "./components/table/SortingTable/SortingTable";
import BootstrapTable from "./components/table/BootstrapTable";
import TaskDetail from "./pages/TaskDetail";
import Tasks from "./pages/Tasks";
import Facilities from "./pages/Facilities";

export const EmployeeLinkData = [
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

    // Facilities
    // {
    //     title: 'Facilities',
    //     classsChange: 'mm-collapse',
    //     iconStyle: <i className="fas fa-table"></i>,
    //     to: "facilities"
    // },

    // urls
    // { url: "/", component: <Home /> },
    // { url: "dashboard-dark", component: <DashboardDark /> },
    // { url: "guest-list", component: <GuestList /> },
    // { url: "guest-details", component: <GuestDetails /> },
    // { url: "room-list", component: <TasksList /> },
    { url: "task", component: <Tasks /> },
    // { url: "task-detail", component: <TaskDetail /> },
    // { url: "facilities", component: <Facilities /> },

    /// Chart
    // { url: "chart-rechart", component: <RechartJs /> },
    // Todo
    // { url: "todo", component: <Todo /> },
    /// table

]

