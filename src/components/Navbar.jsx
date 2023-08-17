import '../styles/Navbar.css';
import logo from '/Users/arsen/Desktop/gpt-replica/public/images/1580463135368.jpeg';
import alikh from '/Users/arsen/Desktop/gpt-replica/public/images/Ashot Alikhanyan.png'
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='nav--container'>
        <nav>
            <img src={alikh} />
            <ul>
                <li>
                  Home
                </li>
                {/* <li>
                  Sign in
                </li> */}
            </ul>
        </nav>
    </div>
  )
}