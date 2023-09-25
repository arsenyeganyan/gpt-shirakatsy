import '../styles/Navbar.css';
import alikh from '/images/Ashot Alikhanyan.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='nav--container'>
        <nav>
            <a href='https://www.facebook.com/ashot.alikhanyan.9'>
              <img src={alikh} />
            </a>
            <ul>
                <li>
                  <NavLink 
                    to='/'
                    className={({ isActive }) => isActive ? "nav--active" : "nav--passive"}
                  >
                    <FontAwesomeIcon icon={faHouse} id='home--icon'/>
                  </NavLink>
                </li>
            </ul>
        </nav>
    </div>
  )
}