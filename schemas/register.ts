import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
  userName: yup
    .string()
    .matches(/^[a-zA-Z0-9]{6,10}$/, "Username is not valid")
    .required("Username is required"),
  password: yup
    .string()
    .matches(/^(?=.*[/.@$!%*#?&])[A-Za-z\d/.@$!%*#?&]{6,20}$/, {
      message: "Password must contain at least one special character",
      excludeEmptyString: true,
    })
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password can't be longer than 20 characters")
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
