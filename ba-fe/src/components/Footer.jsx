import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer>
      <ul>
        <li>
          <a href="">
            <FontAwesomeIcon icon={faFacebook} size="3x" />
          </a>
        </li>
        <li>
          <a href="">
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
