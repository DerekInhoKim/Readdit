import {SET_COMMENTS, ADD_COMMENT} from '../actions/comments'

const initialState = {}

const commentReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_COMMENTS:
            return {...action.user};
        case ADD_COMMENT:
            return {...state, ...action.comment}
        default: {
            return state
        }
    }
}

export default commentReducer
