import ChartBar from "../BarChart/BarChart";
import ChartPie from "../PieChart/PieChart";
import { StyledDiv } from "./Statistics.styled";

const Statistics = () => {
  return (
    <StyledDiv className="StyledDiv">
      <ChartBar />
      <ChartPie />
    </StyledDiv>
  );
};

export default Statistics;
