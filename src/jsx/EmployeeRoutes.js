import Tasks from "./pages/Tasks";
import { } from "../store/actions/TasksActions";
import TaskById from "./components/Dashboard/NewTask";
export const EmployeeLinkData = [
    {
        title: 'Tasks',
        classsChange: 'mm-collapse',
        iconStyle: <i className="fas fa-chart-line"></i>,
        to: 'tasks',
    },

    { url: "/", component: <Tasks /> },

    { url: "task/:taskId", component: <TaskById /> },
]

