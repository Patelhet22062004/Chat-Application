import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import signupImage from "../assets/signup.png"; // Replace with the path to your image

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setFormData({ ...formData, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <div className="flex flex-col md:flex-row md:h-[600px] sm:h-[400px]">
      <div className="md:w-1/2 bg-light-gray flex items-center   justify-center">
        <img src={signupImage} alt="Signup" className="hidden md:block md:h-full  object-cover rounded-l-lg shadow-2xl" />
      </div>
      <div className="md:w-1/2 flex items-center justify-center bg-white p-8 rounded-lg md:rounded-r-lg shadow-lg">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold text-center text-slate-700 mb-6">
            Sign Up for <span className="text-blue-700">Chat Application</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                className="w-full input input-bordered h-10"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="label p-2">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full input input-bordered h-10"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full input input-bordered h-10"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="label p-2">
                <span className="text-base label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full input input-bordered h-10"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>

            {/* Gender Checkbox component can be added here */}
            <div className="mb-4">
              <label className="label p-2">
                <span className="text-base label-text">Gender</span>
              </label>
              <div className="flex">
                <div className="form-control mr-4">
                  <label className="label cursor-pointer">
                    <span className="label-text">Male</span>
                    <input
                      type="checkbox"
                      className="checkbox border-slate-900"
                      checked={formData.gender === "male"}
                      onChange={() => handleCheckboxChange("male")}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Female</span>
                    <input
                      type="checkbox"
                      className="checkbox border-slate-900"
                      checked={formData.gender === "female"}
                      onChange={() => handleCheckboxChange("female")}
                    />
                  </label>
                </div>
              </div>
            </div>

            <Link
              to="/login"
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              Already have an account?
            </Link>

            <div>
              <button
                className="btn btn-block mt-4 bg-blue-600 rounded-md p-2 font-bold text-white"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
