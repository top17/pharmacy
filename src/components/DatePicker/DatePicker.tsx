import React from "react";
import { useFormikContext } from "formik";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ name }) => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <ReactDatePicker
      name={name}
      selected={values[name]}
      onChange={(date) => setFieldValue(name, date)}
      dateFormat="dd/MM/yyyy"
    />
  );
};

export default CustomDatePicker;
