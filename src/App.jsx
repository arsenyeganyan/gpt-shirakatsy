import './styles/App.css';
import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { loader as chatLoader } from './components/Chat';
import { action as chatAction } from './components/Chat';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Chat from './components/Chat';
import Response from './components/Response';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' errorElement={<ErrorBoundary />}>
        <Route
          index
          element={<Home />}
          loader={chatLoader}
        />
        <Route
          path='chat/:name'
          element={<Chat />}
          loader={chatLoader}
          action={chatAction}
        >
          <Route index element={<Response />}/>
        </Route>
      </Route>
    )
  )
    
  return (
    <div className="App">
      <Navbar />
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;