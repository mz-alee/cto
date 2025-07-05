import React from "react";
import * as yup from "yup";
export const LoginSchema = yup.object({
  email: yup.string().required("email is a required field"),
  password: yup.string().required("password is a required field"),
});
