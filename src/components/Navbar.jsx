import React from 'react'
import {Link,useLocation } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import './Navbar.css';


const Navbar = () => {

  //using the useLocation to direct and highlight heading of the current page.
  let location = useLocation();
  let history = useNavigate();



  //just to see the parameters of the variable location.
  // useEffect(() => {
  //   console.log(location.pathname)
  // }, [location]);

  const handleAboutClick = (e) => {
  e.preventDefault();

  if (location.pathname !== "/") {
    history("/");

    setTimeout(() => {
      document.getElementById("about")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);
  } else {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
    });
  }
};

  const handleLogout =()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    history('/login')
  }

  return (
    <>
      <nav className="navbar fixed-top  navbar-expand-lg ">
      <div className="container-fluid">
      <Link className="navbar-brand" to="/home" >TravelBuddy</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/' || location.pathname === '/home' ? "active" : ""}`}  aria-current="page" to="/home">Home</Link>
          </li>
          <li className="nav-item">
              <a
              href="/"
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              onClick={handleAboutClick}
              >
                About
              </a>
          </li>

            {localStorage.getItem('token')&&
              (<li className="nav-item">
              <Link className={`nav-link ${location.pathname ==='/addcar'? "active":""}`}  to="/addcar">Rent Your Fleet</Link>
              </li>)
            }
          </ul>
          <ul className="navbar-nav me-auto mb-1 mb-lg-0">
            {localStorage.getItem('token')&&
              (<li className="nav-item">
              <Link className={`nav-link ${location.pathname ==='/sedan'? "active":""}`}  to="/sedan">Sedan</Link>
              </li>)
            }
            {localStorage.getItem('token')&&
              (<li className="nav-item">
              <Link className={`nav-link ${location.pathname ==='/suv'? "active":""}`}  to="/suv">SUV</Link>
              </li>)
            }
            {localStorage.getItem('token')&&
              (<li className="nav-item">
              <Link className={`nav-link ${location.pathname ==='/mpv'? "active":""}`}  to="/mpv">MPV</Link>
              </li>)
            }
            {localStorage.getItem('token')&&
              (<li className="nav-item">
              <Link className={`nav-link ${location.pathname ==='/bike'? "active":""}`}  to="/bike">Bike</Link>
              </li>)
            }

            {localStorage.getItem('token')&&
              (<li className="nav-item">
              <Link className={`nav-link ${location.pathname ==='/dashboard'? "active":""}`}  to="/dashboard">Dashboard</Link>
              </li>)
            }
          </ul>
            {localStorage.getItem('token')&&(
              <Link className={`nav-link ${location.pathname ==='/history'? "active":""}`} style={{color:"white","padding":"6px"}} to="/history">History</Link>
            )}
          { !localStorage.getItem('token')?<form className="d-flex" role="search"> 
            <Link className="btn btn-light mx-1" to="/login" role='button'>Log In</Link>
            <Link className="btn btn-light mx-1" to="/signup" role='button'>Sign Up</Link>
        </form> : <button onClick={handleLogout} className='btn btn-light'>LogOut</button>  }

            
          
        </div>
      </div>
    </nav>
      
  </>
  
    
  )
}

export default Navbar
