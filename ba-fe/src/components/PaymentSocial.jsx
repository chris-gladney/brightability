import Header from "./Header";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ActivityCard from "./paymentComponents/activityCard";
import axios from "axios";

function PaymentSocial() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const paidEmail = searchParams.get("email");
  const paidName = searchParams.get("name");

  const [emailInput, setEmailInput] = useState("");
  const [confirmEmailInput, setConfirmEmailInput] = useState("");
  const [attendeeInput, setAttendeeInput] = useState("");

  const [allEvents, setAllEvents] = useState([]);
  const [addedEvents, setAddedEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/social")
      .then(({ data }) => {
        setAllEvents(data);
      })
      .then(() => {
        if (sessionId) {
          axios.post(
            "http://localhost:3000/fulfill-checkout",
            {
              name: paidName,
              email: paidEmail,
              sessionId,
            },
            { headers: { "Content-Type": "application/json" } }
          );
        }
      });
  }, []);

  const handleCheckout = (name, email, addedEvents) => {
    axios
      .post(
        "http://localhost:3000/pay-social",
        {
          name,
          email,
          addedEvents,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(({ data }) => {
        window.location = data.url;
      });
  };

  return (
    <>
      <Header />
      <div className="payment">
        <section className="events">
          <h3>Upcoming Events</h3>
          <p>Explore our upcoming social events below! Each event is £20</p>
          {allEvents.map((event, i) => {
            return (
              <ActivityCard
                key={i}
                id={event._id}
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
                emailInput &&
                confirmEmailInput &&
                attendeeInput &&
                addedEvents.length > 0
                  ? "active-checkout"
                  : "inactive-checkout"
              }
              onClick={() => {
                handleCheckout(attendeeInput, emailInput, addedEvents);
              }}
              disabled={
                emailInput &&
                confirmEmailInput &&
                attendeeInput &&
                addedEvents.length > 0
                  ? false
                  : true
              }
            >
              Pay
            </button>
            <button
              onClick={() => {
                console.log(addedEvents, "<<< current added events state");
                console.log(paidName, "<<< name");
                console.log(paidEmail, "<<< email");
                console.log(sessionId, "<<< session id");
              }}
            >
              Button for development to view state
            </button>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default PaymentSocial;
