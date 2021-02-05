import React, { useState, useReducer } from 'react'
import { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import Comment from '../Comment/Comment'
import CommentForm from '../Comment/CommentForm'
import {getComments} from '../../services/comments'
import reducer from '../../services/commentReducer'
import {setUpComments} from '../redux/actions/comments'



function nestComments(commentList) {

    const commentMap = {};

    // move all the comments into a map of id => comment
    commentList.forEach(comment => commentMap[comment.id] = comment);
    // iterate over the comments again and correctly nest the children
    commentList.forEach(comment => {
        if (comment.parentId !== null) {
            const parent = commentMap[comment.parentId];
            if(parent.children) {
                if(parent.children.includes(comment)) {
                    return
                }
                parent.children = [...parent.children, comment]
            } else {
                parent.children = [comment]
            }
        }

    });

    // filter the list to return a list of correctly nested comments
    return Object.values(commentMap).filter(value => {
        return value.parentId === null
    })
}

const CommentContainer = ({postId}) => {
    const [loading, setLoading] = useState(true)
    const [state, dispatch] = useReducer(reducer, [])
    const [postComments, setPostComments] = useState([])
    const dispatched = useDispatch()


    useEffect(() => {
        let mounted = true
        const fetchData = async () => {
            const commentResponse = await fetch(`/api/comments/post/${postId}`)
            const comments = await commentResponse.json();

            if (!comments.errors && mounted) {
                setLoading(false)
                // dispatch(setUpComments(comments.comments))
                // debugger;
            }
        }


        fetchData()

        window.scrollTo(0,0)

        return () => {
            mounted = false
        }
    }, [])

    // This useEffect will set the postComments that will be used to display the commentHeader
    useEffect(() => {
        (async () => {
            const commentResponse = await getComments(postId)
            await setPostComments(commentResponse.comments)
            debugger
            dispatched(setUpComments(commentResponse.comments))
        })()
    }, [])

    // var commentHeader = '';
    // if (state) {
    //     if (state.length > 1) {
    //         commentHeader = `all ${state.length} Comments`;
    //     } else {
    //         commentHeader = `1 Comment`;
    //     }
    // } else {
    //     commentHeader = 'No comments';
    // }

    return (
        <div> {loading && state ? <div>loading</div> :
        <>
            < div >
                <h4>
                    {/* {commentHeader} */}
                    {postComments.length} Comments
                </h4>
                <hr />
            </div >
            <CommentForm dispatch={dispatch} postId={postId}/>
            { nestComments(state).map(comment => <Comment comment={comment} dispatch={dispatch} postId={postId} key={comment.id}/>)}
        </>}
        </div>
    )
}

export default CommentContainer
