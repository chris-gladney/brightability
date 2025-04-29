import Header from "./Header";
import placeholderImg from "../assets/placeholderImg.png";
import ServiceCard from "./ServiceCard";

function Home() {
  const services = [
    {
      name: "Brightability Buddies",
      cost: "£19.95/hr (+45p/mile)",
      description:
        "Personalised 1:1 support to help you achieve your goals, build confidence, and develop life skills in a way that suits you. Whether it’s getting out and about, learning something new, or tackling everyday tasks, we’re here to support you in a way that works for you.",
      bookableOnline: false,
    },
    {
      name: "Brightability Social",
      cost: "£20/session (3-4 hours)",
      description:
        "A relaxed, friendly social group meeting once a month for fun activities like craft nights, dinners out, quizzes, bowling, karaoke, and shows. A great way to meet new people, try new things, and enjoy a night out with support.",
      bookableOnline: true,
    },
    {
      name: "Brightability Connect",
      cost: "£4/session (Mon + Fri, 6-7pm)",
      description:
        "Join us on Zoom for interactive virtual sessions, including karaoke, doodle drawing, scavenger hunts, bingo, beetle, and Makaton singing. A fun and accessible way to stay connected, get creative, and enjoy group activities from home.",
      bookableOnline: true,
    },
    {
      name: "Brightability Hub",
      cost: "£36/half-day (£72 full-day)",
      description:
        "Wednesdays, 0930-1530\nMayfield Community Centre, Totland Close\nA welcoming day provision focused on life skills, independence, and personal growth in a group setting. Activities are tailored to individual interests and learning styles, creating a supportive and engaging environment for all.",
      bookableOnline: false,
    },
  ];

  return (
    <>
      <Header />
      <section className="about-us">
        <img src={placeholderImg} />
        <article>
          At Brightability, we help adults with learning disabilities in our
          community. Our goal is to support them in enjoying activities,
          learning life skills, and finding work or volunteer opportunities. Our
          friendly team provides personalised support. We also have a social
          club for making friends, having fun, and improving social skills. Our
          focus is on promoting independence, inclusion, and happiness.
        </article>
      </section>
      <section className="our-services">
        <h2>Our Services</h2>
        <ul className="services-list">
          {services.map((serviceObj, i) => {
            return (
              <ServiceCard
                key={i}
                name={serviceObj.name}
                cost={serviceObj.cost}
                description={serviceObj.description}
                bookableOnline={serviceObj.bookableOnline}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default Home;
