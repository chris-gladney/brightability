import { Link } from "react-router-dom";
import baLogo from "../assets/baLogo.jpeg";

function Header() {
  return (
    <header>
      <div className="header-info">
        <h1>Brightability</h1>
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
