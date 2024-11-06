import { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import evangadi_logo_home from "../../Images/evangadi-logo-home.png";
import "../header/header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Handle logout and update token state
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Close menu when clicking outside (optional for better UX)
  useEffect(() => {
    const closeMenu = (e) => {
      if (menuOpen && !e.target.closest(".menu-btn__burger")) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, [menuOpen]);

  const handleMenuClick = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <img src={evangadi_logo_home} alt="Logo" />
        </div>

        {/* Menu Button for mobile view */}
        <div className="menu">
          <button
            className="menu-btn__burger"
            onClick={handleMenuClick}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <AiOutlineMenu />
          </button>
          {menuOpen && (
            <ul className="nav-links mobile-nav">
              <li>
                <NavLink
                  to="/"
                  onClick={() => setMenuOpen(false)} // Close menu on link click
                  style={({ isActive }) => ({
                    color: isActive ? "#f68402" : "",
                  })}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/how"
                  onClick={() => setMenuOpen(false)} // Close menu on link click
                  style={({ isActive }) => ({
                    color: isActive ? "#f68402" : "",
                  })}
                >
                  How it works
                </NavLink>
              </li>
              <li className="btn">
                <NavLink
                  to={token ? "/" : "/login"}
                  onClick={() => {
                    if (token) {
                      handleLogout();
                    }
                    setMenuOpen(false); // Close menu on logout or login
                  }}
                  style={({ isActive }) => ({
                    color: isActive ? "#f68402" : "",
                  })}
                >
                  {token ? "Sign Out" : "Sign In"}
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="submenu">
          <ul className="nav-links desktop-nav">
            <li>
              <NavLink
                to={token ? "/forum" : "/"}
                style={({ isActive }) => ({
                  color: isActive ? "#fe8402" : "",
                })}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/how"
                style={({ isActive }) => ({
                  color: isActive ? "#fe8402" : "",
                })}
              >
                How it works
              </NavLink>
            </li>
            <li className="btn">
              <NavLink
                to={token ? "/" : "/signin"}
                onClick={token ? handleLogout : null} // Handle logout if token exists
                style={({ isActive }) => ({
                  color: isActive ? "#fe8402" : "",
                })}
              >
                {token ? "Sign Out" : "Sign In"}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
