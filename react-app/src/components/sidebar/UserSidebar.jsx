import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux'


const UserSidebar = ({ name, id, created, karma }) => {
  const currentUser = useSelector(state => state.users.user)
  const [isUser, setIsUser] = useState(false)

  // Sets the currentUser to see if we are viewing our own profile
  useEffect(() => {
    if(currentUser.username === name){
      setIsUser(true)
    }
  }, [name, currentUser])

  return (
    <div className= 'sidebar__container'>
      <div className="about__container">
        <h3 className= "about__title">u/{name}</h3>
        <div className="about__date"> Birthday: {created}</div>
        <div className="about__date"> Karma: {karma}</div>
      </div>
      {isUser ? "" : <div className='rules__container'>
        <NavLink style={{ width: 'fit-content', textDecoration: 'none' }} to="/subreddits/create" exact={true} activeClassName="active">
          <div className="create__btn">
              Create Subreddit
          </div>
        </NavLink>
        <NavLink style={{ width: 'fit-content', textDecoration: 'none' }} to="/posts/create" exact={true} activeClassName="active">
          <div className="create__btn">
              New Post
          </div>
        </NavLink>
      </div>}
    </div>
  )
}


export default UserSidebar;
