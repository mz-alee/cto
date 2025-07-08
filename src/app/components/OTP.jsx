import React, { useState } from "react";
import OtpInput from "react-otp-input";

export default function OTP() {
  const [otp, setOtp] = useState("");

  return (
    <OtpInput
      value={otp}
      // containerStyle={{ width: "10px" }}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span className="mx-2"></span>}
      renderInput={(props) => (
        <input
          {...props}
          className="block text-center text-lg border-b border-gray-300   text-black outline-none focus:border-blue-500"
        />
      )}
      containerStyle="flex justify-center gap-2 30px"
    />
  );
}
