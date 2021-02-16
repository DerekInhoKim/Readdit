import React , {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addComment} from '../../components/redux/actions/comments'

const CommentForm = (props) => {
    const postCommentState = useSelector(state => state.comments)
    const [content, setContent] = useState('')
    const dispatched = useDispatch()
    function handleSubmit(event, props) {
        event.preventDefault();

        let comment = {
            id: new Date(),
            postId: props.postId,
            content: event.target.body.value,
            parentId: props.parentId
        }
        // fetch POST api goes here
        fetch('/api/comments/new', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
        .then(res => res.json())
        .then(res => {
            if (!res.errors) {
                // debugger;
                props.dispatch({ type: 'SUBMIT_COMMENT', item: res })
                dispatched(addComment(res))
                setContent('')
                // Do some app logic
            }
        })
        // .catch(err =>  /*handle error event*/)

    }

    const updateContent = (event) => {
        setContent(event.target.value)
    }

    return (
        <div className="comment-form">
            <form onSubmit={(event) => handleSubmit(event, props)}>
                <textarea onChange={updateContent} name="body" rows="5" value={content}></textarea>
                <button>save</button>
            </form>
        </div>
    )
}

export default CommentForm
