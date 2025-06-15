
import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.svg";
import NotificationIcon from "../assets/notification.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FiUser, FiLogOut } from "react-icons/fi";
import UserLoggedIn from "../assets/user_logged_in.png";
import { useDialog } from "../DialogContext";
import { useNotification } from "../context/NotificationContext";
import "./NavBar.css";

const NavBar = () => {
  const { openLoginDialog, openNotifDialog } = useDialog();
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadCount } = useNotification();

  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const matchRoute = (route) => location.pathname.includes(route);

  const navLinks = [
    { name: "Home", to: "/", match: location.pathname === "/" },
    { name: "About Us", to: "/about", match: matchRoute("about") },
    {
      name: "Campaign",
      to: "/campaign",
      match:
        matchRoute("campaign") ||
        matchRoute("raisefund") ||
        matchRoute("profile"),
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUserId(null);
    setToken("");
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo-container">
          <img
            src={Logo}
            alt="Sahayak Logo"
            className="logo"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-links desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`nav-link ${link.match ? 'active' : ''}`}
            >
              {link.name}
              {link.match && <span className="nav-indicator"></span>}
            </Link>
          ))}
          <Link to="/raisefund" className="raise-fund-btn">
            <span>Raise A Fund</span>
          </Link>
        </nav>

        {/* Desktop User Section */}
        <div className="user-section desktop-user">
          {userId && token ? (
            <>
              {/* Notification Icon */}
              <div
                className="notification-wrapper"
                onClick={openNotifDialog}
                title="Notifications"
              >
                <div className="notification-icon">
                  <img
                    src={NotificationIcon}
                    alt="Notifications"
                    className={unreadCount > 0 ? 'has-notifications' : ''}
                  />
                  {unreadCount > 0 && (
                    <span className="notification-badge">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </div>
              </div>

              {/* Profile Dropdown */}
              <div className="profile-dropdown">
                <div
                  className="profile-trigger"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <img
                    src={UserLoggedIn}
                    alt="User Profile"
                    className="profile-avatar"
                  />
                  <div className="profile-indicator"></div>
                </div>

                {showDropdown && (
                  <div className="dropdown-menu">
                    <div className="dropdown-arrow"></div>
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/profile");
                        setShowDropdown(false);
                      }}
                    >
                      <FiUser className="dropdown-icon" />
                      <span>Profile</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      <FiLogOut className="dropdown-icon" />
                      <span>Logout</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button className="login-btn" onClick={openLoginDialog}>
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="mobile-menu-toggle">
          <button
            className={`hamburger-btn ${hamburgerClicked ? 'active' : ''}`}
            onClick={() => setHamburgerClicked(!hamburgerClicked)}
            aria-label="Toggle menu"
          >
            {!hamburgerClicked ? (
              <GiHamburgerMenu size={24} />
            ) : (
              <IoMdClose size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${hamburgerClicked ? 'active' : ''}`}>
        <div className="mobile-nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setHamburgerClicked(false)}
              className={`mobile-nav-link ${link.match ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/raisefund"
            onClick={() => setHamburgerClicked(false)}
            className="mobile-raise-fund-btn"
          >
            Raise A Fund
          </Link>
        </div>

        <div className="mobile-user-section">
          {userId && token ? (
            <>
              <div
                className="mobile-notification"
                onClick={() => {
                  openNotifDialog();
                  setHamburgerClicked(false);
                }}
              >
                <img src={NotificationIcon} alt="Notifications" />
                {unreadCount > 0 && (
                  <span className="notification-badge">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
                <span>Notifications</span>
              </div>
              <div
                className="mobile-profile-link"
                onClick={() => {
                  navigate("/profile");
                  setHamburgerClicked(false);
                }}
              >
                <img src={UserLoggedIn} alt="Profile" className="mobile-avatar" />
                <span>Profile</span>
              </div>
              <button
                className="mobile-logout-btn"
                onClick={() => {
                  handleLogout();
                  setHamburgerClicked(false);
                }}
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <button
              className="mobile-login-btn"
              onClick={() => {
                openLoginDialog();
                setHamburgerClicked(false);
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Overlay */}
      {hamburgerClicked && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setHamburgerClicked(false)}
        ></div>
      )}
    </header>
  );
};

export default NavBar;
