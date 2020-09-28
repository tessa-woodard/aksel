import axios from 'axios'

const initialState = {
    email: '',
    id: 0,
    profile_picture: ''
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const GET_USER = 'GET_USER'

export function loginUser(email, id) {
    return {
        type: LOGIN_USER,
        payload: {
            email: email,
            id: id,
        }
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
        payload: null,
    }
}

export function getUser() {
    const payload = axios.get('/api/auth/user')

    return {
        type: GET_USER,
        payload: payload,
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            const { email, id, profile_picture } = action.payload.username
            return { email, id, profile_picture }
        case LOGOUT_USER:
            return initialState
        case GET_USER + '_PENDING':
            return { ...state }
        case GET_USER + '_FULFILLED':
            return { email, id, profile_picture }
        case GET_USER + '_REJECTED':
            return initialState
        default:
            return initialState
    }
}