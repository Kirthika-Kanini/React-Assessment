import React from 'react'
import './Navbar1.css'
function Navbar1() {
  return (
    <div>
       <div id="nav">
      <ul class="nav-menu clearfix unstyled">
        <li><a href="#" class="three-d active">
          Home
          <span class="three-d-box"><span class="front">Home</span><span class="back">Home</span></span>
        </a></li>
        <li><a href="#" class="three-d">
          Services
          <span class="three-d-box"><span class="front">Services</span><span class="back">Services</span></span>
        </a></li>
        <li><a href="#" class="three-d">
          Products
          <span class="three-d-box"><span class="front">Products</span><span class="back">Products</span></span>
        </a></li>
        <li><a href="#" class="three-d">
          About
          <span class="three-d-box"><span class="front">About</span><span class="back">About</span></span>
        </a></li>
        <li><a href="#" class="three-d">
          Contact
          <span class="three-d-box"><span class="front">Contact</span><span class="back">Contact</span></span>
        </a></li>
        <li><a href="#" class="three-d">
          Blog
          <span class="three-d-box"><span class="front">Blog</span><span class="back">Blog</span></span>
        </a>
          <ul class="clearfix unstyled drop-menu">
            <li><a href="#" class="three-d">
                Html5
                <span class="three-d-box"><span class="front">Html5</span><span class="back">Html5</span></span>
              </a></li>
              <li><a href="#" class="three-d">
                Css3
                <span class="three-d-box"><span class="front">Css3</span><span class="back">Css3</span></span>
              </a></li>
              <li><a href="#" class="three-d">
                JavaScript
                <span class="three-d-box"><span class="front">JavaScript</span><span class="back">JavaScript</span></span>
              </a></li>
              <li><a href="#" class="three-d">
                Videogames
                <span class="three-d-box"><span class="front">Videogames</span><span class="back">Videogames</span></span>
              </a></li>
          </ul>
        </li>
        <li><a href="#" class="three-d">
          Shop On-line
          <span class="three-d-box"><span class="front">Shop On-line</span><span class="back">Shop On-line</span></span>
        </a></li>
      </ul>
    </div>
    </div>
  )
}

export default Navbar1
