import '../styles/Home.css';

export default function ErrorBoundary() {
  return (
    <div className='error--container'>
        Oops! You have encountered and error. Check the route to fix.
        If nothing changes, try again later
        or contact the developers at: mail@example.com
    </div>
  )
}
