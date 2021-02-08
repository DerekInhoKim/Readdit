import {SET_COMMENTS, ADD_COMMENT} from '../actions/comments'

const initialState = {}

const commentReducer = (state = initialState, action) => {
    // debugger;
    switch(action.type){
        case SET_COMMENTS:
            // debugger;
            return {...action.comments};
        case ADD_COMMENT:
            return {...state, [action.comment.id]: action.comment}
        default: {
            return state
        }
    }
}

export default commentReducer
