import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import productSchema from "../../components/ProductSchema/ProductSchema";

import Alert from "react-bootstrap/Alert";
import {
  StyledAlertContainer,
  StyledDiv,
  StyledForm,
  StyledFormDiv,
  StyledLabel,
} from "./EditProduct.styled";
import { StyledButton } from "../../styles/Global";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [showEditedProduct, setShowEditedProduct] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<IProduct>(`${config.apiUrl}/${id}`);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const initialValues: IProduct = product
    ? {
        id: product.id,
        name: product.name,
        manufacturer: {
          id: product.manufacturer.id,
          name: product.manufacturer.name,
        },
        price: product.price,
        expiryDate: product.expiryDate,
      }
    : {
        id: "",
        name: "",
        manufacturer: { id: "", name: "" },
        price: 0,
        expiryDate: new Date(),
      };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleSubmit = async (values: IProduct) => {
    try {
      await axios.patch(`${config.apiUrl}/${id}`, values);
      setShowEditedProduct(true);

      setTimeout(() => {
        setShowEditedProduct(false);
        navigate("/");
      }, 1200);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <StyledDiv className="StyledDiv">
      <StyledAlertContainer className="StyledAlertContainer">
        <Alert variant="light" show={showEditedProduct}>
          <Alert.Heading style={{ textAlign: "center", fontSize: "20px" }}>
            Product successfully updated
          </Alert.Heading>
        </Alert>
      </StyledAlertContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
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

            <StyledLabel className="StyledLabel">manufacturer</StyledLabel>
            <Field type="text" name="manufacturer.name" />
            <ErrorMessage name="manufacturer.name" component="div" />

            <StyledLabel className="StyledLabel">price</StyledLabel>
            <Field type="number" name="price" />
            <ErrorMessage name="price" component="div" />

            <StyledLabel className="StyledLabel">Expiry date</StyledLabel>
            <Field name="expiryDate" />
            <ErrorMessage name="expiryDate" component="div" />
          </StyledFormDiv>
          <StyledButton className="StyledButton" type="submit">
            Save changes
          </StyledButton>
        </StyledForm>
      </Formik>
    </StyledDiv>
  );
};

export default EditProduct;
