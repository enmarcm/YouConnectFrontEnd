import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  userName: yup.string().required("Username is required"),
  password: yup.string().min(6).required("Password is required"),
});
