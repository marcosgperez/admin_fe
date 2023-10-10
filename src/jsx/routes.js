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
import Task from "./components/Dashboard/Task";
export const linkData = [
    //Dashboard
    {
        title: 'Dashboard',
        classsChange: 'mm-collapse',
        iconStyle: <i className="fas fa-home" />,
        content: [
            {
                title: 'Reservations',
                to: 'guest-list',
            },
            {
                title: 'Staff List',
                to: 'concierge-list',
            },
            {
                title: 'Room List',
                to: 'room-list',
            },
            {
                title: 'Reviews',
                to: 'reviews',
            },
            {
                title: 'Task',
                to: 'task',
            },
        ],
    },

    //Charts
    {
        title: 'Charts',
        classsChange: 'mm-collapse',
        iconStyle: <i className="fas fa-chart-line"></i>,
        to: 'chart-rechart',
    },

    //Table
    {
        title: 'Table',
        classsChange: 'mm-collapse',
        iconStyle: <i className="fas fa-table"></i>,
        content: [
            {
                title: 'Table Filtering',
                to: 'table-filtering',
            },
            {
                title: 'Table Sorting',
                to: 'table-sorting',
            },
            {
                title: 'Bootstrap',
                to: 'table-bootstrap-basic',
            },
            {
                title: 'joaco',
                to: 'joaco-test',
            },



        ]
    },


    // urls
    { url: "/", component: <Home /> },
    { url: "joaco-test", name:"TITULOOOOO", component: <GuestList /> },
    { url: "dashboard-dark", component: <DashboardDark /> },
    { url: "guest-list", component: <GuestList /> },
    { url: "guest-details", component: <GuestDetails /> },
    { url: "concierge-list", component: <ConciergeList /> },
    { url: "room-list", component: <RoomList /> },
    { url: "reviews", component: <Reviews /> },
    { url: "task", component: <Task /> },
    /// Chart
    { url: "chart-rechart", component: <RechartJs /> },
    // Todo
    { url: "todo", component: <Todo /> },
    /// table
    { url: "table-filtering", component: <FilteringTable /> },
    { url: "table-sorting", component: <SortingTable /> },

    { url: "table-bootstrap-basic", component: <BootstrapTable /> },
]

