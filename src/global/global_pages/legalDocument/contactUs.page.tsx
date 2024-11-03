import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<{
    name: string;
    email: string;
    message: string;
  }>({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const errors: { name: string; email: string; message: string } = {
      name: "",
      email: "",
      message: "",
    };

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
    } else {
      console.log("Form validation failed");
    }
  };

  const handleEmail = () => {
    window.location.href = "mailto:support@qikgro.com";
  };

  return (
    <div className="md:px-24 xxs:px-10  mx-auto mt-8">
      {/* Contact Details Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-grow p-4 bg-gray-100 hover:bg-gray-200  rounded-md shadow-md mb-2">
            <div className="flex flex-col items-center mb-2 text-center">
              <i className="fa-solid fa-phone-volume text-5xl "></i>
              <div>
                <span className="font-semibold text-lg">
                  Contact via phone number
                </span>
                <p className="text-gray-600">Phone: +91 (123) 456-7890</p>
              </div>
            </div>
          </div>

          <div className="flex-grow p-4 bg-gray-100 hover:bg-gray-200 rounded-md mb-2 shadow-md group">
            <div
              className="cursor-pointer flex flex-col items-center mb-2 text-center"
              onClick={handleEmail}>
              <i className="fa-solid fa-envelope text-5xl"></i>

              <div>
                <span className="font-semibold text-lg">Contact via email</span>
                <p className="text-gray-600">Email: support@qikgro.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Horizontal line */}
      <div className="flex items-center">
        <div className="flex-1 h-0.5 bg-gray-300"></div>
        <div className="mx-2">
          <p className="w-20 text-center font-medium">Or</p>
        </div>
        <div className="flex-1 h-0.5 bg-gray-300"></div>
      </div>
      {/* Contact Form Section */}

      <div className="mb-24">
        <h2 className="text-4xl font-bold my-3 text-center">Contact Form</h2>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md  focus:outline-ri-orange`}
            />
            {formErrors.name && (
              <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md focus:outline-ri-orange`}
            />
            {formErrors.email && (
              <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-600">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md focus:outline-ri-orange`}
              rows={4}
            />
            {formErrors.message && (
              <p className="text-sm text-red-500 mt-1">{formErrors.message}</p>
            )}
            <div className="max-w-2xl mx-auto ">
              <div className="rounded">
                <div className="w-full p-2">
                  <p className="mb-8">
                    If you have any queries, please check our
                    <Link
                      to="/faqs"
                      className="font-bold text-ri-blue underline ml-2"
                      target="blank">
                      FAQs
                    </Link>{" "}
                    for answers.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mt-1">
                <button
                  type="submit"
                  className="bg-ri-blue text-white px-4 py-2 rounded-md">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
