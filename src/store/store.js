import { applyMiddleware, combineReducers, compose,createStore,} from 'redux';
import thunk from 'redux-thunk';
import { RoomsReducer } from './reducers/RoomsReducer';
import { TasksReducer } from './reducers/TasksReducer';
import { AuthReducer } from './reducers/AuthReducer';
const middleware = applyMiddleware(thunk);

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    roomsData: RoomsReducer,
    tasksData: TasksReducer,
    authData: AuthReducer,
});

export const store = createStore(reducers,  composeEnhancers(middleware));
