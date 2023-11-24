import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import Preview from "../components/Preview";

function CarouselComponent(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>{props.carouselData.title}</h1>
      <div>
        <img
          className="preview-cover-image"
          src={props.carouselData.image}
          alt="cover image"
        ></img>
      </div>
      <p>{`${props.carouselData.description.slice(0, 150)}...`}</p>
    </div>
  );
}

function Carousel(props) {
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * (props.data.length - 10));
    const newCarouselArray = props.data.slice(randomNumber, randomNumber + 10);
    setCarouselData([...newCarouselArray]);
    console.log(carouselData);
  }, []);

  const carouselItems = carouselData.map((carouselItem) => {
    return (
      <div key={carouselItem.id}>
        <CarouselComponent carouselData={carouselItem} />
      </div>
    );
  });

  const settings = {
    dots: true,
    className: "center",
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    fade: true,
  };
  return (
    <div style={{ marginBottom: "10rem" }}>
      <p>You might like:</p>
      <Slider {...settings}>{carouselItems}</Slider>
    </div>
  );
}

export default Carousel;
