import Header from "./Header";
import Footer from "./Footer";
import StaffCard from "./staffComponents/StaffCard";

function Staff() {
  const staffInfo = [
    {
      name: "Shanie Gotel",
      job_title: "Director",
      description: "Support Manager",
    },
    {
      name: "Maddison Watts",
      job_title: "Director",
      description: "Administration Manager",
    },
    {
      name: "Nicole Summersby",
      job_title: "Support Worker",
      description: "Support Coordinator",
    },
  ];

  return (
    <>
      <Header />
      <section className="staff-description">
        <h2>Meet the Team!</h2>
        <p>
          Our team are committed to helping individuals to flourish. Meet the
          people involved down below!
        </p>
      </section>
      <section>
        <div className="staff-reel">
          {staffInfo.map((staffObj) => {
            return (
              <StaffCard
                name={staffObj.name}
                job_title={staffObj.job_title}
                description={staffObj.description}
              />
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Staff;
