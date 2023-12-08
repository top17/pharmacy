import styled from "styled-components";
import { Form } from "formik";

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
`;

export const StyledFormDiv = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const StyledAlertContainer = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledForm = styled(Form)`
  background-color: #fffff0;
  margin: 0 auto;
  width: 300px;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledLabel = styled.label`
  margin-bottom: 5px;
  display: block;
  font-weight: bold;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
