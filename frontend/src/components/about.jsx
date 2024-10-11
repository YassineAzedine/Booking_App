import React from 'react'
import { Link } from 'react-router-dom'

function about() {
  return (
    <><section className="about py-5">

    <div className="container">
      <div className="text-center">
        <h3 className="text-decoration-underline">
          <Link to ="/about"
            href=" about.html"
            className="text-uppercase text-dark text-decoration-none ls-3 text-muted"
          >
            About Our Hotel
          </Link>
        </h3>
      </div>
      <div className="row mt-5">
        <div className="col-md-5 p-3">
          <img src="img/hotel.jpg" className="img-fluid w-100" alt="" />
        </div>
        <div className="col-md-7 p-3">
          <h4>Hotel Name</h4>
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            veniam, dolor quam ipsam amet doloremque omnis molestias nemo
            dignissimos ut sunt laboriosam pariatur mollitia accusantium! Eveniet
            voluptatem, exercitationem voluptates optio nobis ipsum at voluptate
            odio quasi ad rerum
          </p>
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            veniam, dolor quam ipsam amet doloremque omnis molestias nemo
            dignissimos ut sunt laboriosam pariatur mollitia accusantium! Eveniet
            voluptatem, exercitationem voluptates optio nobis ipsum at voluptate
            odio quasi ad rerum
          </p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-7 p-3">
          <h4>Success History</h4>
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            veniam, dolor quam ipsam amet doloremque omnis molestias nemo
            dignissimos ut sunt laboriosam pariatur mollitia accusantium! Eveniet
            voluptatem, exercitationem voluptates optio nobis ipsum at voluptate
            odio quasi ad rerum
          </p>
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            veniam, dolor quam ipsam amet doloremque omnis molestias nemo
            dignissimos ut sunt laboriosam pariatur mollitia accusantium! Eveniet
            voluptatem, exercitationem voluptates optio nobis ipsum at voluptate
            odio quasi ad rerum
          </p>
        </div>
        <div className="col-md-5 p-3">
          <img src="img/hotel-2.jpg" className="img-fluid w-100" alt="" />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-5 p-3">
          <img src="img/chairperson.jpg" className="img-fluid w-100" alt="" />
        </div>
        <div className="col-md-7 p-3">
          <h4>Chairperson's Message</h4>
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            veniam, dolor quam ipsam amet doloremque omnis molestias nemo
            dignissimos ut sunt laboriosam pariatur mollitia accusantium! Eveniet
            voluptatem, exercitationem voluptates optio nobis ipsum at voluptate
            odio quasi ad rerum
          </p>
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            veniam, dolor quam ipsam amet doloremque omnis molestias nemo
            dignissimos ut sunt laboriosam pariatur mollitia accusantium! Eveniet
            voluptatem, exercitationem voluptates optio nobis ipsum at voluptate
            odio quasi ad rerum
          </p>
        </div>
      </div>
    </div>
    <section className="gallery py-5">
  <div className="container">
    <h3 className=" mb-4">
      <a className="text-uppercase text-dark text-decoration-none ls-3 text-muted">
        Gallery
      </a>
    </h3>
    <div className="gallery-grid">
      <div className="img-holder position-relative overflow-hidden">
        <img src="img/1.jpg" className="img-fluid w-100" alt="" />
        <div className="info">
          <h3>
            <a href="#" className="text-decoration-none text-white">
              Hotel Name
            </a>
          </h3>
          <p className="text-white">$100/Night</p>
        </div>
      </div>
      <div className="img-holder position-relative overflow-hidden">
        <img src="img/2.jpg" className="img-fluid w-100" alt="" />
        <div className="info">
          <h3>
            <a href="#" className="text-decoration-none text-white">
              Hotel Name
            </a>
          </h3>
          <p className="text-white">$100/Night</p>
        </div>
      </div>
      <div className="img-holder position-relative overflow-hidden">
        <img src="img/3.jpg" className="img-fluid w-100" alt="" />
        <div className="info">
          <h3>
            <a href="#" className="text-decoration-none text-white">
              Hotel Name
            </a>
          </h3>
          <p className="text-white">$100/Night</p>
        </div>
      </div>
      <div className="img-holder position-relative overflow-hidden">
        <img src="img/4.jpg" className="img-fluid w-100" alt="" />
        <div className="info">
          <h3>
            <a href="#" className="text-decoration-none text-white">
              Hotel Name
            </a>
          </h3>
          <p className="text-white">$100/Night</p>
        </div>
      </div>
      <div className="img-holder position-relative overflow-hidden">
        <img src="img/5.jpg" className="img-fluid w-100" alt="" />
        <div className="info">
          <h3>
            <a href="#" className="text-decoration-none text-white">
              Hotel Name
            </a>
          </h3>
          <p className="text-white">$100/Night</p>
        </div>
      </div>
      <div className="img-holder position-relative overflow-hidden">
        <img src="img/6.jpg" className="img-fluid w-100" alt="" />
        <div className="info">
          <h3>
            <a href="#" className="text-decoration-none text-white">
              Hotel Name
            </a>
          </h3>
          <p className="text-white">$100/Night</p>
        </div>
      </div>
      <div className="img-holder position-relative overflow-hidden">
        <img src="img/7.jpg" className="img-fluid w-100" alt="" />
        <div className="info">
          <h3>
            <a href="#" className="text-decoration-none text-white">
              Hotel Name
            </a>
          </h3>
          <p className="text-white">$100/Night</p>
        </div>
      </div>
      <div className="img-holder position-relative overflow-hidden">
        <img src="img/8.jpg" className="img-fluid w-100" alt="" />
        <div className="info">
          <h3>
            <a href="#" className="text-decoration-none text-white">
              Hotel Name
            </a>
          </h3>
          <p className="text-white">$100/Night</p>
        </div>
      </div>
    </div>
  </div>
</section>

  </section>
  </>
  )
}

export default about