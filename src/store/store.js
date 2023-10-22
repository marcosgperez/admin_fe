import { applyMiddleware, combineReducers, compose, createStore, } from 'redux';
import thunk from 'redux-thunk';
import { RoomsReducer } from './reducers/RoomsReducer';
import { TasksReducer } from './reducers/TasksReducer';
import { AuthReducer } from './reducers/AuthReducer';
import { EventsReducer } from './reducers/EventsReducer';
import { UserReducer } from './reducers/UserReducer';

//import { reducer as reduxFormReducer } from 'redux-form';
const middleware = applyMiddleware(thunk);

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    roomsData: RoomsReducer,
    tasksData: TasksReducer,
    authData: AuthReducer,
    eventsData: EventsReducer,
    userData: UserReducer,
});

//const store = createStore(rootReducers);

export const store = createStore(reducers, composeEnhancers(middleware));
