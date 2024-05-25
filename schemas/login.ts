import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email("Not as email").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});
