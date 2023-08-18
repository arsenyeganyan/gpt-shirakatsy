import '../styles/Chat.css';
import { useState } from 'react';
import { 
  Outlet,
  Form,
  NavLink,
  useLoaderData,
  useParams
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
  const { name } = useParams();
  
  const [send, setSend] = useState('');
  const [req, setReq] = useState();
  
  const sendData = e => {
    fetch(name === undefined ? 
      `http://localhost:8000/chat/` : 
      `http://localhost:8000/chat/${name}`, {
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
    .then(json => setReq(json))
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
        {req && req.message}
        <Outlet />
    </div>
  )
}