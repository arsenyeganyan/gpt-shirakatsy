import '/Users/arsen/Desktop/gpt-replica/src/styles/Chat.css';
import { useState } from 'react';
import { 
  Outlet,
  Form,
  NavLink,
  useLoaderData,
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

export async function loader(){
  try {
    const res = await fetch('http://localhost:8000/chat/');
    const data = res.json();
    return data;
  } catch(err) {
    console.log(err);
  }
}

export default function Chat() {
  const data = useLoaderData();
  const name = new URL(document.location).searchParams;
  
  const [send, setSend] = useState('');
  
  const sendData = e => {
    fetch('http://localhost:8000/chat/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: send,
        // active: name
      })
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
    
    setSend('');
    e.preventDefault();
  }
  
  return (
    <div className='chat--page--container'>
        <div className="sidebar--container">
          <ul>
            {data.map((model, index) => {
              return model.sections.map((section, index) => (
                <NavLink
                  to={section.name === "Chat GPT" ?
                    "." : section.name.toLowerCase().split(' ').join('-')}
                  end
                  className={({ isActive }) => isActive ? "sec--active" : "sec"}
                >
                  <li>{section.name}</li>
                </NavLink>
              ))
            })}
          </ul>
        </div>
        <div className="form--contanier">
          <Form onSubmit={sendData}>
            <input
              type='text'
              placeholder='Send your message'
              name='request'
              onChange={e => setSend(e.target.value)}
              value={send}
            />
            <button type='submit'>
              <FontAwesomeIcon icon={faShare} />
            </button>
          </Form>
        </div>
        <Outlet />
    </div>
  )
}