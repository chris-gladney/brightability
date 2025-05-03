import Footer from "./Footer";
import Header from "./Header";

function MoreInfo() {
  return (
    <>
      <Header />
      <section className="info-on-services">
        <article className="buddies">
          <h2>Brightability Buddies</h2>
          <h5>Personalised 1:1 Support, Just for You</h5>
          <p>
            Brightability Buddies is all about you — your pace, your goals, your
            confidence. Whether it’s navigating your local community, trying a
            new hobby, or working on everyday independence, our friendly team
            provides one-to-one support that fits your style and needs. We
            believe small steps can lead to big achievements, and we’re here to
            help every step of the way.
          </p>
          <h4>TO BOOK: go to "Contact Us" at the top of the page</h4>
        </article>
        <article className="hub">
          <h2>Brightability Hub</h2>
          <h5>A Supportive Space for Growth and Connection</h5>
          <p>
            The Brightability Hub is a vibrant, welcoming day setting where
            individuals build life skills, confidence, and friendships —
            together. With engaging activities shaped around each person’s
            interests and learning style, the Hub offers a structured, social
            environment that encourages progress at your own pace. From cooking
            and crafts to social outings and workshops, it’s a place to thrive.
          </p>
          <h4>TO BOOK: go to "Contact Us" at the top of the page</h4>
        </article>
      </section>
      <Footer />
    </>
  );
}

export default MoreInfo;
