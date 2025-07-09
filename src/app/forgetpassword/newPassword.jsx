import React from "react";
import InputField from "../components/InputField";

const NewPassword = ({
  register,
  setPageNum,
  pageNum,
  handleSubmit,
  errors,
}) => {
  const handleData = (data) => {
    console.log("react hook form data");
  };
  return (
    <div className="bg-hero bg-cover  flex items-center flex-col md:flex-row min-h-screen w-full">
      <div className="h-[300px] md:h-full md:w-1/2  flex flex-col justify-center items-center">
        <h1 className="text-[20px] w-[280px] lg:text-4xl text-center md:w-[400px] font-[400] italic text-white/50 drop-shadow-sm">
          reset it to continue your journey with Conservation Through
          <span className="text-[#aa9322]"> Observation</span>
        </h1>
      </div>
      <div className="h-full md:w-1/2 flex justify-center items-center">
        <div className="bg-white/20 rounded-2xl  min-w-[320px] md:w-[450px] p-2 min-h-[240px]">
          <div className="w-full ">
            <h1 className="text-center mt-3 italic">
              create <span className="text-[#aa9322]">new</span>
              password
            </h1>
          </div>
          <div className="flex flex-col justify-center min-h-[150px]  py-2   gap-4 items-center w-full  ">
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(handleData)}
            >
              <div>
                <p className="text-[12px] capitalize lg:text-[0.8vw]">
                  password
                </p>
                <InputField
                  placeholder="password"
                  type="text"
                  register={register}
                  name="password"
                />
                {errors.password && (
                  <p className="error">{errors.password.message}</p>
                )}
              </div>
              <div>
                <p className="text-[12px] capitalize lg:text-[0.8vw]">
                  confirm password
                </p>
                <InputField
                  placeholder="confirm password"
                  type="text"
                  register={register}
                  name="confirmPassword"
                />
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div>
                {/* <div className="flex items-center gap-1">
                  <p className="text-[10px]">if you dont have an account?</p>
                  <button
                    type="button"
                    onClick={() => {
                      router.push("/signup");
                    }}
                    className="text-blue-800 cursor-pointer text-12px lg:text-[0.9vw]"
                  >
                    signup
                  </button>
                </div> */}
                <button
                  onClick={() => {
                    // setPageNum(pageNum + 1);
                  }}
                  className="mt-1 bg-[#c0a521] text-white hover:bg-transparent hover:text-[#c0a521] hover:border hover:border-[#c0a521] rounded-tl-4xl rounded-br-4xl cursor-pointer text-[12px] px-8 py-1 rounded-2xl shadow-lg transition-all duration-300"
                >
                  save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
