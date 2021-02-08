export const SET_COMMENTS = 'SET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';

export const setUpComments = (comments) => {
    // debugger;
    return {
        type: SET_COMMENTS,
        comments
    }
}

export const addComment = (comment) => {
    return ({
        type: ADD_COMMENT,
        comment
    })
}
