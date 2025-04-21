import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return <>
    <Navbar />
    <Outlet />
    <ToastContainer />
  </>;
}

export default App;
