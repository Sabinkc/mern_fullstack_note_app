import React from "react";
import { useState } from "react";
import AuthTextField from "../components/AuthTextField";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function loginUser() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      if (response.status == "200") {
        navigate("/home");
      } else {
        alert("Unable to login");
      }
    } catch (err) {
      alert("Unable to login");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form>
        <div className="bg-blue-200 rounded-2xl px-10  py-10">
          <h1 className="text-2xl mb-5">Login to your account</h1>

          <h2>Email</h2>
          <div className="bg-white rounded my-2">
            <input
              value={email}
              onChange={function (e) {
                setemail(e.target.value);
              }}
              className="w-70"
              type="text"
            />
          </div>
          <h2>Password</h2>
          <div className="bg-white rounded my-2">
            <input
              value={password}
              onChange={function (e) {
                setpassword(e.target.value);
              }}
              className="w-70"
              type="text"
            />
          </div>
          <div className="flex justify-center items-center pt-5">
            <button
              onClick={(e) => {
                e.preventDefault();
                loginUser();
                setemail("");

                setpassword("");
                console.log(fullName, email, password);
              }}
              className="bg-red-500 text-white rounded px-2 py-1 hover:bg-white hover:text-red-500 hover: border-2 hover:border-red"
            >
              Login
            </button>
          </div>
          <div className="flex justify-center items-center mt-3">
            <Link to="/">
              <button>Create new account?</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
