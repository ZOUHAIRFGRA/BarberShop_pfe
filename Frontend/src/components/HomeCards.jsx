import React, { useState, useEffect } from "react";
import { AiFillLike } from "react-icons/ai";
import { CiCircleAlert } from "react-icons/ci";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";

function SampleNextArrow({ onClick }) {
  return (
    <div className="center-arrow">
      <div className="arrow arrow-right" onClick={onClick}>
        <HiArrowSmallRight />
      </div>
    </div>
  );
}

function SamplePrevArrow({ onClick }) {
  return (
    <div className="center-arrow">
      <div className="arrow arrow-left" onClick={onClick}>
        <HiArrowSmallLeft />
      </div>
    </div>
  );
}

export default function HomeCards() {
  const [barbersData, setBarbersData] = useState([]);

  useEffect(() => {
    // Fetch data here
    const fetchData = async () => {
      try {
        const response = await fetch("/dummydata.json");
        const data = await response.json();
        setBarbersData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render
  const barbers = barbersData.reduce((acc, city) => {
    city.neighborhoods.forEach((neighborhood) => {
      acc.push(...neighborhood.barbers)
    })
    return acc
  }, [])
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4.1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4.1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="slider">
        <Slider {...settings}>
          {barbers.map((barber, index) => (
            <div
              key={index}
            >
              <div
                key={index}
                className="card border-white h-100 mt-5"
                style={{ width: '18rem' }}
              >
                <img src={barber.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{barber.name}</h5>
                  <p className="card-text">{barber.address}</p>
                  <div className="btn rounded-4 border-secondary">
                    <AiFillLike />
                  </div>
                  <p>
                    Promoted <CiCircleAlert />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
