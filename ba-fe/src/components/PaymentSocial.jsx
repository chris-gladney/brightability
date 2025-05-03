import Header from "./Header";
import Footer from "./Footer";
import ActivityCard from "./paymentComponents/activityCard";

function PaymentSocial() {
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
      <section className="payment-social-description">
        <h2>Brightability Social</h2>
        <p>
          Below are the events that we offer for our social groups. Please have
          a browse and book any that appeal to you!
        </p>
      </section>
      <section className="payment-section">
        {socialEvents.map((event, i) => {
          return (
            <ActivityCard
              key={i}
              name={event.name}
              location={event.location}
              date={event.date}
            />
          );
        })}
      </section>
      <button className="divert-to-payment">Pay</button>
      <Footer />
    </>
  );
}

export default PaymentSocial;
