import Header from "./Header";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ActivityCard from "./paymentComponents/activityCard";

function PaymentSocial() {
  const [emailInput, setEmailInput] = useState("");
  const [confirmEmailInput, setConfirmEmailInput] = useState("");
  const [attendeeInput, setAttendeeInput] = useState("");

  const [addedEvents, setAddedEvents] = useState([]);

  const socialEvents = [
    {
      name: "Bowling",
      location: "Camberley Arcade",
      date: "10/05/25",
    },
    {
      name: "Arts and Crafts",
      location: "Mytchett Community Centre",
      date: "10/06/25",
    },
    {
      name: "Dinner Out",
      location: "Nandos Camberley",
      date: "10/07/25",
    },
    {
      name: "Bowling",
      location: "Camberley Arcade",
      date: "10/08/25",
    },
  ];

  return (
    <>
      <Header />
      <div className="payment">
        <section className="events">
          <h3>Upcoming Events</h3>
          <p>Explore our upcoming social events below!</p>
          {socialEvents.map((event, i) => {
            return (
              <ActivityCard
                key={i}
                name={event.name}
                location={event.location}
                date={event.date}
                setAddedEvents={setAddedEvents}
              />
            );
          })}
        </section>
        <section className="cart">
          <FontAwesomeIcon icon={faShoppingCart} size="2x" />
          {/* <div className="added-events">
            {addedEvents.map((event) => {
              return (
                <div className="basket-event">
                  <h6>{event.name}</h6>
                </div>
              );
            })}
          </div> */}
          <form className="checkout" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => {
                setEmailInput(e.target.value);
              }}
              required
            ></input>
            <br />
            <label htmlFor="confirm-email">Confirm Email:</label>
            <br />
            <input
              type="email"
              id="confirm-email"
              name="confirm-email"
              onChange={(e) => {
                setConfirmEmailInput(e.target.value);
              }}
              required
            ></input>
            <br />
            <label htmlFor="attendee-name">Attendee Name:</label>
            <br />
            <input
              type="text"
              id="attendee-name"
              name="attendee-name"
              onChange={(e) => {
                setAttendeeInput(e.target.value);
              }}
              required
            ></input>
            <br />
            <button
              className={
                emailInput && confirmEmailInput && attendeeInput
                  ? "active-checkout"
                  : "inactive-checkout"
              }
              onClick={() => {}}
              disabled={
                emailInput && confirmEmailInput && attendeeInput ? false : true
              }
            >
              Pay
            </button>
            <button
              onClick={() => {
                console.log(addedEvents, "<<< current added events state");
              }}
            >Button for development to view state</button>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default PaymentSocial;
