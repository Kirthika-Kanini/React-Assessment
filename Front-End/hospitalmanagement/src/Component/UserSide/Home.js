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
        <img src="https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
      </figure>
      <div class="article-body">
        <h2>Satisfied Healthy Patient</h2>
        <p>Experienced a  exceptional care and support you provided.Your compassion and expertise made a profound impact,Thank you for being an outstanding physician.
        </p>
  
      </div>
    </div>
  </article>
  <article>

    <div class="article-wrapper">
      <figure>
        <img src="https://images.pexels.com/photos/3779702/pexels-photo-3779702.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
      </figure>
      <div class="article-body">
        <h2>This is some title</h2>
        <p>
        Your diagnostic skills and thorough approach to my treatment were truly remarkable. You left no stone unturned in ensuring an accurate diagnosis, and your attention to detail in designing a personalized treatment plan was evident. 
        </p>
        
      </div>
    </div>
  </article>
  <article>

    <div class="article-wrapper">
      <figure>
        <img src="https://media.istockphoto.com/id/1373258553/photo/smiling-mature-doctor-in-hospital-hallway.jpg?b=1&s=612x612&w=0&k=20&c=bA1fovbHbETnnjusgEd3Y4D6XAi92pTXhvn4GqJaxZY=" alt="" />
      </figure>
      <div class="article-body">
        <h2>This is some title</h2>
        <p>
        I was impressed by your ability to create a comfortable and welcoming environment. Your attentive listening and genuine concern for my symptoms and concerns made me feel heard and understood. 
        </p>
     
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
