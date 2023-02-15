import { User } from '@app/models/backend';
import { Action } from '@ngrx/store';
import { EmailPasswordCredentials } from './user.models';

export enum Types {
    SIGN_UP_EMAIL = '[User] Sign up with email: Start',
    SIGN_UP_EMAIL_SUCCESS = '[User] Sign up with email: Success',
    SIGN_UP_EMAIL_ERROR = '[User] Sign up with email: Error',

    SIGN_IN_EMAIL = '[User] Sign in with email: Start',
    SIGN_IN_EMAIL_SUCCESS = '[User] Sign in with email: Success',
    SIGN_IN_EMAIL_ERROR = '[User] Sign in with email: Error',

    SIGN_OUT = '[User] Sign out: Start',
    SIGN_OUT_SUCCESS = '[User] Sign out: Success',
    SIGN_OUT_ERROR = '[User] Sign out: Error',

    INIT = '[User] Init: Start',
    INIT_AUTHORIZED = '[User] Init: Authorized',
    INIT_UNAUTHORIZED = '[User] Init: UnAuthorized',
    INIT_ERROR = '[User] Init: Error',
}

// SIGN UP
export class SignUpEmail implements Action {
    readonly type = Types.SIGN_UP_EMAIL;
    constructor(public payload: EmailPasswordCredentials) {}
}

export class SignUpEmailSuccess implements Action {
    readonly type = Types.SIGN_UP_EMAIL_SUCCESS;
    constructor(public uid: string) {}
}

export class SignUpEmailError implements Action {
    readonly type = Types.SIGN_UP_EMAIL_ERROR;
    constructor(public error: string) {}
}

// SIGN IN
export class SignInEmail implements Action {
    readonly type = Types.SIGN_IN_EMAIL;
    constructor(public payload: EmailPasswordCredentials) {}
}

export class SignInEmailSuccess implements Action {
    readonly type = Types.SIGN_IN_EMAIL_SUCCESS;
    constructor(public uid: string, public user: User) {}
}

export class SignInEmailError implements Action {
    readonly type = Types.SIGN_IN_EMAIL_ERROR;
    constructor(public error: string) {}
}

// SIGN OUT
export class SignOut implements Action {
    readonly type = Types.SIGN_OUT;
    constructor() {}
}

export class SignOutSuccess implements Action {
    readonly type = Types.SIGN_OUT_SUCCESS;
    constructor() {}
}

export class SignOutError implements Action {
    readonly type = Types.SIGN_OUT_ERROR;
    constructor(public error: string) {}
}

// INIT
export class Init implements Action {
    readonly type = Types.INIT;
    constructor() {}
}

export class InitAuthorized implements Action {
    readonly type = Types.INIT_AUTHORIZED;
    constructor(public uid: string, public user: User) {}
}

export class InitUnAuthorized implements Action {
    readonly type = Types.INIT_UNAUTHORIZED;
    constructor() {}
}

export class InitError implements Action {
    readonly type = Types.INIT_ERROR;
    constructor(public error: string) {}
}

export type All =
    | SignUpEmail
    | SignUpEmailSuccess
    | SignUpEmailError
    | SignInEmail
    | SignInEmailSuccess
    | SignInEmailError
    | SignOut
    | SignOutSuccess
    | SignOutError
    | Init
    | InitAuthorized
    | InitUnAuthorized
    | InitError;
