import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
    userName: yup.string().required("Username is required"),
    password: yup.string().min(6).required("Password is required"),
    email: yup.string().email().required("Email is required"),
    dateOfBirth: yup.date().required("Date of Birth is required"),
})