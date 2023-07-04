import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {

  const CardComponent = () => {
    const cardData = [
      {
        title: 'Card 1',
        image: 'path/to/image1.jpg',
        description: 'This is the description for Card 1.',
      },
      {
        title: 'Card 2',
        image: 'path/to/image2.jpg',
        description: 'This is the description for Card 2.',
      },
      // Add more card data as needed
    ];
  }
    

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/home" style={{ marginLeft: "20px" }}>
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/LoginAdmin" style={{ marginLeft: "20px" }}>
                Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Login" style={{ marginLeft: "20px" }}>
                User
              </Link>
            </li>
           
          </ul>
        </div>
      </nav>

      
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.pexels.com/photos/4046950/pexels-photo-4046950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="d-block carousel-image"
              style={{ width: "1920px", height: "772px" }}
              alt="Image 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/3683090/pexels-photo-3683090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="d-block carousel-image"
              style={{ width: "100%", height: "772px", objectFit: "cover" }}
              alt="Image 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/939345200/photo/stethoscope-magazine.jpg?s=612x612&w=0&k=20&c=vwEPUYpg-6FWP4w4UabfbEMvxz0e7kuMX2X1v-OjtXE="
              className="d-block carousel-image"
              style={{ width: "100%", height: "772px", objectFit: "cover" }}
              alt="Image 3"
            />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h3>Testimonials</h3>
      <br></br>
      <br></br>
      
      <section class="articles">
  <article>
    <div class="article-wrapper">
      <figure>
        <img src="https://picsum.photos/id/1011/800/450" alt="" />
      </figure>
      <div class="article-body">
        <h2>This is some title</h2>
        <p>
          Curabitur convallis ac quam vitae laoreet. Nulla mauris ante, euismod sed lacus sit amet, congue bibendum eros. Etiam mattis lobortis porta. Vestibulum ultrices iaculis enim imperdiet egestas.
        </p>
        <a href="#" class="read-more">
          Read more <span class="sr-only">about this is some title</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </article>
  <article>

    <div class="article-wrapper">
      <figure>
        <img src="https://picsum.photos/id/1005/800/450" alt="" />
      </figure>
      <div class="article-body">
        <h2>This is some title</h2>
        <p>
          Curabitur convallis ac quam vitae laoreet. Nulla mauris ante, euismod sed lacus sit amet, congue bibendum eros. Etiam mattis lobortis porta. Vestibulum ultrices iaculis enim imperdiet egestas.
        </p>
        <a href="#" class="read-more">
          Read more <span class="sr-only">about this is some title</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </article>
  <article>

    <div class="article-wrapper">
      <figure>
        <img src="https://picsum.photos/id/103/800/450" alt="" />
      </figure>
      <div class="article-body">
        <h2>This is some title</h2>
        <p>
          Curabitur convallis ac quam vitae laoreet. Nulla mauris ante, euismod sed lacus sit amet, congue bibendum eros. Etiam mattis lobortis porta. Vestibulum ultrices iaculis enim imperdiet egestas.
        </p>
        <a href="#" class="read-more">
          Read more <span class="sr-only">about this is some title</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </article>
</section>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>



    </div>
  );
};

export default Home;
