import { StyledDiv } from "./About.styled";

const About = () => {
  const appVersion = "1.0.0";
  const createdBy = "Vladimir Topalović";
  const email = "v.top1417@gmail.com";

  return (
    <StyledDiv className="StyledDiv">
      <h2>About the Application</h2>
      <p>
        The application is designed for finding, managing, and adding medicines,
        allowing users to explore and access information about manufacturers and
        various medications.
      </p>
      <p>
        <strong>Version:</strong> {appVersion}
      </p>
      <p>
        <strong>Created by:</strong> {createdBy}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
    </StyledDiv>
  );
};

export default About;
