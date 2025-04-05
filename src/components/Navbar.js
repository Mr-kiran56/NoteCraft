import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top nav-bgcolor navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand title fs-bold" to="/Intro">NoteCraft</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              

              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                  to="/about"
                >
                  About
                </Link>
              </li>

            </ul>

            {!localStorage.getItem("token") ? (
              <>
               
                <Link
                  className="btn add-note mx-1"
                
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn add-note mx-1"
                 
                  to="/signup"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <> 
              <Link
              className="btn add-note me-3 "
              to="/chatbot"
            ><i className="fa-solid fa-book"> Add Note</i>
            
          
            </Link>

            <Link
              className="btn add-note me-3  " style={{height:'38px',fill:'black'}}
              to="/profile"

            >
              <svg className="profileicon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
            
          
            </Link>

              <button
                className="btn me-2  add-note  "
            
                onClick={logout}
              >
                Logout
              </button>

              </>
              
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
