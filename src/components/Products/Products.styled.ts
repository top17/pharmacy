import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

export const StyledTableHead = styled.thead`
  background-color: #f2f2f2;
`;

export const StyledTableBody = styled.tbody`
  tr:nth-child(odd) {
    background-color: #f1f3f5;
  }
  tr:nth-child(even) {
    background-color: #d3f9d8;
  }

  tr:hover {
    background-color: #8ce99a;
    cursor: pointer;
  }
`;

export const StyledTableCell = styled.td`
  padding: 10px;
  border: 1.5px solid #ddd;
`;

export const StyledTableHeaderCell = styled.th`
  text-align: left;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #e6e6e6;
`;

export const StyledButtonPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    background-color: #f1f3f5;
    margin: 15px;
    font-weight: 500;
    color: #51cf66;
    border: 4px solid #51cf66;
    padding: 10px 20px;
    border-radius: 50%;
  }
`;

export const StyledRemoveButton = styled.button`
  background-color: #f03e3e;
  color: #ffffff;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05) rotate(+2deg);
  }
`;

export const StyledEditButton = styled.button`
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: "Lato", sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 16px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05) rotate(+2deg);
  }
`;
