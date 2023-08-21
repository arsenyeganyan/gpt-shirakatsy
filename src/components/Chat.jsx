import '../styles/Chat.css';
import { useEffect, useState } from 'react';
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
  const [langs, setLangs] = useState({})

  useEffect(() => {
    fetch('http://localhost:8000/supported-languages/')
    .then(res => res.json())
    .then(json => setLangs(json))
  }, [])
  
  const sendData = e => {
    fetch(name === undefined ? 
      'http://localhost:8000/chat/' : 
      `http://localhost:8000/chat/${name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: send
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
          <Form onSubmit={sendData} className='form'>
            <div className="additional--inputs">
              {(name === "pptx-creator" || name === "text-to-speech") && (
                <select name='lang'>
                  <option value="">--Select language</option>
                  {langs.supported_languages && Object.values(
                    langs.supported_languages).map((value, index) => (
                      <option id={index} value={value.toLowerCase()}>
                        {value.toLowerCase()}
                      </option>
                  ))}
                </select>
              )}
              <select name='img-size'>
                <option value="">--Select image size--</option>
                <option value="1024x1024">1024x1024</option>
                <option value="256x256">256x256</option>
                <option value="512x512">512x512</option>
              </select>
              <input 
                type="number"
                name='words'
                className='input--words'
              />
              <input 
                type="number" 
                name='rate'
                className='input--rate'
              />

              {/* {here would be the file input} */}
            </div>
            <div className='main--inputs'>
              <input
                type='text'
                className='input--message'
                placeholder="Enter your messsage"
                name='request'
                onChange={e => setSend(e.target.value)}
                value={send}
              />
              <button type='submit'>
                <FontAwesomeIcon icon={faShare} />
              </button>
            </div>
          </Form>
        </div>
        <Outlet context={req}/>
    </div>
  )
}