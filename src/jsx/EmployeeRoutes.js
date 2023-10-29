import Tasks from "./pages/Tasks";

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

