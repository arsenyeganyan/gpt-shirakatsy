import '/Users/arsen/Desktop/gpt-replica/src/styles/Chat.css';
import { Outlet, Form, NavLink, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

export default function Chat() {
  const data = useLoaderData();

  return (
    <div className='chat--page--container'>
        <div className="sidebar--container">
          <ul>
            {data.map((model, index) => (
              <NavLink 
                to='.'
                end
                className={({ isActive }) => isActive ? "sec--active" : "sec"}
                id={index}
              >
                <li>{model.name}</li>
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="form--contanier">
          <Form action='auth' method='POST' className='form'>
            <input
              type="text"
              placeholder='Send your message'
              name='model'
            />
            <input type='hidden' name='model' value='poop'/>
            <button type='submit'>
              <FontAwesomeIcon icon={faShare} />
            </button>
          </Form>
        </div>
        <Outlet />
    </div>
  )
}