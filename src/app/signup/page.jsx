"use client";
import React, { useState } from "react";
import OTPSection from "./components/VerifyOtp";
import SignupForm from './components/signupForm';

const page = () => {
  const [pageNum, setPageNum] = useState(1);
  console.log(pageNum);
  return (
    <div>
      {pageNum === 1 && (
        <SignupForm pageNum={pageNum} setPageNum={setPageNum} />
      )}
      {pageNum === 2 && <OTPSection  pageNum={pageNum} setPageNum={setPageNum}/>}
    </div>
  );
};

export default page;
