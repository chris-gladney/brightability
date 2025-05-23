import aboutUs from "../assets/aboutUs.jpg";
import Header from "./Header";
import ServiceCard from "./homeComponents/ServiceCard";
import ExploreCard from "./homeComponents/ExploreCard";
import Footer from "./Footer";

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
      cost: "£4/session (Mon + Thurs, 1800-1900)",
      description:
        "Join us on Zoom for interactive virtual sessions, including karaoke, doodle drawing, scavenger hunts, bingo, beetle, and Makaton singing. A fun and accessible way to stay connected, get creative, and enjoy group activities from home.",
      bookableOnline: true,
    },
    {
      name: "Brightability Hub",
      cost: "£36/half-day/£72 full-day (Wed 0930-1530)",
      description:
        "A welcoming day provision focused on life skills, independence, and personal growth in a group setting. Activities are tailored to individual interests and learning styles, creating a supportive and engaging environment for all.",
      bookableOnline: false,
    },
  ];

  const navElements = [
    {
      link: "photos",
      element: "Photo Album",
      description:
        "View photos of Brightability's exploits here! Includes trips to theme parks, our virtual sessions, 1:1 buddy service and more!",
    },
    {
      link: "staff",
      element: "The Team",
      description:
        "Meet the team! Caring, experienced, and genuinely committed — our staff build trust, encourage growth, and make every day brighter for those we support.",
    },
    {
      link: "contact",
      element: "Contact Us",
      description:
        "For further information, please navigate to here for contact details.",
    },
  ];

  return (
    <>
      <Header />
      <section className="about-us">
        <img src={aboutUs} />
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
            const nameAsArray = serviceObj.name.split(" ");
            const imageId = nameAsArray[1].toLowerCase();
            return (
              <li key={i}>
                <ServiceCard
                  name={serviceObj.name}
                  cost={serviceObj.cost}
                  description={serviceObj.description}
                  bookableOnline={serviceObj.bookableOnline}
                  imageId={imageId}
                />
              </li>
            );
          })}
        </ul>
      </section>
      <section className="explore-brightability">
        <h2>Get to Know Brightability</h2>
        <ul className="explore">
          {navElements.map((navElementObj, i) => {
            return (
              <li key={i}>
                <ExploreCard
                  link={navElementObj.link}
                  element={navElementObj.element}
                  description={navElementObj.description}
                />
              </li>
            );
          })}
        </ul>
      </section>
      <Footer />
    </>
  );
}

export default Home;
