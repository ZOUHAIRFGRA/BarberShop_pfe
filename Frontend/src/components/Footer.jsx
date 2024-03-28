// src/components/Footer.js
import React from "react";

const Footer = ({ contentVisible }) => {
  return (
    <>
    {contentVisible && (
      <div className="footer-wrapper">
        <footer className="bg-dark text-light py-3">
          <div className="container">
            <div className="row gy-4 ">
                <div className="col-lg-4 col-md-6">
                  <h5 className="h1 text-white">BmB</h5>
                  <p className="small text-white">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt.
                  </p>
                  <p className="small text-white mb-0">
                    &copy; Copyrights. All rights reserved.{" "}
                    <a className="text-primary" href="_">
                      BookMyBarber.com
                    </a>
                  </p>
                </div>
                <div className="col-lg-2 col-md-6">
                  <h5 className="text-white mb-3">Quick links</h5>
                  <ul className="list-unstyled text-muted">
                    <li>
                      <a href="#_">Home</a>
                    </li>
                    <li>
                      <a href="#_">About</a>
                    </li>
                    <li>
                      <a href="#_">Get started</a>
                    </li>
                    <li>
                      <a href="#_">FAQ</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-2 col-md-6">
                  <h5 className="text-white mb-3">Quick links</h5>
                  <ul className="list-unstyled text-muted">
                    <li>
                      <a href="#_">Home</a>
                    </li>
                    <li>
                      <a href="#_">About</a>
                    </li>
                    <li>
                      <a href="#_">Get started</a>
                    </li>
                    <li>
                      <a href="#_">FAQ</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4 col-md-6">
                  <form>
                    <h5>Subscribe to our newsletter</h5>
                    <p>Monthly digest of what's new and exciting from us.</p>
                    <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                      <label htmlFor="newsletter1" className="visually-hidden">
                        Email address
                      </label>
                      <input
                        id="newsletter1"
                        type="text"
                        className="form-control"
                        placeholder="Email address"
                      />
                      <button className="btn btn-primary" type="button">
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default Footer;
