import * as yup from "yup";
export const otpSchema = yup.object({
  token: yup.string().required("otp is a required field"),
});
