import React, { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    let errors = "";
    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors = "Invalid Email format";
    }
    if (errors.length === 0) {
      try {
        setErrorMessage("");
      } catch (error) {
        console.log(`user creation encountered error: ${error}`);
      }
    } else {
      setErrorMessage(errors);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-medium text-ri-blue">Reset password</h1>
      <p className="text-slate-500">Fill up the form to reset the password</p>
      <form className="my-10" onSubmit={handleSubmitEmail}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="email">
            <p className="font-medium text-ri-blue pb-2">Email Address*</p>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              value={email}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter email address"
            />
          </label>
          {errorMessage && (
            <span className="text-red-500 text-8p email">{errorMessage}</span>
          )}

          <button
            type="submit"
            className="w-full py-3 font-medium text-white  bg-ri-blue  rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>
            <span>Reset password</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
