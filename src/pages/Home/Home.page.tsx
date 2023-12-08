import { useState } from "react";
import Products from "../../components/Products/Products";
import About from "../../components/About/About";
import { StyledComponentsRender, StyledDiv } from "./Home.styled";
import Statistics from "../../components/Statistics/Statistics";
import { StyledButton } from "../../styles/Global";

const Home = () => {
  const [selectedComponent, setSelectedComponent] = useState("products");

  const displayComponent = () => {
    switch (selectedComponent) {
      case "products":
        return <Products />;
      case "statistics":
        return <Statistics />;
      case "about":
        return <About />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <StyledDiv className="StyledDiv">
        <StyledButton
          className="StyledButton"
          onClick={() => setSelectedComponent("products")}
        >
          Products
        </StyledButton>
        <StyledButton
          className="StyledButton"
          onClick={() => setSelectedComponent("statistics")}
        >
          Statistics
        </StyledButton>
        <StyledButton
          className="StyledButton"
          onClick={() => setSelectedComponent("about")}
        >
          About
        </StyledButton>
      </StyledDiv>
      <StyledComponentsRender className="StyledComponentsRender">
        {displayComponent()}
      </StyledComponentsRender>
    </div>
  );
};

export default Home;
