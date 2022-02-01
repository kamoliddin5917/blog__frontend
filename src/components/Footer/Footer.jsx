import "./Footer.css";

// svg
import { Facebook, Instagram, Twitter, Linkedin } from "../SVG/SVG";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <ul className="box">
          <li className="box__list">
            <a
              className="box__link"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook />
            </a>
          </li>

          <li className="box__list">
            <a
              className="box__link"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram />
            </a>
          </li>

          <li className="box__list">
            <a
              className="box__link"
              href="https://www.twitter.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Twitter />
            </a>
          </li>

          <li className="box__list">
            <a
              className="box__link"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin />
            </a>
          </li>
        </ul>

        <p className="footer__text">Copyright ©2020 All rights reserved </p>
      </div>
    </div>
  );
};

export default Footer;
