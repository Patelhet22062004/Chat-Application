import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../assets/signup.png"; // Replace with the path to your image
import toast from "react-hot-toast"; // Import toast for notifications
import { useAuthContext } from "../context/AuthContext"; // Import AuthContext for setting user

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { setAuthUser } = useAuthContext(); // Get setAuthUser from context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State for loading spinner

  const handleCheckboxChange = (gender) => {
    setFormData({ ...formData, gender });
  };

  const handleInputErrors = () => {
    const { username, email, password, confirmPassword, gender } = formData;
    
    if (!username || !email || !password || !confirmPassword || !gender) {
      toast.error("Please fill all the fields");
      return true;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return true;
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for input errors
    const error = handleInputErrors();
    if (error) return;

    try {
      setLoading(true); // Set loading state to true

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Send form data
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Save user data to localStorage and update context
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);

      toast.success("Signup successful!"); // Show success message
      navigate("/login"); // Navigate to login page
    } catch (error) {
      toast.error(error.message); // Show error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:h-[600px] sm:h-[400px]">
      <div className="md:w-1/2 bg-light-gray flex items-center justify-center">
        <img
          src={signupImage}
          alt="Signup"
          className="hidden md:block md:h-full object-cover rounded-l-lg shadow-2xl"
        />
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
