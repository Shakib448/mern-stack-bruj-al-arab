import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Bookings = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/bookings?email=" + loggedInUser.email) // (?) this used for get method
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);
  return (
    <div>
      <h3>You have: {bookings.length} book</h3>
      {bookings.map((book, i) => (
        <li key={i}>
          {" "}
          {book.name} from{" "}
          {new Date(book.checkIn).toDateString("dd / MM / yyyy")} to:{" "}
          {new Date(book.checkOut).toDateString("dd / MM / yyyy")}{" "}
        </li>
      ))}
    </div>
  );
};

export default Bookings;
