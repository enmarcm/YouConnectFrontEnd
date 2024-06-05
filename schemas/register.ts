import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
  userName: yup
    .string()
    .matches(/^[a-zA-Z0-9]{6,10}$/, "Username is not valid")
    .required("Username is required"),
  password: yup
    .string()
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@])[A-Za-z\d@]{8,20}$/, "Password is not valid")
    .required("Password is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  dateOfBirth: yup
    .date()
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        return new Date(originalValue);
      }
      return value;
    })
    .test(
      "is-date",
      "Date of Birth is not valid",
      (value) => value instanceof Date && !isNaN(value.getTime())
    )
    .required("Date of Birth is required"),
});
