import './styles/App.css';
import { 
  Route,
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider,
  Routes
} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Chat from './components/Chat';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<Home />}/>
        <Route path='chat'>
          <Route index element={<Chat />}/>
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