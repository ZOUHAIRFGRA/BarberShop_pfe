import React from "react";

const Header = () => {
  return (
    <>
      <div class="container-fluid">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div class="col-md-3 mb-2 mb-md-0">
            <a
              href="/"
              class="d-inline-flex link-body-emphasis text-decoration-none"
            >
              <h3>logo</h3>
            </a>
          </div>

          <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="/home" class="nav-link px-2 link-secondary">
                Home
              </a>
            </li>
            <li>
              <a href="/features" class="nav-link px-2">
                Features
              </a>
            </li>
            <li>
              <a href="/err" class="nav-link px-2">
                Pricing
              </a>
            </li>
            <li>
              <a href="/err" class="nav-link px-2">
                FAQs
              </a>
            </li>
            <li>
              <a href="#_" class="nav-link px-2">
                About
              </a>
            </li>
          </ul>

          <div class="col-md-3 text-end">
            <button type="button" class="btn btn-outline-primary me-2">
              Login
            </button>
            <button type="button" class="btn btn-primary">
              Sign-up
            </button>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
