import React from 'react'
import { Link } from 'react-router-dom'

function contact() {
  return (
    <div><section className="contact py-5">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h3 className="mb-4">
            <Link to ="/contact" className="text-uppercase text-dark text-decoration-none ls-3 text-muted">
              Contact Us
            </Link>
          </h3>
          <form action="">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Enter your phone"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                name=""
                id="message"
                className="form-control"
                rows={5}
                placeholder="Enter your message"
                defaultValue={""}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h3 className="mb-4">
            <a className="text-uppercase text-dark text-decoration-none ls-3 text-muted">
              Our Location
            </a>
          </h3>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.1422000000003!2d85.3333333150075!3d27.71666698280355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18f0f5c5b8d7%3A0x6b8e3b2b2b3b3b3b!2s
                        Kathmandu%20University%20School%20of%20Engineering!5e0!3m2!1sen!2snp!4v1629200000000!5m2!1sen!2snp"
              width="100%"
              height={450}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="gallery py-5">
  <div className="container">
    <div className="row">
      <div className="col-md-6 p-3">
        <h3 className="mb-4">
          <a className="text-uppercase text-dark text-decoration-none ls-3 text-muted">
            Gallery
          </a>
        </h3>
        <div className="gallery-grid">
          <div className="img-holder position-relative overflow-hidden">
            <img src="img/1.jpg" className="img-fluid w-100" alt="" />
            <div className="info">
              <h5>
                <a href="#" className="text-decoration-none text-white">
                  Hotel Name
                </a>
              </h5>
              <p className="text-white mb-0">$100/Night</p>
            </div>
          </div>
          <div className="img-holder position-relative overflow-hidden">
            <img src="img/2.jpg" className="img-fluid w-100" alt="" />
            <div className="info">
              <h5>
                <a href="#" className="text-decoration-none text-white">
                  Hotel Name
                </a>
              </h5>
              <p className="text-white mb-0">$100/Night</p>
            </div>
          </div>
          <div className="img-holder position-relative overflow-hidden">
            <img src="img/3.jpg" className="img-fluid w-100" alt="" />
            <div className="info">
              <h5>
                <a href="#" className="text-decoration-none text-white">
                  Hotel Name
                </a>
              </h5>
              <p className="text-white mb-0">$100/Night</p>
            </div>
          </div>
          <div className="img-holder position-relative overflow-hidden">
            <img src="img/4.jpg" className="img-fluid w-100" alt="" />
            <div className="info">
              <h5>
                <a href="#" className="text-decoration-none text-white">
                  Hotel Name
                </a>
              </h5>
              <p className="text-white mb-0">$100/Night</p>
            </div>
          </div>
          <div className="img-holder position-relative overflow-hidden">
            <img src="img/5.jpg" className="img-fluid w-100" alt="" />
            <div className="info">
              <h5>
                <a href="#" className="text-decoration-none text-white">
                  Hotel Name
                </a>
              </h5>
              <p className="text-white mb-0">$100/Night</p>
            </div>
          </div>
          <div className="img-holder position-relative overflow-hidden">
            <img src="img/6.jpg" className="img-fluid w-100" alt="" />
            <div className="info">
              <h5>
                <a href="#" className="text-decoration-none text-white">
                  Hotel Name
                </a>
              </h5>
              <p className="text-white mb-0">$100/Night</p>
            </div>
          </div>
          <div className="img-holder position-relative overflow-hidden">
            <img src="img/7.jpg" className="img-fluid w-100" alt="" />
            <div className="info">
              <h5>
                <a href="#" className="text-decoration-none text-white">
                  Hotel Name
                </a>
              </h5>
              <p className="text-white mb-0">$100/Night</p>
            </div>
          </div>
          <div className="img-holder position-relative overflow-hidden">
            <img src="img/8.jpg" className="img-fluid w-100" alt="" />
            <div className="info">
              <h5>
                <a href="#" className="text-decoration-none text-white">
                  Hotel Name
                </a>
              </h5>
              <p className="text-white mb-0">$100/Night</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 p-3">
        <h3 className="mb-4">
          <a className="text-uppercase text-dark text-decoration-none ls-3 text-muted">
            Contact Information
          </a>
        </h3>
        <p className="lead">
          Email:{" "}
          <a
            href="mailto:test@test.com"
            className="test-primary text-decoration-none"
          >
            test@test.com
          </a>
        </p>
        <p className="lead">
          Phone:{" "}
          <a href="tel:123456789" className="test-primary text-decoration-none">
            123456789
          </a>
        </p>
        <p className="lead">
          Address:{" "}
          <a
            href="https://goo.gl/maps/4Z5Z9Z9Z9Z9Z9Z9Z9"
            className="test-primary text-decoration-none"
            target="_blank"
          >
            Kathmandu, Nepal
          </a>
        </p>
        <p className="lead">
          Website:{" "}
          <a
            href="https://www.google.com/"
            className="test-primary text-decoration-none"
            target="_blank"
          >
            www.google.com
          </a>
        </p>
      </div>
    </div>
  </div>
</section>

  </div>
  )
}

export default contact