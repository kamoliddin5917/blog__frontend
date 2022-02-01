import { useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = ({ setUserId }) => {
  const refNavbar = useRef();

  const modalOpen = () => {
    refNavbar.current.classList.toggle("navbar--active");
  };
  const modalClose = (evt) => {
    if (evt.currentTarget === refNavbar.current) {
      refNavbar.current.classList.remove("navbar--active");
    }
  };

  return (
    <div className="header">
      <div className="container">
        <nav ref={refNavbar} className="navbar" onClick={modalClose}>
          <ul className="navbar__ul">
            <li className="navbar__list">
              <NavLink
                className="navbar__link"
                activeClassName="navbar__link-active"
                to="/"
                exact
              >
                home
              </NavLink>
            </li>
            <li className="navbar__list">
              <NavLink
                className="navbar__link"
                activeClassName="navbar__link-active"
                to="/article"
              >
                add article
              </NavLink>
            </li>
            <li className="navbar__list">
              <NavLink
                className="navbar__link"
                activeClassName="navbar__link-active"
                to="/acount"
                onClick={() => {
                  setUserId(null);
                }}
              >
                acount
              </NavLink>
            </li>
            <li className="navbar__list">
              <NavLink
                className="navbar__link"
                activeClassName="navbar__link-active"
                to="/login"
              >
                login
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="gamburger" onClick={modalOpen}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Header;
