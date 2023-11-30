import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Carousel from "../carousel/Carousel.jsx";

function LandingPage(props) {
  return (
    <>
      <Carousel data={props.data} />
      <NavLink to="/">Check out Podcasts</NavLink>
    </>
  );
}

export default LandingPage;
