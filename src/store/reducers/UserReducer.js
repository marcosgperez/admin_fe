import {
    IDENTIFY_ME,
    IDENTIFY_ME_FAILED,
} from '../actions/UserActions';

const initialState = {
    user: {
        id: '',
        name: '',
        surname: '',
        email: '',
        user_type_id: '',
        external_client_id: '',
        external_client: '',
        user_type: '',
        profile_pic: '',
        profile_initials: '',
        profile_color: '',
    }
};

export function UserReducer(state = initialState, action) {
    if (action.type === IDENTIFY_ME) {
        return {
            ...state,
            user: {
                id: action.payload.id,
                name: action.payload.name,
                surname: action.payload.surname,
                email: action.payload.email,
                user_type_id: action.payload.user_type_id,
                external_client_id: action.payload.external_client_id,
                externalClient: action.payload.external_client,
                userType: action.payload.user_type,
                profile_pic: action.payload.profile_pic,
                profile_initials: action.payload.profile_initials,
                profile_color: action.payload.profile_color,
            }
        };
    }
    if (action.type === IDENTIFY_ME_FAILED) {
        return {
            ...state,
            user: {
                id: '',
                name: '',
                surname: '',
                email: '',
                user_type_id: '',
                external_client_id: '',
                external_client: '',
                user_type: '',
                profile_pic: '',
                profile_initials: '',
                profile_color: '',
            }
        };
    }
    return state;
}

    
