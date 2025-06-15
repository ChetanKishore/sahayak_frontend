import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.svg";
import NotificationIcon from "../assets/notification.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import UserLoggedIn from "../assets/user_logged_in.png";
import { useDialog } from "../DialogContext";
import { useNotification } from "../context/NotificationContext";
import "./NavBar.css"; // Import the CSS

const NavBar = () => {
  const { openLoginDialog, openNotifDialog } = useDialog();
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadCount } = useNotification();

  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setToken(localStorage.getItem("token"));
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
    // Example logout logic
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUserId(null);
    setToken("");
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <header className="navbar">
      <img
        src={Logo}
        alt="Sahayak Logo"
        className="logo"
        onClick={() => navigate("/")}
      />

      <div className="nav-items hidden md:flex gap-10 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className={`font-semibold text-base ${
              link.match
                ? "text-[#9AD9FF] border-b-2 border-[#9AD9FF]"
                : "text-gray-400"
            } hover:text-white transition`}
          >
            {link.name}
          </Link>
        ))}
        <Link to="/raisefund" className="raiseFund">
          <span className="raiseFund-text">Raise A Fund</span>
        </Link>
      </div>

      <div className="nav-items-2 hidden md:flex items-center gap-6 relative">
        {userId && token ? (
          <>
            <div
              className="notification"
              onClick={openNotifDialog}
              title="Notifications"
            >
              <img
                src={NotificationIcon}
                alt="Notifications"
                style={{
                  filter:
                    unreadCount === 0
                      ? "grayscale(100%) brightness(200%)"
                      : "brightness(200%)",
                }}
              />
              {unreadCount > 0 && (
                <span className="number">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>

            {/* Profile icon with dropdown */}
            <div
              className="profile-icon relative cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <img
                src={UserLoggedIn}
                alt="User Logged In"
                className="w-8 h-8 rounded-full"
              />

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded shadow-lg w-40 z-20">
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate("/profile");
                      setShowDropdown(false);
                    }}
                  >
                    Profile
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <button
            className="px-4 py-2 bg-gradient-to-r from-[#3D9580] to-[#347f6a] text-white font-semibold rounded-full shadow hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={openLoginDialog}
          >
            Login
          </button>
        )}
      </div>

      {/* Hamburger */}
      <div className="hamburger-menu-icon-container md:hidden">
        {!hamburgerClicked ? (
          <GiHamburgerMenu
            size={28}
            color="#9AD9FF"
            onClick={() => setHamburgerClicked(true)}
            className="cursor-pointer"
          />
        ) : (
          <IoMdClose
            size={28}
            color="#9AD9FF"
            onClick={() => setHamburgerClicked(false)}
            className="cursor-pointer"
          />
        )}
      </div>

      {/* Mobile Menu */}
      {hamburgerClicked && (
        <div className="absolute top-[102px] w-full bg-[#1F2937] shadow-md flex flex-col items-center py-6 gap-4 md:hidden transition-all duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setHamburgerClicked(false)}
              className={`font-semibold text-base ${
                link.match ? "text-[#9AD9FF]" : "text-gray-300"
              } hover:text-white`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/raisefund"
            onClick={() => setHamburgerClicked(false)}
            className="raiseFund"
          >
            <span className="raiseFund-text">Raise A Fund</span>
          </Link>
          {userId && token ? (
            <div className="profile-icon cursor-pointer">
              <img
                src={UserLoggedIn}
                alt="User Logged In"
                className="w-8 h-8 rounded-full"
                onClick={() => {
                  navigate("/profile");
                  setHamburgerClicked(false);
                }}
              />
            </div>
          ) : (
            <button
              className="px-4 py-2 bg-gradient-to-r from-[#3D9580] to-[#347f6a] text-white font-semibold rounded-full shadow hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => {
                openLoginDialog();
                setHamburgerClicked(false);
              }}
            >
              Login
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default NavBar;
