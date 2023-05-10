import React from 'react'
import './Footer.css'
import logo from '../../assets/logoJim.svg'

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer__addr">
          <h1 className="footer__logo">
            <img  src={logo} alt="" />
          </h1>
          <h2>Contact</h2>
          <address>
            5534 Somewhere In. The World 22193-10212
            <br />
            {/* <a className="footer__btn" href="mailto:example@gmail.com">
              Email Us
            </a> */}
          </address>
        </div>
        <ul className="footer__nav">
          <li className="nav__item">
            <h2 className="nav__title">Media</h2>
            <ul className="nav__ul">
              <li>
                <a href="#">Online</a>
              </li>
              <li>
                <a href="#">Print</a>
              </li>
              <li>
                <a href="#">Alternative Ads</a>
              </li>
            </ul>
          </li>
          <li className="nav__item nav__item--extr">
            <h2 className="nav__title">Technology</h2>
            <ul className="nav__ul ">
              <li>
                <a href="#">Hardware Design</a>
              </li>
              <li>
                <a href="#">Software Design</a>
              </li>
              <li>
                <a href="#">Digital Signage</a>
              </li>
            </ul>
          </li>
          <li className="nav__item">
            <h2 className="nav__title">Legal</h2>
            <ul className="nav__ul">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Use</a>
              </li>
              <li>
                <a href="#">Sitemap</a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="legal">
          <p></p>
          {/* <div className="legal__links">
            <span>
              Made with <span className="heart">♥</span> remotely from Anywhere
            </span>
          </div> */}
        </div>
      </footer>
    </div>
  )
}

export default Footer
