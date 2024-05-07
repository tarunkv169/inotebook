import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname)
  }, [location])


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                     <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                     <Link className={`nav-link ${location.pathname === "/About" ? "active" : " "}`} to="/About">About</Link>
                  </li>
                  <li className="nav-item dropdown">
                     <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                         Dropdown
                     </Link>
                     <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                         <li><Link className="dropdown-item" to="/">Action</Link></li>
                         <li><Link className="dropdown-item" to="/">Another action</Link></li>
                         <li><hr className="dropdown-divider" /></li>
                         <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                     </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link disabled" to="/" tabIndex="-1" aria-disabled="true">Disabled</Link>
                  </li>
              </ul>
              <form className="d-flex">                                                          
                  <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                  <Link className="btn btn-primary mx-2" to="/signup" role="button">SignUp</Link>
              </form>
          </div>
      </div>
   </nav>                                                                    //⬆️ 9️⃣.0️⃣ creating buttons------ then in components create comp(login and signup)-----go to 9️⃣.1️⃣in App.js do(put login and signup comp in Route)--->
  )
}
