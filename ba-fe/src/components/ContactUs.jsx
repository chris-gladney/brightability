import Footer from "./Footer";
import Header from "./Header";

function ContactUs() {
  return (
    <>
      <Header />
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSdzUtSXRaKAbkn9IQg8Hud1-0YrasELWjN2jJ4IYF2E7Xmuqg/viewform?embedded=true"
        width="640"
        height="585"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        Loading…
      </iframe>
      <Footer />
    </>
  );
}

export default ContactUs;
