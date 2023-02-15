import { User } from '@app/models/backend';
import { from } from 'rxjs';
import * as fromUser from './user.actions';

export interface UserState {
    entity: User;
    uid: string;
    loading: boolean;
    error: string;
}

const initialState: UserState = {
    entity: null,
    uid: null,
    loading: null,
    error: null,
};

export function reducer(state = initialState, action: fromUser.All): UserState {
    switch (action.type) {
        // Sign up
        case fromUser.Types.SIGN_UP_EMAIL:
            return {
                ...state,
                loading: true,
            };

        case fromUser.Types.SIGN_UP_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                uid: action.uid,
            };

        case fromUser.Types.SIGN_UP_EMAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        // Sign in
        case fromUser.Types.SIGN_IN_EMAIL:
            return {
                ...state,
                loading: true,
            };

        case fromUser.Types.SIGN_IN_EMAIL_SUCCESS:
            return {
                ...state,
                entity: action.user,
                loading: false,
                uid: action.uid,
                error: null,
            };

        case fromUser.Types.SIGN_IN_EMAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        // Sign out
        case fromUser.Types.SIGN_OUT:
            return {
                ...state,
                loading: true,
            };

        case fromUser.Types.SIGN_OUT_SUCCESS:
            return {
                ...initialState,
            };

        case fromUser.Types.SIGN_IN_EMAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        // Init
        case fromUser.Types.INIT:
            return {
                ...state,
                loading: true,
            };

        case fromUser.Types.INIT_AUTHORIZED:
            return {
                ...state,
                entity: action.user,
                uid: action.uid,
                loading: false,
                error: null,
            };

        case fromUser.Types.INIT_UNAUTHORIZED:
            return {
                ...state,
                entity: null,
                error: null,
                loading: false,
            };

        case fromUser.Types.INIT_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        default:
            break;
    }
}
