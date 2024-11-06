import React from "react";
import { FaLinkedin, FaGithub, FaUserTie } from "react-icons/fa";
import "./myTeam.css";

function MyTeams() {
  const Teams = [
    {
      Name: "FEYSEL",
      portfolio: "http://f-techsol.unaux.com",
      github: "https://github.com/FEYSEL",
      linkedin: "https://www.linkedin.com/in/faaz-mohammed-255703332/",
      image:
        "https://images.pexels.com/photos/20453229/pexels-photo-20453229/free-photo-of-monitors-and-electronics-on-desk.jpeg",
    },
    {
      Name: "TSEGAYE",
      portfolio: "https://www.tsegaye.com",
      github: "https://github.com/tsegaye",
      linkedin: "https://www.linkedin.com/in/tsegaye/",
      image:
        "https://images.pexels.com/photos/20453229/pexels-photo-20453229/free-photo-of-monitors-and-electronics-on-desk.jpeg",
    },
    {
      Name: "NATI",
      portfolio: "https://www.nati.com",
      github: "https://github.com/nati",
      linkedin: "https://www.linkedin.com/in/nati/",
      image:
        "https://images.pexels.com/photos/20453229/pexels-photo-20453229/free-photo-of-monitors-and-electronics-on-desk.jpeg",
    },
    {
      Name: "GETAHHUN",
      portfolio: "https://www.getahun.com",
      github: "https://github.com/getahun",
      linkedin: "https://www.linkedin.com/in/getahun/",
      image:
        "https://images.pexels.com/photos/20453229/pexels-photo-20453229/free-photo-of-monitors-and-electronics-on-desk.jpeg",
    },
    {
      Name: "HERMON",
      portfolio: "https://www.hermon.com",
      github: "https://github.com/hermon",
      linkedin: "https://www.linkedin.com/in/hermon/",
      image:
        "https://images.pexels.com/photos/20453229/pexels-photo-20453229/free-photo-of-monitors-and-electronics-on-desk.jpeg",
    },
    {
      Name: "BERRY",
      portfolio: "https://www.berry.com",
      github: "https://github.com/berry",
      linkedin: "https://www.linkedin.com/in/berry/",
      image:
        "https://images.pexels.com/photos/20453229/pexels-photo-20453229/free-photo-of-monitors-and-electronics-on-desk.jpeg",
    },
    {
      Name: "EMNET",
      portfolio: "https://www.emnet.com",
      github: "https://github.com/emnet",
      linkedin: "https://www.linkedin.com/in/emnet/",
      image:
        "https://images.pexels.com/photos/20453229/pexels-photo-20453229/free-photo-of-monitors-and-electronics-on-desk.jpeg",
    },
    {
      Name: "MIKI",
      portfolio: "https://www.miki.com",
      github: "https://github.com/miki",
      linkedin: "https://www.linkedin.com/in/miki/",
      image:
        "https://images.pexels.com/photos/20453229/pexels-photo-20453229/free-photo-of-monitors-and-electronics-on-desk.jpeg",
    },
    {
      Name: "HDA",
      portfolio: "https://www.hda.com",
      github: "https://github.com/hda",
      linkedin: "https://www.linkedin.com/in/hda/",
      image:
        "https://images.pexels.com/photos/20453229/pexels-photo-20453229/free-photo-of-monitors-and-electronics-on-desk.jpeg",
    },
    {
      Name: "ABRAHAM",
      portfolio: "https://www.abraham.com",
      github: "https://github.com/abraham",
      linkedin: "https://www.linkedin.com/in/abraham/",
      image:
        "https://images.pexels.com/photos/20453229/pexels-photo-20453229/free-photo-of-monitors-and-electronics-on-desk.jpeg",
    },
    // ... other team members
  ];

  return (
    <div className="outer-container">
      <div>
        <h1
          className="team-title"
          style={{
            marginTop: "70px",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          IF YOU WANT TO MEET THE TEAMS...
        </h1>
        <h2 style={{ marginBottom: "5px", textAlign: "center" }}>
          This is All About My Team Profile
        </h2>
      </div>
      <section className="team-section" style={{ marginTop: "40px" }}>
        <div className="team-grid" style={{ marginTop: "90px" }}>
          {Teams.map((team, index) => (
            <div key={index} className="team-card">
              <img
                className="team-image"
                src={team.image}
                alt={`${team.Name}'s Profile`}
              />
              <h4 className="team-name">{team.Name}</h4>
              <div className="icon-container">
                <a
                  href={team.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href={team.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href={team.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link"
                >
                  <FaUserTie size={24} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div>
        <br />
        <br />
        <h4
          style={{ marginTop: "70px", textAlign: "center", fontSize: "40px" }}
        >
          .....................//..........................
        </h4>
      </div>
    </div>
  );
}

export default MyTeams;
