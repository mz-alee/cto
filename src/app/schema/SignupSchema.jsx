import React from "react";
import * as yup from "yup";
export const SignupSchema = yup.object({
  username: yup.string().required("full name is a required field"),
  email: yup.string().required("email is a required field"),
  gender: yup.string().required("gender is a required field"),
  phone_number: yup.string().required("number is a required field"),
  date_of_birth: yup.string().required("date of birth is a required field"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
