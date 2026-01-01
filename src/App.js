import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import About from './components/About';

import Sedan from './components/Sedan';
import Suv from './components/Suv';
import Mpv from './components/Mpv';
import Bike from './components/Bike';
import Addcar from './components/Addcar';
import NoteState from './context/notes/NoteState';
import BookingCar from './components/BookingCar';
import History from './components/History';
import Dashboard from './components/Dashboard';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
  }

  return (
    <>
    <NoteState>
      <Router>
        <Navbar/>
        <Alert alert ={alert}/>
        <div >
          <Routes>
              <Route exact path="/home" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About showAlert={showAlert}/>} />
              <Route exact path="/addcar" element={<Addcar showAlert={showAlert}/>} />
              <Route exact path="/sedan" element={<Sedan showAlert={showAlert}/>} />
              <Route exact path="/suv" element={<Suv showAlert={showAlert}/>} />
              <Route exact path="/mpv" element={<Mpv showAlert={showAlert}/>} />
              <Route exact path="/bike" element={<Bike showAlert={showAlert}/>} />
              <Route exact path="/booking/:id" element={<BookingCar showAlert={showAlert}/>} />
              <Route exact path="/history" element={<History showAlert={showAlert}/>} />
              <Route exact path="/dashboard" element={<Dashboard showAlert={showAlert}/>} />
          </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
