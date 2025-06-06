import ConnectEvents from "./ConnectEvents";
import SocialEvents from "./SocialEvents";
import UploadForm from "./UploadPhotosForm";

function Authenticated() {
  return (
    <>
      <h1>Update page</h1>
      <br />
      <section className="photos">
        <UploadForm />
      </section>
      <section className="social-events">
        <SocialEvents />
      </section>
      <section className="connect-events">
        <ConnectEvents />
      </section>
    </>
  );
}

export default Authenticated;
