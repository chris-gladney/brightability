import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer>
      <ul>
        <li>
          <a
            href="https://www.facebook.com/share/16Y5EgkCqN/?mibextid=wwXIfr"
            target="_blank"
          >
            <FontAwesomeIcon icon={faFacebook} size="3x" />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/brightabilityltd/profilecard/?igsh=YXhyeDJuYm0wdDdv"
            target="_blank"
          >
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
