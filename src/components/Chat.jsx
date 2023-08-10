import '/Users/arsen/Desktop/gpt-replica/src/styles/Chat.css';
import { Outlet, Form } from "react-router-dom"

export default function Chat() {
  return (
    <div className='chat--page--container'>
        <div className="sidebar--container">
          <ul>
            <li>ChatGPT</li>
            <li>Image Generation</li>
            <li>Personal Project</li>
            <li>Community Project</li>
          </ul>
        </div>
        <div className="form--contanier">
          <form method='POST' action=".">
            <input 
              type="text"
              placeholder='Type your request'
            />
            <button type='submit'></button>
          </form>
        </div>
    </div>
  )
}