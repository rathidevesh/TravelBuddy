import React from 'react'
import homepageImage from '../Image/homeimage1.png';
import aboutimage from '../Image/aboutimg.png';
import './Home.css';
import {
  Link
} from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Home() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false,
  };

 return (
    <>
      <div className='homepageimage'>
          <h2>Welcome to TravelBuddy</h2>
          <p>Experience Different Rides For Your Journey</p>
          <img src= {homepageImage}  alt='homepageimage'></img>
      </div>

      <div className="card-container">
        <h2>Drive in Style and Comfort with Our Car Options</h2>
      </div>

      <div className="card-container-item">
        <div class="card" >
        <div class="card-img-wrapper">
          <img src="https://stimg.cardekho.com/images/carexteriorimages/930x620/MG/RC-6/7497/1581740054805/front-left-side-47.jpg" class="card-img-top" alt="..."/>
          </div>
          <div class="card-body">
            <h5 class="card-title">Prime Sedan</h5>
            <p class="card-text">Experience the elegance and luxury of our prime sedan travel. Unwind in comfort and arrive in style.</p>
            <Link to={localStorage.getItem('token')?"/sedan" : "/login"} className="bookbutton">Book Now</Link>
          </div>
        </div>
        <div class="card" >
        <div class="card-img-wrapper">
          <img src="https://english.cdn.zeenews.com/sites/default/files/2022/06/27/1058349-mahindra-scorpio-n.jpeg" class="card-img-top" alt="..."/>
          </div>
          <div class="card-body">
            <h5 class="card-title">Super SUV's</h5>
            <p class="card-text">Embark on an adventure with our spacious and rugged SUV travel. Explore the outdoors with confidence and versatility.</p>
            <Link to={localStorage.getItem('token')?"/suv" : "/login"} className="bookbutton">Book Now</Link>
          </div>
        </div>
        <div class="card" >
        <div class="card-img-wrapper">
          <img src="https://www.indiacarnews.com/wp-content/uploads/2018/11/New-Maruti-Ertiga-2018-India-Features.jpg" class="card-img-top" alt="..."/>
          </div>
          <div class="card-body">
            <h5 class="card-title">Magic MPV's</h5>
            <p class="card-text">Enjoy the convenience and flexibility of our MPV travel. Accommodate your group comfortably on your journey.</p>
            <Link to={localStorage.getItem('token')?"/mpv" : "/login"} className="bookbutton">Book Now</Link>
          </div>
        </div>
        <div class="card" >
        <div class="card-img-wrapper">
          <img src="https://thebridge.in/wp-content/uploads/2020/11/Screenshot-2020-11-23-at-6.02.32-PM.png" class="card-img-top" alt="..."/>
          </div>
          <div class="card-body">
            <h5 class="card-title">Bikes</h5>
            <p class="card-text">Embrace the freedom and thrill of bike travel. Explore the open road and discover new horizons.</p>
            <Link to={localStorage.getItem('token')?"/bike" : "/login"} className="bookbutton">Book Now</Link>
          </div>
        </div>
      </div>


      {/* About  */}
      <div className="about" id='about'>
          <div className="aboutimage">
          <img src={aboutimage} className="aboutimg" alt="img"/>
          </div>
          <div className="aboutinfo">
              <h3>About TravelBuddy</h3> 
              <p>TravelBuddy is India’s largest marketplace for cars on rent. From short road trips to quick in-city drives for groceries, supply pick-up, food runs, we have the cheapest car rental options for all your needs! A hatchback for daily commute, a sedan for short trips, SUV for hills or a luxury car for a surprise.</p>
               <p>With TravelBuddy, you can experience the convenience of online booking. The cars listed on our platform come with all-India permits that include vehicle insurance.</p>
          </div>
      </div>
      
      <div  className='benefits'>
        <h3>Ultimate Benefits</h3>
        <h5>Benefits You Shouldn't Miss</h5>
      </div>
      


      {/* Carousel */}
    <Carousel showThumbs={false} showStatus={false} showArrows={true} infiniteLoop={true} emulateTouch={true} >
      <div className="crouselcard">
        <div className="benefitCard" >
        <img src="https://media.istockphoto.com/id/1081876252/photo/roadside-assistance-is-on-their-way.jpg?s=612x612&w=0&k=20&c=WNPueBP__YBoyLoLHc1gnKqoGgfALd0vyZMa14lbIC0=" className="card-img-top" alt="img" style={{ "width": "100%", "height": "100%" }} />
              <div className="card-body" style={{ position: "absolute", top: "80%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <h5 className="card-title" style={{color:"white"}}>24/7 Roadside Assistance</h5>
              </div>
        </div>
        <div className="benefitCard ">
        <img src="https://static.toiimg.com/thumb/resizemode-4,width-1200,height-900,msid-80750857/80750857.jpg" className="card-img-top" alt="img" style={{ "width": "100%", "height": "100%" }} />
              <div className="card-body" style={{ position: "absolute", top: "80%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <h5 className="card-title" style={{color:"white"}}>Unlimited Kilometers</h5>
              </div>
        </div>
        <div className="benefitCard ">
        <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwZHJpdmluZ3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" className="card-img-top" alt="img" style={{ "width": "100%", "height": "100%" }} />
              <div className="card-body" style={{ "position": "absolute", "top": "80%", "left": "50%", "transform": "translate(-50%, -50%)" }}>
                <h5 className="card-title" style={{color:"white"}}>No Security Deposits</h5>
              </div>
        </div>
      </div>
      <div className="crouselcard">
        <div className="benefitCard ">
        <img src="https://s3-prod-europe.autonews.com/ANE_170719856_AR_-1_XVKHYFTUYMKZ.jpg" className="card-img-top" alt="img" style={{ "width": "100%", "height": "100%" }} />
              <div className="card-body" style={{ "position": "absolute", "top": "80%", "left": "50%", "transform": "translate(-50%, -50%)" }}>
                <h5 className="card-title" style={{"color":"white"}}>No Toll Charges</h5>
              </div>
        </div>
        <div className="benefitCard">
        <img src="https://carfromjapan.com/wp-content/uploads/2022/02/trip-comfort-and-privacy.jpg" className="card-img-top" alt="img" style={{ "width": "100%", "height": "100%" }} />
              <div className="card-body" style={{ "position": "absolute", "top": "80%", "left": "50%", "transform": "translate(-50%, -50%)" }}>
                <h5 className="card-title" style={{color:"white"}}>Starts at Rs 2400/day</h5>
              </div>
        </div>
        <div className="benefitCard">
        <img src="https://s3-prod-europe.autonews.com/ANE_170719856_AR_-1_XVKHYFTUYMKZ.jpg" className="card-img-top" alt="img" style={{ "width": "100%", "height": "100%" }} />
              <div className="card-body" style={{ "position": "absolute", "top": "80%", "left": "50%", "transform": "translate(-50%, -50%)" }}>
                <h5 className="card-title" style={{color:"white"}}>No Toll Charges</h5>
              </div>
        </div>
      </div>
    </Carousel>
      

      

          
      
    </>
        



  )
}
