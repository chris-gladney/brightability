import { Link } from "react-router-dom";
import { useState } from "react";
import baLogo from "../assets/baLogo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPhotoFilm,
  faUsersLine,
  faBars,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [navigationActive, setNavigationActive] = useState(false);

  return (
    <header>
      {navigationActive ? (
        <nav>
          <ul>
            <li title="Home">
              <Link to="/">
                <FontAwesomeIcon icon={faHouse} size="1x" />
              </Link>
            </li>
            <li title="Photo Album">
              <Link to="/photos">
                <FontAwesomeIcon icon={faPhotoFilm} size="1x" />
              </Link>
            </li>
            <li title="Meet the Team">
              <Link to="/staff">
                <FontAwesomeIcon icon={faUsersLine} size="1x" />
              </Link>
            </li>
            <li
              title="Collapse Site Navigation"
              className="navigate-nav"
              onClick={() => {
                setNavigationActive(false);
              }}
            >
              <FontAwesomeIcon icon={faBackward} size="1x" />
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li
              title="Site Navigation"
              className="navigate-nav"
              onClick={() => {
                setNavigationActive(true);
              }}
            >
              <FontAwesomeIcon icon={faBars} size="1x" />
            </li>
          </ul>
        </nav>
      )}
      <div className="header-info">
        <Link to="/">
          <h1>Brightability</h1>
        </Link>
        <p>Empowering individuals with learning disabilities to thrive</p>
        <Link to="/contact">
          <button>Contact Us</button>
        </Link>
      </div>
      <Link to="/">
        <img className="logo" src={baLogo} />
      </Link>
    </header>
  );
}

export default Header;
