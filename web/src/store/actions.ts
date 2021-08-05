

export type State = {
    isLoggedIn: boolean,
    displayName: string,
    email: string,
    authToken: string,
};

export enum ActionKind {
    LOGIN = 'login',
    LOGOUT = 'logout',
}

export type Action =
    | { type: ActionKind.LOGIN; authToken: string }
    | { type: ActionKind.LOGOUT }


export function storeReducer(state: State, action: Action): State {
    switch (action.type) {
        case ActionKind.LOGIN:
            localStorage.setItem("auth", action.authToken);
            return { ...state, isLoggedIn: true, authToken: action.authToken }
        case ActionKind.LOGOUT:
            localStorage.setItem("auth", "");
            return { ...state, isLoggedIn: false, authToken: "" }
        default:
            throw new Error("Invalid action.");
    }
}