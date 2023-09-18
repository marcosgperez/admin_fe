import { applyMiddleware, combineReducers, compose,createStore,} from 'redux';
import PostsReducer from './reducers/PostsReducer';
import thunk from 'redux-thunk';
import { AuthReducer } from './reducers/AuthReducer';
import todoReducers from './reducers/Reducers';
import { UserReducer } from './reducers/UserReducer';
import { RoomsReducer } from './reducers/RoomsReducer';
//import { reducer as reduxFormReducer } from 'redux-form';
const middleware = applyMiddleware(thunk);

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    posts: PostsReducer,
    auth: AuthReducer,
		todoReducers,
    userData: UserReducer,
    roomsData: RoomsReducer,
	//form: reduxFormReducer,	
});

//const store = createStore(rootReducers);

export const store = createStore(reducers,  composeEnhancers(middleware));
