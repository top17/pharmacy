import * as Yup from "yup";

const productSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  manufacturer: Yup.object().shape({
    name: Yup.string().required("Manufacturer name is required"),
  }),
  price: Yup.number()
    .required("Product price is required")
    .positive("Price must be positive"),
  expiryDate: Yup.string()
    .required("Expiry date is required")
    .test("valid-date", "Expiry date must be in the future", (value) => {
      return isValidDate(value);
    }),
});

const isValidDate = (dateString: string) => {
  const currentDate = new Date();
  const selectedDate = new Date(dateString);

  return selectedDate > currentDate;
};

export default productSchema;
