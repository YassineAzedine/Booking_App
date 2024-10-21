import React from 'react'
import { Link } from 'react-router-dom'

function header() {
  return (
    <>
    {/* // */}
    <section className="topbar bg-dark py-2 border-bottom border-dark">
  <div className="container">
    <div className="d-flex justify-content-between align-items-center">
      <p className="mb-0 text-white">
        Directly contact us for reservation:{" "}
        <a href="tel:1234567890" className="text-white text-decoration-none">
          1234567890
        </a>
      </p>
      <p className="mb-0">
        <a href="#" className="text-decoration-none text-white">
          ENG
        </a>{" "}
        |
        <a href="#" className="text-decoration-none text-white">
          PHP
        </a>
      </p>
    </div>
  </div>
</section>

    {/* // */}
    <section className="header">
  <nav className="navbar navbar-expand-lg bg-transparent">
    <div className="container">
      <Link to ="/" className="navbar-brand" href="index.html">
        <img src="img/booklogo2.png" className="img-fluid logo" alt="" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item ms-4">
            <Link to="/"className="nav-link text-dark active" href="index.html">
              Home
            </Link>
          </li>
          <li className="nav-item ms-4">
            <Link  to="/about" className="nav-link text-dark" href="about.html">
              About Us
            </Link>
          </li>
          <li className="nav-item ms-4">
            <Link  to="/rooms" className="nav-link text-dark" href="rooms.html">
              Our Rooms
            </Link>
          </li>
          {/* <li className="nav-item ms-4">
            <Link to="/reservation" className="nav-link text-dark" href="reservation.html">
              Reservation
            </Link>
          </li> */}
          <li className="nav-item ms-4">
            <Link to ="/contact" className="nav-link text-dark" href="contact.html">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</section>
        </>

  )
}

export default header