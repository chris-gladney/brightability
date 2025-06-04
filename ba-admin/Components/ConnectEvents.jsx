function ConnectEvents() {
  return (
    <>
      <h3>Connect Events</h3>
      <section className="update-zoom-link">
        <form>
          <label for="event-id">Event ID: </label>
          <input type="text" id="event-id" name="event-id"></input>
          <br />
          <label for="new-link">New Link: </label>
          <input type="text" id="new-link" name="new-link"></input>
          <br />
          <button>Submit</button>
        </form>
      </section>
      <form></form>
    </>
  );
}

export default ConnectEvents;
