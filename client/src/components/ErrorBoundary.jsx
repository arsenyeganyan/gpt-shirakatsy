import '../styles/Home.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function ErrorBoundary() {
  return (
    <div className='error--container'>
      <FontAwesomeIcon icon={faTriangleExclamation} id='error--icon'/>
      <div>
        Oops! You have encountered and error. Check the route to fix.
        If nothing changes, try again later
        or contact the developers at: <span>shirblog2@gmail.com</span>
      </div>
      <Link id='return--home' to="/">Return home</Link>
    </div>
  )
}
