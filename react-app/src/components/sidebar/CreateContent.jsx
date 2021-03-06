import React from 'react';
import {NavLink} from 'react-router-dom';


const CreateContent = ({ name, about, created, rules, subCount, authenticated }) => {

  let ruleList = rules.split('#')


  return (
    <div className= 'sidebar__container'>
      <div className="about__container">
        <h3 className= "about__title">{name}</h3>
        <h4 className= 'about__header'>About</h4>
        <div className="about__description">{about}</div>
  <div className="about__users">Members: {subCount}</div>
        <div className="about__date"> Created: {created}</div>
      </div>
      <div className='rules__container'>
        <h4 className='rules__header'>Rules:</h4>
        {ruleList.map((rule, idx) => {
          if (rule !== ""){
            return <li className='rules' key={idx}>{rule}</li>
          } else {
            return ''
          }
        })}
        <NavLink style={{ width: 'fit-content', textDecoration: 'none' }} to="/posts/create" exact={true} activeClassName="active">
          <div className="create__btn">
              Create Post
          </div>
        </NavLink>
      </div>
    </div>
  )
}


//rules
//info
//

export default CreateContent;
