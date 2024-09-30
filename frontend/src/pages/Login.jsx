import loginImage from "../assets/login.avif"; // Replace with the path to your image
import React, { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // console.log(email, password)

  const { login, loading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div className="flex flex-col md:flex-row md:h-[600px] sm:h-[400px]">
      <div className="md:w-1/2 bg-light-gray flex items-center justify-center">
        <img src={loginImage} alt="Login" className="md:h-full hidden md:block   object-cover rounded-l-lg shadow-2xl" />
      </div>
      <div className="md:w-1/2 flex items-center justify-center bg-white p-8 rounded-r-lg shadow-lg">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold text-center text-slate-700 mb-6">
            Login to <span className="text-blue-700">Chat Application</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="label p-2">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full input input-bordered h-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
              {"Don't"} have an account?
            </Link>
            <div>
              <button
                className="btn btn-block mt-4 bg-blue-600 rounded-md p-2 font-bold text-white"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
