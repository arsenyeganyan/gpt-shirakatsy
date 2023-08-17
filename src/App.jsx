import './styles/App.css';
import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Routes
} from 'react-router-dom';
import { loader as chatLoader } from './components/Chat';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Chat from './components/Chat';
import Response from './components/Response';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route 
          index 
          element={<Home />}
          loader={chatLoader}
        />
        <Route 
          path='chat' 
          element={<Chat />}
          loader={chatLoader}
        >
          <Route path=':name' element={<Response />}/>
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