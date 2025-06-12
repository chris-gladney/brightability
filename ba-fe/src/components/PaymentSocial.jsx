import Header from "./Header";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ActivityCard from "./paymentComponents/activityCard";
import axios from "axios";

function PaymentSocial() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState("");
  const [confirmEmailInput, setConfirmEmailInput] = useState("");

  const [allEvents, setAllEvents] = useState([]);
  const [addedEvents, setAddedEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/events/social")
      .then(({ data }) => {
        setAllEvents(data);
      })
      .then(() => {
        if (sessionId) {
          axios.get(
            `http://localhost:3000/payment/order-details-social/${sessionId}`
          );
        }
      })
      .then(() => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("session_id");

        navigate({ search: newParams.toString() }, { replace: true });
      });
  }, [sessionId]);

  const handleCheckout = (email, addedEvents) => {
    axios
      .post(
        "http://localhost:3000/payment/pay-social",
        {
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
                cartAction="Add"
                price="£20"
              />
            );
          })}
        </section>
        <section className="cart">
          <h4>Confirm Payment</h4>
          <p className="payment-instructions"></p>
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
            <button
              className={
                emailInput &&
                confirmEmailInput &&
                emailInput === confirmEmailInput &&
                addedEvents.length > 0
                  ? "active-checkout"
                  : "inactive-checkout"
              }
              onClick={() => {
                handleCheckout(emailInput, addedEvents);
              }}
              disabled={
                emailInput === confirmEmailInput && addedEvents.length > 0
                  ? false
                  : true
              }
            >
              Pay
            </button>
            {/* !!!!!!!!!!!!!!! Development button below here */}
            {/* <button
              onClick={() => {
                console.log(addedEvents, "<<< current added events state");
                console.log(sessionId, "<<< session id");
              }}
            >
              Button for development to view state
            </button> */}
          </form>
          <div className="cart-items">
            <section className="cart-description">
              <h4>Your Shopping Cart</h4>
              <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            </section>
            {addedEvents.map((event, i) => {
              return (
                <ActivityCard
                  key={i}
                  id={event.id}
                  name={event.name}
                  location={event.location}
                  date={event.date}
                  setAddedEvents={setAddedEvents}
                  cartAction="Remove"
                  price="£20"
                />
              );
            })}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default PaymentSocial;
