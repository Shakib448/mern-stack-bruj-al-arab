import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Button } from "@material-ui/core";

const Book = () => {
  const { bedType } = useParams();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = useState({
    checkIn: new Date(),
    checkOut: new Date(),
  });

  const handleCheckInDate = (date) => {
    const newDate = { ...selectedDate };
    newDate.checkIn = date;
    setSelectedDate(date);
  };
  const handleCheckOutDate = (date) => {
    const newDate = { ...selectedDate };
    newDate.checkOut = date;
    setSelectedDate(date);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        {" "}
        Hello {loggedInUser.name} Let's book a {bedType} Room.
      </h1>
      <p>
        Want a <Link to="/home">different room?</Link> import 'date-fns';
      </p>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Check In picker inline"
            value={selectedDate.checkIn}
            onChange={handleCheckInDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Check Out picker dialog"
            format="MM/dd/yyyy"
            value={selectedDate.checkOut}
            onChange={handleCheckOutDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Button variant="contained" color="primary">
          Book Now
        </Button>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default Book;
