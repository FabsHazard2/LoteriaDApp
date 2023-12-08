import { useLocation } from "react-router-dom";
import { useContext } from 'react';
import { Link } from "react-router-dom";

// Context
import { AuthContext } from "@src/App";

// Assets
import mmSvg from "@assets/svg/metamask-fox.svg";

const Navbar = () => {
  const location = useLocation();
  const context = useContext(AuthContext);

  return (
    <>
      <header id="navbar" className="mb-auto">
        <div>
          <Link className="navbar-brand float-md-start mb-0" to="/">
            <h3>Lorem Ipsum</h3>
          </Link>

          {!context.authenticated ? (
            <>
              <nav className="nav nav-masthead justify-content-center float-md-end">
                <button className="btn btn-outline-secondary login-btn" onClick={ context.mmLogin }>
                  <img className="top arcade-frame" src={ mmSvg } alt="" height="25px" width="25px" />
                  <span> Connect Wallet</span>
                </button>
              </nav>
            </>
          ) : (
            <>
              <nav className="nav nav-masthead justify-content-center float-md-end">
                <Link 
                  className={`nav-link ${location.pathname === "/" ? "active" : ""}`} 
                  to="/"
                >
                  Home
                </Link>
                <Link 
                  className={`nav-link ${location.pathname === "/smart-contract" ? "active" : ""}`} 
                  to="/smart-contract"
                >
                  Smart Contract
                </Link>
              </nav>
            </>
          )}

        </div>
      </header>
    </>
  )
}

export default Navbar
