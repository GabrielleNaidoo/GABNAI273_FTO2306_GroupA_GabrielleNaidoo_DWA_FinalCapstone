import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <h1>PodPortal</h1>
      <Link to="/">
        <h1>All Podcasts</h1>
      </Link>
    </nav>
  );
}

export default Navigation;