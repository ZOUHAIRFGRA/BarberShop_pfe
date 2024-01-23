import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
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
  const promotedBarbers = barbersData.reduce((acc, city) => {
    city.neighborhoods.forEach((neighborhood) => {
      acc.push(
        ...neighborhood.barbers.filter((barber) => barber.promoted === true)
      );
    });
    return acc;
  }, []);
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
          {promotedBarbers.map((barber, index) => (
            <div key={index} style={{ height: "100%" }}>
              <div
                key={index}
                className="card border-white h-100 mt-5"
                style={{ width: "100%", height: "100%" }}
              >
                <div style={{ paddingTop: "75%", position: "relative" }}>
                  <img
                    src={barber.image}
                    className="card-img-top"
                    alt="..."
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="card-body" style={{ height: "100%" }}>
                  <h3
                    className="card-title"
                    style={{
                      fontSize:"16px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      color:"#484848",
                      marginBottom:"5px",
                      wordBreak:"break-word",
                      fontFamily:"Proxima Nova Bold, sans-serif",
                      fontWeight:"400"

                    }}
                  >
                    {barber.name}
                  </h3>
                  <p
                    className="card-text"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color:"#767676",
                      wordBreak:"break-word",
                      fontSize:"12px",
                      letterSpacing:".08px",
                      lineHeight:"16px",
                      fontFamily:"Proxima Nova Rg, sans-serif",
                      
                    }}
                  >
                    {barber.address}
                  </p>
                  <div className="btn badge  rounded-pill bg-light border-black">
                    <FontAwesomeIcon icon={faThumbsUp} color="#151618"/>
                  </div>
                  <p className="mt-1" style={{
                    color:"#151618",
                    fontSize:"11px",
                    letterSpacing:".07px",
                    lineHeight:"15px",
                    fontFamily:"Proxima Nova Rg, sans-serif",

                  }}>
                    Promoted {}
                    <FontAwesomeIcon icon={faCircleInfo} size="sm" />
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
