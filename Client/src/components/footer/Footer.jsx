import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import "../footer/footer.css";
import evangadi_logo_footer from "../../../src/Images/evangadi-logo-footer.png";
function Footer() {
  return (
    <footer>
      <div className="footer-container sticky">
        {/* Logo and Social Links */}
        <div className="footer-section s-logo">
          <div className="logo">
            <img src={evangadi_logo_footer} alt="Evangadi Logo" />
          </div>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div className="footer-section footer-links">
          <h3>Useful Links</h3>
          <ul>
            <li>
              <a href="#">How it works</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="contact">
          <h3>Contact Info</h3>
          <ul>
            <li>Evangadi Networks</li>
            <li>
              <a href="mailto:support@evangadi.com">support@evangadi.com</a>
            </li>
            <li>
              <a href="tel:+12023862702">+1-202-386-2702</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
