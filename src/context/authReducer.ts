import { cloneState } from './utils'

export interface AuthState  {
    clientId: number,
    tester: string | null,
    isLoggedIn: boolean;
    email: string | null;
    userId: number | null;
    token: string | null;
    name: string | null
}

type AuthAction = {
    type: "LOGIN", email: string, name: string, clientId: number, tester: string, userId: string, token: string, payload: any
} | { type: "LOGOUT" }
 
export const initialState : AuthState = {
    isLoggedIn: false,
    email: null,
    clientId: 123456789,
    tester: null,
    userId: null,
    token: null,
    name: null
}

export const authReducer = (state: AuthState, action: AuthAction) => {
    const clonedState: AuthState = cloneState(state)

    switch (action.type) {
        case 'LOGIN': {
            const { email, name, clientId, tester, userId, token } = action.payload;
            console.log("email", email)
            Object.assign(clonedState, {
                email,
                name,
                clientId,
                tester,
                userId,
                token,
                isLoggedIn: true
            })
            // Save auth state to localStorage
            localStorage.setItem("userInfo", JSON.stringify(clonedState))
            return clonedState
        }
            
        case "LOGOUT":
            localStorage.removeItem("userInfo")
            return {
                ...clonedState,
                email: null,
                username: null,
                isLoggedIn: false
            }
        default:
            throw new Error("No action provided!")
    }
}