
const initialState = {
    posts: []
}

const GET_POSTS = 'GET_POSTS'

export function getPosts(payload) {
    return {
        type: GET_POSTS,
        payload
    }
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_POSTS:
            return { ...state, posts: payload }
        default:
            return { ...state }
    }
}