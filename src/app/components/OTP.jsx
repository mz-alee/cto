import React from "react";
import { Controller } from "react-hook-form";
import OtpInput from "react-otp-input";

export default function OTP({ control }) {
  return (
    <Controller
      name="token"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <OtpInput
          {...field}
          value={field.value}
          onChange={field.onChange}
          numInputs={5}
          renderSeparator={<span className="mx-2"></span>}
          renderInput={(props) => (
            <input
              {...props}
              className="block text-center text-lg border-b border-gray-300 text-black outline-none focus:border-blue-500"
            />
          )}
          containerStyle="flex justify-center gap-2"
        />
      )}
    />
  );
}
