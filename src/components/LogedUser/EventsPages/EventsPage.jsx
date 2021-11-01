import React from "react";
import { Link } from "react-router-dom";
import LogNavBar from "../../Navigation/LogNavBar/LogNavBar";

const EventsPage = () => {
  return (
    <>
      <h1>Events Page</h1>
      <Link to="/createEvent">
        <button>Add Event</button>
      </Link>
    </>
  );
};

export default EventsPage;
