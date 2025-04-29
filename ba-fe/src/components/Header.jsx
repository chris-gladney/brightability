import baLogo from "../assets/baLogo.jpeg";

function Header() {
  return (
    <header>
      <div className="header-info">
        <h1>Brightability</h1>
        <p>Empowering individuals with learning disabilities to thrive</p>
        <button>Contact Us</button>
      </div>
      <img className="logo" src={baLogo} />
    </header>
  );
}

export default Header;
