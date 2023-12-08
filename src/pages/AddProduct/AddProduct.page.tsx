import { useState } from "react";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import CustomDatePicker from "../../components/DatePicker/DatePicker";
import productSchema from "../../components/ProductSchema/ProductSchema";

import Alert from "react-bootstrap/Alert";
import {
  StyledAlertContainer,
  StyledDiv,
  StyledForm,
  StyledFormDiv,
  StyledLabel,
} from "../EditProduct/EditProduct.styled";
import "react-datepicker/dist/react-datepicker.css";
import { StyledButton } from "../../styles/Global";

const AddProduct = () => {
  const navigate = useNavigate();
  const [showAddedProduct, setShowAddedProduct] = useState(false);

  const initialValues: IProduct = {
    id: "",
    name: "",
    manufacturer: { name: "", id: "" },
    price: 0,
    expiryDate: new Date(),
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleSubmit = async (values: IProduct) => {
    try {
      await axios.post(`${config.apiUrl}`, values);
      console.log("Product added successfully");
      setShowAddedProduct(true);

      setTimeout(() => {
        setShowAddedProduct(false);
        navigate("/");
      }, 1200);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <StyledDiv className="StyledDiv">
      <StyledAlertContainer className="StyledAlertContainer">
        <Alert variant="light" show={showAddedProduct}>
          <Alert.Heading style={{ textAlign: "center", fontSize: "20px" }}>
            Product added successfully
          </Alert.Heading>
        </Alert>
      </StyledAlertContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={productSchema}
      >
        <StyledForm className="StyledForm">
          <StyledButton className="StyledButton" onClick={handleGoBack}>
            &#x2190; Go back
          </StyledButton>
          <StyledFormDiv className="StyledFormDiv">
            <StyledLabel className="StyledLabel">Name</StyledLabel>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
            <StyledLabel className="StyledLabel">Manufacturer</StyledLabel>
            <Field type="text" name="manufacturer.name" />
            <ErrorMessage name="manufacturer.name" component="div" />
            <StyledLabel className="StyledLabel">Price</StyledLabel>
            <Field type="number" name="price" />
            <ErrorMessage name="price" component="div" />
            <StyledLabel className="StyledLabel">Expiry date</StyledLabel>
            <CustomDatePicker name="expiryDate" />
            <ErrorMessage name="expiryDate" component="div" />
          </StyledFormDiv>
          <StyledButton className="StyledButton" type="submit">
            Add Product
          </StyledButton>
        </StyledForm>
      </Formik>
    </StyledDiv>
  );
};

export default AddProduct;
